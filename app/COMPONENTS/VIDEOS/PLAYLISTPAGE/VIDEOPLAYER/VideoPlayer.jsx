import styles from './VideoPlayer.module.css'


export default function VideoPlayer({videoId}) {
  return (
   <div  className={styles.container}>
        <iframe

        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.youtubeVideo}
    />
   </div>
  )
}
