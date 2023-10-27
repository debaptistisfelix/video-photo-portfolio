"use client"
import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBarLogo from "@/public/shutter.png"
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import { signOut } from "next-auth/react"
import notify from '@/lib/toastNotify';
import ProfilePic from "@/public/capozzo.jpg"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(null);
    const [windowWidth, setWindowWidth] = useState(null);
    const { data: session, status } = useSession();

    

    const logOut = () => {
        if(process.env.NODE_ENV === "development"){
            signOut({callbackUrl: "http://localhost:3000"})
            notify("Logout in corso", "success")
        } else {
            signOut({callbackUrl: `https://${process.env.VERCEL_URL}`})
            notify("Logout in corso", "success")
        }
    }

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
{status === "authenticated" && <div onClick={logOut} className={styles.navLink}>Log Out</div>}
{status === "authenticated" && <Link href="/admin">
<Image src={ProfilePic} alt="profilepic" className={styles.profilePic} width={35} height={35}  />
    </Link>}
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
    {status === "authenticated" &&  <Link href="/admin" className={styles.mobileNavLink}>Dashboard</Link>}
    <Link href="/video" className={styles.mobileNavLink}>Video</Link>
    <Link href="/foto" className={styles.mobileNavLink}>Foto</Link>
    {status === "authenticated" && <div onClick={logOut} className={styles.mobileNavLink}>Log Out</div>}
    </div>

        </nav>
    </main>
   
    </>
  )
}
