'use client' 

import { useEffect, useState } from 'react'
import Card from '../ui/Card'
import { createClient } from '@supabase/supabase-js'

type Project = {
  id: number
  title: string
  description: string
  link: string
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Features() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('id,title,description,link')
        .order('id', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } else {
        setProjects(data)
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  if (loading) {
    return <p className="text-center py-20">Loading projects...</p>
  }

  return (
    <section className="py-32 px-6 bg-[rgba(255,255,255,0.05)] text-center">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        
        {projects.map((project) => (
          <Card
            key={project.id}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </section>
  )
}
