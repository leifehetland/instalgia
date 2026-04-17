import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

// ── Tab icons ─────────────────────────────────────────────────────────────────

function HomeIcon({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#f5f5f5">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 3l9 9" />
      <path d="M9 21V12h6v9" />
      <path d="M3 12v9h6M15 21v-9h6V21" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function HeartIcon({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#f5f5f5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function PersonIcon({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#f5f5f5">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

// ── Layout ────────────────────────────────────────────────────────────────────

export default function TabLayout() {
  const navigate    = useNavigate()
  const user        = useAuthStore((s) => s.user)
  const profilePath = `/profile/${user?.username || 'sodowntonabby'}`

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">

      {/* Page content */}
      <div className="flex-1 pb-16">
        <Outlet />
      </div>

      {/* Fixed bottom tab bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-[#0a0a0a] border-t border-[#1a1a1a] flex items-center z-50">

        {/* Feed */}
        <NavLink
          to="/feed"
          className="flex-1 flex justify-center py-3"
          aria-label="Feed"
        >
          {({ isActive }) => <HomeIcon active={isActive} />}
        </NavLink>

        {/* Search — non-functional film prop */}
        <button
          className="flex-1 flex justify-center py-3 opacity-50 cursor-default"
          aria-label="Search (unavailable)"
          tabIndex={-1}
        >
          <SearchIcon />
        </button>

        {/* Conversation stage gallery */}
        <button
          onClick={() => navigate('/gallery')}
          className="flex-1 flex justify-center py-3"
          aria-label="Conversation stages"
        >
          <PlusIcon />
        </button>

        {/* Notifications — non-functional film prop */}
        <button
          className="flex-1 flex justify-center py-3 opacity-50 cursor-default"
          aria-label="Notifications (unavailable)"
          tabIndex={-1}
        >
          <HeartIcon active={false} />
        </button>

        {/* Profile */}
        <NavLink
          to={profilePath}
          className="flex-1 flex justify-center py-3"
          aria-label="Profile"
        >
          {({ isActive }) => <PersonIcon active={isActive} />}
        </NavLink>

      </nav>
    </div>
  )
}
