"use client"
import styles from './RemoveBtn.module.css';
import { useContext } from 'react';
import { AdminContext } from '../../CONTEXT/AdminContext';

export default function RemoveBtn() {
  const {setIsRemovingImages} = useContext(AdminContext);
  return (
    <div onClick={()=>{setIsRemovingImages(true)}} className={styles.btn}>
        Remove
    </div>
  )
}
