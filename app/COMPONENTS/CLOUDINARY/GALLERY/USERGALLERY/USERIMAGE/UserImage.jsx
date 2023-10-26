"use client"
import styles from "./UserImage.module.css";
import { CldImage } from 'next-cloudinary';
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { AdminContext } from "@/app/COMPONENTS/CONTEXT/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { TouchContext } from "@/app/COMPONENTS/CONTEXT/TouchContext";
import {memo} from 'react';



export default function UserImage({image, visibleImages, openFullScreenMode, closeFullScreenMode, fullScreenState, handleNextImage, handlePrevImage}) {
  //Variables from the AdminContext
    const {images, fullScreenImageLoadedComplete, setFullScreenImageLoadedComplete, windowWidth, getSizeFromWidth } = useContext(AdminContext);

    //Image loading state
    const [imageLoadedComplete, setImageLoadedComplete] = useState(false);

    // Refs to handle full screen mode
    const fullScreenImgRef = useRef(null);
    const fullScreenBlackContainerRef = useRef(null);

    // Touch context to handle swipe functionality on mobile screens
    const { touchEnd, handleTouchStart, handleTouchEnd, handleSwipe} = useContext(TouchContext);


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


  
  const imageIndex = visibleImages.indexOf(image);

    useEffect(()=>{
      // Close full screen mode if user clicks outside of image
      const handleClickOutsideFullScreenImage = (e) => {
        if(fullScreenImgRef.current && !fullScreenImgRef.current.contains(e.target) && fullScreenBlackContainerRef.current.contains(e.target)){
          closeFullScreenMode();
        }
      }

      document.addEventListener("click", handleClickOutsideFullScreenImage);

      return () => document.removeEventListener("click", handleClickOutsideFullScreenImage);
    },[])


    useEffect(()=>{
      //recalculate row span when window width or images change
        setRowSpan(image);
    },[windowWidth, images, visibleImages])


    useEffect(()=>{
      if(fullScreenState.isOpen === true){
        handleSwipe(handlePrevImage, handleNextImage)
      }
    }, [touchEnd])

    
    const onFullscreenLoadingComplete = useCallback(() => {
      setFullScreenImageLoadedComplete(true);
    }, []);

  return (
    <>
    <div
 
    style={{ gridRow: `span ${photoSpans}`, width: `${getSizeFromWidth()}px` }}
    className={styles.imgContainer}>
        <CldImage
        onClick={() =>{openFullScreenMode(imageIndex)}}
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



  

    {fullScreenState.isOpen === true &&  <>
      <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    ref={fullScreenBlackContainerRef}
    className={styles.fullscreenContainer}>
      <Image
      ref={fullScreenImgRef}
      className={`${styles.fullScreenImg} ${fullScreenImageLoadedComplete === true && styles.showFullScreenImage}`}
      alt="full-screen-img"
      src={visibleImages[fullScreenState.currentIndex].url}
      width={0}
      height={0}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={true}
      onLoadingComplete={onFullscreenLoadingComplete}
      />
      {fullScreenImageLoadedComplete === false && <>  <div className={styles.fullImageLoadingDiv}>
        <FontAwesomeIcon icon={faImage} className={styles.fullScreenLoadingIcon} />
      </div> </> }
      </div>


  <FontAwesomeIcon
      icon={faChevronLeft} className={`${styles.fullscreenNavIcon} ${styles.leftArrow}`} onClick={handlePrevImage} />
      <FontAwesomeIcon
      icon={faChevronRight} className={`${styles.fullscreenNavIcon} ${styles.rightArrow}`} onClick={handleNextImage} />
  
  </>
      }
   
    </>

  )
}
