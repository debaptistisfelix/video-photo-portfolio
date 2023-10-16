"use client"
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export default function AdminContextProvider({children}) {
    const [images, setImages] = useState(null);
    const [imagesForUser, setImagesForUser] = useState(null);
    return (
        <AdminContext.Provider value={{
            images,
            setImages,
            imagesForUser,
            setImagesForUser
        }}>
            {children}
        </AdminContext.Provider>
    )
}