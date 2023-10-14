import Navbar from "../NAVBAR/Navbar";
import Image from "next/image";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
    return(
        <>
        <Navbar />
        <Image src="/paris.jpg" alt="paris-skyline" className={styles.backgroundImg} width={0} height={0}
        style={{width: "100vw", height:"100vh"}} quality={100} priority={true} sizes="100vw" />
        {children}
        </>
    )
}

