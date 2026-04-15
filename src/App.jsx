import { Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/authStore'
import Splash from './pages/Splash'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import TabLayout from './components/TabLayout'

function ProtectedRoute({ children }) {
  const user = useAuthStore((s) => s.user)
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <div className="max-w-[390px] mx-auto min-h-screen bg-[#0a0a0a]">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />

        {/* Feed + Profile share the bottom tab bar layout */}
        <Route
          element={
            <ProtectedRoute>
              <TabLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Route>

        {/* Messages has its own full-screen layout (no tab bar) */}
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
