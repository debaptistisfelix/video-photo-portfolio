"use client"
import styles from './AdminGallery.module.css';
import UploadBtn from '../../UPLOADBUTTON/UploadBtn';
import { CldImage } from 'next-cloudinary';
import ImageContainer from '../../IMGCONTAINER/ImageContainer';
import { useState } from "react";
import { useEffect } from "react";

export default function AdminGallery(results) {
  const [windowWidth, setWindowWidth] = useState(null);

    useEffect(()=>{
        const handleWindowResize = () => setWindowWidth(window.innerWidth);

        handleWindowResize();

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    },[])


    const getSizeFromWidth = () => {
        if(windowWidth <= 500){
            return "100";
        } else if(windowWidth > 500 && windowWidth <= 800){
            return "150";
        } else if(windowWidth > 800){
            return "250";
        }
    }



  return (
    <section className={styles.categorySection}>

    <div className={styles.categoryNav}>
    <h1 className={styles.bannerTitle}>GALLERIA FOTO</h1>
    <UploadBtn />
    </div>

    <div className={styles.imagesGallery}
    style={{gridTemplateColumns: `repeat(auto-fit, minmax(${getSizeFromWidth()}px, 1fr))`}}
    >
      {windowWidth !== null && results.results.map((image, index) => {
        return <ImageContainer key={index} image={image} windowWidth={windowWidth} getSizeFromWidth={getSizeFromWidth} />
      })}
    </div>
  </section>
  )
}
