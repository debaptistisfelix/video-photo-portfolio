"use client"
import styles from './PlaylistPage.module.css'
import VideoPlayer from './VIDEOPLAYER/VideoPlayer'
import VideoList from './VIDEOLIST/VideoList'
import { useState, useEffect, useRef } from 'react'
import notify from '@/lib/toastNotify'
import Loader from '../../LOADER/Loader'

export default function PlaylistPage({playlistId}) {
    const [playlist, setPlaylist] = useState(null)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null)
    const [loadingState, setLoadingState] = useState({
        loadingPlaylist: true,
        changingVideo: false,
        error: false
    })
    const videoPlayerRef = useRef(null)

    const fetchPlaylist = async (id) => {
        try {
            setLoadingState({...loadingState, loadingPlaylist: true})
            const response = await fetch(`/api/playlist/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(!response.ok){
                notify("Errore nel caricamento della playlist.", "error")
                setLoadingState({...loadingState, loadingPlaylist: false, error: true})
                return
            } else{
                const data = await response.json()
                setPlaylist(data)
                setLoadingState({...loadingState, loadingPlaylist: false})
            }
        } catch (error) {
            console.log(error)
            notify("Errore nel caricamento della playlist.", "error")
            setLoadingState({...loadingState, loadingPlaylist: false, error: true})
        }
    };

    useEffect(()=>{
        fetchPlaylist(playlistId)
    }, [])

    useEffect(()=>{
        if(playlist !== null){
            setCurrentVideoIndex(playlist?.youtubeVideos[0].youtubeVideoId)
        }
    },[playlist])

    const changeVideoToPlay = (videoId) => {
        setCurrentVideoIndex(videoId)
        videoPlayerRef.current.scrollIntoView({behavior: "smooth"})
    }


  return (
   <section className={styles.section}>
     <h1 ref={videoPlayerRef} className={styles.title}>{playlist !== null && playlist?.title}</h1>
     {
        loadingState.loadingPlaylist === false && playlist !== null && <div className={styles.playerContainer}>
        <VideoPlayer videoPlayerRef={videoPlayerRef} videoId={currentVideoIndex} />
        <VideoList changeVideoToPlay={changeVideoToPlay} playlist={playlist}  />
     </div>
     }
     {
        loadingState.loadingPlaylist === true && <div className={styles.loaderContainer}>
            <Loader color="white" />
        </div>
     }{
        loadingState.error === true && <div className={styles.errorContainer}>
            <h1 className={styles.errorTitle}>Errore nel caricamento della playlist.</h1>
        </div>
     }
   </section>
  )
}
