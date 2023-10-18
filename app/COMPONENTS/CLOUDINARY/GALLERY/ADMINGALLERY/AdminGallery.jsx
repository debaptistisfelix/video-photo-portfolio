"use client"
import styles from './AdminGallery.module.css';
import UploadBtn from '../../UPLOADBUTTON/UploadBtn';
import { CldImage } from 'next-cloudinary';
import ImageContainer from '../../IMGCONTAINER/ImageContainer';
import { useState, useEffect, useContext } from "react";
import { AdminContext } from '@/app/COMPONENTS/CONTEXT/AdminContext';
import Loader from '@/app/COMPONENTS/LOADER/Loader';
import { usePathname } from 'next/navigation';
import RemoveBtn from '../../REMOVEBTN/RemoveBtn';

export default function AdminGallery(results) {
  const [windowWidth, setWindowWidth] = useState(null);
  const {images, setImages, setFullScreenImageLoadedComplete, checkedCheckboxes, setCheckedCheckboxes, isRemovingImages, setIsRemovingImages} = useContext(AdminContext);
  const [visibleImages, setVisibleImages] = useState([]);
  const imagesPerPage = 30;
  const [currentLength, setCurrentLength] = useState(null);
  const [fullScreenState, setFullScreenState] = useState({
    isOpen: false,
    currentIndex: null
  });
  const [fetchDataStates, setFetchDataStates] = useState({
    success: false,
    loading: true,
    error:false
  })
  const pathname = usePathname();



  const fetchImages = async () => {
    try {
      setFetchDataStates({
        success: false,
        loading: true,
        error:false
      })
      const response = await fetch('/api/getImages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
          cache: "no-store"
      });
      if(!response.ok){
        setFetchDataStates({
          success: false,
          loading: false,
          error:true
        })
      }
      const data = await response.json();
      setImages(data);
      setFetchDataStates({
        success: true,
        loading: false,
        error:false
      })
    } catch (error) {
      console.log(error)
      setFetchDataStates({
        success: false,
        loading: false,
        error:true
      })
    }
  }


    useEffect(()=>{
        const handleWindowResize = () => setWindowWidth(window.innerWidth);

        handleWindowResize();

       const handleImageLoad = () => {
        if(images === null){
          fetchImages();
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


   const openFullScreenMode = (imageIndex) =>{
    setIsRemovingImages(false);
    setFullScreenImageLoadedComplete(false);
      setFullScreenState({
        isOpen: true,
        currentIndex: imageIndex
      })
   }

   const closeFullScreenMode = () =>{
    setFullScreenImageLoadedComplete(false);
    setFullScreenState({
   
      isOpen: false,
      currentIndex: null
    })
   }


  const handleNextImage = () => {
    setFullScreenImageLoadedComplete(false);
    if(fullScreenState.currentIndex === visibleImages.length - 1){
      setFullScreenState((prevState)=>{
        return {
          ...prevState,
          currentIndex: 0
        }
      })
    } else {
      const nextImageIndex = fullScreenState.currentIndex + 1;
      setFullScreenState((prevState)=>{
        return {
          ...prevState,
          currentIndex: nextImageIndex
        }
      })
    }
  }

  const handlePrevImage = () => {
    setFullScreenImageLoadedComplete(false);
    if(fullScreenState.currentIndex === 0){
      setFullScreenState((prevState)=>{
        return {
          ...prevState,
          currentIndex: visibleImages.length - 1
    }
  })
    } else {
      const prevImageIndex = fullScreenState.currentIndex - 1;
      setFullScreenState((prevState)=>{
        return {
          ...prevState,
          currentIndex: prevImageIndex
        }
      })
    }
  }


  const handleCheckboxChange = (isChecked, imageId) => {
    if (isChecked) {
      setCheckedCheckboxes((prevCheckeds) =>{
        return [...prevCheckeds, imageId]
      });
    } else {
      setCheckedCheckboxes((prevCheckeds) =>{
        return prevCheckeds.filter((prevChecked) => prevChecked !== imageId);
      });
    }
  };



  console.log(checkedCheckboxes)

  return (
    <>
    <section className={styles.categorySection}>

<div className={styles.categoryNav}>
<h1 className={styles.bannerTitle}>GALLERIA FOTO</h1>
<div className={styles.btnContainer}>
 {checkedCheckboxes && checkedCheckboxes.length !== 0 && <RemoveBtn />}
<UploadBtn />
</div>
</div>

<div className={styles.imagesGallery}
style={{gridTemplateColumns: `repeat(auto-fit, minmax(${getSizeFromWidth()}px, 1fr))`}}
>
  {windowWidth !== null && images !== null && visibleImages.map((image, index) => {
    return <ImageContainer key={index} image={image} visibleImages={visibleImages} windowWidth={windowWidth} getSizeFromWidth={getSizeFromWidth} openFullScreenMode={openFullScreenMode} closeFullScreenMode={closeFullScreenMode} fullScreenState={fullScreenState}
    handleNextImage={handleNextImage} handlePrevImage={handlePrevImage} isAdminPage={pathname === "/admin"}  onCheckboxChange={handleCheckboxChange} checkedCheckboxes={checkedCheckboxes} />
  })}
</div>

{fetchDataStates.loading === true && <div className={styles.loaderContainer}>
<Loader />
<h1 className={styles.fetchLoading}>Loading</h1>
</div>}

{fetchDataStates.error === true && <h1 className={styles.fetchError}>Errore nella richiesta al server.</h1>}
{
  images !== null && visibleImages.length < images.length &&
  <button className={styles.loadMoreBtn} onClick={handleLoadMore}>LOAD MORE</button>
}
</section>
{
  isRemovingImages === true && <section className={styles.modal}>
  <p className={styles.removeParag}>Eliminare queste immagini da Cloudinary?</p>
  <div className={styles.removeBtnContainer}>
    <div onClick={()=>{setIsRemovingImages(false)}} className={styles.cancelBtn}>Annulla</div>
    <div className={styles.confirmBtn}>Conferma</div>
  </div>
</section>
}
</>
  )
}
