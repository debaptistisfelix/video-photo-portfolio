"use client"
import styles from "./UploadBtn.module.css";
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AdminContext } from "../../CONTEXT/AdminContext";

export default function UploadBtn() {
  const {images, setImages} = useContext(AdminContext);
  const router = useRouter();

  const handleUploadAndAddToImages = (result) => {
    const newImage = {
      width: result.info.width,
      height: result.info.height,
      public_id: result.info.public_id,
    }
    setImages([newImage, ...images ]);
  }
  return (
    <>
    <CldUploadButton
    onUpload={(result) => {
      handleUploadAndAddToImages(result);
      /* setTimeout(() => {
        router.refresh();
      }, 5000); */
    }}
    uploadPreset="testing"
    className={styles.uploadCloudinaryBtn} /></>
  )
}
