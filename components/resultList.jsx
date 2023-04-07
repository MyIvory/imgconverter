import { useEffect, useState, useMemo, useRef } from "react";
import s from "../styles/resultListModule/resultList.module.css";
import { Button } from "antd";
import $ from "jquery";

const ResultList = (props) => {
  const [elements, setElements] = useState([]);
  const containerRef = useRef(null);
  useMemo(() => {
    setElements((prevElements) => [...prevElements, props.contentItem]);
  }, [props.contentItem]);

  useEffect(() => {
   if(containerRef.current.lastChild !=null) containerRef.current.lastChild.scrollIntoView({ behavior: "smooth" });
  }, [elements]);

  const saveSession = () => {
    let session_data = { session_name: "JScript", session_data: elements };
    $.ajax({
      type: "POST",
      url: "http://localhost/imgconverter/save_session.php",
      data: { data: session_data },
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.log(error);
      },
    });
  };
  let num = 0;
  return (
    <>
      <div className={s.main} ref={containerRef}>
        {elements.map((item) => {
          if (item != null) {
            let key = Math.floor(Math.random(1) * 100000);
            num += 1;
            return (
              <div key={key} className={s.item}>
                <div
                  className={s.item_number}
                  style={{
                    gridArea: "n",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {num}
                </div>
                <div className={s.item_content} style={{ gridArea: "c" }}>
                  <h4 style={{ margin: 20 }}>{item}</h4>
                </div>
              </div>
            );
          }
        })}
      </div>
      <Button onClick={saveSession} className="saveButton">
        Save
      </Button>
    </>
  );
};
export default ResultList;
