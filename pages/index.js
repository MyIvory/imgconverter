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
  const [cookies, setCookies] = useCookies(["counter"]);
  const [timer, setTimer] = useState("00:00:00");

  // Эффект для получения значения счетчика из cookie
  useEffect(() => {
    if (cookies.counter) {
      setCounter(parseInt(cookies.counter));
      let remainingTime = cookies.maxAge || 60;
      const timer = setInterval(() => {
        const hours = Math.floor(remainingTime / 3600); // вычисляем количество часов
        const minutes = Math.floor((remainingTime % 3600) / 60); // вычисляем количество минут
        const seconds = remainingTime % 60; // вычисляем количество секунд
        let timeToString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // выводим оставшееся время в формате hh:mm:ss
        remainingTime--; // уменьшаем оставшееся время на 1 секунду
        if(counter>=2){
          setTimer(timeToString)
        }
        if (remainingTime < 0) {
          clearInterval(timer); // останавливаем таймер, если оставшееся время меньше нуля
        }
      }, 1000);

      // максимальное время блокировки в секундах


      // const expireTime = new Date(+cookies.cookiesDate)//.getTime() + maxAge * 1000;
      // const intervalId = setInterval(() => {
      //   const now = new Date(expireTime- Date.now());
      //   if (now.getTime() <= 0) {
      //     clearInterval(intervalId);
      //     setCounter(0);
      //     setCookies("counter", 0, {
      //       path: "/",
      //       maxAge: 60,
      //     });
      //   } else {
      //     const hours = now.getUTCHours().toString().padStart(2, "0");
      //     const minutes = now.getUTCMinutes().toString().padStart(2, "0");
      //     const seconds = now.getUTCSeconds().toString().padStart(2, "0");
      //     const timeString = `${hours}:${minutes}:${seconds}`;
      //     setTimer(timeString);
      //     console.log(timer)
      //   }
      // }, 1000);
    }
  }, [cookies.counter]);

  // Эффект для сохранения значения счетчика в cookie
  useEffect(() => {
    // document.cookie = `counter=${counter}; time=${time}; max-age=${60}; path=/`;
    setCookies("counter", counter, {
      path: "/",
      maxAge: 60,
    });
    setCookies("cookiesDate", Date.now(), {
      path: "/",
      maxAge: 60,
    });
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
        const response = await fetch("http://localhost/imgconverter/GCV.php", {
          // imgtextreader
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
      <Header handleUpload={handleUpload} display={counter<2?counter:timer} />
      <div className="content">
        <ImgLoader fileList={fileList} setFileList={setFileList} />
        <ResultList contentItem={contentItem} />
      </div>

      {contextHolder}
    </>
  );
}
