import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import logo from '../assets/logo.png'

export default function Splash() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/feed', { replace: true })
  }, [user, navigate])

  return (
    <div className="page-enter flex flex-col min-h-screen bg-[#0a0a0a] px-8">
      {/* Logo — centered in upper portion */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <img src={logo} alt="Instalgia" className="w-72 max-w-[80vw]" />
        <p className="text-[#6b7280] text-xs tracking-[0.25em] uppercase">
          moments worth keeping
        </p>
      </div>

      {/* CTA buttons */}
      <div className="pb-14 flex flex-col gap-3">
        <Link
          to="/login"
          className="block w-full text-center bg-[#0095f6] text-white font-semibold py-3 rounded-xl text-sm"
        >
          Log In
        </Link>
        <Link
          to="/login"
          className="block w-full text-center border border-[#363636] text-[#f5f5f5] font-semibold py-3 rounded-xl text-sm"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}
