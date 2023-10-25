"use client"
import styles from "./AdminImage.module.css";
import { CldImage } from 'next-cloudinary';
import { useState, useEffect, useContext, useRef } from "react";
import { AdminContext } from "@/app/COMPONENTS/CONTEXT/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faChevronLeft, faChevronRight, faX, faTrash, faSquarePlus, faSquareMinus, faFolder } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import CheckBox from "@/app/COMPONENTS/CHECKBOX/CheckBox";
import { TouchContext } from "@/app/COMPONENTS/CONTEXT/TouchContext";

export default function AdminImage({image, visibleImages,  openFullScreenMode, closeFullScreenMode, fullScreenState, handleNextImage, handlePrevImage, isAdminPage, handleCheckboxChange}) {
    const {images, fullScreenImageLoadedComplete, setFullScreenImageLoadedComplete, checkedCheckboxesToRemove, checkedCheckboxesToAddToAlbum, checkedCheckboxToRemoveFromAlbum, windowWidth, getSizeFromWidth  } = useContext(AdminContext);
    const [imageLoadedComplete, setImageLoadedComplete] = useState(false);
    const fullScreenImgRef = useRef(null);
    const fullScreenBlackContainerRef = useRef(null);
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

    //Checkbox functionality
    const handleCheckboxChangeToRemove = () => {
      handleCheckboxChange(!isCheckedToRemove, image.public_id, "remove")
    };

    const handleCheckboxChangeToAddToAlbum = () => {
      handleCheckboxChange(!isCheckedToAddToAlbum, image.public_id, "addToAlbum")
    }

    const handleCheckboxChangeToRemoveFromAlbum = ()=>{
      handleCheckboxChange(!isCheckedToRemoveFromAlbum, image.public_id, "removeFromAlbum")
    }

    const isCheckedToRemove = checkedCheckboxesToRemove.includes(image.public_id);
    const isCheckedToAddToAlbum = checkedCheckboxesToAddToAlbum.includes(image.public_id);
    const isCheckedToRemoveFromAlbum = checkedCheckboxToRemoveFromAlbum.includes(image.public_id);

    const removeCheckBoxLabel = <FontAwesomeIcon icon={isCheckedToRemove === true ? faX : faTrash} className={styles.checkboxIcon} />
    const addToAlbumCheckBoxLabel = <FontAwesomeIcon icon={isCheckedToAddToAlbum === true ? faX : faSquarePlus} className={styles.checkboxIcon} />
    const removeFromAlbumCheckboxLabel = <FontAwesomeIcon icon={isCheckedToRemoveFromAlbum === true ? faX : faSquareMinus} className={styles.checkboxIcon} />

   
    

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

    // Swipe functionality
    useEffect(()=>{
      if(fullScreenState.isOpen === true){
        handleSwipe(handlePrevImage, handleNextImage)
      }
    }, [touchEnd])



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

      <div className={styles.albumTag}>
        <FontAwesomeIcon icon={faFolder} className={styles.albumTagIcon} />
        <h2 className={styles.albumTagName}>/{image.folder ? image.folder : ""}</h2>
      </div>
     
      {imageLoadedComplete === false && <div className={styles.loadingDiv}>
        <FontAwesomeIcon icon={faImage} className={styles.loadingIcon} />
        <h1 className={styles.loadingText}>LOADING</h1>
      </div>}
      {isCheckedToRemove === true && <div className={styles.redFilter}></div>}
      {isCheckedToAddToAlbum === true && <div className={styles.greenFilter}></div>}
      {isCheckedToRemoveFromAlbum === true && <div className={styles.yellowFilter}></div>}
     
      {imageLoadedComplete === true && isAdminPage === true && <div className={styles.checkboxContainer}>
        {image.public_id.includes("/") ? <CheckBox label={removeFromAlbumCheckboxLabel} onChange={handleCheckboxChangeToRemoveFromAlbum} checked={isCheckedToRemoveFromAlbum} /> :
      <CheckBox label={addToAlbumCheckBoxLabel} onChange={handleCheckboxChangeToAddToAlbum} checked={isCheckedToAddToAlbum} />}
      <CheckBox label={removeCheckBoxLabel} onChange={handleCheckboxChangeToRemove} checked={isCheckedToRemove} /></div>}
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
      {fullScreenImageLoadedComplete === false && <>  <div className={styles.fullImageLoadingDiv}>
        <FontAwesomeIcon icon={faImage} className={styles.fullScreenLoadingIcon} />
      </div> </> }
      </div>



      <div className={styles.fullscreenNavigation}>
      <FontAwesomeIcon
      icon={faChevronLeft} className={styles.fullscreenNavIcon} onClick={handlePrevImage} />
      <FontAwesomeIcon
      icon={faChevronRight} className={styles.fullscreenNavIcon} onClick={handleNextImage} />
  </div>
  
  </>
      }
   
    </>

  )
}
