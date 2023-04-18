import { useEffect, useState, useMemo, useRef } from "react";
import s from "../styles/resultListModule/resultListModule.module.css";
import { Button, Input, Modal, Tooltip, message } from "antd";
import $ from "jquery";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCopy } from "react-icons/ai";
import { Editor } from "@tinymce/tinymce-react";
import { withTranslation } from 'next-i18next'


const ResultList = ({t,...props}) => {
  const [elements, setElements] = useState([]);
  const containerRef = useRef(null);
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, messageHolder] = message.useMessage()
  const [editorContent, setEditorContent] = useState("");
  const [mainStyle, setMainstyle] = useState({})

  useMemo(() => {
    let el = props.contentItem;
  
    setElements((prevElements) => {
      if (props.contentItem !== null) {
        return [...prevElements, el];
      } else {
        return [];
      }
    });
  }, [props.contentItem]);

  useEffect(() => {
    if (containerRef.current.lastChild != null) containerRef.current.lastChild.scrollIntoView({ behavior: "smooth" });
    if(containerRef.current.childElementCount>0){
      setMainstyle(
        {
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0) 10%, rgba(255,255,255,0.5) 100%)',
        }
      )
    }else{
      setMainstyle({})
    }
  }, [elements]);

  const saveSession = async () => {
    const session_data = { session_name: "JScript", session_data: elements };

    try {
      const response = await $.ajax({
        type: "POST",
        url: "http://localhost/imgconverter/save_session.php",
        // imgtextreader
       // imgconverter
        data: { data: session_data },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = (id) => {
    setElements((prevElements) => {
      const index = prevElements.findIndex((item) => item.id === id);
      if (index === -1) {
        return prevElements;
      }
      prevElements.splice(index, 1);
      return [...prevElements];
    });
  };
  ///////////////////////////
  const editItem = (item) => {
    setEditorContent(item.text);
    modal.confirm({
      title: "Edit Item",
      icon: null,
      width: "80vw",
      content: (
        <Editor
          initialValue={item.text}
          onEditorChange={(content) => setEditorContent(content)}
          apiKey="k8hk86kuqv28tv797qm250k1wpqak5b4w6gksbtsq50w27rm"
          init={{
            height: 500,
            menubar: true,
            selector: "textarea",

            plugins:
              "anchor autolink charmap link lists searchreplace wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
        />
      ),
      okText: "Save",
      cancelText: "Cancel",
      onOk: () => {
        setEditorContent((prevContent) => {
          setElements((prevElements) => {
            const index = prevElements.findIndex((el) => el.id === item.id);
            if (index === -1) {
              return prevElements;
            }
            const newItem = { ...prevElements[index], text: prevContent };
            prevElements.splice(index, 1, newItem);
            return [...prevElements];
          });
          return prevContent;
        });
      },
      onCancel: () => { },
    });
  };
  /////////////////////////////
  const copyItem = (id) => {
    const $textarea = $('<textarea/>', {
      val: $(`#${id}`).text()
    }).appendTo('body')
    console.log($textarea)
    $textarea.select();
    document.execCommand('copy');
    $textarea.remove();
    messageApi.open({
      type: 'success',
      content: 'Text copy',
    });
  }
  let num = 0;
  return (
    <>
      <div className={s.main} ref={containerRef} style={mainStyle}>
        {elements.filter((item) => item !== null)
          .map((item, index) => {
            num += 1;
            return (
              <div key={index} className={s.item}>
                <div className={s.item_number}>
                  <span>{num}</span>
                </div>
                <div className={s.item_content}>
                  <span>{item.text}</span>
                  {/* <span id={item.id} dangerouslySetInnerHTML={{ __html: item.text }}></span> */}

                </div>
                <div className={s.tools}>
                  <Tooltip title={props.isMounted ? t('tooltips.edit') : ''}>
                    <AiOutlineEdit
                      className={s.icons}
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: 5,
                      }}
                      onClick={() => editItem(item)}
                    />
                  </Tooltip>
                  <Tooltip title={props.isMounted ? t('tooltips.copy') : ''}>
                    <AiOutlineCopy className={s.icons} onClick={() => {
                      copyItem(item.id)
                    }} />
                  </Tooltip>
                  <Tooltip title={props.isMounted ? t('tooltips.del') : ''}>
                    <AiOutlineDelete
                      className={s.icons}
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: 0,
                      }}
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            );
          })}
      </div>
      {/* <Button onClick={saveSession} className="saveButton">
        Save
      </Button> */}
      {contextHolder}
      {messageHolder}
    </>
  );
};
export default withTranslation('resultlist')(ResultList);


