"use client"
import styles from './page.module.css'
import Layout from '@/app/COMPONENTS/LAYOUT/Layout'
import { CldUploadButton } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
 import { useState } from 'react';
 import Navbar from '@/app/COMPONENTS/NAVBAR/Navbar';
 import Image from 'next/image';



export default function Page() {
  const [imgId, setImgId] = useState(null);
  return (
    <main className={styles.main}>
      <Navbar />
      <Image src="/paris.jpg" alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
        style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw" />
      <section className={styles.content}>
       <CldUploadButton 

        onUploadAdded={(result) =>{
          setImgId(result.info.public_id);
        }}
        uploadPreset="testing" />
        {imgId && <CldImage
          width="400"
          height="300"
          src={imgId}
          sizes="100vw"
          alt="Description of my image"
          />}
        </section>
    </main>
  )
}
