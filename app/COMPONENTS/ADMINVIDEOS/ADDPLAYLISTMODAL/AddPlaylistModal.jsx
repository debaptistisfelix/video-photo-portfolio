"use client"
import styles from "./AddPlaylistModal.module.css"
import { useContext, useEffect, useRef, useState} from "react"
import { AdminContext } from "../../CONTEXT/AdminContext"
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';

export default function AddPlaylistModal({createNewPlaylist}) {
  const { setAddingToPlaylist} = useContext(AdminContext);
  const [chosenImg, setChosenImg] = useState(null);
  const modalRef = useRef(null);
  const [playlistData, setPlaylistData] = useState({
    title: "",
    bannerImg: "",
    instagramUrl: "",
    youtubeUrl: "",
    tiktokUrl: ""
  });


  useEffect(() => {
    const handleClickOutsideModal = (e) => {
      if(modalRef.current && !modalRef.current.contains(e.target)){
        setPlaylistData({
          title: "",
          bannerImg: "",
          instagramUrl: "",
          youtubeUrl: "",
          tiktokUrl: ""
        })
        setChosenImg(null)
        setAddingToPlaylist(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    }
  },[])

  

  console.log(playlistData)


  return (
    <div className={styles.container}>
        <div ref={modalRef} className={styles.modal}>
          <h1 className={styles.title}>Aggiungi nuova Playlist</h1>
          <form className={styles.form}>
            <input value={playlistData.title} name="title" onChange={()=>{
              setPlaylistData({...playlistData, title: event.target.value})
            }} placeholder="Titolo*" type="text" className={`${styles.input} ${styles.titleInput}`} />
            <div className={styles.addImgContainer}>
              <span className={styles.imgText}>Carica Banner Image*</span>
              <CldUploadButton
                onUpload={(result) => {
                setChosenImg(result.info.url)
                setPlaylistData({...playlistData, bannerImg: result.info.url})
                }}
                tags={["playlist-banner"]}
                uploadPreset="testing"
                className={styles.uploadCloudinaryBtn} />
            </div>

            <div className={styles.loadedImgContainer}>
              <span className={styles.addedImgText}>
                Immagine caricata come banner della Playlist:
              </span>
              <div className={`${styles.imgContainer} ${chosenImg !== null && styles.showImgContainer}`}>  
              {chosenImg !== null && <Image src={chosenImg} alt="chosen image" fill={true} sizes="100vw" />}
              </div>
            </div>
            <div className={styles.socialContainer}>
             
                <input name="instagramUrl" value={playlistData.instagramUrl} onChange={()=>{
              setPlaylistData({...playlistData, instagramUrl: event.target.value})
                }} placeholder="Instagram Url" type="text" className={`${styles.input} ${styles.socialInput}`} />
                <input name="youtubeUrl" value={playlistData.youtubeUrl} onChange={()=>{
              setPlaylistData({...playlistData, youtubeUrl: event.target.value})
                }}  placeholder="Youtube Url*" type="text" className={`${styles.input} ${styles.socialInput}`} />
                <input name="tiktokUrl" value={playlistData.tiktokUrl} onChange={()=>{
              setPlaylistData({...playlistData, tiktokUrl: event.target.value})
                }} placeholder="Tiktok Url" type="text" className={`${styles.input} ${styles.socialInput}`} />
            
            </div>
          </form>
          <div className={styles.btnContainer}>
            <div onClick={()=>{
              setPlaylistData({
                title: "",
                bannerImg: "",
                instagramUrl: "",
                youtubeUrl: "",
                tiktokUrl: ""
              })
              setChosenImg(null)
              setAddingToPlaylist(false)
              }} className={styles.cancelBtn}>Annulla</div>
            <div onClick={()=>{
              createNewPlaylist(playlistData)
              setPlaylistData({
                title: "",
                bannerImg: "",
                instagramUrl: "",
                youtubeUrl: "",
                tiktokUrl: ""
              })
              setChosenImg(null)
              setAddingToPlaylist(false)
            }} className={styles.confirmBtn}>Aggiungi</div>
          </div>
        </div>
    </div>
  )
}
