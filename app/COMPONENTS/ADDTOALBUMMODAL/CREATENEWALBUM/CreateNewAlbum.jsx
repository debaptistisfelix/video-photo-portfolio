"use client"
import styles from './CreateNewAlbum.module.css';
import { useState, useContext } from 'react';
import { AdminContext } from '../../CONTEXT/AdminContext';
import notify from '@/lib/toastNotify';

export default function CreateNewAlbum() {
    const [newAlbum, setNewAlbum] = useState("");
    const {checkedCheckboxesToAddToAlbum, setCheckedCheckboxesToAddToAlbum, setModalToAddToAlbumIsOpen, images, setImages}  = useContext(AdminContext);

    const handleSubmit = async () => {
       if(newAlbum === ""){
        notify("inserisci un nome per l'album", "error");
        return
       } 
        try{
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
                const filteredImages = images.filter(image => !checkedCheckboxesToAddToAlbum.includes(image.public_id));
                const updatedImages = [...data, ...filteredImages];
                setImages(updatedImages);
                notify("album creato con successo e immagine aggiunta", "success")
                setNewAlbum("");
                setCheckedCheckboxesToAddToAlbum([]); 
                setModalToAddToAlbumIsOpen(false); 
        }catch(error){
            console.log(error);
            notify("errore nella creazione dell'albumFINAL", "error")
        }
    }
    const filterImages = () => {
        const filteredImages = images.filter(image => !checkedCheckboxesToAddToAlbum.includes(image.public_id));
        setImages(filteredImages);
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
