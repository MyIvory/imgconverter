import '@/styles/globals.css'
import 'antd/dist/antd';
//import '../styles.css';
import i18n from '../i18n'
import { withTranslation } from 'next-i18next'


function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withTranslation()(App)