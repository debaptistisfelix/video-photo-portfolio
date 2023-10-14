"use client"
import styles from './AdminGallery.module.css';
import UploadBtn from '../../UPLOADBUTTON/UploadBtn';
import { CldImage } from 'next-cloudinary';

export default function AdminGallery(results) {
  console.log(results.results)
  return (
    <section className={styles.categorySection}>

    <div className={styles.categoryNav}>
    <h1 className={styles.bannerTitle}>GALLERIA FOTO</h1>
    <UploadBtn />
    </div>

    <div className={styles.imagesGallery}>
      {results.results.map((image, index) => {
        return<CldImage
        className={styles.image}
        key={index}
        width="300"
        height="200"
        src={image.public_id}
        sizes="100vw"
        alt="Description of my image"
      />
      })}
    </div>
  </section>
  )
}
