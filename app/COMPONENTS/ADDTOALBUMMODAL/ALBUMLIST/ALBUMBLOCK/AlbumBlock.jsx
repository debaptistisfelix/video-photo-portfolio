import styles from "./AlbumBlock.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"

export default function AlbumBlock({album, selectedAlbum, selectAlbum}) {
  return (
    <div onClick={()=>{selectAlbum(album.name)}} className={`${styles.block} ${selectedAlbum === album.name && styles.activeBlock}`}>
        <FontAwesomeIcon icon={faFolder} className={`${styles.icon} ${selectedAlbum === album.name && styles.activeIcon}`} />
        <h1 className={`${styles.title} ${selectedAlbum === album.name && styles.activeTitle}`}>{album?.name}</h1>
    </div>
  )
}
