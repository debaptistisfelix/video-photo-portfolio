import './globals.css'
import {Montserrat } from 'next/font/google'
import AdminContextProvider from './COMPONENTS/CONTEXT/AdminContext'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Simone Capozzi - Portfolio',
  description: 'Portfolio Foto & Video Maker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AdminContextProvider>
          {children}
        </AdminContextProvider>
        </body>
    </html>
  )
}
