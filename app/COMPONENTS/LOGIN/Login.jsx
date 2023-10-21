"use client"

import styles from './Login.module.css'
import { useState } from 'react'
import ProfilePicture from "@/public/capozzo.jpg"
import Image from 'next/image'
import notify from '@/lib/toastNotify'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [data, setData] = useState({username: '', password: ''})
    const router = useRouter()

 /*    const handleSubmit = async () => {
        if(!data.username || !data.password) return notify('Inserisci tutti i campi', 'error')
       const result = await signIn('credentials', {
            redirect: false,
            username: data.username,
            password: data.password
        })

        if(result.error){
            notify(result.error, 'error')
        } else {
            notify('Login effettuato con successo', 'success')
            router.push('/admin')
        }
    } */

  return (
    <div className={styles.loginCard}>
        <Image width={100} height={100} sizes="100vw" src={ProfilePicture} className={styles.profilePic} alt="profilepic" />
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form}>
            <input placeholder='Username' onChange={()=>{
                setData({...data, username: event.target.value})
            }} value={data.username} type="text" className={styles.input} />
            <input placeholder='Password' onChange={()=>{
                setData({...data, password: event.target.value})
            }} value={data.password} type="password" className={styles.input} />
            <div className={styles.btn}>Sign In</div>
        </form>
    </div>
  )
}
