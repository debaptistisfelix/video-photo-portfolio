"use client"
import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBarLogo from "@/public/shutter.png"
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(null);
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        const handleWindowResize = ()=>{
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    },[]);

    useEffect(() => {
        if(windowWidth > 1023){
            setIsOpen(null);
        }
    }, [windowWidth]);


    const toggle = () => {
        if(isOpen === true){
            setIsOpen(false);
        }else{
            setIsOpen(true);
        }
    }
    
  return (
    <>
    <main className={styles.desktopNavbarContainer}>

        <nav className={styles.desktopNavbar}>
        <Link href="/" className={styles.navLink}>Home</Link>

<div className={styles.navLinkContainer}>
<Link href="/video" className={styles.navLink}>Video</Link>
<Link href="/foto" className={styles.navLink}>Foto</Link>

</div>

{<Link href="/" className={styles.logoLink}>
<Image src={NavBarLogo} alt="logo" className={styles.logo} width={40} height={40} />
</Link>}

<div onClick={toggle} className={styles.hamburgerIcon}>
    <div className={` ${styles.bar} ${isOpen && styles.bar1}`}></div>
    <div className={` ${styles.bar} ${isOpen && styles.bar2}`}></div>
    <div className={` ${styles.bar} ${isOpen && styles.bar3}`}></div>
</div>


<div className={`${styles.mobileNavLinkContainer} ${isOpen === true && styles.mobileNavAppears} ${isOpen === false && styles.mobileNavDisappears}`}>
    <Link href="/video" className={styles.mobileNavLink}>Video</Link>
    <Link href="/foto" className={styles.mobileNavLink}>Foto</Link>
    </div>

        </nav>
    </main>
   
    </>
  )
}
