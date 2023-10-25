"use client"
import styles from "./UploadBtn.module.css";
import { CldUploadButton } from 'next-cloudinary';
import { useContext } from "react";
import { AdminContext } from "../../CONTEXT/AdminContext";

export default function UploadBtn() {
  const {images, setImages} = useContext(AdminContext);

    const handleQueueEnd = (result) => {
    const newImagesArrayRaw = result.info.files
    const newImagesToAddToLibrary = newImagesArrayRaw.map((image)=>{
      return image.uploadInfo
    })
    setImages((prevImages)=>{
      return [...newImagesToAddToLibrary, ...prevImages]
    });
  }
  return (
    <>
    <CldUploadButton
    
    onQueuesEnd={(result) => {
     handleQueueEnd(result);
    }}
    uploadPreset="testing"
    className={styles.uploadCloudinaryBtn} /></>
  )
}
