"use client"
import styles from './UserGallery.module.css'
import { CldImage } from 'next-cloudinary';
import ImageContainer from '../../IMGCONTAINER/ImageContainer';
import { useState, useContext } from "react";
import { useEffect } from "react";
import { AdminContext } from '@/app/COMPONENTS/CONTEXT/AdminContext';

export default function UserGallery({results}) {
    const [windowWidth, setWindowWidth] = useState(null);
    const {imagesForUser, setImagesForUser} = useContext(AdminContext);
    const [visibleImages, setVisibleImages] = useState([]);
    const imagesPerPage = 30;
    const [fullScreenState, setFullScreenState] = useState({
      isOpen: false,
      currentIndex: null
    });
    const [fetchDataStates, setFetchDataStates] = useState({
      success: false,
      loading: false,
      error:false
    })

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
        setFetchDataStates({
          success: true,
          loading: false,
          error:false 
        })
        setImagesForUser(data);
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

        fetchImages();

      /*   setImagesForUser(results); */

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    },[])

    useEffect(()=>{
      if(imagesForUser !== null){
        setVisibleImages(imagesForUser.slice(0, imagesPerPage));
      }
    }, [imagesForUser])


    const getSizeFromWidth = () => {
        if(windowWidth <= 500){
            return "100";
        } else if(windowWidth > 500 && windowWidth <= 800){
            return "150";
        } else if(windowWidth > 800){
            return "250";
        }
    }

    const handleLoadMore = () => {
      const currentLengthIndex = visibleImages.length;
      const moreImages = imagesForUser.slice(currentLengthIndex, currentLengthIndex + imagesPerPage);
      setVisibleImages([...visibleImages, ...moreImages]);
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
    <>
    <section className={styles.gallery}
    style={{gridTemplateColumns: `repeat(auto-fit, minmax(${getSizeFromWidth()}px, 1fr))`}}
    >
     {windowWidth !== null && visibleImages.map((image, index) => {
        return <ImageContainer key={index} image={image} visibleImages={visibleImages} windowWidth={windowWidth} getSizeFromWidth={getSizeFromWidth} openFullScreenMode={openFullScreenMode} closeFullScreenMode={closeFullScreenMode} fullScreenState={fullScreenState}
        handleNextImage={handleNextImage} handlePrevImage={handlePrevImage} />
      })}

     

    </section>
   {
      imagesForUser !== null && fetchDataStates.success === true &&  visibleImages.length < imagesForUser.length &&
      <button className={styles.loadMoreBtn} onClick={handleLoadMore}>LOAD MORE</button>
    }

{fetchDataStates.loading === true && <h1 className={styles.fetchLoading}>Loading...</h1>}

{fetchDataStates.error === true && <h1 className={styles.fetchError}>Errore nella richiesta al server.</h1>}
    </>
  )
}
