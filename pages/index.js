import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ImgLoader from "@/components/uploadForm";
import ResultList from "@/components/resultList";
import { useState } from "react";
import Header from "@/components/header";
import { Button, Modal, Upload, message } from "antd";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [contentItem, setContentItem] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [modal, contextHolder] = Modal.useModal();
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(prevCount => prevCount + 1);
  }
  const handleUpload = async () => {
    console.log("click");
    if (fileList.length > 0) {
      const file = fileList[0];

      if (!file.originFileObj.type.startsWith("image/")) {
        modal.error({
          title: "Error",
          content: <span>Select image file</span>,
        });
        return;
      }
      const formData = new FormData();
      let new_file = new File([fileList[0].originFileObj], fileList[0].name);

      formData.append("image", new_file);

      try {
        const response = await fetch("http://localhost/imgtextreader/GCV.php", {
          //imgconverter
          method: "POST",
          body: formData,
        });
        const text = await response.text();
        getContentItem({ id: Date.now(), text: text });
        setFileList([]);
        incrementCounter()
      } catch (error) {
        console.error(error);
      }
    } else {
      modal.error({
        title: "Error",
        content: <span>Select file</span>,
      });
    }
  };

  function getContentItem(item) {
    setContentItem(item);
  }
  return (
    <>
      <Header
        handleUpload={handleUpload}
        contentItem={contentItem}
        getContentItem={getContentItem}
        counter={counter}
      />
      <div className="content">
        <ImgLoader
          getContentItem={getContentItem}
          fileList={fileList}
          setFileList={setFileList}
        />
        <ResultList contentItem={contentItem} getContentItem={getContentItem} />
      </div>
      {contextHolder}
    </>
  );
}
