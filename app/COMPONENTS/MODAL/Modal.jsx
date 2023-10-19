"use client"
import styles from './Modal.module.css';
import { useEffect, useRef } from 'react';

export default function Modal({parag, btn1Text, btn2Text, btn1Func, btn2Func}) {
    const modalRef = useRef(null);

    useEffect(()=>{
        const handleClickOutsideModal = (e) => {
            if(modalRef.current && !modalRef.current.contains(e.target)){
                btn1Func();
            }
        }

        document.addEventListener("click", handleClickOutsideModal);

        return () => document.removeEventListener("click", handleClickOutsideModal);
    },[])
  return (
   <main className={styles.container}>
     <section ref={modalRef} className={styles.modal}>
        <p className={styles.removeParag}>{parag}</p>
        <div className={styles.removeBtnContainer}>
          <div onClick={btn1Func} className={styles.cancelBtn}>{btn1Text}</div>
          <div
          onClick={btn2Func}
          className={styles.confirmBtn}>{btn2Text}</div>
        </div>
      </section>
   </main>
  )
}
