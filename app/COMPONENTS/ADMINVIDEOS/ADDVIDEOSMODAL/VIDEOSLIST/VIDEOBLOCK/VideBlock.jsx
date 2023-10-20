"use client"
import styles from "./VideoBlock.module.css"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function VideBlock({video, removeVideo}) {
    const [removeStates, setRemoveStates] = useState({
        wantToRemove: false,
    })


    const toggleIsGettingRemoved = () => {
        setRemoveStates({
            ...removeStates,
            wantToRemove: !removeStates.wantToRemove,
        })
    }   
  return (
    <div className={styles.block}>
        <Image className={styles.thumbnail} width={90} height={60} src={video.thumbnail} alt="thumbnail" sizes="90px" />
       {removeStates.wantToRemove === false ? <>
        <Link target="_blank" className={styles.link} href={video?.link}>
            {video?.title}
        </Link>
        <FontAwesomeIcon onClick={toggleIsGettingRemoved} icon={faTrash} className={styles.deleteIcon} />
       </> : <>
       <div className={styles.btnContainer}>
        <div onClick={toggleIsGettingRemoved} className={styles.btn}>Annulla</div>
        <div onClick={()=>{removeVideo(video.id)}} className={styles.btn}>Elimina</div>
       </div>
       </>}
    </div>
  )
}
