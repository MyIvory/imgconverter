import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ImgLoader from '@/components/uploadForm'
import ResultList from '@/components/resultList'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [contentItem, setContentItem] = useState(null)
  function getContentItem(item){
    setContentItem(item)
  }
  return (
    <div className='content'>
      <ImgLoader getContentItem = {getContentItem} />
      <ResultList contentItem = {contentItem} getContentItem = {getContentItem}/>
    </div>
  )
}
