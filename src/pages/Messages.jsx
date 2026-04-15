import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import useMessagesStore from '../store/messagesStore'
import { users } from '../data/seed'
import { formatRelativeTime } from '../utils/formatTime'

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

// The thread is always Abby ↔ Kyle
const ABBY_ID = 'user_abby'
const KYLE_ID = 'user_kyle'

export default function Messages() {
  const navigate      = useNavigate()
  const currentUser   = useAuthStore((s) => s.user)
  const messages      = useMessagesStore((s) => s.messages)
  const sendMessage   = useMessagesStore((s) => s.sendMessage)

  const [inputText, setInputText] = useState('')
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)

  // The other person in the thread
  const otherId   = currentUser?.id === ABBY_ID ? KYLE_ID : ABBY_ID
  const otherUser = users.find((u) => u.id === otherId)

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend(e) {
    e.preventDefault()
    if (!inputText.trim() || !currentUser) return
    sendMessage(currentUser.id, otherId, inputText)
    setInputText('')
    inputRef.current?.focus()
  }

  return (
    <div className="page-enter flex flex-col h-screen bg-[#0a0a0a]">

      {/* Header */}
      <header className="flex-none flex items-center gap-3 px-2 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a]">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2">
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
      <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {messages.map((msg) => {
          const isOwn = msg.senderId === currentUser?.id
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-snug ${
                  isOwn
                    ? 'bg-[#0095f6] text-white rounded-br-sm'
                    : 'bg-[#1a1a1a] text-[#f5f5f5] rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[#6b7280] text-[10px] mt-0.5 px-1">
                {formatRelativeTime(msg.timestamp)}
              </span>
            </div>
          )
        })}
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
