"use client"

import styles from './Login.module.css'
import { useState } from 'react'
import ProfilePicture from "@/public/capozzo.jpg"
import Image from 'next/image'
import notify from '@/lib/toastNotify'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import FullscreenLoader from '../FULLSCREENLOADER/FullscreenLoader'
import {Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

export default function Login() {
    const [data, setData] = useState({username: '', password: ''})
    const [loading, setloading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event) => {
        setloading(true)
        event.preventDefault()
        if(!data.username || !data.password) return notify('Inserisci tutti i campi', 'error')
       signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback)=>{
            console.log(callback)
            if(callback.error){
                console.log(callback.error)
                notify("Credenziali non corrette", 'error')
                setloading(false)
            } 

            if(callback?.ok && !callback?.error){
                notify('Login effettuato con successo', 'success')
                setloading(false)
            }
        })

      
    }


  return (
    <section className={styles.container}>
        {loading === true ? <FullscreenLoader /> : <div className={styles.loginCard}>
        <Image width={100} height={100} sizes="100vw" src={ProfilePicture} className={styles.profilePic} alt="profilepic" placeholder='blur' />
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input placeholder='Username' onChange={()=>{
                setData({...data, username: event.target.value})
            }} value={data.username} type="text" className={styles.input} />
            <input placeholder='Password' onChange={()=>{
                setData({...data, password: event.target.value})
            }} value={data.password} type="password" className={styles.input} />
            <button type="submit"  className={`${styles.btn} ${montserrat.className}`}>Sign In</button>
        </form>
    </div>}
    </section>
  )
}
