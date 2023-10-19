"use client"
import styles from './AdminPlaylist.module.css';
import { useState, useEffect, useRef,useContext } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AdminContext } from '../../CONTEXT/AdminContext';
import Modal from '../../MODAL/Modal';

export default function AdminPlaylist({playList, removePlaylist}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {isRemovingPlaylist, setIsRemovingPlaylist} = useContext(AdminContext);
    const modalRef = useRef(null);
    const barsIconRef = useRef(null);

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }
    useEffect(()=>{
        const handleClickOutsideModal = (e) => {
            if(modalRef.current && !modalRef.current.contains(e.target)){
                if(!barsIconRef.current.contains(e.target)){
                    setModalIsOpen(false);
                }
            }
        }

        document.addEventListener("click", handleClickOutsideModal);

        return () => document.removeEventListener("click", handleClickOutsideModal);
    }, [])

  return (
    <>
    <div className={styles.container}>
        <div className={styles.imgContainer}>
            <Image src={`/${playList?.bannerImg}`} width={200} height={100} alt="banner-img" sizes='100vw'
            className={styles.img}
            />
            <FontAwesomeIcon ref={barsIconRef} onClick={toggleModal} icon={faBars} className={styles.barsIcon}/>
            {modalIsOpen === true && <div ref={modalRef} className={styles.imgModal}>
                <span className={styles.modalOption}>
                    <FontAwesomeIcon icon={faPenToSquare} className={styles.modalIcon}/>
                    Modifica
                </span>
                <span onClick={()=>{
                    toggleModal();
                    setIsRemovingPlaylist(true)
                }} className={styles.modalOption}>
                    <FontAwesomeIcon icon={faTrash} className={styles.modalIcon}/>
                    Elimina
                </span>
            </div>}
        </div>
        <h1 className={styles.title}>{playList?.title}</h1>
    </div>
    {isRemovingPlaylist === true && <Modal
    parag="Eliminare questa Playlist?"
    btn1Text="Annulla"
    btn2Text="Conferma"
    btn1Func={()=>{setIsRemovingPlaylist(false)}}
    btn2Func={()=>{removePlaylist(playList?.id)}}
    />}
    </>
  )
}
