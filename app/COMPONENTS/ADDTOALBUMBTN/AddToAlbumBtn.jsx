"use client"
import styles from './AddToAlbumBtn.module.css';
import { useContext } from 'react';
import { AdminContext } from '../CONTEXT/AdminContext';

export default function AddToAlbumBtn() {
  const { setModalToAddToAlbumIsOpen} = useContext(AdminContext);
  return (
    <div onClick={()=>{setModalToAddToAlbumIsOpen(true)}} className={styles.btn}>
        Aggiungi ad Album
    </div>
  )
}