"use client"
import { useContext } from 'react';
import { AdminContext } from '@/app/COMPONENTS/CONTEXT/AdminContext';
import styles from './AlbumsFilterContainer.module.css';



export default function AlbumsFilterContainer({albums, filteredImages}) {
    const {displayedAlbum, setDisplayedAlbum} = useContext(AdminContext);

    const handleAlbumChange = (albumName) => {
        if(albumName === displayedAlbum){
            setDisplayedAlbum(null)
        } else {
            setDisplayedAlbum(albumName)
        }
    }
  return (
    <div className={styles.albumsContainer}>
        {albums !== null && albums.map((album, index) => {
          return <div onClick={()=>{handleAlbumChange(album.name)}} key={index} className={`${styles.albumBtn} ${displayedAlbum === album.name && styles.active}`}>{album.name} </div>
        })}
      </div>
  )
}
