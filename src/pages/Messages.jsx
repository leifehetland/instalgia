import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { users } from '../data/seed'
import { ABBY_ID, KYLE_ID, SCRIPT } from '../data/script'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

const INITIAL_PAUSE   = 1000
const SAME_SENDER_GAP = 400
const DIFF_SENDER_GAP = 3000

// ── Component ─────────────────────────────────────────────────────────────────

export default function Messages() {
  const navigate    = useNavigate()
  const currentUser = useAuthStore((s) => s.user)

  const otherId   = currentUser?.id === ABBY_ID ? KYLE_ID : ABBY_ID
  const otherUser = users.find((u) => u.id === otherId)

  const [visibleMessages, setVisibleMessages] = useState([])
  const [typingUser, setTypingUser]           = useState(null)
  const [inputText, setInputText]             = useState('')
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  // Scroll to bottom whenever messages or typing state change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleMessages, typingUser])

  // Play the scripted conversation on mount
  useEffect(() => {
    const timeouts = []
    let delay = INITIAL_PAUSE

    SCRIPT.forEach((line, i) => {
      const prevSender = i > 0 ? SCRIPT[i - 1].senderId : null
      const gap = i === 0
        ? 0
        : prevSender === line.senderId ? SAME_SENDER_GAP : DIFF_SENDER_GAP

      delay += gap

      // Show typing indicator
      const t1 = setTimeout(() => setTypingUser(line.senderId), delay)
      timeouts.push(t1)

      delay += line.typingMs

      // Reveal message, clear typing indicator
      const msg = {
        id: `script_${i}`,
        senderId: line.senderId,
        text: line.text,
      }
      const t2 = setTimeout(() => {
        setTypingUser(null)
        setVisibleMessages((prev) => [...prev, msg])
      }, delay)
      timeouts.push(t2)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [])

  function handleSend(e) {
    e.preventDefault()
    if (!inputText.trim() || !currentUser) return
    const msg = {
      id: `user_${Date.now()}`,
      senderId: currentUser.id,
      text: inputText.trim(),
    }
    setVisibleMessages((prev) => [...prev, msg])
    setInputText('')
    inputRef.current?.focus()
  }

  return (
    <div className="page-enter flex flex-col h-screen bg-[#0a0a0a]">

      {/* Header */}
      <header className="flex-none flex items-center gap-3 px-2 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a]">
        <button onClick={() => navigate('/feed')} aria-label="Back" className="p-2">
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
      </header>

      {/* Message thread */}
      <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1.5">
        {visibleMessages.map((msg, i) => {
          const isOwn = msg.senderId === currentUser?.id
          const nextMsg = visibleMessages[i + 1]
          const isLastInRun = !nextMsg || nextMsg.senderId !== msg.senderId
          const sender = users.find((u) => u.id === msg.senderId)
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 bubble-in ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
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

        {/* Typing indicator */}
        {typingUser && (
          <div
            className={`flex items-end gap-2 bubble-in ${
              typingUser === currentUser?.id ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {(() => {
              const typingSender = users.find((u) => u.id === typingUser)
              return (
                <img
                  src={typingSender?.avatarUrl}
                  alt={typingSender?.username}
                  className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                />
              )
            })()}
            {typingUser === currentUser?.id ? (
              <div className="bg-[#0095f6] px-4 py-3.5 rounded-2xl rounded-br-sm flex gap-1 items-center">
                <span className="typing-dot" style={{ background: 'rgba(255,255,255,0.7)' }} />
                <span className="typing-dot" style={{ background: 'rgba(255,255,255,0.7)', animationDelay: '0.18s' }} />
                <span className="typing-dot" style={{ background: 'rgba(255,255,255,0.7)', animationDelay: '0.36s' }} />
              </div>
            ) : (
              <div className="bg-[#1a1a1a] px-4 py-3.5 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                <span className="typing-dot" />
                <span className="typing-dot" style={{ animationDelay: '0.18s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.36s' }} />
              </div>
            )}
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {/* Input bar */}
      <form
        onSubmit={handleSend}
        className="flex-none flex items-center gap-3 px-4 py-3 border-t border-[#1a1a1a] bg-[#0a0a0a]"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Message…"
          className="flex-1 bg-[#1a1a1a] text-[#f5f5f5] placeholder-[#6b7280] rounded-full px-4 py-2.5 text-sm border border-[#2a2a2a] focus:outline-none focus:border-[#555555]"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          aria-label="Send"
          className="text-[#0095f6] disabled:text-[#6b7280] transition-colors p-1"
        >
          <SendIcon />
        </button>
      </form>

    </div>
  )
}
