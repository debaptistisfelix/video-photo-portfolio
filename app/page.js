import Image from 'next/image'
import styles from './page.module.css'
import backgroundImg from '../public/parigi.jpeg'
import Homepage from './COMPONENTS/HOMEPAGE/Homepage'

export default function Home() {
  return (
    <main className={styles.main}>
    <Image src={backgroundImg} alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
    style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw"
    placeholder='blur'
    />
    <Homepage/>
    </main>
  )
}
