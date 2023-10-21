"use client"
import styles from "./AddVideosModal.module.css";
import React, { useEffect, useRef, useState } from 'react'
import VideosList from "./VIDEOSLIST/VideosList";
import AddVideoForm from "./ADDVIDEOFORM/AddVideoForm";
import notify from "@/lib/toastNotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";




export default function AddVideosModal({playList, closeAddVideoModal}) {
    const modalContainerRef= useRef(null);
    const modalRef = useRef(null);
    const [videos, setVideos] = useState(null);
    const [loadingState, setLoadingState] = useState({
        gettingVideos: false,
        removingVideo: false,
        searchingVideoInfos: false,
        addingVideo: false,
    });
    const [newVideoInfos, setNewVideoInfos] = useState(null);


    useEffect(()=>{
        const handleClickOutsideModal = () => {
            if(modalContainerRef.current && modalContainerRef.current.contains(event.target)){
               if(modalRef.current && !modalRef.current.contains(event.target)){
                   closeAddVideoModal();
               }
            }
        }

        handleClickOutsideModal();

       const fetchPlaylistVideos = async () => {
        setLoadingState({
            ...loadingState,
            gettingVideos: true,
        });
        try {
            const response = await fetch(`/api/videos/${playList.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(!response.ok){
                notify("Errore durante il caricamento dei video", "error")
            } else {
                const data = await response.json();
                setVideos(data);
                setLoadingState({
                    ...loadingState,
                    gettingVideos: false,
                })
            }
        } catch (error) {
            console.log("error: ", error)
            loadingState({
                ...loadingState,
                gettingVideos: false,
            })
            notify("Errore durante il caricamento dei video", "error")
        }
       }

       fetchPlaylistVideos();

        document.addEventListener("click", handleClickOutsideModal);

        return () => document.removeEventListener("click", handleClickOutsideModal);
    },[])


    const removeVideo = async (videoId) =>{
        setLoadingState({
            ...loadingState,
            removingVideo: true,
        })
        try{
            const response = await fetch(`/api/videos/${playList.id}/${videoId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(!response.ok){
                notify("Errore durante l'eliminazione del video", "error")
                setLoadingState({
                    ...loadingState,
                    removingVideo: false,
                })
            } else {
                notify("Video eliminato con successo", "success")
                const updatedVideos = videos.filter(video => video.id !== videoId);
                setVideos(updatedVideos);
                setLoadingState({
                    ...loadingState,
                    removingVideo: false,
                })
            }
        }catch(error){
            notify("Errore durante l'eliminazione del video", "error");
            setLoadingState({
                ...loadingState,
                removingVideo: false,
            })
            console.log(error)
        }
    }

    function convertDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
      
        if (match[1]) hours = parseInt(match[1].replace('H', ''));
        if (match[2]) minutes = parseInt(match[2].replace('M', ''));
        if (match[3]) seconds = parseInt(match[3].replace('S', ''));
      
        if (hours > 0) {
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
      }
      
      
      
      

      

    const retrieveYoutubeVideoInfos = async (url) => {
        setLoadingState({
          ...loadingState,
          searchingVideoInfos: true,
        });
        const urlString = new URL(url);
        const params = new URLSearchParams(urlString.search);
        const videoId = params.get('v');
        try{
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
            if(!response.ok){
                notify("Errore durante il caricamento delle informazioni sul video", "error")
                setLoadingState({
                    ...loadingState,
                    searchingVideoInfos: false,
                }) 
            } else {
                const data = await response.json()
                const videoDuration = convertDuration(data.items[0].contentDetails.duration);
                const necessaryInfos = {
                    title: data.items[0].snippet.title,
                    duration: videoDuration,
                    thumbnail: data.items[0].snippet.thumbnails.default.url,
                    link: url,
                }
                setNewVideoInfos(necessaryInfos);
                setLoadingState({
                    ...loadingState,
                    searchingVideoInfos: false,
                })
                notify("Informazioni sul video caricate con successo", "success")
            }
        }catch(error){
          notify("Errore durante il caricamento delle informazioni sul video", "error")
          setLoadingState({
            ...loadingState,
            searchingVideoInfos: false,
          })
          console.log("error: ", error)
        }
    
      };

      const resetNewVideosInfos = () => {
        setNewVideoInfos(null);
      };

      const createNewVideoForPlaylist = async (newVideo) => {
        setLoadingState({
            ...loadingState,
            gettingVideos: true,
        })
        try {
            const response = await fetch(`/api/videos/${playList.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newVideo)
            })
            if(!response.ok){
                notify("Errore durante l'aggiunta del video", "error")
                setLoadingState({
                    ...loadingState,
                    gettingVideos: false,
                })
            } else {
                notify("Video aggiunto con successo", "success")
                const data = await response.json();
                setVideos([...videos, data]);
                setLoadingState({
                    ...loadingState,
                    gettingVideos: false,
                })
            }
        } catch (error) {
            console.log(error)
            notify("Errore durante l'aggiunta del video", "error")
            setLoadingState({
                ...loadingState,
                gettingVideos: false,
            })
        }
      };



  return (
    <div ref={modalContainerRef} className={styles.container}>
        <div ref={modalRef} className={styles.modal}>
            <FontAwesomeIcon onClick={closeAddVideoModal} icon={faX} className={styles.closeIcon} />
            <VideosList loadingState={loadingState} videos={videos} removeVideo={removeVideo} />
            <AddVideoForm createNewVideoForPlaylist={createNewVideoForPlaylist} resetNewVideosInfos={resetNewVideosInfos} newVideoInfos={newVideoInfos} loadingState={loadingState} retrieveYoutubeVideoInfos={retrieveYoutubeVideoInfos} />
      
        </div>
    </div>
  )
}
