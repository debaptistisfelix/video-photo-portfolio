import styles from "./AddVideoForm.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Loader from "@/app/COMPONENTS/LOADER/Loader";
import notify from "@/lib/toastNotify";
import VideBlockForm from "./VIDEOBLOCKFORM/VideoBlokForm";

export default function AddVideoForm({loadingState, retrieveYoutubeVideoInfos, newVideoInfos, resetNewVideosInfos, createNewVideoForPlaylist}) {
  const [url, setUrl] = useState("");
  const [readyToConfirm, setReadyToConfirm] = useState(false);

  useEffect(()=>{
    if(newVideoInfos !== null){
      setReadyToConfirm(true)
    } else {
      setReadyToConfirm(false)
    }
  },[
    newVideoInfos
  ])



  return (
    <div className={styles.addVideoContainer}>
    <h1 className={styles.title}>
        <FontAwesomeIcon icon={faCirclePlus} className={styles.titleIcon} />
        Aggiungi nuovo Video</h1>
        <form className={styles.form}>
          <input placeholder="Youtube Url*" value={url} onChange={()=>{
            setUrl(event.target.value)
          }} className={styles.urlInput} />
          <div onClick={()=>{
            if(url !== ""){
              retrieveYoutubeVideoInfos(url);
            } else {
              notify("Inserisci un url valido", "error")
            }
          }} className={styles.urlBtn}>Cerca</div>
        </form>
        {loadingState.searchingVideoInfos === true && <div className={styles.loaderContainer}><Loader  color="lightgrey" /></div>}
        {newVideoInfos !== null && loadingState.searchingVideoInfos === false && <VideBlockForm video={newVideoInfos} />}
       {readyToConfirm === true && loadingState.searchingVideoInfos === false &&  <div className={styles.btnContainer}>
    <div onClick={()=>{
      resetNewVideosInfos();
      setUrl("");
    }} className={styles.cancelBtn}>Annulla</div>
    <div
    onClick={() =>{
      createNewVideoForPlaylist(newVideoInfos);
      resetNewVideosInfos();
      setUrl("");
    }}
    className={styles.confirmBtn}>Aggiungi</div>
</div>}
</div>
  )
}
