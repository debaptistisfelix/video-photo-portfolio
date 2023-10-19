"use client"
import styles from './VideoGallery.module.css';
import UploadBtn from '../../CLOUDINARY/UPLOADBUTTON/UploadBtn';
import RemoveBtn from '../../CLOUDINARY/REMOVEBTN/RemoveBtn';
import { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../CONTEXT/AdminContext';
import Loader from '../../LOADER/Loader';
import AdminPlaylist from '../ADMINPLAYLIST/AdminPlaylist';
import toast, { Toaster } from 'react-hot-toast';
import FullscreenLoader from '../../FULLSCREENLOADER/FullscreenLoader';
import AddPlaylistModal from '../ADDPLAYLISTMODAL/AddPlaylistModal';

export default function VideoGallery() {
    const {playlists, setPlaylists,  isRemovingPlaylist, setIsRemovingPlaylist, addingToPlaylist, setAddingToPlaylist} = useContext(AdminContext);
    const [fetchVideosState, setFetchVideosState] = useState({
        loading: true,
        error: false
    });
    const [removingLoadingState, setRemovingLoadingState] = useState({
        success: false,
        loading: false,
      });

      const notify = (text, status) => toast(<>{text}</>, {
        style:{
            backgroundColor: status === "success" ? "white" : "red",
            color: status === "success" ? "gray" : "white",
        }
       });
    
    

    const fetchVideos = async () => {
        setFetchVideosState({
            loading: true,
            error: false
        })
        try{
            const response = await fetch('/api/playlists',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: "no-store"
            });
            if(!response.ok){
                setFetchVideosState({
                    loading: false,
                    error: true
                })
            } else {
                const data = await response.json();
                setPlaylists(data);
                setFetchVideosState({
                    loading: false,
                    error: false
                })
            }
        }
        catch(error){
            console.log(error)
            setFetchVideosState({
                loading: false,
                error: true
            })
            }
        }
    

    useEffect(()=>{
        playlists === null ? fetchVideos() : setFetchVideosState({
            loading: false,
            error: false
        })
    },[])

    const removePlaylist = async (playlistId) => {
        setIsRemovingPlaylist(false);
        setRemovingLoadingState({
            loading: true,
            success: false,
            })
        try {
            const response = await fetch(`/api/playlist/${playlistId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: "no-store"
            })
            if (!response.ok) {
                console.log("Errore nella richiesta al server.")
                setRemovingLoadingState({
                    loading: false,
                    success: false,
                    })
                    notify("Errore durante l'eliminazione delle immagini", "error")
            } else {
                const data = await response.json();
                console.log(data)
                setPlaylists((prevPlaylists) => prevPlaylists.filter((playlist) => playlist.id !== playlistId));
                setRemovingLoadingState({
                    loading: false,
                    success: true,
               
                  })
                  notify("Playlist eliminata con successo", "success")
            }
        } catch (error) {
            console.log(error)
            setRemovingLoadingState({
                loading: false,
                success: false,
              })
              notify("Errore durante l'eliminazione delle immagini", "error")
        }
    };

    const createNewPlaylist = async (data) => {
        setRemovingLoadingState({
            loading: true,
            success: false,
        })
        try{
            const response = await fetch('/api/playlists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            if(!response.ok){
                console.log("Errore nella richiesta al server.")
                setRemovingLoadingState({
                    loading: false,
                    success: false,
                    })
                    notify("Errore durante creazione della playlist", "error")
            } else {
                const data = await response.json();
                console.log(data)
                setPlaylists((prevPlaylists) => [...prevPlaylists, data]);
                setRemovingLoadingState({
                    loading: false,
                    success: true,
               
                  })
                  notify("Playlist creata con successo", "success")
            }
        }
        catch(error){
            console.log(error)
            setRemovingLoadingState({
                loading: false,
                success: false,
              })
              notify("Errore durante creazione della playlist", "error")
        }
    };

    
  return (
   <>
    <section className={styles.categorySection}>
        <div className={styles.categoryNav}>
        <h1 className={styles.bannerTitle}>GALLERIA VIDEO <b className={styles.fotoCount}>({playlists?.length ? playlists?.length : "0"} Playlists)</b></h1>
      <div className={styles.btnContainer}>
      <div onClick={()=>{
        setAddingToPlaylist(true)
      }} className={styles.addBtn}>Aggiungi</div>
      </div>
      </div>

      <div className={styles.videosGallery}>
      {fetchVideosState.loading === true && <div className={styles.loaderContainer}>
  <Loader />
  <h1 className={styles.fetchLoading}>Loading</h1>
  </div>}
  {fetchVideosState.error === true && <h1 className={styles.fetchError}>Errore nella richiesta al server.</h1>}
  {playlists !== null && fetchVideosState.loading !== true && fetchVideosState.error !== true && playlists.map((playList, index) => {
            return   <AdminPlaylist key={index} playList={playList} removePlaylist={removePlaylist}  />
            
        })}
      </div>
      
    </section>
    {
        removingLoadingState.loading === true && <FullscreenLoader />
      }
      {addingToPlaylist === true && <AddPlaylistModal createNewPlaylist={createNewPlaylist}/>}
   </>
  )
}
