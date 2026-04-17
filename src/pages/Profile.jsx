import { useParams, useNavigate } from 'react-router-dom'
import { users, posts } from '../data/seed'
import useAuthStore from '../store/authStore'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

export default function Profile() {
  const { username } = useParams()
  const navigate     = useNavigate()
  const currentUser  = useAuthStore((s) => s.user)

  const profileUser  = users.find((u) => u.username === username)
  const profilePosts = posts
    .filter((p) => p.userId === profileUser?.id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  const isSelf = currentUser?.username === username

  if (!profileUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <p className="text-[#6b7280] text-sm">User not found.</p>
      </div>
    )
  }

  return (
    <div className="page-enter flex flex-col min-h-screen bg-[#0a0a0a]">

      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0a0a] flex items-center px-2 py-3 border-b border-[#1a1a1a]">
        <button
          onClick={() => navigate('/feed')}
          aria-label="Back"
          className="p-2"
        >
          <BackIcon />
        </button>
        <h2 className="flex-1 text-center text-[#f5f5f5] font-semibold text-sm pr-10">
          {profileUser.username}
        </h2>
      </header>

      {/* Profile bio section */}
      <section className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-6 mb-4">
          <img
            src={profileUser.avatarUrl}
            alt={profileUser.displayName}
            className="w-20 h-20 rounded-full object-cover border border-[#2a2a2a]"
          />
          {/* Stats */}
          <div className="flex flex-1 justify-around text-center">
            <div>
              <p className="text-[#f5f5f5] font-semibold text-base">
                {profilePosts.length}
              </p>
              <p className="text-[#f5f5f5] text-xs">posts</p>
            </div>
            <div>
              <p className="text-[#f5f5f5] font-semibold text-base">
                {profileUser.followerCount.toLocaleString()}
              </p>
              <p className="text-[#f5f5f5] text-xs">followers</p>
            </div>
            <div>
              <p className="text-[#f5f5f5] font-semibold text-base">
                {profileUser.followingCount.toLocaleString()}
              </p>
              <p className="text-[#f5f5f5] text-xs">following</p>
            </div>
          </div>
        </div>

        {/* Name + bio */}
        <p className="text-[#f5f5f5] font-semibold text-sm mb-0.5">
          {profileUser.displayName}
        </p>
        <p className="text-[#f5f5f5] text-sm leading-snug">
          {profileUser.bio}
        </p>

        {/* Edit Profile button — only visible to self */}
        {isSelf && (
          <button className="mt-4 w-full border border-[#363636] text-[#f5f5f5] font-semibold text-sm py-1.5 rounded-lg">
            Edit Profile
          </button>
        )}
      </section>

      {/* Grid tab indicator */}
      <div className="flex border-t border-[#1a1a1a]">
        <div className="flex-1 flex justify-center py-2.5 border-t-2 border-[#f5f5f5]">
          <GridIcon />
        </div>
      </div>

      {/* 3×3 post grid */}
      <section className="grid grid-cols-3 gap-px bg-[#1a1a1a]">
        {profilePosts.map((post) => (
          <button
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            className="aspect-square bg-[#0a0a0a] block w-full"
          >
            <img
              src={post.imageUrl}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </section>

    </div>
  )
}
