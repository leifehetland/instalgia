import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Stores which posts the current user has liked.
 * Shape: { likes: { [userId]: [postId, ...] } }
 * localStorage key: instalgia_likes
 */
const useLikesStore = create(
  persist(
    (set, get) => ({
      likes: {},
      toggleLike: (userId, postId) => {
        const current = get().likes[userId] || []
        const alreadyLiked = current.includes(postId)
        set({
          likes: {
            ...get().likes,
            [userId]: alreadyLiked
              ? current.filter((id) => id !== postId)
              : [...current, postId],
          },
        })
      },
    }),
    { name: 'instalgia_likes' }
  )
)

export default useLikesStore
