'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase-client'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) alert(error.message)
    else router.push('/projects')
  }

  const handleOAuth = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) alert(error.message)
  }

  return (

    <div className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-2xl mb-4">Log In</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 px-3 py-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 px-3 py-2 border rounded"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="mb-2 px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Log In'}
      </button>
    </div>
)

}
