"use client"
import styles from './AdminContent.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilm, faImage} from '@fortawesome/free-solid-svg-icons';
import AdminGallery from '../GALLERY/ADMINGALLERY/AdminGallery';

export default function AdminContent({results}) {
    const [category, setCategory] = useState("foto");

    const handleCategoryChange = (categ) => {
       setCategory(categ);
    }


  return (
    <section className={styles.content}>
       <div className={styles.nav}>
        <h1 className={styles.adminTitle}>ADMIN</h1>
       <div className={styles.btnContainer}>
       <div onClick={()=>{handleCategoryChange("foto")}} className={styles.btn}>
            <FontAwesomeIcon icon={faImage} className={styles.icon} />
            <h2 className={styles.categTitle}>Foto</h2>
        </div>
        <div onClick={()=>{handleCategoryChange("video")}} className={styles.btn}>
            <FontAwesomeIcon icon={faFilm} className={styles.icon} />
            <h2 className={styles.categTitle}>Video</h2>
        </div>
       </div>
        </div>  
      {category === "foto" ? <AdminGallery results={results} />
     : <section className={styles.categorySection}>
         <h1>VIDEO</h1>
         </section>}
        </section>
  )
}
