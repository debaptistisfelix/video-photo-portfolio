import styles from './Loader.module.css';
import Image from 'next/image';
import ShutterImg from "@/public/shutter.png"

export default function Loader({color}) {
  return (
        <div
        style={{border:`5px solid ${color}`}}
        className={styles.loader}>
           <svg className={styles.loaderImg} version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
fill={color} stroke="none">
<path d="M245 631 c-68 -17 -175 -87 -175 -115 0 -20 81 -156 90 -151 5 3 114
188 157 268 5 9 -31 8 -72 -2z"/>
<path d="M318 566 c-22 -39 -43 -74 -45 -78 -2 -5 68 -8 156 -8 104 0 161 4
161 10 0 6 -19 30 -42 53 -45 44 -99 75 -155 88 -33 7 -34 6 -75 -65z"/>
<path d="M24 438 c-23 -50 -26 -189 -6 -225 12 -21 20 -23 97 -23 58 0 85 4
85 12 0 10 -112 210 -145 261 -11 15 -14 12 -31 -25z"/>
<path d="M440 433 c0 -3 35 -66 77 -140 l77 -133 19 35 c23 46 32 148 18 203
l-12 42 -89 0 c-50 0 -90 -3 -90 -7z"/>
<path d="M467 258 c-21 -33 -122 -209 -137 -237 l-12 -24 48 8 c78 11 204 86
204 120 0 11 -69 138 -83 152 -3 2 -12 -6 -20 -19z"/>
<path d="M50 150 c0 -6 19 -30 43 -53 44 -44 98 -75 154 -88 33 -7 34 -6 75
65 22 39 43 74 45 79 2 4 -68 7 -156 7 -104 0 -161 -4 -161 -10z"/>
</g>
</svg>
    </div>

  )
}
