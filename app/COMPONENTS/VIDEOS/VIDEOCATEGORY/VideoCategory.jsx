"use client"
import styles from './VideoCategory.module.css'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'



export default function VideoCategory({video}) {
    const router = useRouter();
  
  return (
    <div  className={styles.videoCategoryContainer}>
        <div onClick={()=>{
        router.push(`/foto`)
    }} className={styles.imgContainer}>
        <Image  src={`/${video.bannerImg}`} width={300} height={150} className={styles.image} sizes='100vw' alt="banner-img"  />
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
