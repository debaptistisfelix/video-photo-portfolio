"use client"
import styles from './CreateNewAlbum.module.css';
import { useState, useContext } from 'react';
import { AdminContext } from '../../CONTEXT/AdminContext';
import notify from '@/lib/toastNotify';

export default function CreateNewAlbum() {
    const [newAlbum, setNewAlbum] = useState("");
    const {checkedCheckboxesToAddToAlbum, setCheckedCheckboxesToAddToAlbum, setModalToAddToAlbumIsOpen, images, setImages, setFullscreenLoadingState, albums, setAlbums}  = useContext(AdminContext);

    const handleSubmit = async () => {
       if(newAlbum === ""){
        notify("inserisci un nome per l'album", "error");
        return
       } 
        try{
            setModalToAddToAlbumIsOpen(false);
            setFullscreenLoadingState(true);
            const response = await fetch("/api/createNewAlbum", {
                method:"POST",
                header:{
                    "Content-Type":"application/json"
                }, 
                body:JSON.stringify({
                    newAlbum:newAlbum,
                    imagesToAddToAlbum: checkedCheckboxesToAddToAlbum
                })
            })
                const data = await response.json();
                console.log("data from creating new album route", data)
                const filteredImages = images.filter(image => !checkedCheckboxesToAddToAlbum.includes(image.public_id));
                const updatedImages = [...data, ...filteredImages];
                const sortedUpdatesImages = updatedImages.sort((a, b) => {
                    if (a.folder < b.folder) {
                        return -1;
                    }
                    if (a.folder > b.folder) {
                        return 1;
                    }
                    return 0;
                });
                setImages(sortedUpdatesImages);
                notify("album creato con successo e immagine aggiunta", "success")
                setNewAlbum("");
                setCheckedCheckboxesToAddToAlbum([]); 
                setFullscreenLoadingState(false);
        }catch(error){
            console.log(error);
            setFullscreenLoadingState(false);
            notify("errore nella creazione dell'albumFINAL", "error")
        }
    }
    
  return (
    <div className={styles.addToNewAlbumContainer}>
                <h1 className={styles.title}>Crea nuovo Album</h1>
                <p className={styles.parag}>Crea un nuovo Album a cui le immagini selezionate verranno aggiunte</p>
                <form className={styles.form}>
                    <input onChange={()=>{
                        setNewAlbum(event.target.value);
                    }} className={styles.input} type="text" placeholder='Nome Album' value={newAlbum} />
                    <div onClick={()=>{
                        handleSubmit();
                    }} className={styles.btn}>Crea</div>
                </form>
            </div>
  )
}
