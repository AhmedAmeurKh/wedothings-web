import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import CTA from '@/components/home/CTA'
import Navbar from '@/components/layout/Navbar'

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen gap-32 pt-20">
      <Hero />
      <Features />
<div className="h-32 bg-gradient-to-b from-transparent to-black/20" />

      {/* Push CTA to bottom if content is short */}
      <div className="flex-grow" />

      <CTA />
    </main>
  )
}

