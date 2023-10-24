import styles from "./AlbumList.module.css"
import Loader from "../../LOADER/Loader"
import AlbumBlock from "./ALBUMBLOCK/AlbumBlock"


export default function AlbumList({albums, fetchAlbumsState, selectAlbum, selectedAlbum, addToExistingAlbum}) {
  return (
    <div className={styles.addToExistingAlbumsContainer}>
                <h1 className={styles.title}>Aggiungi ad Album esistente</h1>
                <div className={styles.albumList}>
                    {fetchAlbumsState.error === true && <p className={styles.parag}>Errore durante il caricamento degli album</p>}   
                    {fetchAlbumsState.loading === true && <div className={styles.fetchLoadingContainer}><Loader color="lightgrey" /></div>}
                    {albums !== null && fetchAlbumsState.loading === false && fetchAlbumsState.error === false && albums.map((album, index)=>{
                        return <AlbumBlock selectAlbum={selectAlbum} selectedAlbum={selectedAlbum} key={index} album={album} />
                    })}
                </div>
                {
                    selectedAlbum !== null && <div onClick={addToExistingAlbum} className={styles.btn}>Aggiungi</div>
                }
            </div>
  )
}
