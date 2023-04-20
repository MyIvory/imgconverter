import '@/styles/globals.css'
import 'antd/dist/antd';
import i18n from '../i18n'
import { withTranslation } from 'next-i18next'
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }) {
  return <>
  <Component {...pageProps} />
  
<Analytics/>
  </>
}

export default withTranslation()(App)
