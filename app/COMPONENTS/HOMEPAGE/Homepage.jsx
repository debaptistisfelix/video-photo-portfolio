"use client"
import Image from 'next/image'
import styles from './Homepage.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import LogoImage from '@/public/logoHome.png'



export default function Homepage() {
  return (
    <section className={styles.content}>

    <div className={styles.logoImgContainer}>
    <Image className={styles.logoImg} src={LogoImage} alt="logo" 
    width={500} height={100} quality={100} priority={true} sizes="(min-width: 520px) 40vw, 90vw" srcSet="
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoHome.a7f9ad0c.png&w=640&q=100 640w,
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoHome.a7f9ad0c.png&w=750&q=100 750w,
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoHome.a7f9ad0c.png&w=828&q=100 828w,
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoHome.a7f9ad0c.png&w=1080&q=100 1080w,
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoHome.a7f9ad0c.png&w=1200&q=100 1200w,
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoHome.a7f9ad0c.png&w=1920&q=100 1920w,
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoHome.a7f9ad0c.png&w=2048&q=100 2048w,
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoHome.a7f9ad0c.png&w=3840&q=100 3840w
  "/>
  <Link href="/admin" className={styles.loginLink}></Link>
    </div>
    
    
  
    <div className={styles.navigation}>
      <Link href="/video" className={`${styles.link} ${styles.firstLink}`}>Video</Link>
      <Link href="/foto" className={`${styles.link} ${styles.secondLink}`}>Foto</Link>
     
    </div>

    <div className={styles.socialContainer}>
      <div className={styles.iconContainer}>
        <Link href="https://instagram.com/_simonecapozzi?igshid=MzRlODBiNWFlZA==" target="_blank" className={styles.iconLink}>
          <FontAwesomeIcon icon={faInstagram} className={`${styles.icon} ${styles.leftIcon}`}/>
        </Link>
        <Link href="mailto:simonecapozzi.fotoevideo@gmail.com" className={styles.iconLink}>
          <FontAwesomeIcon icon={faEnvelope} className={`${styles.icon} ${styles.rightIcon}`}/>
        </Link>
      </div>
      <p className={styles.parag}>Videomaker, Editor e Fotografo</p>
    </div>
  </section>
  )
}
