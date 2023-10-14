"use client"
import { useRef, useEffect, useState } from 'react';
import styles from './ImageContainer.module.css'
import Image from 'next/image'

export default function ImageContainer(img) {
  const [photoSpans, setPhotoSpans] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    const ratio = naturalHeight / naturalWidth;
    const galleryHeight = Math.ceil(250 * ratio);
    const spans = Math.ceil(galleryHeight / 10) + 1;
    setPhotoSpans(spans);
  }; 



  useEffect(() => {
    const handleWindowWidth = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowWidth)

    return () => {  
      window.removeEventListener('resize', handleWindowWidth)
    }

  },[])


console.log(img)


  return (
    <>
     <div className={styles.imgContainer}
    /*  style={{gridRow: `span ${photoSpans}`}} */
     >
    
      <Image  src={`${img.img.src}`}
        alt="gallery-img"
       /*  width={250}
        height={250} */
        fill={true}
      /*   style={{ height: "auto"}} */
        className={styles.containedImg}
        sizes="100vw"
        placeholder='blur'
        blurDataURL={`${img.img.blurredDataUrl}`}
     /*    onLoad={handleImageLoad} */
      />
    </div>


{/* <Image
    src={`/${img.img}`}
    alt="gallery-img"
    width={0}
    height={0}
    sizes="100vw"
    style={{width: "100%", height: "auto"}}
    className={styles.img}
    onLoad={handleImageLoad}
/> */}
    </>
       
  )
}
