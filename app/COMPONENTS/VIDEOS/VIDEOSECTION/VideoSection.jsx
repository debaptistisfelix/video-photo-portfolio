"use client"
import styles from './VideoSection.module.css'
import VideoCategory from '../VIDEOCATEGORY/VideoCategory'
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect, useContext } from 'react'
import { AdminContext } from '../../CONTEXT/AdminContext'
import Loader from '../../LOADER/Loader'

/* const videos = [
    {
        title: "JACK NBC",
        img: "logo-nic.jpg",
        text: "Questa Playlist contiene: 14 video.",
        id: "1",
        social: [
            {
                name: "Instagram",
                icon: faInstagram,
                link: "https://www.instagram.com/moto.it/"
            },
            {
                name: "Youtube",
                icon: faYoutube,
                link: "https://www.youtube.com/user/motodotit"
            },
            {
                name: "Tiktok",
                icon: faTiktok,
                link: "https://www.tiktok.com/@motoit"
            }
        ]
    },
    {
        title: "MOTO.IT",
        img: "logo-moto.jpg",
        text: "Questa Playlist contiene: 14 video.",
        color:"#FFDE01",
        backgroundColor: "#191919",
        id: "2",
        social: [
           
            {
                name: "Youtube",
                icon: faYoutube,
                link: "https://www.youtube.com/user/motodotit"
            },
            
        ]
    },
    {
        title: "ROSSO CORSA",
        img: "logo-rosso.jpg",
        text: "Questa Playlist contiene: 14 video.",
        backgroundColor: "#d90429",
        color:"white",
        backgroundColor:"#FC0402",
        id: "3",
        social: [
            {
                name: "Instagram",
                icon: faInstagram,
                link: "https://www.instagram.com/moto.it/"
            },
            {
                name: "Youtube",
                icon: faYoutube,
                link: "https://www.youtube.com/user/motodotit"
            },
            {
                name: "Tiktok",
                icon: faTiktok,
                link: "https://www.tiktok.com/@motoit"
            }
        ]
    },
    {
        title: "GC VIDEOMAKING",
        img: "logo-suo.jpg",
        text: "Questa Playlist contiene: 14 video.",
        color:"white",
        backgroundColor:"#FC0402",
        id: "4",
        social: [
           
            {
                name: "Youtube",
                icon: faYoutube,
                link: "https://www.youtube.com/user/motodotit"
            },
            
        ]
    },
] */


export default function VideoSection() {
    const {videos, setVideos} = useContext(AdminContext);
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
                setVideos(data);
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

    console.log(videos)

  return (
    <section className={styles.videoSection}>
    {fetchVideosState.loading === true && <div className={styles.loaderContainer}>
  <Loader />
  <h1 className={styles.fetchLoading}>Loading</h1>
  </div>}
  {fetchVideosState.error === true && <h1 className={styles.fetchError}>Errore nella richiesta al server.</h1>}
       {videos !== null && fetchVideosState.loading !== true && fetchVideosState.error !== true && videos.map((video, index) => {
            return (
                <VideoCategory key={index} video={video} />
            )
        })}
    </section>
  )
}
