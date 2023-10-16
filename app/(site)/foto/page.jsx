import styles from './page.module.css'
import Navbar from '@/app/COMPONENTS/NAVBAR/Navbar';
import Image from 'next/image';
import cloudinary from 'cloudinary';
import UserGallery from '@/app/COMPONENTS/CLOUDINARY/GALLERY/USERGALLERY/UserGallery';


export default async function Page() {
  const results = await cloudinary.v2.search
  .expression('resource_type:image')
  .sort_by('created_at','desc')
  .max_results(500)
  .execute()
  .then(result=>{
    return result.resources;
  });
  return (
    <main className={styles.main}>
      <Navbar />
      <Image src="/paris.jpg" alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
        style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw" />
      <section className={styles.content}>
        <h1 className={styles.title}>Galleria Foto</h1>
        <UserGallery results={results} />
        </section>
    </main>
  )
}
