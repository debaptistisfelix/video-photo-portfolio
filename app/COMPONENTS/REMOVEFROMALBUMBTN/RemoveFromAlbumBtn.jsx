"use client"
import styles from './RemoveFromAlbumBtn.module.css';
import { useContext } from 'react';
import { AdminContext } from '../CONTEXT/AdminContext';

export default function RemoveFromAlbumBtn() {
  const { setModalToRemoveFromAlbumIsOpen} = useContext(AdminContext);
  return (
    <div onClick={()=>{setModalToRemoveFromAlbumIsOpen(true)}} className={styles.btn}>
        Rimuovi da Album
    </div>
  )
}