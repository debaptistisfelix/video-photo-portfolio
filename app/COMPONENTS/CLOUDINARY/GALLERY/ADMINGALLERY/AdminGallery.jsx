"use client"
import styles from './AdminGallery.module.css';
import { useState, useEffect, useContext, useCallback } from "react";
import { AdminContext } from '@/app/COMPONENTS/CONTEXT/AdminContext';
import { usePathname } from 'next/navigation';
import notify from '@/lib/toastNotify';

import AdminGalleryNav from './ADMINGALLERYNAV/AdminGalleryNav';
import AlbumsFilterContainer from './ALBUMSFILTERCONTAINER/AlbumsFilterContainer';


//Loader components
import Loader from '@/app/COMPONENTS/LOADER/Loader';
import FullscreenLoader from '@/app/COMPONENTS/FULLSCREENLOADER/FullscreenLoader';

import AdminImage from './ADMINIMAGE/AdminImage';
 //Modals
import Modal from '@/app/COMPONENTS/MODAL/Modal';
import AddToAlbumModal from '@/app/COMPONENTS/ADDTOALBUMMODAL/AddToAlbumModal';




export default function AdminGallery(results) {
 

  const {images,
        setImages,
        setFullScreenImageLoadedComplete,
        checkedCheckboxesToRemove,
        setCheckedCheckboxesToRemove,
        modalToRemoveImagesIsOpen,
        setModalToRemoveImagesIsOpen,
        checkedCheckboxesToAddToAlbum,
        setCheckedCheckboxesToAddToAlbum,
        modalToAddToAlbumIsOpen,
        checkedCheckboxToRemoveFromAlbum,
        setCheckedCheckboxToRemoveFromAlbum,
        modalToRemoveFromAlbumIsOpen,
        setModalToRemoveFromAlbumIsOpen,
        fullscreenLoadingState,
        setFullscreenLoadingState,
        galleryLoadingState,
        setGalleryLoadingState,
        albums, setAlbums,
        displayedAlbum, setDisplayedAlbum,
        windowWidth, handleWindowResize,
        getSizeFromWidth
      } = useContext(AdminContext);


  const [visibleImages, setVisibleImages] = useState(null);
  const [filteredImages, setFilteredImages] = useState(null);
  const imagesPerPage = 30;
  const [currentLength, setCurrentLength] = useState(null);
  const [fullScreenState, setFullScreenState] = useState({
    isOpen: false,
    currentIndex: null
  });


  const pathname = usePathname();



  const fetchImages = async () => {
    try {
      setGalleryLoadingState({
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
        setGalleryLoadingState({
          loading: false,
          error:true
        })
        return
      }
      await fetchAlbums();
      const data = await response.json();
      if(Array.isArray(data)){
        const sortedArray = data.sort((a, b) => {
          if (a.folder < b.folder) {
              return -1;
          }
          if (a.folder > b.folder) {
              return 1;
          }
          return 0;
      });
        setImages(sortedArray);
      setGalleryLoadingState({
        loading: false,
        error:false
      })
      } else {
        setImages(null)
        setGalleryLoadingState({
          loading: false,
          error:true
        })
      }
    } catch (error) {
      console.log(error)
      setGalleryLoadingState({
        loading: false,
        error:true
      })
    }
  }

  const fetchAlbums= async () => {
    try {
        const response = await fetch("/api/getAlbumsFromCloudinary",{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
            const data = await response.json();

            setAlbums(data.folders);
    } catch (error) {
        console.log(error);
        notify("Errore durante il caricamento degli album", "error");
    }
};



  const removeImages = async () => {
    setModalToRemoveImagesIsOpen(false);
    setFullscreenLoadingState(true)
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
        setFullscreenLoadingState(false)
        setCheckedCheckboxesToRemove([]);
        notify("Errore durante l'eliminazione delle immagini", "error")
      } else {
        const data = await response.json();
      console.log(data)
      
      setImages((prevImages =>{
        return prevImages.filter((prevImage) => !checkedCheckboxesToRemove.includes(prevImage.public_id))
      }))
      setFullscreenLoadingState(false)
      notify(`${checkedCheckboxesToRemove?.length > 1 ? "Immagini" : "Immagine"} eliminate con successo`, "success")
      setCheckedCheckboxesToRemove([]);
      }
    } catch (error) {
      console.log(error)
      setFullscreenLoadingState(false)
      setCheckedCheckboxesToRemove([]);
      notify("Errore durante l'eliminazione delle immagini", "error")
    }
  }


  const removeImagesFromAlbum = async () => {
    setModalToRemoveFromAlbumIsOpen(false);
    setFullscreenLoadingState(true)
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
          const sortedUpdatesImages = updatedImages.sort((a, b) => {
            if (a.folder < b.folder) {
                return -1;
            }
            if (a.folder > b.folder) {
                return 1;
            }
            return 0;
        });
        setImages(sortedUpdatesImages);
          setModalToRemoveFromAlbumIsOpen(false);
          
          notify(`${checkedCheckboxToRemoveFromAlbum?.length > 1 ? "Immagini" : "Immagine"} rimosse dall'album con successo`, "success")
          setCheckedCheckboxToRemoveFromAlbum([]);
          setFullscreenLoadingState(false)
      }
      catch(error){
        console.log(error)
        setFullscreenLoadingState(false)
        notify("Errore durante la rimozione dall'album", "error")
      }
  }


  // On page Load fetch images and handle window resize
    useEffect(()=>{
        handleWindowResize();
        fetchImages();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    },[])


    //Update images sizes when the window gets resized
    useEffect(()=>{
      getSizeFromWidth();
  },[windowWidth, images])


    useEffect(()=>{
      if(images !== null && Array.isArray(images)){
        if(currentLength === null){
          //Show just the first 30 images on page load
          setVisibleImages(images.slice(0, imagesPerPage));
        } else {
          const moreImages = images.slice(currentLength, currentLength + imagesPerPage);
          const oldImages = images.slice(0, currentLength);
          setVisibleImages([...oldImages, ...moreImages]);
        }
        fetchAlbums();
      }
    },[images])

    useEffect(()=>{
      //Show filtered Images when an album is selected as filter parameter
      if(displayedAlbum !== null){
        // If an album is selected as filter parameter, show only the images that belong to that album
        const filteredImagesArray = images.filter((image) =>{
          return image.public_id.includes(displayedAlbum)
        })
        setFilteredImages(filteredImagesArray);
      } else {
        // If no album is selected as filter parameter, show all the images
        setFilteredImages(null);
      }
    },[displayedAlbum, images])



    const handleLoadMore = () => {
      const currentLengthIndex = visibleImages.length;
      setCurrentLength(currentLengthIndex);
      const moreImages = images.slice(currentLengthIndex, currentLengthIndex + imagesPerPage);
      setVisibleImages([...visibleImages, ...moreImages]);
    }



   const openFullScreenMode = (imageIndex) =>{
    setModalToRemoveImagesIsOpen(false);
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


   const handleNextImage = useCallback(
    () => {
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
    },[fullScreenState.currentIndex, visibleImages])

  const handlePrevImage = useCallback(
    () => {
      setFullScreenImageLoadedComplete(false);
      if(fullScreenState.currentIndex === 0){
        setFullScreenState((prevState)=>{
          return {
            ...prevState,
            currentIndex: visibleImages.length - 1
      }})
      } else {
        const prevImageIndex = fullScreenState.currentIndex - 1;
        setFullScreenState((prevState)=>{
          return {
            ...prevState,
            currentIndex: prevImageIndex
          }
        })
      }
    }, [fullScreenState.currentIndex, visibleImages])





  const handleCheckboxChange = (isChecked, imageId, actionType) => {
    let setChecked;
    let clearOtherStates;

    switch(actionType) {
        case 'remove':
            setChecked = setCheckedCheckboxesToRemove;
            clearOtherStates = [setCheckedCheckboxesToAddToAlbum, setCheckedCheckboxToRemoveFromAlbum];
            break;
        case 'addToAlbum':
            setChecked = setCheckedCheckboxesToAddToAlbum;
            clearOtherStates = [setCheckedCheckboxesToRemove, setCheckedCheckboxToRemoveFromAlbum];
            break;
        case 'removeFromAlbum':
            setChecked = setCheckedCheckboxToRemoveFromAlbum;
            clearOtherStates = [setCheckedCheckboxesToRemove, setCheckedCheckboxesToAddToAlbum];
            break;
        default:
            return;
    }

    if (isChecked) {
        setChecked((prevCheckeds) => [...prevCheckeds, imageId]);
        clearOtherStates.forEach(clearState => clearState([]));
    } else {
        setChecked((prevCheckeds) => prevCheckeds.filter((prevChecked) => prevChecked !== imageId));
    }
};




  return (
    <>
    <section className={styles.categorySection}>

      <AdminGalleryNav
      images={images}
      checkedCheckboxToRemoveFromAlbum={checkedCheckboxToRemoveFromAlbum}
      checkedCheckboxesToAddToAlbum={checkedCheckboxesToAddToAlbum}
      checkedCheckboxesToRemove={checkedCheckboxesToRemove}
      />



      <AlbumsFilterContainer albums={albums} filteredImages={filteredImages} />

      {filteredImages !== null && <h1 className={styles.filteredImagesCount}>
        (Questo album contiene {filteredImages.length} {filteredImages.length > 1 ? "immagini" : "immagine"})
        </h1>}

      <div className={styles.imagesGallery}
      style={{gridTemplateColumns: `repeat(auto-fit, minmax(${getSizeFromWidth()}px, 1fr))`}}
      >
      {windowWidth !== null && images !== null  && filteredImages !== null && filteredImages.map((image, index) => {
          return <AdminImage key={index} image={image} visibleImages={filteredImages} openFullScreenMode={openFullScreenMode} closeFullScreenMode={closeFullScreenMode} fullScreenState={fullScreenState}
          handleNextImage={handleNextImage} handlePrevImage={handlePrevImage} isAdminPage={pathname === "/admin"} handleCheckboxChange={handleCheckboxChange}  />
      }) }
      {windowWidth !== null && images !== null && visibleImages !== null && filteredImages === null && visibleImages.map((image, index) => {
        return <AdminImage key={index} image={image} visibleImages={visibleImages} openFullScreenMode={openFullScreenMode} closeFullScreenMode={closeFullScreenMode} fullScreenState={fullScreenState}
        handleNextImage={handleNextImage} handlePrevImage={handlePrevImage} isAdminPage={pathname === "/admin"}  
        handleCheckboxChange={handleCheckboxChange}
        />
      })}
      </div>

      {galleryLoadingState.loading === true && <div className={styles.loaderContainer}>
      <Loader color="#ffffff" />
      <h1 className={styles.fetchLoading}>Loading</h1>
      </div>}

      {galleryLoadingState.error === true && visibleImages === null &&  <h1 className={styles.fetchError}>Errore nella richiesta al server.</h1>}
      {
        images !== null && visibleImages !== null && filteredImages === null && visibleImages.length < images.length &&
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>LOAD MORE</button>
      }
      </section>
      {
        modalToRemoveImagesIsOpen === true && <Modal parag={`Eliminare ${checkedCheckboxesToRemove?.length} ${checkedCheckboxesToRemove?.length > 1 ? "immagini" : "immagine"}?`} btn1Text="Annulla" btn2Text="Conferma" btn1Func={()=>{setModalToRemoveImagesIsOpen(false)}} btn2Func={removeImages} />
      }
      {modalToRemoveFromAlbumIsOpen == true && <Modal parag={`Rimuovere ${checkedCheckboxToRemoveFromAlbum?.length} ${checkedCheckboxToRemoveFromAlbum?.length > 1 ? "immagini" : "immagine"} dall'album?`} btn1Text="Annulla" btn2Text="Conferma" btn1Func={()=>{setModalToRemoveFromAlbumIsOpen(false)}} btn2Func={removeImagesFromAlbum} />}
      {modalToAddToAlbumIsOpen == true && <AddToAlbumModal  />}
      {
        fullscreenLoadingState === true && <FullscreenLoader />
      }
      </>
      )
    }
