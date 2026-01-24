'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase-client'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  // Check if admin
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return router.push('/login')
      setUser(data.user)

      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', data.user.id)

      if (!adminData || adminData.length === 0) router.push('/login') // not admin
      else fetchAllProjects()
    })
  }, [])

  const fetchAllProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (error) console.error(error)
    else setProjects(data)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Admin Panel</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Hack Club Link</th>
            <th className="border p-2">Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{p.title}</td>
              <td className="border p-2">{p.user_id}</td>
              <td className="border p-2">
                {p.hackclub_link ? <a href={p.hackclub_link} target="_blank" className="text-blue-500 underline">Link</a> : '—'}
              </td>
              <td className="border p-2">{new Date(p.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


