import '@/styles/globals.css'
import 'antd/dist/antd';
import i18n from '../i18n'
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';


function App({ Component, pageProps }) {
  const { locale } = useRouter();
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);