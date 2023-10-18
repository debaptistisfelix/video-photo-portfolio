"use client"
import styles from './VideoCategory.module.css'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'



export default function VideoCategory({video}) {
    const router = useRouter();
  
  return (
    <div onClick={()=>{
        router.push(`/foto`)
    }} className={styles.videoCategoryContainer}>
        <div className={styles.imgContainer}>
        <Image  src={`/${video.img}`} width={300} height={150} className={styles.image} sizes='100vw' alt="banner-img"  />
        </div>
        <div
        className={styles.text}>
            <h1 className={styles.title}>
               {video.title}
            </h1>
            <p
            className={styles.parag}>{video.text}</p>

            <div className={styles.socialContainer}>
                <h2 className={styles.socialTitle}>Contenuti per:</h2>
               <div className={styles.iconContainer}>
               {video.social.map((social, index) => {
                    return (
                        <Link href={social.link} key={index}>
                                <FontAwesomeIcon icon={social.icon} className={styles.icon} />
                        </Link>
                    )
                })}
               </div>
            </div>
        </div>
    </div>
  )
}
