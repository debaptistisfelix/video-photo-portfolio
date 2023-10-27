"use client"
import styles from "./UserImage.module.css";
import { CldImage } from 'next-cloudinary';
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { AdminContext } from "@/app/COMPONENTS/CONTEXT/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";




export default function UserImage({onClick,image, visibleImages, }) {
  //Variables from the AdminContext
    const {images, windowWidth, getSizeFromWidth } = useContext(AdminContext);

    //Image loading state
    const [imageLoadedComplete, setImageLoadedComplete] = useState(false);


  //Image resize functionality
    const [photoSpans, setPhotoSpans] = useState(250);

  //Function that sets how may rows the image will span based on the image height and width
  const setRowSpan = (image) => {
      const imageWidth = getSizeFromWidth();
       const aspectRatio = image.height / image.width;
       const galleryHeight = Math.ceil(imageWidth * aspectRatio);
       const photoSpans = Math.ceil(galleryHeight / 10) + 1
       setPhotoSpans(photoSpans);
   }



    useEffect(()=>{
      //recalculate row span when window width or images change
        setRowSpan(image);
    },[windowWidth, images, visibleImages])


  return (
    <div
    style={{ gridRow: `span ${photoSpans}`, width: `${getSizeFromWidth()}px` }}
    className={styles.imgContainer}>
        <CldImage
       onClick={onClick}
        className={`${styles.image} ${imageLoadedComplete === true && styles.showImage}`}
        width={image.width}
        height={image.height}
        src={image.public_id}
        loading="lazy"
        sizes="250px"
        onLoadingComplete={()=>setImageLoadedComplete(true)}
        alt="Description of my image"
      />
     
      {imageLoadedComplete === false && <div className={styles.loadingDiv}>
        <FontAwesomeIcon icon={faImage} className={styles.loadingIcon} />
        <h1 className={styles.loadingText}>LOADING</h1>
      </div>}
    </div>
  )
}
