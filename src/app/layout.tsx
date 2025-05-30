import type { Metadata } from 'next'
import { Providers } from './provider'
import '../styles/globals.css'
import 'swiper/css/bundle'
import '../styles/testimonialsSwiperStyles.module.css'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'ThinkTrail LMS | Fourth IT Academy',
  description: 'Learning Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}