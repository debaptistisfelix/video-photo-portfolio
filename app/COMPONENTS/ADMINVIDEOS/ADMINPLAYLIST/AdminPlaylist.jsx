"use client"
import styles from './AdminPlaylist.module.css';
import { useState, useEffect, useRef,useContext } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../MODAL/Modal';
import AddVideosModal from '../ADDVIDEOSMODAL/AddVideosModal';

export default function AdminPlaylist({playList, removePlaylist}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isRemovingPlaylist, setIsRemovingPlaylist] = useState(false);
    const modalRef = useRef(null);
    const imgRef = useRef(null);
    const [addVideoModalIsOpen, setAddVideoModalIsOpen] = useState(false);


    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }

    const toggleAddVideoModal = () => {
        setAddVideoModalIsOpen(!addVideoModalIsOpen);
    }

    const closeAddVideoModal = () => {
        setAddVideoModalIsOpen(false);
    }

    const closeVideoModalRemovePlaylist = () => {
        setIsRemovingPlaylist(false);
    }


    useEffect(()=>{
        const handleClickOutsideModal = (e) => {
            if(modalRef.current && !modalRef.current.contains(e.target)){
                if(!imgRef.current.contains(e.target)){
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
            <Image ref={imgRef} onClick={toggleModal} src={`${playList?.bannerImg.url}`} width={200} height={100} alt="banner-img" sizes='100vw'
            className={styles.img}
            />
           {/*  <FontAwesomeIcon ref={barsIconRef} onClick={toggleModal} icon={faBars} className={styles.barsIcon}/> */}
            {modalIsOpen === true && <div ref={modalRef} className={styles.imgModal}>
                <span
                onClick={()=>{
                    toggleAddVideoModal();
                }}
                className={styles.modalOption}>
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
    parag={`Eliminare la Playlist'${playList?.title}'?`}
    btn1Text="Annulla"
    btn2Text="Conferma"
    btn1Func={()=>{setIsRemovingPlaylist(false)}}
    btn2Func={()=>{
        setIsRemovingPlaylist(false)
        removePlaylist(playList?.id)
    }}
    />}
    {addVideoModalIsOpen === true && <AddVideosModal playList={playList} closeAddVideoModal={closeAddVideoModal} />}
    </>
  )
}
