import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, message } from 'antd';
import { useState, useEffect } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const ImgLoader = (props) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // const [fileList, setFileList] = useState([]);
    const [dragging, setDragging] = useState(false)
    // const [modal, contextHolder] = Modal.useModal()

    useEffect(() => {
        const handlePaste = (event) => {
            if (event.clipboardData && event.clipboardData.files && event.clipboardData.files.length) {
                const file = event.clipboardData.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const newFile = {
                        uid: file.uid,
                        name: file.name,
                        status: 'done',
                        url: reader.result,
                        originFileObj: file,
                    };
                    props.setFileList([newFile]);
                };
            }
        };

        document.addEventListener('paste', handlePaste);

        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, []);

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => props.setFileList(newFileList);

    const uploadButton = (
        <div>
            <AiOutlineCloudDownload style={{fontSize:80}}/>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Добавьте изображение в этот блок, перетащив или кликнув для выбора.
            </div>
        </div>
    );

    // const handleUpload = async () => {
    //     if (fileList.length > 0) {
    //       const file = fileList[0];
         
    //       if (!file.originFileObj.type.startsWith("image/")) {
    //         modal.error({
    //           title: "Error",
    //           content: <span>Select image file</span>,
    //         });
    //         return;
    //       }
    //       const formData = new FormData();
    //       let new_file = new File([fileList[0].originFileObj], fileList[0].name);
      
    //       formData.append("image", new_file);
      
    //       try {
    //         const response = await fetch("http://localhost/imgtextreader/GCV.php", { //imgconverter
    //           method: "POST",
    //           body: formData,
    //         });
    //         const text = await response.text();
    //         props.getContentItem({id:Date.now(),text:text});
    //         setFileList([]);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     } else {
    //       modal.error({
    //         title: "Error",
    //         content: <span>Select file</span>,
    //       });
    //     }
    //   };



    return (
        <>
            <div className={`uploadBlock${dragging ? ' dragging' : ''}`} onDragEnter={() => setDragging(true)} onDragLeave={() => setDragging(false)} >
                <div className="uploadInnerBlock">
                    <Upload listType="picture-card" fileList={props.fileList} onPreview={handlePreview} onChange={handleChange}>
                        {props.fileList.length >= 1 ? null : uploadButton}
                    </Upload>

                </div>
                {/* <Button onClick={handleUpload} className='uploadButton'>Отправить</Button> */}
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
               
            </div>
            
            
        </>
    );
};
export default ImgLoader;