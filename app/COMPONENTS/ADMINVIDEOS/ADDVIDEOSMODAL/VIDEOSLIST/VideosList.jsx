import styles from "./VideosList.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import VideoBlock from "./VIDEOBLOCK/VideBlock";
import Loader from "@/app/COMPONENTS/LOADER/Loader";

export default function VideosList({videos, removeVideo, loadingState}) {
    const bothConditionArefalse = loadingState.gettingVideos === false && loadingState.removingVideo === false;
    const somethingIsLoading = loadingState.gettingVideos === true || loadingState.removingVideo === true;
  return (
    <div className={styles.videosContainer}>
                <h1 className={styles.title}>
                <FontAwesomeIcon icon={faRectangleList} className={styles.titleIcon} />
                    Youtube Videos</h1>
                    <div className={styles.videosList}>
                        {videos !== null  && bothConditionArefalse && videos.map((video, index) => {
                            return <VideoBlock removeVideo={removeVideo} key={index} video={video} />
                        }) }
                        {videos === null || videos.length === 0 && bothConditionArefalse && <p className={styles.noResultsYet}>0 Video caricati.</p>}
                        {somethingIsLoading && <div className={styles.loaderContainer}>
                        <Loader color="lightgrey" /></div>}
                    </div>
            </div>
  )
}
