import styles from './AdminGalleryNav.module.css';
import RemoveFromAlbumBtn from '@/app/COMPONENTS/REMOVEFROMALBUMBTN/RemoveFromAlbumBtn';
import RemoveBtn from '../../../REMOVEBTN/RemoveBtn';
import AddToAlbumBtn from '@/app/COMPONENTS/ADDTOALBUMBTN/AddToAlbumBtn';
import UploadBtn from '../../../UPLOADBUTTON/UploadBtn';

import React from 'react'

export default function AdminGalleryNav({
    images,
    checkedCheckboxesToRemove,
    checkedCheckboxesToAddToAlbum,
    checkedCheckboxToRemoveFromAlbum
    }) {
  return (
    <div className={styles.categoryNav}>
    <h1 className={styles.bannerTitle}>GALLERIA FOTO <b className={styles.fotoCount}>({Array.isArray(images) ? images?.length : "0"} file totali)</b></h1>
    <div className={styles.btnContainer}>
    {checkedCheckboxToRemoveFromAlbum && checkedCheckboxToRemoveFromAlbum.length !== 0 && <RemoveFromAlbumBtn />}
    {checkedCheckboxesToRemove && checkedCheckboxesToRemove.length !== 0 && <RemoveBtn />}
    {checkedCheckboxesToAddToAlbum && checkedCheckboxesToAddToAlbum.length !== 0 && <AddToAlbumBtn />}
    <UploadBtn />
    </div>
    </div>
  )
}
