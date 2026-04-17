import { useNavigate } from 'react-router-dom'
import { users } from '../data/seed'
import { ABBY_ID, KYLE_ID, SCRIPT } from '../data/script'
import useAuthStore from '../store/authStore'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function StageCard({ stage, messages, currentUserId, abbyUser, kyleUser }) {
  const navigate = useNavigate()
  const lastMsg  = messages[messages.length - 1]
  const lastSender = lastMsg?.senderId === ABBY_ID ? abbyUser : kyleUser

  return (
    <button
      onClick={() => navigate(`/gallery/${stage}`)}
      className="w-full text-left bg-[#111111] border border-[#1a1a1a] rounded-2xl overflow-hidden active:opacity-70 transition-opacity"
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a]">
        <span className="text-[#f5f5f5] font-semibold text-sm">Stage {stage}</span>
        <div className="flex items-center gap-1.5">
          <img src={abbyUser?.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
          <img src={kyleUser?.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
        </div>
      </div>

      {/* Mini message preview */}
      <div className="px-4 py-3 flex flex-col gap-1.5">
        {messages.map((msg, i) => {
          const isOwn = msg.senderId === currentUserId
          return (
            <div key={i} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <span
                className={`text-xs px-3 py-1.5 rounded-xl leading-snug max-w-[80%] ${
                  isOwn
                    ? 'bg-[#0095f6] text-white rounded-br-sm'
                    : 'bg-[#1a1a1a] text-[#f5f5f5] rounded-bl-sm'
                }`}
              >
                {msg.text}
              </span>
            </div>
          )
        })}
      </div>

      {/* Last sender */}
      <div className="px-4 pb-3 flex items-center gap-1.5">
        <img src={lastSender?.avatarUrl} alt="" className="w-4 h-4 rounded-full object-cover opacity-50" />
        <span className="text-[#6b7280] text-xs">{lastSender?.displayName}</span>
      </div>
    </button>
  )
}

export default function Gallery() {
  const navigate    = useNavigate()
  const currentUser = useAuthStore((s) => s.user)

  const otherId   = currentUser?.id === ABBY_ID ? KYLE_ID : ABBY_ID
  const otherUser = users.find((u) => u.id === otherId)
  const selfUser  = users.find((u) => u.id === currentUser?.id)
  const abbyUser  = users.find((u) => u.id === ABBY_ID)
  const kyleUser  = users.find((u) => u.id === KYLE_ID)

  const stages = SCRIPT.map((_, i) =>
    SCRIPT.slice(0, i + 1).map((line, j) => ({
      id: `stage_${i}_${j}`,
      senderId: line.senderId,
      text: line.text,
    }))
  )

  return (
    <div className="page-enter flex flex-col min-h-screen bg-[#0a0a0a]">

      <header className="sticky top-0 z-10 bg-[#0a0a0a] flex items-center px-2 py-3 border-b border-[#1a1a1a]">
        <button onClick={() => navigate('/feed')} aria-label="Back" className="p-2">
          <BackIcon />
        </button>
        <div className="flex-1 text-center pr-10">
          <p className="text-[#f5f5f5] font-semibold text-sm">Conversation Stages</p>
          <p className="text-[#6b7280] text-xs">
            {abbyUser?.displayName} &amp; {kyleUser?.displayName}
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 flex flex-col gap-3">
        {stages.map((messages, i) => (
          <StageCard
            key={i}
            stage={i + 1}
            messages={messages}
            currentUserId={currentUser?.id}
            abbyUser={abbyUser}
            kyleUser={kyleUser}
          />
        ))}
      </main>

    </div>
  )
}
