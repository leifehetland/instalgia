import { useParams, useNavigate } from 'react-router-dom'
import { posts } from '../data/seed'
import PostCard from '../components/PostCard'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

export default function PostDetail() {
  const { postId } = useParams()
  const navigate   = useNavigate()

  const post = posts.find((p) => p.id === postId)

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <p className="text-[#6b7280] text-sm">Post not found.</p>
      </div>
    )
  }

  return (
    <div className="page-enter flex flex-col min-h-screen bg-[#0a0a0a]">
      <header className="sticky top-0 z-10 bg-[#0a0a0a] flex items-center px-2 py-3 border-b border-[#1a1a1a]">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2">
          <BackIcon />
        </button>
        <h2 className="flex-1 text-center text-[#f5f5f5] font-semibold text-sm pr-10">
          Post
        </h2>
      </header>

      <PostCard post={post} showAllComments />
    </div>
  )
}
