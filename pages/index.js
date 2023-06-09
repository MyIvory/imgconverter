import { Inter } from "next/font/google";
import ImgLoader from "@/components/imgLoader";
import ResultList from "@/components/resultList";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Button, Modal, Upload, message } from "antd";
import { useCookies } from "react-cookie";
import { withTranslation } from "next-i18next";

const inter = Inter({ subsets: ["latin"] });
const Home = ({ t }) => {
  const [contentItem, setContentItem] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [modal, contextHolder] = Modal.useModal();
  const [counter, setCounter] = useState(0);
  const [cookies, setCookie, removeCookes] = useCookies([
    "counter",
    "lastRequestTime",
  ]);
  const [timer, setTimer] = useState("00:00:00");
  const [lastRequestTime, setLastRequestTime] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const maxCookiesAge = 3600;
  const limit = 5;

  useEffect(() => {
    setShowTooltip(window.innerWidth > 600 ? true : false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (cookies.counter) {
      setCounter(parseInt(cookies.counter));
    }
  }, [cookies.counter]);

  useEffect(() => {
    if (cookies.lastRequestTime) {
      setLastRequestTime(parseInt(cookies.lastRequestTime));
    }
  }, [cookies.lastRequestTime]);

  useEffect(() => {
    document.cookie = `counter=${counter}; max-age=${maxCookiesAge}; path=/`;
  }, [counter]);

  useEffect(() => {
    document.cookie = `lastRequestTime=${lastRequestTime}; max-age=${maxCookiesAge}; path=/`;
  }, [lastRequestTime]);
  // console.log(Math.floor(maxCookiesAge-((Date.now()-lastRequestTime))/1000))

  useEffect(() => {
    if (counter >= limit) {
      let i = Math.floor(maxCookiesAge - (Date.now() - lastRequestTime) / 1000);
      let interval = setInterval(() => {
        i--;
        setTimer(
          formatTime(
            Math.floor(maxCookiesAge - (Date.now() - lastRequestTime) / 1000)
          )
        );
        if (i <= 0) {
          document.cookie = "counter=; max-age=0; path=/";
          clearInterval(interval);
          setCounter(0);
          setLastRequestTime(null);
        }
      }, 1000);
    }
  }, [counter]);

  function incrementCounter() {
    setCounter((prevCount) => prevCount + 1);
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  const handleUpload = async () => {
    setLoading(true);
    if (fileList.length > 0) {
      // Проверка лимита на количество запросов
      if (counter >= limit) {
        modal.error({
          title: isMounted ? t("error") : "",
          content: <span>{isMounted ? t("limiterr") : ""}</span>,
        });
        setLoading(false);
        return;
      }

      // Проверка типа загруженного файла
      const file = fileList[0];
      if (!file.originFileObj.type.startsWith("image/")) {
        modal.error({
          title: isMounted ? t("error") : "",
          content: <span>{isMounted ? t("notimage") : ""}</span>,
        });
        setLoading(false);
        return;
      }
      // Отправка запроса на сервер для получения текста из изображения
      const formData = new FormData();
      let new_file = new File([fileList[0].originFileObj], fileList[0].name);

      formData.append("image", new_file);

      try {
        const response = await fetch(
          "https://www.easytext.gidguns.info/GCV.php",
          {
            //http://localhost/imgtextreader/GCV.php
            //imgconverter
            //imgtextreader
            method: "POST",
            body: formData,
          }
        );
        const text = await response.text();
        getContentItem({ id: Date.now(), text: text });
        setFileList([]);
        incrementCounter();
        setLastRequestTime(Date.now());
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setLoading(false);
      modal.error({
        title: isMounted ? t("error") : "",
        content: <span>{isMounted ? t("nofile") : ""}</span>,
      });
    }
  };
  // Функция для установки выбранного контента
  function getContentItem(item) {
    setContentItem(item);
  }

  return (
    <>
      <Header
        handleUpload={handleUpload}
        display={counter < limit ? counter : timer}
        isTimer={counter < limit ? false : true}
        isMounted={isMounted}
        showTooltip = {showTooltip}
      />
      <div className="content">
        <ImgLoader
          fileList={fileList}
          setFileList={setFileList}
          isMounted={isMounted}
          loading={loading}
        />
        <ResultList contentItem={contentItem} 
        isMounted={isMounted} 
        showTooltip = {showTooltip}
        />
      </div>

      {contextHolder}
    </>
  );
};

export default withTranslation("home")(Home);
