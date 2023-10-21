"use client"
import styles from './VideoSection.module.css'
import VideoCategory from '../VIDEOCATEGORY/VideoCategory'
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect, useContext } from 'react'
import { AdminContext } from '../../CONTEXT/AdminContext'
import Loader from '../../LOADER/Loader'



export default function VideoSection() {
    const {playlists, setPlaylists} = useContext(AdminContext);
    const [fetchVideosState, setFetchVideosState] = useState({
        loading: true,
        error: false
    });

    const fetchVideos = async () => {
        setFetchVideosState({
            loading: true,
            error: false
        })
        try{
            const response = await fetch('/api/playlists',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: "no-store"
            });
            if(!response.ok){
                setFetchVideosState({
                    loading: false,
                    error: true
                })
            } else {
                const data = await response.json();
                console.log(data)
                const playlistsWithYoutubeVideos = data.filter(playlist => playlist.youtubeVideos.length > 0);
                setPlaylists(playlistsWithYoutubeVideos);
                setFetchVideosState({
                    loading: false,
                    error: false
                })
            }
        }
        catch(error){
            console.log(error)
            setFetchVideosState({
                loading: false,
                error: true
            })
            }
        }
    

    useEffect(()=>{
        fetchVideos();
    },[])


  return (
    <section className={styles.videoSection}>
    {fetchVideosState.loading === true && <div className={styles.loaderContainer}>
  <Loader color="#ffffff" />
  <h1 className={styles.fetchLoading}>Loading</h1>
  </div>}
  {fetchVideosState.error === true && <div className={styles.loaderContainer}><h1 className={styles.fetchError}>Errore nella richiesta al server.</h1></div>}
       {playlists !== null && fetchVideosState.loading !== true && fetchVideosState.error !== true && playlists.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
}).map((video, index) => {
    return (
        <VideoCategory key={index} video={video} />
    )
})}
    </section>
  )
}
