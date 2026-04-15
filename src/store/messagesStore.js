import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { messages as seedMessages } from '../data/seed'

/**
 * Manages the Abby ↔ Kyle message thread.
 * Seed messages are the initial state on first load.
 * Sent messages are appended and persisted via localStorage.
 * localStorage key: instalgia_messages
 */
const useMessagesStore = create(
  persist(
    (set, get) => ({
      messages: seedMessages,
      sendMessage: (senderId, recipientId, text) => {
        const trimmed = text.trim()
        if (!trimmed) return
        const newMsg = {
          id: `msg_${Date.now()}`,
          senderId,
          recipientId,
          text: trimmed,
          timestamp: new Date().toISOString(),
        }
        set({ messages: [...get().messages, newMsg] })
      },
    }),
    { name: 'instalgia_messages' }
  )
)

export default useMessagesStore
