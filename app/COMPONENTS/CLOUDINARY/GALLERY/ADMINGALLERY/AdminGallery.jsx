"use client"
import styles from './AdminGallery.module.css';
import UploadBtn from '../../UPLOADBUTTON/UploadBtn';
import { CldImage } from 'next-cloudinary';
import ImageContainer from '../../IMGCONTAINER/ImageContainer';
import { useState, useEffect, useContext } from "react";
import { AdminContext } from '@/app/COMPONENTS/CONTEXT/AdminContext';


export default function AdminGallery(results) {
  const [windowWidth, setWindowWidth] = useState(null);
  const {images, setImages} = useContext(AdminContext);
  const [visibleImages, setVisibleImages] = useState([]);
  const imagesPerPage = 30;
  const [currentLength, setCurrentLength] = useState(null);
  const [fullScreenState, setFullScreenState] = useState({
    isOpen: false,
    currentIndex: null
  });


    useEffect(()=>{
        const handleWindowResize = () => setWindowWidth(window.innerWidth);

        handleWindowResize();

       const handleImageLoad = () => {
        if(images === null){
          setImages(results.results);
        } else {
          return;
        }
       }

       handleImageLoad();



        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    },[])

    useEffect(()=>{
      getSizeFromWidth();
  },[windowWidth, images])


    useEffect(()=>{
      if(images !== null){
        if(currentLength === null){
          setVisibleImages(images.slice(0, imagesPerPage));
        } else {
          const moreImages = images.slice(currentLength, currentLength + imagesPerPage);
          const oldImages = images.slice(0, currentLength);
          setVisibleImages([...oldImages, ...moreImages]);
        }
      }
    },[images])

 

    const handleLoadMore = () => {
      const currentLengthIndex = visibleImages.length;
      setCurrentLength(currentLengthIndex);
      const moreImages = images.slice(currentLengthIndex, currentLengthIndex + imagesPerPage);
      setVisibleImages([...visibleImages, ...moreImages]);
    }

    const getSizeFromWidth = () => {
        if(windowWidth <= 500){
            return "100";
        } else if(windowWidth > 500 && windowWidth <= 800){
            return "150";
        } else if(windowWidth > 800){
            return "250";
        }
    }


   const openFullScreenMode = (image) =>{const imageIndex = visibleImages.indexOf(image);
      setFullScreenState({
    
        isOpen: true,
        currentIndex: imageIndex
      })
   }

   const closeFullScreenMode = () =>{
    setFullScreenState({
   
      isOpen: false,
      currentIndex: null
    })
   }


  const handleNextImage = () => {
    if(fullScreenState.currentIndex === visibleImages.length - 1){
      setFullScreenState({
        isOpen: true,
        currentIndex: 0
      })
    } else {
      const nextImageIndex = fullScreenState.currentIndex + 1;
      setFullScreenState({
        isOpen: true,
        currentIndex: nextImageIndex
      })
    }
  }

  const handlePrevImage = () => {
    if(fullScreenState.currentIndex === 0){
      setFullScreenState({
        isOpen: true,
        currentIndex: visibleImages.length - 1
      })
    } else {
      const prevImageIndex = fullScreenState.currentIndex - 1;
      setFullScreenState({
        isOpen: true,
        currentIndex: prevImageIndex
      })
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
      {windowWidth !== null && images !== null && visibleImages.map((image, index) => {
        return <ImageContainer key={index} image={image} visibleImages={visibleImages} windowWidth={windowWidth} getSizeFromWidth={getSizeFromWidth} openFullScreenMode={openFullScreenMode} closeFullScreenMode={closeFullScreenMode} fullScreenState={fullScreenState}
        handleNextImage={handleNextImage} handlePrevImage={handlePrevImage} />
      })}
    </div>

    {
      images !== null && visibleImages.length < images.length &&
      <button className={styles.loadMoreBtn} onClick={handleLoadMore}>LOAD MORE</button>
    }
  </section>
  )
}
