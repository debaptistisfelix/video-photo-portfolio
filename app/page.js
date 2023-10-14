import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


export default function Home() {
  return (
    <main className={styles.main}>
    <Image src="/paris.jpg" alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
    style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw" />
    
    <section className={styles.content}>

      <h1 className={styles.title}>Simone Capozzi</h1>
    
      <div className={styles.navigation}>
        <Link href="/video" className={styles.link}>Video</Link>
        <Link href="/foto" className={styles.link}>Foto</Link>
       
      </div>

      <div className={styles.socialContainer}>
        <div className={styles.iconContainer}>
          <Link href="https://instagram.com/_simonecapozzi?igshid=MzRlODBiNWFlZA==" target="_blank" className={styles.iconLink}>
            <FontAwesomeIcon icon={faInstagram} className={styles.icon}/>
          </Link>
          <Link href="mailto:simonecapozzi.fotoevideo@gmail.com" className={styles.iconLink}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon}/>
          </Link>
        </div>
        <p className={styles.parag}>Videomaker, Editor e Fotografo</p>
      </div>
    </section>
    
    </main>
  )
}
