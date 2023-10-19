"use client"
import styles from "./UploadBtn.module.css";
import { CldUploadButton } from 'next-cloudinary';
import { useContext } from "react";
import { AdminContext } from "../../CONTEXT/AdminContext";

export default function UploadBtn() {
  const {images, setImages} = useContext(AdminContext);

  const handleUploadAndAddToImages = (result) => {
    const newImage = {
      width: result.info.width,
      height: result.info.height,
      public_id: result.info.public_id,
      url: result.info.url
    }
    setImages([newImage, ...images ]);
    
  }
  return (
    <>
    <CldUploadButton
    onUpload={(result) => {
      handleUploadAndAddToImages(result);
    }}
    uploadPreset="testing"
    className={styles.uploadCloudinaryBtn} /></>
  )
}
