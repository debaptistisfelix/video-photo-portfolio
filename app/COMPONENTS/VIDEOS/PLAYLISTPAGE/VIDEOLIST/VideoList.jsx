import styles from './VideoList.module.css'
import VideoBlock from './VIDEOBLOCK/VideoBlock'

export default function VideoList({playlist, changeVideoToPlay}) {
  return (
    <div className={styles.container}>
        {playlist.youtubeVideos && playlist.youtubeVideos.map((video, index)=>{
            return <VideoBlock key={index} video={video} changeVideoToPlay={changeVideoToPlay} />
        })}
    </div>
  )
}
