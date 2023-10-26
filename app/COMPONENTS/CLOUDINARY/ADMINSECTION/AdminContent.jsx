"use client"
import styles from './AdminContent.module.css';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilm, faImage} from '@fortawesome/free-solid-svg-icons';
import AdminGallery from '../GALLERY/ADMINGALLERY/AdminGallery';
import VideoGallery from '../../ADMINVIDEOS/VIDEOGALLERY/VideoGallery';
import { AdminContext } from '../../CONTEXT/AdminContext';
import {useSession} from 'next-auth/react';
import Login from '../../LOGIN/Login';
import FullscreenLoader from '../../FULLSCREENLOADER/FullscreenLoader';

export default function AdminContent() {
    const [category, setCategory] = useState("video");
    const {setCheckedCheckboxesToRemove, setCheckedCheckboxesToAddToAlbum} = useContext(AdminContext);
    const { data: session, status } = useSession();


   


    const handleCategoryChange = (categ) => {
       setCategory(categ);
       if(category !== "foto"){
        setCheckedCheckboxesToRemove([]);
        setCheckedCheckboxesToAddToAlbum([]);
        setCategory(categ);
       }
    }

  
    
 /*    if(status === "loading"){
      return <FullscreenLoader/>
  }



  if(!session){
      router.push("/login")
      return null
  } */


  return (
    <>
    {status === "loading" && <FullscreenLoader/>}
    {!session && status !== "loading" && <Login/>}
    {status === "authenticated" && status !== "loading" && <section className={styles.content}>
    <div className={styles.nav}>
     <h1 className={styles.adminTitle}>ADMIN</h1>
    <div className={styles.btnContainer}>
   
     <div onClick={()=>{handleCategoryChange("video")}} className={styles.btn}>
         <FontAwesomeIcon icon={faFilm} className={styles.icon} />
         <h2 className={styles.categTitle}>Video</h2>
     </div>
     <div onClick={()=>{handleCategoryChange("foto")}} className={styles.btn}>
         <FontAwesomeIcon icon={faImage} className={styles.icon} />
         <h2 className={styles.categTitle}>Foto</h2>
     </div>
    </div>
     </div>  
   {category === "foto" ? <AdminGallery/>
  : <VideoGallery/>}
     </section>}</>
  )
}
