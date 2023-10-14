import Image from 'next/image'
import styles from './page.module.css'
import Layout from '@/app/COMPONENTS/LAYOUT/Layout'



export default function Page() {
  return (
    <main className={styles.main}>
      <Layout>
        <section className={styles.content}></section>
      </Layout>
    </main>
  )
}

