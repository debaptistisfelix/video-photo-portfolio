import styles from './VideoSection.module.css'
import VideoCategory from '../VIDEOCATEGORY/VideoCategory'
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'

const videos = [
    {
        title: "JACK NBC",
        img: "logo-nic.jpg",
        text: "Questa Playlist contiene: 14 video.",
        id: "1",
        social: [
            {
                name: "Instagram",
                icon: faInstagram,
                link: "https://www.instagram.com/moto.it/"
            },
            {
                name: "Youtube",
                icon: faYoutube,
                link: "https://www.youtube.com/user/motodotit"
            },
            {
                name: "Tiktok",
                icon: faTiktok,
                link: "https://www.tiktok.com/@motoit"
            }
        ]
    },
    {
        title: "MOTO.IT",
        img: "logo-moto.jpg",
        text: "Questa Playlist contiene: 14 video.",
        color:"#FFDE01",
        backgroundColor: "#191919",
        id: "2",
        social: [
           
            {
                name: "Youtube",
                icon: faYoutube,
                link: "https://www.youtube.com/user/motodotit"
            },
            
        ]
    },
    {
        title: "ROSSO CORSA",
        img: "logo-rosso.jpg",
        text: "Questa Playlist contiene: 14 video.",
        backgroundColor: "#d90429",
        color:"white",
        backgroundColor:"#FC0402",
        id: "3",
        social: [
            {
                name: "Instagram",
                icon: faInstagram,
                link: "https://www.instagram.com/moto.it/"
            },
            {
                name: "Youtube",
                icon: faYoutube,
                link: "https://www.youtube.com/user/motodotit"
            },
            {
                name: "Tiktok",
                icon: faTiktok,
                link: "https://www.tiktok.com/@motoit"
            }
        ]
    },
    {
        title: "GC VIDEOMAKING",
        img: "logo-suo.jpg",
        text: "Questa Playlist contiene: 14 video.",
        color:"white",
        backgroundColor:"#FC0402",
        id: "4",
        social: [
           
            {
                name: "Youtube",
                icon: faYoutube,
                link: "https://www.youtube.com/user/motodotit"
            },
            
        ]
    },
]


export default function VideoSection() {
  return (
    <section className={styles.videoSection}>
        {videos.map((video, index) => {
            return (
                <VideoCategory key={index} video={video} />
            )
        })}
    </section>
  )
}
