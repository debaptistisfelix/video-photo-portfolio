"use client"
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export default function AdminContextProvider({children}) {
    //State variable that contain all the gallery images from cloudinary
    const [images, setImages] = useState(null);
    const [imagesForUser, setImagesForUser] = useState(null);

    //State variables of the cloudinary albums
    const [albums, setAlbums] = useState(null);
    const [displayedAlbum, setDisplayedAlbum] = useState(null);

    const [fullScreenImageLoadedComplete, setFullScreenImageLoadedComplete] = useState(false);

    // State variables to handle the images that are checked based on what you need to do with them
    const [checkedCheckboxesToRemove, setCheckedCheckboxesToRemove] = useState([]);
    const [checkedCheckboxesToAddToAlbum, setCheckedCheckboxesToAddToAlbum] = useState([]);
    const [checkedCheckboxToRemoveFromAlbum, setCheckedCheckboxToRemoveFromAlbum] = useState([]);

    // State variables to handle the modal show and hide 
    const [modalToRemoveImagesIsOpen, setModalToRemoveImagesIsOpen] = useState(false);
    const [modalToAddToAlbumIsOpen, setModalToAddToAlbumIsOpen] = useState(false);
    const [modalToRemoveFromAlbumIsOpen, setModalToRemoveFromAlbumIsOpen] = useState(false);

    // Admin Playlists
    const [playlists, setPlaylists] = useState(null);
    //State variable to show and hide the modal to add playlist 
    const [addingToPlaylist, setAddingToPlaylist] = useState(false);

    //Loading State variables for the images displayed on fullScreen
    const [fullscreenLoadingState, setFullscreenLoadingState] = useState(false);
    //loafing state variables for the images displayed on the gallery
    const [galleryLoadingState, setGalleryLoadingState] = useState({
        loading: false,
        error: false,
    });


    //State variable to handle windowWidth
    const [windowWidth, setWindowWidth] = useState(null);

    const handleWindowResize = () => setWindowWidth(window.innerWidth);

    //Function to get the right sizes of the images in the grid based on the windowWidth state
    const getSizeFromWidth = () => {
        if(windowWidth <= 500){
            return "150";
        } else if(windowWidth > 500 && windowWidth <= 800){
            return "150";
        } else if(windowWidth > 800){
            return "250";
        }
    }



    return (
        <AdminContext.Provider value={{
            images,
            setImages,
            imagesForUser,
            setImagesForUser,

            albums, setAlbums,
            displayedAlbum, setDisplayedAlbum,
            


            fullScreenImageLoadedComplete,
            setFullScreenImageLoadedComplete,


            checkedCheckboxesToRemove, setCheckedCheckboxesToRemove,
            checkedCheckboxesToAddToAlbum, setCheckedCheckboxesToAddToAlbum,
            checkedCheckboxToRemoveFromAlbum, setCheckedCheckboxToRemoveFromAlbum,


            modalToRemoveImagesIsOpen, setModalToRemoveImagesIsOpen,
            modalToAddToAlbumIsOpen, setModalToAddToAlbumIsOpen,
            modalToRemoveFromAlbumIsOpen, setModalToRemoveFromAlbumIsOpen,


            playlists, setPlaylists,
            addingToPlaylist, setAddingToPlaylist,

            fullscreenLoadingState, setFullscreenLoadingState,
            galleryLoadingState, setGalleryLoadingState,

            windowWidth, setWindowWidth,
            handleWindowResize,
            getSizeFromWidth,

}}>
            {children}
        </AdminContext.Provider>
    )
}