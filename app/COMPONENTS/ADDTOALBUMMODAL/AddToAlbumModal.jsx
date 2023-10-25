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
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const modalRef = useRef(null);
    const { setModalToAddToAlbumIsOpen, checkedCheckboxesToAddToAlbum, setCheckedCheckboxesToAddToAlbum, images, setImages, setFullscreenLoadingState, albums, setAlbums } = useContext(AdminContext);
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

    console.log("albums", albums)

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
            setModalToAddToAlbumIsOpen(false);
            setFullscreenLoadingState(true)
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
                notify("Immagini aggiunte all'album", "success");
                setSelectedAlbum(null);
                setCheckedCheckboxesToAddToAlbum([]);
                setFullscreenLoadingState(false)
            }else {
                setFullscreenLoadingState(false)
                notify("Errore durante l'aggiunta delle immagini all'album", "error");
            }
        } catch (error) {
            console.log(error);
            setFullscreenLoadingState(false)
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
