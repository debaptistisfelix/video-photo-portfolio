import './globals.css'
import {Montserrat } from 'next/font/google'
import AdminContextProvider from './COMPONENTS/CONTEXT/AdminContext'
import ToastContext from './COMPONENTS/CONTEXT/ToastContext'
import TouchContextProvider from './COMPONENTS/CONTEXT/TouchContext'
const montserrat = Montserrat({ subsets: ['latin'] })
import Provider from './COMPONENTS/CONTEXT/AuthContext'

export const metadata = {
  title: 'Simone Capozzi - Portfolio',
  description: 'Portfolio Foto & Video Maker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider>
        <AdminContextProvider>
          <TouchContextProvider>
          <ToastContext />
          {children}
          </TouchContextProvider>
        </AdminContextProvider>
        </Provider>
        </body>
    </html>
  )
}
