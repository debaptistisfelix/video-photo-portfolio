"use client"
import styles from "./UploadBtn.module.css";
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from "next/navigation";

export default function UploadBtn() {
  const router = useRouter();
  return (
    <>
    <CldUploadButton
    onUpload={(result) => {
      setTimeout(() => {
        router.refresh();
      }, 5000);
    }}
    uploadPreset="testing"
    className={styles.uploadCloudinaryBtn} /></>
  )
}
