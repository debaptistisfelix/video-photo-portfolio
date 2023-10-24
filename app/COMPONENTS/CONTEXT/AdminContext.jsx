"use client"
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export default function AdminContextProvider({children}) {
    const [images, setImages] = useState(null);
    const [imagesForUser, setImagesForUser] = useState(null);
    const [fullScreenImageLoadedComplete, setFullScreenImageLoadedComplete] = useState(false);
    const [checkedCheckboxesToRemove, setCheckedCheckboxesToRemove] = useState([]);
    const [checkedCheckboxesToAddToAlbum, setCheckedCheckboxesToAddToAlbum] = useState([]);
    const [checkedCheckboxToRemoveFromAlbum, setCheckedCheckboxToRemoveFromAlbum] = useState([]);
    const [isRemovingImages, setIsRemovingImages] = useState(false);
    const [modalToAddToAlbumIsOpen, setModalToAddToAlbumIsOpen] = useState(false);
    const [modalToRemoveFromAlbumIsOpen, setModalToRemoveFromAlbumIsOpen] = useState(false);
    const [playlists, setPlaylists] = useState(null);
    const [addingToPlaylist, setAddingToPlaylist] = useState(false);




    return (
        <AdminContext.Provider value={{
            images,
            setImages,
            imagesForUser,
            setImagesForUser,
            fullScreenImageLoadedComplete,
            setFullScreenImageLoadedComplete,
            checkedCheckboxesToRemove, setCheckedCheckboxesToRemove,
            checkedCheckboxesToAddToAlbum, setCheckedCheckboxesToAddToAlbum,
            checkedCheckboxToRemoveFromAlbum, setCheckedCheckboxToRemoveFromAlbum,
            isRemovingImages, setIsRemovingImages,
            modalToAddToAlbumIsOpen, setModalToAddToAlbumIsOpen,
            modalToRemoveFromAlbumIsOpen, setModalToRemoveFromAlbumIsOpen,
            playlists, setPlaylists,
            addingToPlaylist, setAddingToPlaylist,
        }}>
            {children}
        </AdminContext.Provider>
    )
}