import { useEffect, useState, useMemo, useRef } from "react";
import s from "../styles/resultListModule/resultList.module.css";
import { Button, Input, Modal } from "antd";
import $ from "jquery";
import { AiOutlineDelete, AiOutlineEdit,AiOutlineCopy } from 'react-icons/ai';




const ResultList = (props) => {
  const [elements, setElements] = useState([]);
  const containerRef = useRef(null);
  const [modal, contextHolder] = Modal.useModal()

  useMemo(() => {
    let el = props.contentItem
    console.log(el)
    setElements((prevElements) => {
      if (props.contentItem !== null) {
        return [...prevElements, el]
      } else {
        return []
      }

    });
  }, [props.contentItem]);

  useEffect(() => {
    if (containerRef.current.lastChild != null) containerRef.current.lastChild.scrollIntoView({ behavior: "smooth" });

  }, [elements]);


  const saveSession = async () => {
    const session_data = { session_name: "JScript", session_data: elements };

    try {
      const response = await $.ajax({
        type: "POST",
        url: "http://localhost/imgtextreader/save_session.php",
        data: { data: session_data },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteItem = (id) => {
  //   setElements(prevElements => {
  //     const index = prevElements.findIndex(item => item.id === id);
  //     if (index === -1) {
  //       return prevElements;
  //     }
  //     prevElements.splice(index, 1);
  //     return [...prevElements];
  //   });
  // }



  // const editItem = (text) => {
  //   modal.info({
  //     title: "Error",
  //     width: 600,
  //     content: <div>
  //       <Input addonBefore={<AiOutlineEdit />} value={text} />
      
  //     </div>,
  //   });
  // }
  let num = 0;
  return (
    <>
      <div className={s.main} ref={containerRef}>
        {
          elements.filter(item => item !== null).map((item, index) => {

            num += 1;
            return (
              <div key={index} className={s.item}>
                <div className={s.item_number}>
                  <span>{num}</span>
                </div>
                <div className={s.item_content}>
                  <h4>{item.text}</h4>
                </div>
                <div className={s.tools}>
                  <AiOutlineEdit className={s.icons} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: 5 }} onClick={() => editItem(item.text)} />
                  <AiOutlineCopy className={s.icons} />
                  <AiOutlineDelete className={s.icons} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: 0 }} onClick={() => { deleteItem(item.id) }} />
                </div>
              </div>
            );

          })}
      </div>
      <Button onClick={saveSession} className="saveButton">
        Save
      </Button>
      {contextHolder}
    </>
  );
};
export default ResultList;

