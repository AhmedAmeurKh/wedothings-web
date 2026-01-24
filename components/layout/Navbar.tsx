import Button from '../ui/Button'
import Image from 'next/image'
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[hc-slate] shadow-md ">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between ">
        
        {/* Logo / Title */}
        <div  className="flex items-center gap-2">
            <Image
                src="HACK CLUB(3).svg"
                alt="WeDoThings Logo"
                width={96}
                height={74}
            />
            <span className="font-bold"></span>
            </div>
        {/* Navigation buttons */}
        <div className="flex items-center gap-4 hero-button-container bg-black/20 p-2 rounded-full">
          <Button href="/">Home</Button>
          <Button href="/projects">Projects</Button>
          <Button variant="secondary" href="/signup">Sign Up</Button>
          <Button variant="secondary" href="/login">Log In</Button>
        </div>

      </nav>
    </header>
  )
}
