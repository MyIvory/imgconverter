import s from "../styles/headerModule/headerModule.module.css";
import { withTranslation } from "next-i18next";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tooltip, Modal } from "antd";
import Image from "next/image";

const Header = ({ t, i18n, ...props }) => {
  const [language, setLanguage] = useState("en");
  const { locale, locales, push } = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const enRef = useRef(null);
  const ukRef = useRef(null);
  useEffect(() => {
    if (locale === "en") {
      enRef.current.classList.add(s.selectedLanguage);
      ukRef.current.classList.remove(s.selectedLanguage);
      ukRef.current.classList.add(s.unSelectedLanguage);
    } else if (locale === "uk") {
      ukRef.current.classList.add(s.selectedLanguage);
      enRef.current.classList.remove(s.selectedLanguage);
      enRef.current.classList.add(s.unSelectedLanguage);
    }
  }, [locale]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    push("/", undefined, { locale: lang });
    i18n.changeLanguage(lang);
    ukRef.current.classList.remove();
    enRef.current.classList.remove();
  };
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
  function showError(path) {
    modal.warning({
      title: props.isMounted ? t(path.title) : "",
      content: <span>{props.isMounted ? t(path.content) : ""}</span>,
    });
  }
  return (
    <div className={s.main}>
      <div className={s.logo}>
        <Image src="/e_logo.png" alt="My Image" width={145} height={50} />
      </div>
      <Tooltip
        title={
          props.showTooltip && props.isMounted ? t("tooltips.profile") : ""
        }
      >
        <div
          className={s.user}
          id="user_but"
          onClick={() => {
            addGlowAnimation(document.getElementById("user_but"));
            showError({ title: "warning.title", content: "warning.profile" });
          }}
        >
          {props.isMounted ? t("profile").toUpperCase() : ""}
        </div>
      </Tooltip>
      <div className={s.tools}>
        <Tooltip
          title={props.showTooltip && props.isMounted ? t("tooltips.ocr") : ""}
        >
          <div
            className={s.read_button}
            id="read_button"
            onClick={() => {
              props.handleUpload();
              addGlowAnimation(document.getElementById("read_button"));
            }}
          >
            {props.isMounted ? t("ocr").toUpperCase() : ""}
          </div>
        </Tooltip>
        <Tooltip
          title={
            props.showTooltip && props.isMounted
              ? props.isTimer
                ? t("tooltips.timer")
                : t("tooltips.counter")
              : ""
          }
        >
          <div className={s.counter}>{props.display}</div>
        </Tooltip>
        <Tooltip
          title={props.showTooltip && props.isMounted ? t("tooltips.save") : ""}
        >
          <div
            className={s.save_button}
            id="save_but"
            onClick={() => {
              showError({ title: "warning.title", content: "warning.save" });
              addGlowAnimation(document.getElementById("save_but"));
            }}
          >
            {props.isMounted ? t("save").toUpperCase() : ""}
          </div>
        </Tooltip>
      </div>
      <div className={s.local}>
        <div
          ref={enRef}
          onClick={() => {
            addGlowAnimation(document.getElementById("en_but"));
            handleLanguageChange("en");
          }}
          className={
            language === "en" ? s.selectedLanguage : s.unSelectedLanguage
          }
          id="en_but"
        >
          EN
        </div>
        <div
          ref={ukRef}
          onClick={() => {
            addGlowAnimation(document.getElementById("uk_but"));
            handleLanguageChange("uk");
          }}
          className={
            language === "uk" ? s.selectedLanguage : s.unSelectedLanguage
          }
          id="uk_but"
        >
          UK
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default withTranslation("header")(Header);
