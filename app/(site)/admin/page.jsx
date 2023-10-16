import styles from './page.module.css'
import Navbar from '@/app/COMPONENTS/NAVBAR/Navbar';
import Image from 'next/image';
import AdminContent from '@/app/COMPONENTS/CLOUDINARY/ADMINSECTION/AdminContent';
import cloudinary from 'cloudinary';


export default async function Page() {
  cloudinary.v2.api
.resources()
.then(result=>console.log(result.rate_limit_allowed,
              result.rate_limit_remaining,
              result.rate_limit_reset_at));



  return (
    <main className={styles.main}>
      <Navbar />
      <Image src="/paris.jpg" alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
        style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw" />
      <AdminContent  />
    </main>
  )
}
