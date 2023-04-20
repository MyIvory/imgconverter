import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, message } from 'antd';
import { useState, useEffect } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import s from "../styles/imgLoaderModule/imgLoaderModule.module.css"
import { withTranslation } from 'next-i18next'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BsHourglassBottom } from 'react-icons/bs';
import { FaCog } from 'react-icons/fa';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};
const ImgLoader = ({ t, ...props }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [loading, setLoading] = useState(false)
    const [dragging, setDragging] = useState(false)

    // const [modal, contextHolder] = Modal.useModal()
    // const [fileList, setFileList] = useState([]);

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
    //анимация кнопки
    function addGlowAnimation(element, duration) {
        const animationClass = "glow-animation";
        const animationDuration = duration || 1000; // По умолчанию 1 секунда

        // Добавляем класс для анимации
        element.classList.add(animationClass);

        // Удаляем класс для анимации после окончания анимации
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, animationDuration);
    }
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

    };
    let timerId;
    const handleChange = ({ fileList: newFileList }) => {
        try {
            props.setFileList(newFileList);
            clearTimeout(timerId);
            timerId = setTimeout(() => { addGlowAnimation(document.getElementById("read_button"), 1000); }, 500)

        } catch (error) {
            console.log(error)
        }

    }

    const uploadButton = (
        <div>
            {props.loading ? (
                <Spin indicator={<FaCog className="spin-animation" style={{ color: 'white', fontSize: 40 }} spin />} />
            ) : (
                <AiOutlineCloudDownload style={{ fontSize: 80 }} />
            )}
            {/*  <AiOutlineCloudDownload style={{ fontSize: 80 }} /> */}
            {/*   <Spin indicator={<FaCog className="spin-animation" style={{ color: 'white',fontSize:40 }} spin />} /> */}
            <div
                style={{
                    marginTop: 8,
                    paddingLeft: 20,
                    paddingRight: 20
                }}
            >
                {props.isMounted ? window.innerWidth > 600 ? t('description') : t('description_mob') : ''}

            </div>
        </div>
    );
    return (
        <>
            <div className={`${s.uploadBlock} ${dragging ? s.dragging : ''}`}
                onDragEnter={() => setDragging(true)}
                onDragLeave={() => setDragging(false)}>
                <div className={s.uploadInnerBlock}>
                    <Upload listType="picture-card" fileList={props.fileList} onPreview={handlePreview} onChange={handleChange} customRequest={dummyRequest}>
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
export default withTranslation('imgloader')(ImgLoader);