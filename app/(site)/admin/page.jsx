import styles from './page.module.css'
import Navbar from '@/app/COMPONENTS/NAVBAR/Navbar';
import Image from 'next/image';
import AdminContent from '@/app/COMPONENTS/CLOUDINARY/ADMINSECTION/AdminContent';
import cloudinary from 'cloudinary';


export default async function Page() {
  const results = await cloudinary.v2.search
  .expression('resource_type:image')
  .sort_by('created_at','desc')
  .max_results(15)
  .execute()
  .then(result=>{
    return result.resources;
  });

  return (
    <main className={styles.main}>
      <Navbar />
      <Image src="/paris.jpg" alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
        style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw" />
      <AdminContent results={results} />
    </main>
  )
}
