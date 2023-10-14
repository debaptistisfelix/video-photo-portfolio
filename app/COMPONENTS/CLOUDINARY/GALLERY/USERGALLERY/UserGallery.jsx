"use client"
import styles from './UserGallery.module.css'
import { CldImage } from 'next-cloudinary';
import ImageContainer from '../../IMGCONTAINER/ImageContainer';
import { useState } from "react";
import { useEffect } from "react";


export default function UserGallery({results}) {
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(()=>{
        const handleWindowResize = () => setWindowWidth(window.innerWidth);

        handleWindowResize();

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    },[])


    const getSizeFromWidth = () => {
        if(windowWidth <= 500){
            return "100";
        } else if(windowWidth > 500 && windowWidth <= 800){
            return "150";
        } else if(windowWidth > 800){
            return "250";
        }
    }

   /*  const maxColumns = 4;

    const getColumns = (colIndex)=>{
        return results.filter((image, index)=>{
            return index % maxColumns === colIndex;
        });
    } */

  return (
    <section className={styles.gallery}
    style={{gridTemplateColumns: `repeat(auto-fit, minmax(${getSizeFromWidth()}px, 1fr))`}}
    >

        {/* {
            [
                getColumns(0),
                getColumns(1),
                getColumns(2),
                getColumns(3)
            ].map((column, index) =>{
                return <div key={index} className={styles.singleColumn}>
                    {column.map((image, index) => {
                        return<CldImage
                        className={styles.image}
                        key={index}
                        width="200"
                        height="200"
                        style={{width: "100%", height:"auto"}}                        src={image.public_id}
                        sizes="50vw"
                        alt="Description of my image"
                    />
                    })}
                </div>
            })
        } */}
     {windowWidth !== null && results.map((image, index) => {
        return <ImageContainer key={index} image={image} windowWidth={windowWidth} getSizeFromWidth={getSizeFromWidth} />
      })}
    </section>
  )
}
