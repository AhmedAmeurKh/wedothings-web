import Button from './Button'

type CardProps = {
  title: string
  description: string
  link: string
}

export default function Card({ title, description, link }: CardProps) {
  return (
    <div className="bg-white rounded-xl p-6 text-hc-dark shadow hover:shadow-lg transition hover:-translate-y-1 transform ">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="mb-6">{description}</p>
      <Button href={link}>Learn More</Button>
    </div>
  )
}
