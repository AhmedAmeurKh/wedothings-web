export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-5xl font-bold mb-6 text-[var(--slate)]">
      {children}
    </h1>
  )
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-semibold mb-4">
      {children}
    </h2>
  )
}
