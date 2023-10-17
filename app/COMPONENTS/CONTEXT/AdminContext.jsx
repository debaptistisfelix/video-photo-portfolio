"use client"
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export default function AdminContextProvider({children}) {
    const [images, setImages] = useState(null);
    const [imagesForUser, setImagesForUser] = useState(null);
    const [fullScreenImageLoadedComplete, setFullScreenImageLoadedComplete] = useState(false);
    const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
    const [isRemovingImages, setIsRemovingImages] = useState(false);


    return (
        <AdminContext.Provider value={{
            images,
            setImages,
            imagesForUser,
            setImagesForUser,
            fullScreenImageLoadedComplete,
            setFullScreenImageLoadedComplete,
            checkedCheckboxes, setCheckedCheckboxes,
            isRemovingImages, setIsRemovingImages
        }}>
            {children}
        </AdminContext.Provider>
    )
}