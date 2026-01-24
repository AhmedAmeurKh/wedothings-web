import Button from '../ui/Button'

export default function CTA() {
  return (
    <section className=" sticky bottom-0 py-20 backdrop-blur-md bg-black/20 relative py-24 text-center hero-button-container">
      <div className="max-w-2xl mx-auto px-6 hero-button-container">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to get started?
        </h2>
        <p className="text-xl mb-10 opacity-90">
          Join WeDoThings and start creating
        </p>
        <Button href="/login">Sign In</Button>
      </div>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                                                        
      </p>
    </section>
  )
}
