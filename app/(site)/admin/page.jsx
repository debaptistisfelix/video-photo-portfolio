"use client"
import styles from './page.module.css'
import Layout from '@/app/COMPONENTS/LAYOUT/Layout'
import { CldUploadButton } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
 import { useState } from 'react';
 import Navbar from '@/app/COMPONENTS/NAVBAR/Navbar';
 import Image from 'next/image';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faFilm, faImage, faSquarePlus } from '@fortawesome/free-solid-svg-icons';



export default function Page() {
    const [category, setCategory] = useState("foto");

    const handleCategoryChange = (categ) => {
       setCategory(categ);
    }
  return (
    <main className={styles.main}>
      <Navbar />
      <Image src="/paris.jpg" alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
        style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw" />
      <section className={styles.content}>
       <div className={styles.nav}>
        <div onClick={()=>{handleCategoryChange("foto")}} className={styles.btn}>
            <FontAwesomeIcon icon={faImage} className={styles.icon} />
            <h2 className={styles.categTitle}>Foto</h2>
        </div>
        <div onClick={()=>{handleCategoryChange("video")}} className={styles.btn}>
            <FontAwesomeIcon icon={faFilm} className={styles.icon} />
            <h2 className={styles.categTitle}>Video</h2>
        </div>
        </div>  
      {category === "foto" ? <section className={styles.categorySection}>
        <div className={styles.categoryNav}>
        <h1 className={styles.bannerTitle}>GALLERIA FOTO</h1>
        <CldUploadButton className={styles.uploadCloudinaryBtn} />
        </div>
      </section>
     : <section className={styles.categorySection}>
         <h1>VIDEO</h1>
         </section>}
        </section>
    </main>
  )
}
