import styles from './Gallery.module.css'
import ImageContainer from '../IMAGECONTAINER/ImageContainer'
import addBlurredDataUrls from '@/lib/getBase64'



const images = [
  "https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1928&q=80",
  "https://images.unsplash.com/photo-1593504049359-74330189a345?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80",
  "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
  "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
  "https://images.unsplash.com/photo-1613564834361-9436948817d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1943&q=80",
  
]

  

export default async function Gallery() {
  const imagesWithBlur = await addBlurredDataUrls(images)

  console.log("images with blurred version:",imagesWithBlur)
  return (
    <main className={styles.gallery}>
        {imagesWithBlur && imagesWithBlur.map((img, i)=>{
            return <ImageContainer key={i} img={img} />
        })}
    </main>
  )
}
