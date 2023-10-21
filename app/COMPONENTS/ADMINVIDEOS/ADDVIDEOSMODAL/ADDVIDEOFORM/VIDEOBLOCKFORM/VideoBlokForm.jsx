import styles from "./VideoBlockForm.module.css"
import Image from "next/image"
import Link from "next/link"

export default function VideBlockForm({video}) {
     
  return (
    <div className={styles.block}>
        <Image className={styles.thumbnail} width={90} height={60} src={video.thumbnail} alt="thumbnail" sizes="100vw" />
        <Link target="_blank" className={styles.link} href={video?.link}>
            {video?.title}
        </Link>
    </div>
  )
}