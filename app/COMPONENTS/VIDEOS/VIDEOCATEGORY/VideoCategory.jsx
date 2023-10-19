"use client"
import styles from './VideoCategory.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'



export default function VideoCategory({video}) {
  const [imageLoadingCompleted, setImageLoadingCompleted] = useState(false)
    const router = useRouter();

  /*   const videoiIds = "PrdbyNYq-z4,v6TPcU23wP8"

    const fetchVideoInfo = async (videoId) => {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
        const data = await res.json()
        console.log(data)
    }

    useEffect(() => {
      fetchVideoInfo(videoiIds)
    },[]) */

 

  
  return (
    <div  className={styles.videoCategoryContainer}>
        <div onClick={()=>{
        router.push(`/foto`)
    }} className={styles.imgContainer}>
        <Image  src={`/${video.bannerImg}`} width={300} height={150} className={`${styles.image} ${imageLoadingCompleted === true && styles.showImage}`} sizes='100vw' alt="banner-img" onLoadingComplete={()=>{
          setImageLoadingCompleted(true)
        }}/>
        {imageLoadingCompleted === false && <div className={styles.loadingDiv}>
        <FontAwesomeIcon icon={faImage} className={styles.loadingIcon} />
        <h1 className={styles.loadingText}>LOADING</h1>
      </div>}
        </div>
        <div
        className={styles.text}>
            <h1 className={styles.title}>
               {video.title}
            </h1>
            <p
            className={styles.parag}>Questa playlist contiene: {video?.youtubeVideos.length} Video</p>

            <div className={styles.socialContainer}>
                <h2 className={styles.socialTitle}>Contenuti per:</h2>
               <div className={styles.iconContainer}>
            
                {video?.instagramUrl &&  <Link target="_blank" href={video?.instagramUrl} >
                                <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
                        </Link>}
                        {video?.tiktokUrl &&  <Link target="_blank" href={video?.tiktokUrl} >
                                <FontAwesomeIcon icon={faTiktok} className={styles.icon} />
                        </Link>}
                        {video?.youtubeUrl &&  <Link target="_blank" href={video?.youtubeUrl} >
                                <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
                        </Link>}
               </div>
            </div>
        </div>
    </div>
  )
}
