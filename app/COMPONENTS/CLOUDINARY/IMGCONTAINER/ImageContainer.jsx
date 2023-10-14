"use client"
import styles from "./ImageContainer.module.css";
import { CldImage } from 'next-cloudinary';
import { useState } from "react";
import { useEffect } from "react";

export default function ImageContainer({image, windowWidth, getSizeFromWidth}) {
    const [photoSpans, setPhotoSpans] = useState(250);

    const setRowSpan = () => {
       const imageWidth = getSizeFromWidth();
        const aspectRatio = image.height / image.width;
        const galleryHeight = Math.ceil(imageWidth * aspectRatio);
        const photoSpans = Math.ceil(galleryHeight / 10) + 1
        setPhotoSpans(photoSpans);
    }

    useEffect(()=>{
        setRowSpan();
    },[windowWidth])

  return (
    <div
    style={{ gridRow: `span ${photoSpans}`, width: `${getSizeFromWidth()}px` }}
    className={styles.imgContainer}>
        <CldImage
        className={styles.image}
        width={image.width}
        height={image.height}
        src={image.public_id}
        sizes="250px"
        alt="Description of my image"
      />
    </div>
  )
}
