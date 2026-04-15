import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const USERS = [
  {
    id: 'user_abby',
    username: 'sodowntonabby',
    displayName: 'Abby',
    password: 'abby1234',
    bio: 'living in lowercase · portland, or · she/her',
    avatarUrl: 'https://i.pravatar.cc/150?u=sodowntonabby',
    followerCount: 847,
    followingCount: 312,
    postCount: 9,
  },
  {
    id: 'user_kyle',
    username: 'kycardio86',
    displayName: 'Kyle',
    password: 'kyle1234',
    bio: 'fitness · food · figuring it out',
    avatarUrl: 'https://i.pravatar.cc/150?u=kycardio86',
    followerCount: 203,
    followingCount: 198,
    postCount: 2,
  },
]

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (username, password) => {
        const match = USERS.find(
          (u) => u.username === username && u.password === password
        )
        if (!match) return false
        const { password: _pw, ...safeUser } = match
        set({ user: safeUser })
        return true
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'instalgia_session',
    }
  )
)

export default useAuthStore
