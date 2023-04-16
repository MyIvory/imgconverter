import s from "../styles/headerModule/headerModule.module.css"
import { withTranslation } from 'next-i18next'
//import i18n from '../i18n'
import { useEffect, useState } from 'react'

const Header = ({ t, handleUpload, display, i18n }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [language, setLanguage] = useState('en');

    const handleLanguageChange = (lang) => {
        setLanguage(lang); 
        console.log(language)// Обновляем язык при клике
        i18n.changeLanguage(lang);
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className={s.main}>
            <div className={s.user}>{isMounted ? t('user') : ''} </div>
            <div className={s.tools}>
                <div className={s.read_button} id="read_button" onClick={handleUpload}>Read</div>
                <div className={s.counter}>{display}</div>
                <div className={s.save_button}>Save</div>
            </div>
            <div className={s.local}>
                <div
                    onClick={() => handleLanguageChange('en')}
                    className={language === 'en' ? s.selectedLanguage : ''}
                >
                    EN
                </div>
                <div
                    onClick={() => handleLanguageChange('uk')}
                    className={language === 'uk' ? s.selectedLanguage : ''}
                >
                    UK
                </div>
            </div>
        </div>
    )
}
Header.getInitialProps = async () => ({
    namespacesRequired: [],
});
export default withTranslation()(Header);