import s from "../styles/headerModule/headerModule.module.css"
import { withTranslation } from 'next-i18next'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from "next/router"
import Link from "next/link"
import { Tooltip } from "antd"

const Header = ({ t,i18n,...props}) => {
    const [language, setLanguage] = useState('en');
    const { locale, locales, push } = useRouter()
    const enRef = useRef(null);
    const ukRef = useRef(null);
    useEffect(() => {
        if (locale === 'en') {
          enRef.current.classList.add(s.selectedLanguage);
          ukRef.current.classList.remove(s.selectedLanguage);
          ukRef.current.classList.add(s.unSelectedLanguage);
        } else if (locale === 'uk') {
          ukRef.current.classList.add(s.selectedLanguage);
          enRef.current.classList.remove(s.selectedLanguage);
          enRef.current.classList.add(s.unSelectedLanguage);
        }
      }, [locale]);


    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        push('/', undefined, { locale: lang })
        i18n.changeLanguage(lang);
        ukRef.current.classList.remove();
        enRef.current.classList.remove();
    };
  

    return (
        <div className={s.main}>
           <Tooltip title={props.isMounted ? t('tooltips.profile') : ''}> <div className={s.user}>{props.isMounted ? t('profile').toUpperCase() : ''} </div></Tooltip>
            <div className={s.tools}>
            <Tooltip title={props.isMounted ? t('tooltips.ocr') : ''}> <div className={s.read_button} id="read_button" onClick={props.handleUpload}>{props.isMounted ? t('ocr').toUpperCase() : ''}</div></Tooltip>
            <Tooltip title={props.isMounted ? props.isTimer? t('tooltips.timer'):t('tooltips.counter') : ''}><div className={s.counter}>{props.display}</div></Tooltip> 
            <Tooltip title={props.isMounted ? t('tooltips.save') : ''}><div className={s.save_button}>{props.isMounted ? t('save').toUpperCase() : ''}</div></Tooltip>
            </div>
            <div className={s.local}>
                <div ref={enRef}
                    onClick={() => handleLanguageChange('en')}
                    className={language === 'en' ? s.selectedLanguage : s.unSelectedLanguage}
                >
                    EN
                </div>
                <div
                    ref={ukRef}
                    onClick={() => handleLanguageChange('uk')}
                    className={language === 'uk' ? s.selectedLanguage : s.unSelectedLanguage}
                >
                    UK
                </div>
            </div>
        </div>
    )
}

export default withTranslation('header')(Header);