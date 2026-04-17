import { useParams, useNavigate } from 'react-router-dom'
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

export default function StageView() {
  const { stage }   = useParams()
  const navigate    = useNavigate()
  const currentUser = useAuthStore((s) => s.user)

  const stageNum  = Math.min(Math.max(parseInt(stage, 10), 1), SCRIPT.length)
  const messages  = SCRIPT.slice(0, stageNum).map((line, i) => ({
    id: `stage_msg_${i}`,
    senderId: line.senderId,
    text: line.text,
  }))

  const otherId   = currentUser?.id === ABBY_ID ? KYLE_ID : ABBY_ID
  const otherUser = users.find((u) => u.id === otherId)

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">

      {/* Header — mirrors Messages.jsx */}
      <header className="flex-none flex items-center gap-3 px-2 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a]">
        <button onClick={() => navigate('/gallery')} aria-label="Back" className="p-2">
          <BackIcon />
        </button>
        <img
          src={otherUser?.avatarUrl}
          alt={otherUser?.username}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-[#f5f5f5] font-semibold text-sm leading-tight">
            {otherUser?.displayName}
          </p>
          <p className="text-[#6b7280] text-xs">{otherUser?.username}</p>
        </div>
        <span className="text-[#6b7280] text-xs pr-2">
          Stage {stageNum} / {SCRIPT.length}
        </span>
      </header>

      {/* Frozen message thread */}
      <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1.5 justify-end">
        {messages.map((msg, i) => {
          const isOwn       = msg.senderId === currentUser?.id
          const nextMsg     = messages[i + 1]
          const isLastInRun = !nextMsg || nextMsg.senderId !== msg.senderId
          const sender      = users.find((u) => u.id === msg.senderId)
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {isLastInRun ? (
                <img
                  src={sender?.avatarUrl}
                  alt={sender?.username}
                  className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-6 flex-shrink-0" />
              )}
              <div
                className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-snug ${
                  isOwn
                    ? 'bg-[#0095f6] text-white rounded-br-sm'
                    : 'bg-[#1a1a1a] text-[#f5f5f5] rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          )
        })}
      </main>

      {/* Stage navigation */}
      <div className="flex-none flex items-center justify-between px-4 py-3 border-t border-[#1a1a1a] bg-[#0a0a0a]">
        <button
          onClick={() => navigate(`/gallery/${stageNum - 1}`)}
          disabled={stageNum <= 1}
          className="text-[#0095f6] disabled:text-[#363636] text-sm font-semibold transition-colors"
        >
          ← Prev
        </button>
        <span className="text-[#6b7280] text-xs">
          {stageNum} of {SCRIPT.length}
        </span>
        <button
          onClick={() => navigate(`/gallery/${stageNum + 1}`)}
          disabled={stageNum >= SCRIPT.length}
          className="text-[#0095f6] disabled:text-[#363636] text-sm font-semibold transition-colors"
        >
          Next →
        </button>
      </div>

    </div>
  )
}
