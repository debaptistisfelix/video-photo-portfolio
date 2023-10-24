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
import notify from '@/lib/toastNotify';
import Modal from '@/app/COMPONENTS/MODAL/Modal';
import FullscreenLoader from '@/app/COMPONENTS/FULLSCREENLOADER/FullscreenLoader';
import AdminImage from './ADMINIMAGE/AdminImage';
import AddToAlbumBtn from '@/app/COMPONENTS/ADDTOALBUMBTN/AddToAlbumBtn';
import AddToAlbumModal from '@/app/COMPONENTS/ADDTOALBUMMODAL/AddToAlbumModal';
import RemoveFromAlbumBtn from '@/app/COMPONENTS/REMOVEFROMALBUMBTN/RemoveFromAlbumBtn';


export default function AdminGallery(results) {
  const [windowWidth, setWindowWidth] = useState(null);
  const {images, setImages, setFullScreenImageLoadedComplete, checkedCheckboxesToRemove, setCheckedCheckboxesToRemove, isRemovingImages, setIsRemovingImages,  checkedCheckboxesToAddToAlbum, setCheckedCheckboxesToAddToAlbum, modalToAddToAlbumIsOpen, checkedCheckboxToRemoveFromAlbum, setCheckedCheckboxToRemoveFromAlbum, modalToRemoveFromAlbumIsOpen, setModalToRemoveFromAlbumIsOpen,} = useContext(AdminContext);
  const [visibleImages, setVisibleImages] = useState(null);
  const imagesPerPage = 30;
  const [currentLength, setCurrentLength] = useState(null);
  const [fullScreenState, setFullScreenState] = useState({
    isOpen: false,
    currentIndex: null
  });
  const [fetchDataStates, setFetchDataStates] = useState({
    success: false,
    loading: false,
    error:false
  })
  const [removingLoadingState, setRemovingLoadingState] = useState({
    success: false,
    loading: false,
  });

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
      if(Array.isArray(data)){
        setImages(data);
      setFetchDataStates({
        success: true,
        loading: false,
        error:false
      })
      } else {
        setImages(null)
        setFetchDataStates({
          success: false,
          loading: false,
          error:true
        })
      }
    } catch (error) {
      console.log(error)
      setFetchDataStates({
        success: false,
        loading: false,
        error:true
      })
    }
  }



  const removeImages = async () => {
    setIsRemovingImages(false);
    setRemovingLoadingState({
      loading: true,
      success: false,
    })
    try {
      const response = await fetch('/api/removeImages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imagesPublicIds: checkedCheckboxesToRemove
        })
      })
      if(!response.ok){
        console.log("Error while removing images")
        setRemovingLoadingState({
          loading: false,
          success: false,
        })
        setCheckedCheckboxesToRemove([]);
        notify("Errore durante l'eliminazione delle immagini", "error")
      } else {
        const data = await response.json();
      console.log(data)
      setCheckedCheckboxesToRemove([]);
      setImages((prevImages =>{
        return prevImages.filter((prevImage) => !checkedCheckboxesToRemove.includes(prevImage.public_id))
      }))
      setRemovingLoadingState({
        loading: false,
        success: true,
   
      })
      notify("Immagini eliminate con successo", "success")
      }
    } catch (error) {
      console.log(error)
      setRemovingLoadingState({
        loading: false,
        success: false,
      })
      setCheckedCheckboxesToRemove([]);
      notify("Errore durante l'eliminazione delle immagini", "error")
    }
  }


const removeImagesFromAlbum = async () => {
    try{
      const response = await fetch("/api/removeFromExistingAlbum", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          imagesToRemoveFromAlbum: checkedCheckboxToRemoveFromAlbum
        })
      })
        const data = await response.json();
        console.log(data)
         const filteredImages = images.filter((prevImage) => !checkedCheckboxToRemoveFromAlbum.includes(prevImage.public_id))
        const updatedImages = [...data,...filteredImages];
        setImages(updatedImages);
        setModalToRemoveFromAlbumIsOpen(false);
        setCheckedCheckboxToRemoveFromAlbum([]);
        notify("Immagini rimosse dall'album con successo", "success")
    }
    catch(error){
      console.log(error)
      notify("Errore durante la rimozione dall'album", "error")
    }
}

    useEffect(()=>{
        const handleWindowResize = () => setWindowWidth(window.innerWidth);

        handleWindowResize();

    fetchImages();

      

        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    },[])



    const getSizeFromWidth = () => {
      if(windowWidth <= 500){
          return "150";
      } else if(windowWidth > 500 && windowWidth <= 800){
          return "150";
      } else if(windowWidth > 800){
          return "250";
      }
  }

    useEffect(()=>{
      getSizeFromWidth();
  },[windowWidth, images])


    useEffect(()=>{
      if(images !== null && Array.isArray(images)){
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


  const handleCheckboxChangeToRemove = (isChecked, imageId) => {
    //Add to the array of images to delete
    if (isChecked) {
      setCheckedCheckboxesToRemove((prevCheckeds) =>{
        return [...prevCheckeds, imageId]
      });
      //Empty the array of images to add to album so you focus on deleteing images
      setCheckedCheckboxesToAddToAlbum([])
      setCheckedCheckboxToRemoveFromAlbum([])
    } else {
      //Remove from array of images to delete
      setCheckedCheckboxesToRemove((prevCheckeds) =>{
        return prevCheckeds.filter((prevChecked) => prevChecked !== imageId);
      });
    }
  };

  const handleCheckboxChangeToAddToAlbum = (isChecked, imageId) => {
    if (isChecked) {
      // Add to array of images to add to an album
      setCheckedCheckboxesToAddToAlbum((prevCheckeds) =>{
        return [...prevCheckeds, imageId]
      });
      // empty the array of images to delete so you focus on adding images to album
      setCheckedCheckboxesToRemove([])
      setCheckedCheckboxToRemoveFromAlbum([])
    } else {
      //Remove from the array of images to add to album
      setCheckedCheckboxesToAddToAlbum((prevCheckeds) =>{
        return prevCheckeds.filter((prevChecked) => prevChecked !== imageId);
      });
    }
  }

  const handleCheckboxChangeToRemoveFromAlbum = (isChecked, imageId) => {
    if(isChecked){
      setCheckedCheckboxToRemoveFromAlbum((prevCheckeds) =>{
        return [...prevCheckeds, imageId]
      })
      setCheckedCheckboxesToRemove([])
      setCheckedCheckboxesToAddToAlbum([])
    } else {
      setCheckedCheckboxToRemoveFromAlbum((prevCheckeds) =>{
        return prevCheckeds.filter((prevChecked) => prevChecked !== imageId);
      });

    }
  }

console.log(images)


  return (
    <>
    <section className={styles.categorySection}>

      <div className={styles.categoryNav}>
      <h1 className={styles.bannerTitle}>GALLERIA FOTO <b className={styles.fotoCount}>({Array.isArray(images) ? images?.length : "0"} file)</b></h1>
      <div className={styles.btnContainer}>
      {checkedCheckboxToRemoveFromAlbum && checkedCheckboxToRemoveFromAlbum.length !== 0 && <RemoveFromAlbumBtn />}
      {checkedCheckboxesToRemove && checkedCheckboxesToRemove.length !== 0 && <RemoveBtn />}
      {checkedCheckboxesToAddToAlbum && checkedCheckboxesToAddToAlbum.length !== 0 && <AddToAlbumBtn />}
      <UploadBtn />
      </div>
      </div>

      <div className={styles.imagesGallery}
      style={{gridTemplateColumns: `repeat(auto-fit, minmax(${getSizeFromWidth()}px, 1fr))`}}
      >
      {windowWidth !== null && images !== null && visibleImages !== null && visibleImages.map((image, index) => {
        return <AdminImage key={index} image={image} visibleImages={visibleImages} windowWidth={windowWidth} getSizeFromWidth={getSizeFromWidth} openFullScreenMode={openFullScreenMode} closeFullScreenMode={closeFullScreenMode} fullScreenState={fullScreenState}
        handleNextImage={handleNextImage} handlePrevImage={handlePrevImage} isAdminPage={pathname === "/admin"}  onCheckboxChangeToRemove={handleCheckboxChangeToRemove} onCheckboxChangeToAddToAlbum={handleCheckboxChangeToAddToAlbum}  onCheckboxChangeToReoveFromAlbum={handleCheckboxChangeToRemoveFromAlbum}  />
      })}
      </div>

      {fetchDataStates.loading === true && <div className={styles.loaderContainer}>
      <Loader color="#ffffff" />
      <h1 className={styles.fetchLoading}>Loading</h1>
      </div>}

      {fetchDataStates.error === true && visibleImages === null &&  <h1 className={styles.fetchError}>Errore nella richiesta al server.</h1>}
      {
        images !== null && visibleImages !== null && visibleImages.length < images.length &&
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>LOAD MORE</button>
      }
      </section>
      {
        isRemovingImages === true && <Modal parag={`Eliminare ${checkedCheckboxesToRemove?.length} ${checkedCheckboxesToRemove?.length > 1 ? "immagini" : "immagine"}?`} btn1Text="Annulla" btn2Text="Conferma" btn1Func={()=>{setIsRemovingImages(false)}} btn2Func={removeImages} />
      }
      {modalToRemoveFromAlbumIsOpen == true && <Modal parag={`Rimuovere ${checkedCheckboxToRemoveFromAlbum?.length} ${checkedCheckboxToRemoveFromAlbum?.length > 1 ? "immagini" : "immagine"} dall'album?`} btn1Text="Annulla" btn2Text="Conferma" btn1Func={()=>{setModalToRemoveFromAlbumIsOpen(false)}} btn2Func={removeImagesFromAlbum} />}
      {modalToAddToAlbumIsOpen == true && <AddToAlbumModal  />}
      {
        removingLoadingState.loading === true && <FullscreenLoader />
      }
      </>
      )
    }
