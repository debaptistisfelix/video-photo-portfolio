"use client"
import styles from "./ImageContainer.module.css";
import { CldImage } from 'next-cloudinary';
import { useState, useEffect, useContext, useRef } from "react";
import { AdminContext } from "../../CONTEXT/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

export default function ImageContainer({image, visibleImages, windowWidth, getSizeFromWidth, openFullScreenMode, closeFullScreenMode, fullScreenState, handleNextImage, handlePrevImage}) {
    const [photoSpans, setPhotoSpans] = useState(250);
    const {images, fullScreenImageLoadedComplete, setFullScreenImageLoadedComplete} = useContext(AdminContext);
    const [imageLoadedComplete, setImageLoadedComplete] = useState(false);
   /*  const [fullScreenImageLoadedComplete, setFullScreenImageLoadedComplete] = useState(false); */
  const fullScreenImgRef = useRef(null);
  const fullScreenBlackContainerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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


    const setRowSpan = () => {
       const imageWidth = getSizeFromWidth();
        const aspectRatio = image.height / image.width;
        const galleryHeight = Math.ceil(imageWidth * aspectRatio);
        const photoSpans = Math.ceil(galleryHeight / 10) + 1
        setPhotoSpans(photoSpans);
    }

    useEffect(()=>{
      //recalculate row span when window width or images change
        setRowSpan();
    },[windowWidth, images, visibleImages])

    const handleTouchStart = (event) => {
      setTouchStart({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
    };
  
    const handleTouchEnd = (event) => {
      setTouchEnd({
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      });
      
    };

    const handleSwipe = () => {
      if (touchStart && touchEnd) {
        const deltaX = touchEnd.x - touchStart.x;
        const deltaY = touchEnd.y - touchStart.y;
  
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 0) {
              // Handle swipe right event
             handlePrevImage()
            } else {
              // Handle swipe left event
             handleNextImage()
            }
        
        }
  
        setTouchStart(null);
        setTouchEnd(null);
      }
    };

    useEffect(()=>{
      if(fullScreenState.isOpen === true){
        handleSwipe()
      }
    }, [touchEnd])

console.log(fullScreenImageLoadedComplete)

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
      className={styles.fullScreenImg}
      alt="full-screen-img"
      src={visibleImages[fullScreenState.currentIndex].url}
      width={0}
      height={0}
      sizes="100vw"
      priority={true}
      onLoadingComplete={()=>setFullScreenImageLoadedComplete(true)}
      />
      {fullScreenImageLoadedComplete === false && <div className={styles.fullImageLoadingDiv}>
        <FontAwesomeIcon icon={faImage} className={styles.fullScreenLoadingIcon} />
        <h1 className={styles.fullScreenLoadingText}>LOADING</h1>
      </div>}
      </div>
      <div className={styles.fullscreenNavigation}>
      <FontAwesomeIcon
      icon={faChevronLeft} className={styles.fullscreenNavIcon} onClick={handlePrevImage} />
      <FontAwesomeIcon
      icon={faChevronRight} className={styles.fullscreenNavIcon} onClick={handleNextImage} />
  </div></>
      }
   
    </>

  )
}
