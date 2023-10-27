"use client"
import styles from './UserGallery.module.css'
import { useState, useContext, useCallback } from "react";
import { useEffect } from "react";
import { AdminContext } from '@/app/COMPONENTS/CONTEXT/AdminContext';
import { TouchContext } from "@/app/COMPONENTS/CONTEXT/TouchContext";
import Loader from '@/app/COMPONENTS/LOADER/Loader';
import UserImage from './USERIMAGE/UserImage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function UserGallery() {
  //Variables and functions from the AdminContext
    const {imagesForUser, setImagesForUser,  windowWidth,
      handleWindowResize,
      getSizeFromWidth} = useContext(AdminContext);

    //Images visible on the screen
    const [visibleImages, setVisibleImages] = useState(null);
    const imagesPerPage = 30;

   

    //State variable to handle the loading state of the images
    const [fetchDataStates, setFetchDataStates] = useState({
      loading: true,
      error:false
    })

    // Fullscreen state variables
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Touch context to handle swipe functionality on mobile screens
    const { touchEnd, handleTouchStart, handleTouchEnd, handleSwipe} = useContext(TouchContext);



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


  const openFullScreen = (index) => {
   // Check if the clicked index is the same as the current index
  if (index === currentIndex) {
    setIsLoading(false); // Reset loading state
  } else {
    setIsLoading(true); // Set loading state for a new image
    setCurrentIndex(index);
  }
  setIsFullscreenOpen(true);
  };


  const closeFullScreen = () => {
    setIsFullscreenOpen(false);
  };

  
  const handlePrevImage = () => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? visibleImages.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === visibleImages.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if(visibleImages !== null){
      setIsLoading(true);
    const image = new Image();
    image.src = visibleImages[currentIndex].url;
    image.onload = () => {
      setIsLoading(false);
    };
    }
  }, [currentIndex]);

   useEffect(()=>{
      if(isFullscreenOpen === true){
        handleSwipe(handlePrevImage, handleNextImage)
      }
    }, [touchEnd]) 

    

    console.log("IsFullscreenOpen", isFullscreenOpen)
    console.log("currentIndex", currentIndex)
    console.log("isLoading", isLoading)
    console.log("visible image current index:", visibleImages !== null && visibleImages[currentIndex])


  

  return (
    <>
    <section className={styles.gallery}
    style={{gridTemplateColumns: `repeat(auto-fit, minmax(${getSizeFromWidth()}px, 1fr))`}}
    >
     {windowWidth !== null && visibleImages !== null && visibleImages.map((image, index) => {
        return <UserImage onClick={() => openFullScreen(index)} key={index} image={image} />
      })}

     

    </section>

    {isFullscreenOpen && (
  <div className={styles.fullScreenOverlay} >
    <div onClick={closeFullScreen} className={styles.fullScreenImageContainer}>
      {isLoading ? (
        <div className={styles.fullImageLoadingDiv}>
        <FontAwesomeIcon icon={faImage} className={styles.fullScreenLoadingIcon} />
      </div>
      ) : (
        <img onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd} src={visibleImages[currentIndex].url} alt={visibleImages[currentIndex].alt} className={styles.fullScreenImage} />
      )}
    </div>
    <FontAwesomeIcon
      icon={faChevronLeft} className={`${styles.fullscreenNavIcon} ${styles.leftArrow}`} onClick={handlePrevImage} />
      <FontAwesomeIcon
      icon={faChevronRight} className={`${styles.fullscreenNavIcon} ${styles.rightArrow}`} onClick={handleNextImage} />
  </div>
)}


   

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
