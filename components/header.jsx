import s from "../styles/headerModule/headerModule.module.css"
import { withTranslation } from 'next-i18next'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from "next/router"
import Link from "next/link"

const Header = ({ t, handleUpload, display, i18n }) => {
    const [isMounted, setIsMounted] = useState(false);
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
      }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        push('/', undefined, { locale: lang })
        i18n.changeLanguage(lang);
        ukRef.current.classList.remove();
        enRef.current.classList.remove();
    };
  

    return (
        <div className={s.main}>
            <div className={s.user}>{isMounted ? t('user') : ''} </div>
            <div className={s.tools}>
                <div className={s.read_button} id="read_button" onClick={handleUpload}>Read</div>
                <div className={s.counter}>{display}</div>
                <div className={s.save_button}>Save</div>
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