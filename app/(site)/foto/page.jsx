import Image from 'next/image'
import styles from './page.module.css'
import Layout from '@/app/COMPONENTS/LAYOUT/Layout'
import Gallery from '@/app/COMPONENTS/GALLERY/Gallery'


export default function Page() {
  return (
    <main className={styles.main}>
      <Layout>
        <section className={styles.content}>
          <Gallery />
        </section>
      </Layout>
    </main>
  )
}
