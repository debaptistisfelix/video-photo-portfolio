"use client"
import styles from './RemoveBtn.module.css';
import { useContext } from 'react';
import { AdminContext } from '../../CONTEXT/AdminContext';

export default function RemoveBtn() {
  const {setModalToRemoveImagesIsOpen} = useContext(AdminContext);
  return (
    <div onClick={()=>{setModalToRemoveImagesIsOpen(true)}} className={styles.btn}>
        Remove
    </div>
  )
}
