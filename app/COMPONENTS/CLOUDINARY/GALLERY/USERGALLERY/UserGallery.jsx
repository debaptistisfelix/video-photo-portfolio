"use client"
import styles from './UserGallery.module.css'
import { useState, useContext, useCallback } from "react";
import { useEffect } from "react";
import { AdminContext } from '@/app/COMPONENTS/CONTEXT/AdminContext';
import Loader from '@/app/COMPONENTS/LOADER/Loader';
import UserImage from './USERIMAGE/UserImage';

export default function UserGallery() {
  //Variables and functions from the AdminContext
    const {imagesForUser, setImagesForUser, setFullScreenImageLoadedComplete, windowWidth, setWindowWidth,
      handleWindowResize,
      getSizeFromWidth} = useContext(AdminContext);

    //Images visible on the screen
    const [visibleImages, setVisibleImages] = useState(null);
    const imagesPerPage = 30;

    //State variable to handle full screen mode
    const [fullScreenState, setFullScreenState] = useState({
      isOpen: false,
      currentIndex: null
    });

    //State variable to handle the loading state of the images
    const [fetchDataStates, setFetchDataStates] = useState({
      loading: true,
      error:false
    })




    const fetchImages = async () => {
      try {
        setFetchDataStates({
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
            loading: false,
            error:true
          })
        }
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
          setImagesForUser(sortedArray);
        setFetchDataStates({
          loading: false,
          error:false 
        })
        } else {
          setImagesForUser(null)
          setFetchDataStates({
            loading: false,
            error:true
          })
        }
      } catch (error) {
        console.log(error)
        setFetchDataStates({
          loading: false,
          error:true
        })
      }
    }

    

   

    useEffect(()=>{
        handleWindowResize();

        fetchImages();

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    },[])

    useEffect(()=>{
      //Once the images are fetched, show only 30 images
      if(imagesForUser !== null){
        //Show only 30 images results when page loads
        setVisibleImages(imagesForUser.slice(0, imagesPerPage));
      }
    }, [imagesForUser])


   

    const handleLoadMore = () => {
      const currentLengthIndex = visibleImages.length;
      const moreImages = imagesForUser.slice(currentLengthIndex, currentLengthIndex + imagesPerPage);
      setVisibleImages([...visibleImages, ...moreImages]);
    }

    const openFullScreenMode = (imageIndex) =>{
      setFullScreenImageLoadedComplete(false);
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
    setFullScreenImageLoadedComplete(false);
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


  

  return (
    <>
    <section className={styles.gallery}
    style={{gridTemplateColumns: `repeat(auto-fit, minmax(${getSizeFromWidth()}px, 1fr))`}}
    >
     {windowWidth !== null && visibleImages !== null && visibleImages.map((image, index) => {
        return <UserImage key={index} image={image} visibleImages={visibleImages} openFullScreenMode={openFullScreenMode} closeFullScreenMode={closeFullScreenMode} fullScreenState={fullScreenState}
        handleNextImage={handleNextImage} handlePrevImage={handlePrevImage} />
      })}

     

    </section>

   {
      imagesForUser !== null && fetchDataStates.error !== true && fetchDataStates.loading !== true && visibleImages !== null &&  visibleImages.length < imagesForUser.length &&
      <button className={styles.loadMoreBtn} onClick={handleLoadMore}>LOAD MORE</button>
    }

    {fetchDataStates.loading === true && <div className={styles.loaderContainer}>
      <Loader color="#ffffff" />
      <h1 className={styles.fetchLoading}>Loading</h1>
      </div>}

    {fetchDataStates.error === true && visibleImages === null &&  <h1 className={styles.fetchError}>Errore nella richiesta al server.</h1>}

    </>
  )
}
