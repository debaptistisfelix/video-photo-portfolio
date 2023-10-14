"use client"
import styles from './page.module.css'
import Layout from '@/app/COMPONENTS/LAYOUT/Layout'
import { CldUploadButton } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
 import { useState } from 'react';
 import Navbar from '@/app/COMPONENTS/NAVBAR/Navbar';
 import Image from 'next/image';



export default function Page() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Image src="/paris.jpg" alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
        style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw" />
      <section className={styles.content}>
        </section>
    </main>
  )
}
