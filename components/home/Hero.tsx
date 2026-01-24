import Button from '../ui/Button'
import { H1 } from '../ui/Heading'


export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6 text-center pt-24 gap-6">
      {/* Main Heading */}
      <H1>Welcome to the WeDoThings community</H1>

      {/* Subheading */}
      <h2 className="text-5xl md:text-6xl font-extrabold opacity-90">
        Build. Ship. Share.
      </h2>

      {/* Description */}
      <p className="text-xl md:text-2xl max-w-2xl">
        Join events, submit projects, and showcase your creativity to the world.
      </p>

      {/* Buttons */}
    <div className="flex flex-col sm:flex-row items-center gap-6 sm:space-x-16 sm:space-y-0 mt-8 hero-button-container">
  <Button variant="primary" href="/projects">
    Explore Projects
 </Button>
  <Button variant="secondary" href="/login">
    Sign In
  </Button>

</div>
    </section>
  )
}
