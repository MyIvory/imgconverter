import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ImgLoader from "@/components/imgLoader";
import ResultList from "@/components/resultList";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Button, Modal, Upload, message } from "antd";
import { useCookies } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [contentItem, setContentItem] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [modal, contextHolder] = Modal.useModal();
  const [counter, setCounter] = useState(0);
  const [cookies, setCookie] = useCookies(["counter"]);

  // Эффект для получения значения счетчика из cookie
  useEffect(() => {
    if (cookies.counter) {
      setCounter(parseInt(cookies.counter));
    }
  }, [cookies.counter]);

  // Эффект для сохранения значения счетчика в cookie
  useEffect(() => {
    document.cookie = `counter=${counter}; max-age=${60}; path=/`;
  }, [counter]);
  
  // Функция для инкрементирования счетчика
  function incrementCounter() {
    setCounter((prevCount) => prevCount + 1);
  }
  // Функция для обработки загрузки файлов
  const handleUpload = async () => {
    console.log("click");
    if (fileList.length > 0) {
      // Проверка лимита на количество запросов
      if (counter >= 2) {
        modal.error({
          title: "Error",
          content: "You have reached the limit of 10 text reads per day.",
        });
        return;
      }
      // Проверка типа загруженного файла
      const file = fileList[0];
      if (!file.originFileObj.type.startsWith("image/")) {
        modal.error({
          title: "Error",
          content: <span>Select image file</span>,
        });
        return;
      }
      // Отправка запроса на сервер для получения текста из изображения
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
        incrementCounter();
        
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
  // Функция для установки выбранного контента
  function getContentItem(item) {
    setContentItem(item);
  }
  return (
    <>
      <Header handleUpload={handleUpload} counter={counter} />
      <div className="content">
        <ImgLoader fileList={fileList} setFileList={setFileList} />
        <ResultList contentItem={contentItem} />
      </div>

      {contextHolder}
    </>
  );
}
