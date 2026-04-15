import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const login = useAuthStore((s) => s.login)
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/feed', { replace: true })
  }, [user, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const ok = login(username.trim(), password)
    if (ok) {
      navigate('/feed', { replace: true })
    } else {
      setError('Incorrect username or password.')
    }
  }

  return (
    <div className="page-enter flex flex-col min-h-screen bg-[#0a0a0a] px-8">
      {/* Logo */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif italic text-[#f5f5f5] mb-10 tracking-tight">
          Instalgia
        </h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError('') }}
            className="w-full bg-[#1a1a1a] text-[#f5f5f5] placeholder-[#6b7280] rounded-lg px-4 py-3 text-sm border border-[#2a2a2a] focus:outline-none focus:border-[#555555]"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            className="w-full bg-[#1a1a1a] text-[#f5f5f5] placeholder-[#6b7280] rounded-lg px-4 py-3 text-sm border border-[#2a2a2a] focus:outline-none focus:border-[#555555]"
            autoComplete="current-password"
          />

          {error && (
            <p className="text-[#ed4956] text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#0095f6] text-white font-semibold py-3 rounded-xl text-sm mt-1 active:opacity-80"
          >
            Log In
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center w-full my-6">
          <div className="flex-1 h-px bg-[#2a2a2a]" />
          <span className="mx-4 text-[#6b7280] text-xs font-semibold tracking-widest">OR</span>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </div>
      </div>

      {/* Sign up link */}
      <div className="pb-10 pt-4 text-center border-t border-[#1a1a1a]">
        <p className="text-[#f5f5f5] text-sm">
          Don't have an account?{' '}
          <Link to="/login" className="text-[#0095f6] font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
