import { useNavigate } from 'react-router-dom'
import { posts } from '../data/seed'
import PostCard from '../components/PostCard'
import logo from '../assets/logo.png'

// Sort all posts newest-first
const feedPosts = [...posts].sort(
  (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
)

function DmIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export default function Feed() {
  const navigate = useNavigate()

  return (
    <div className="page-enter flex flex-col min-h-screen bg-[#0a0a0a]">

      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0a0a] flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a]">
        <img src={logo} alt="Instalgia" className="h-7" />
        <button
          onClick={() => navigate('/messages')}
          aria-label="Messages"
          className="p-1"
        >
          <DmIcon />
        </button>
      </header>

      {/* Posts */}
      <main>
        {feedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>

    </div>
  )
}
