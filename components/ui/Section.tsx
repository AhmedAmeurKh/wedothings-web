export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-24 opacity-0 translate-y-6 animate-[fadeInUp_0.8s_ease-out_forwards]">
      {children}
    </section>
  )
}
