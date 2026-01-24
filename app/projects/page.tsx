'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase-client'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'

export default function ProjectsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [hackClubLink, setHackClubLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const router = useRouter()

  // Check if user is logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login') // redirect if not logged in
      } else {
        setUser(data.user)
        fetchProjects(data.user.id)
      }
    })
  }, [])

  // Fetch logged-in user projects
  const fetchProjects = async (userId: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) console.error(error)
    else setProjects(data)
  }

  // Generate signed URL for private bucket files
  const getSignedUrl = async (path: string) => {
    const { data, error } = await supabase.storage
      .from('projects')
      .createSignedUrl(path, 60) // valid for 60 seconds
    if (error) return '#'
    return data.signedUrl
  }

  // Handle project upload
  const handleUpload = async () => {
    if (!file || !title) return alert('File and title are required!')
    if (!user) return alert('You must be logged in!')

    setLoading(true)

    // 1️⃣ Upload file to Supabase storage
    const fileName = `${Date.now()}_${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('projects')
      .upload(fileName, file)

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      setLoading(false)
      return
    }

    // 2️⃣ Insert project metadata into DB
    const { data: insertData, error: insertError } = await supabase.from('projects').insert([
      {
        user_id: user.id,
        title,
        description,
        hackclub_link: hackClubLink,
        file_path: uploadData.path
      }
    ])

    if (insertError) {
      alert('Database insert failed: ' + insertError.message)
      setLoading(false)
      return
    }

    // 3️⃣ Trigger Discord webhook
    await fetch('/api/discord-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        user: user.email,
        hackclub_link: hackClubLink
      })
    })

    // Refresh projects list
    fetchProjects(user.id)

    // Reset form
    setFile(null)
    setTitle('')
    setDescription('')
    setHackClubLink('')
    setLoading(false)

    alert('Project uploaded successfully!')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl mb-4">Upload a Project</h1>

        {/* Upload Form */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mb-2 px-3 py-2 border rounded w-full max-w-md" />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="mb-2 px-3 py-2 border rounded w-full max-w-md" />
        <input
          type="url"
          placeholder="Hack Club event project link"
          value={hackClubLink}
          onChange={e => setHackClubLink(e.target.value)}
          className="mb-2 px-3 py-2 border rounded w-full max-w-md" />
        <input
          type="file"
          onChange={e => setFile(e.target.files?.[0] ?? null)}
          className="mb-2" />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-6 py-2 bg-[var(--red)] text-white rounded hover:bg-[var(--orange)] transition">
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {/* Projects List */}
        <h2 className="text-xl mb-2">Your Projects</h2>
        <ul className="w-full max-w-md space-y-2">
          {projects.map(p => (
            <li key={p.id} className="p-2 border rounded">
              <strong>{p.title}</strong>
              {p.description && <p>{p.description}</p>}
              {p.hackclub_link && (
                <p>
                  Hack Club Link: <a href={p.hackclub_link} target="_blank" className="text-blue-500 underline">{p.hackclub_link}</a>
                </p>
              )}
              <a
                href="#"
                onClick={async (e) => {
                  e.preventDefault()
                  const url = await getSignedUrl(p.file_path)
                  window.open(url, '_blank')
                } }
                className="text-blue-500 underline"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>
  )
}
