import { useState, useCallback } from 'react'
import useAuthStore from '../store/authStore'
import useLikesStore from '../store/likesStore'
import { formatRelativeTime } from '../utils/formatTime'

// ── Icon helpers ──────────────────────────────────────────────────────────────

function HeartFilled() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#ed4956">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function HeartOutline() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PostCard({ post, showAllComments = false }) {
  // const navigate   = useNavigate()
  const user       = useAuthStore((s) => s.user)
  const likes      = useLikesStore((s) => s.likes)
  const toggleLike = useLikesStore((s) => s.toggleLike)

  const isLiked    = (likes[user?.id] || []).includes(post.id)
  const likeCount  = post.likes + (isLiked ? 1 : 0)

  // Drives the heart-pop animation — resets after each tap to allow re-trigger
  const [heartKey, setHeartKey] = useState(0)
  const [isPopping, setIsPopping] = useState(false)

  const handleLike = useCallback(() => {
    if (!user) return
    toggleLike(user.id, post.id)
    // Only pop when going liked → true
    if (!isLiked) {
      setIsPopping(true)
      setHeartKey((k) => k + 1)
      setTimeout(() => setIsPopping(false), 350)
    }
  }, [user, post.id, isLiked, toggleLike])

  const previewComments = showAllComments ? post.comments : post.comments.slice(0, 2)
  const hiddenCount     = showAllComments ? 0 : post.comments.length - previewComments.length

  return (
    <article className="border-b border-[#1a1a1a]">

      {/* Post header */}
      <div className="flex items-center gap-3 px-3 py-2.5">
        <img
          src={post.avatarUrl}
          alt={post.username}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-[#f5f5f5] font-semibold text-sm flex-1">
          {post.username}
        </span>
        <button className="text-[#f5f5f5] text-xl leading-none px-1" aria-label="More options">
          ···
        </button>
      </div>

      {/* Post image */}
      <img
        src={post.imageUrl}
        alt=""
        className="w-full aspect-square object-cover"
        loading="lazy"
      />

      {/* Action bar */}
      <div className="flex items-center gap-4 px-3 pt-3 pb-1">
        <button
          key={heartKey}
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike' : 'Like'}
          className={isPopping ? 'heart-pop' : 'transition-transform active:scale-110'}
        >
          {isLiked ? <HeartFilled /> : <HeartOutline />}
        </button>
        <button aria-label="Comment" className="opacity-80 transition-opacity active:opacity-50">
          <CommentIcon />
        </button>
        <button aria-label="Share" className="opacity-80 transition-opacity active:opacity-50">
          <ShareIcon />
        </button>
      </div>

      {/* Like count */}
      <div className="px-3 pb-1">
        <span className="text-[#f5f5f5] font-semibold text-sm">
          {likeCount.toLocaleString()} {likeCount === 1 ? 'like' : 'likes'}
        </span>
      </div>

      {/* Caption */}
      {post.caption && (
        <div className="px-3 pb-1">
          <p className="text-[#f5f5f5] text-sm">
            <span className="font-semibold mr-1">{post.username}</span>
            {post.caption}
          </p>
        </div>
      )}

      {/* Comments preview */}
      {post.comments.length > 0 && (
        <div className="px-3 pb-1">
          {hiddenCount > 0 && (
            <p className="text-[#6b7280] text-sm mb-1">
              View all {post.comments.length} comments
            </p>
          )}
          {previewComments.map((c) => (
            <p key={c.id} className="text-[#f5f5f5] text-sm leading-snug mb-0.5">
              <span className="font-semibold mr-1">{c.username}</span>
              {c.text}
            </p>
          ))}
        </div>
      )}

      {/* Timestamp */}
      <div className="px-3 pb-4 pt-0.5">
        <span className="text-[#6b7280] text-[11px] uppercase tracking-wide">
          {formatRelativeTime(post.timestamp)}
        </span>
      </div>

    </article>
  )
}
