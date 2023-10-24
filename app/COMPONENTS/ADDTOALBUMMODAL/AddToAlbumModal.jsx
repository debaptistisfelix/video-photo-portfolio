"use client"
import styles from './AddToAlbumModal.module.css';
import { useEffect, useRef, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { AdminContext } from '../CONTEXT/AdminContext';
import CreateNewAlbum from './CREATENEWALBUM/CreateNewAlbum';
import AlbumList from './ALBUMLIST/AlbumList';
import notify from '@/lib/toastNotify';

export default function AddToAlbumModal() {
    const [albums, setAlbums] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const modalRef = useRef(null);
    const { setModalToAddToAlbumIsOpen, checkedCheckboxesToAddToAlbum, setCheckedCheckboxesToAddToAlbum, images, setImages } = useContext(AdminContext);
    const [fetchAlbumsState, setFetchAlbumsState] = useState({
        loading: false,
        error: false,
    });

    const selectAlbum = (album) => {
        if(selectedAlbum === album){
            setSelectedAlbum(null);
        } else {
            setSelectedAlbum(album);
        }
    }

    useEffect(()=>{
        const handleClickOutsideModal = (e) => {
            if(modalRef.current && !modalRef.current.contains(e.target)){
                setModalToAddToAlbumIsOpen(false);
            }
        }
        fetchAlbums();

        document.addEventListener("click", handleClickOutsideModal);

        return () => document.removeEventListener("click", handleClickOutsideModal);
    },[])

    const fetchAlbums= async () => {
        setFetchAlbumsState({
            loading: true,
            error:false
        })
        try {
            const response = await fetch("/api/getAlbumsFromCloudinary",{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(response.ok){
                const data = await response.json();
                console.log(data)
                setAlbums(data.folders);
                setFetchAlbumsState({
                    loading: false,
                    error:false
                })
            }else {
                setFetchAlbumsState({
                    loading: false,
                    error:true
                })
                notify("Errore durante il caricamento degli album", "error");
            }
        } catch (error) {
            console.log(error);
            setFetchAlbumsState({
                loading: false,
                error:true
            })
            notify("Errore durante il caricamento degli album", "error");
        }
    };

    const addToExistingAlbum = async () =>{
        if(selectedAlbum === null){
            notify("Seleziona un album", "error");
        }
        try {
            setFetchAlbumsState({
                loading: true,
                error:false
            })
            const response = await fetch("/api/addToExistingAlbum",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    images: checkedCheckboxesToAddToAlbum,
                    albumName: selectedAlbum
                })
            });
            if(response.ok){
                const data = await response.json();
                console.log(data)
                /* const filteredImages = images.filter(image => !checkedCheckboxesToAddToAlbum.includes(image.public_id));
                const updatedImages = [...data, ...filteredImages];
                setImages(updatedImages); */
                setFetchAlbumsState({
                    loading: false,
                    error:false
                })
                notify("Immagini aggiunte all'album", "success");
                setSelectedAlbum(null);
                setModalToAddToAlbumIsOpen(false);
            }else {
                setFetchAlbumsState({
                    loading: false,
                    error:false
                })
                notify("Errore durante l'aggiunta delle immagini all'album", "error");
            }
        } catch (error) {
            console.log(error);
            setFetchAlbumsState({
                loading: false,
                error:false
            })
            notify("Errore durante l'aggiunta delle immagini all'album", "error");
        }
    }
  return (
    <main className={styles.container}>
        <section ref={modalRef} className={styles.modal}>
            <FontAwesomeIcon onClick={()=>setModalToAddToAlbumIsOpen(false)} className={styles.closeIcon} icon={faX} />
            <AlbumList addToExistingAlbum={addToExistingAlbum} albums={albums} fetchAlbumsState={fetchAlbumsState} selectAlbum={selectAlbum} selectedAlbum={selectedAlbum} />
            <CreateNewAlbum />
        </section>
    </main>
  )
}
