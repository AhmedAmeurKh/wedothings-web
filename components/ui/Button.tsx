type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
}: ButtonProps) {
  const className = `inline-flex items-center justify-center px-8 py-4 ${
  variant === 'primary' ? 'pill-primary' : 'pill-secondary'
} pill hover:scale-105 transition-transform duration-200`

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
