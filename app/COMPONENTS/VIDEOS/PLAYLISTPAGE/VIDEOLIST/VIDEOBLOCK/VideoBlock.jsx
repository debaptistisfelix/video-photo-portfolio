import styles from "./VideoBlock.module.css"
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

export default function VideoBlock({video, changeVideoToPlay}) {
  return (
    <div onClick={()=>{
        changeVideoToPlay(video.youtubeVideoId)
    }} className={styles.block}>
       <div className={styles.imgContainer}>
       <Image className={styles.img} alt="thumbnail"
        width={120} height={90} src={video?.thumbnail}
        sizes="100vw" 
        />
        <FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
       </div>
        <div className={styles.text}>
            <h1 className={styles.title}>{video?.title}</h1>
            <p className={styles.duration}>Duration: {video?.duration}</p>
        </div>
    </div>
  )
}
