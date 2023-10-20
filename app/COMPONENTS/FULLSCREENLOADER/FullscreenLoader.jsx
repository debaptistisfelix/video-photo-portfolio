import styles from './FullscreenLoader.module.css';
import Loader from '../LOADER/Loader';



export default function FullscreenLoader() {
  return (
    <div className={styles.removingImagesLoaderContainer}>
        <Loader color="#ffffff" />
        </div>
  )
}
