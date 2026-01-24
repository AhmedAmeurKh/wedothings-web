import Navbar from '@/components/layout/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// Load Inter font from Google
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'We Do Things | Hack Club',
  description: 'Events, projects, and creativity powered by Hack Club',
}




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-b from-[rgb(57,0,0)] to-[rgb(200,0,0)] text-white inter">

      <Navbar />
      
        {children}
      </body>
    </html>
  )
}
