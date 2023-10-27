import styles from './page.module.css'
 import Navbar from '@/app/COMPONENTS/NAVBAR/Navbar';
 import Image from 'next/image';
 import backgroundImg from '@/public/sfocato.jpg'
import PlaylistPage from '@/app/COMPONENTS/VIDEOS/PLAYLISTPAGE/PlaylistPage';

 export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const id = params.id


    const chooseBaseUrl = () => {
        if(process.env.NODE_ENV === "development"){
            return `${process.env.BASE_URL}`
    } else {
        return `https://${process.env.VERCEL_URL}`
    }
    }

    const baseUrl = chooseBaseUrl()

    const fetchPLaylist = async (id) => {
      const res = await fetch(`${baseUrl}/api/playlist/${id}`)
      const data = await res.json()
      return data
    }
  
    try{
      // fetch data
    const playlist = await fetchPLaylist(id)

   
    // optionally access and extend (rather than replace) parent metadata
    
    const title = `${playlist.title} - Portfolio Simone Capozzi`
   
    return {
      title: title,
    }
    }catch(error){
      return {
        title: "Error 404 - Simone Capozzi Portfolio"
      }
    }
  } 

export default function Page({params}) {
  const {id} = params
  return (
    <main className={styles.main}>
      <Navbar />
      <Image src={backgroundImg} alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
        style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw"
        placeholder='blur' />
      <section className={styles.content}>
        <PlaylistPage playlistId={id} />
        </section>
    </main>
  )
}