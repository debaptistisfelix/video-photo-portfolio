import styles from './page.module.css'
import Navbar from '@/app/COMPONENTS/NAVBAR/Navbar';
import Image from 'next/image';

import UserGallery from '@/app/COMPONENTS/CLOUDINARY/GALLERY/USERGALLERY/UserGallery';
import backgroundImg from '@/public/parigi.jpeg'

export const metadata = {
  title: 'Simone Capozzi - Galleria Foto',
  description: 'Portfolio Foto & Video Maker',
}

export default async function Page() {

  return (
    <main className={styles.main}>
      <Navbar />
      <Image src={backgroundImg} alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
        style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw" placeholder='blur' />
      <section className={styles.content}>
        <h1 className={styles.title}>Galleria Foto</h1>
        <UserGallery   />
        </section>
    </main>
  )
}
