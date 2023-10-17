import styles from './Loader.module.css';
import Image from 'next/image';
import ShutterImg from "@/public/shutter.png"

export default function Loader() {
  return (
    <div className={styles.loader}>
        <Image src={ShutterImg} width={80} height={80} alt="loader-icon" priority={true} quality={80}
        className={styles.loaderImg} size="80px" />
    </div>
  )
}
