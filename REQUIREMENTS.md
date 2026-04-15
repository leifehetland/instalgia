# Instalgia — Requirements

## Overview
Instalgia is a fictional Instagram clone built as a prop for a short film.
Two interactive users only. No backend. All state via localStorage.

---

## Users

| Username        | Display Name | Password   | Role        |
|-----------------|--------------|------------|-------------|
| sodowntonabby   | Abby         | abby1234   | Primary     |
| kycardio86      | Kyle         | kyle1234   | Secondary   |

- Auth validates against hardcoded credentials only
- Session stored in localStorage and persists on refresh
- No account creation flow (Sign Up CTA navigates to Login)
- Logout clears localStorage session

---

## Screens

### 1. Splash
- Instalgia logo (wordmark)
- Tagline (TBD — placeholder: "moments worth keeping")
- "Log In" button → /login
- "Sign Up" button → /login (film prop, no real registration)

### 2. Login
- Username + password fields
- Validates against hardcoded user list
- On success: sets localStorage session, redirects to /feed
- On failure: inline error message ("incorrect username or password")
- No "forgot password" flow

### 3. Feed
- Scrollable list of ~10 posts from mixed users (Abby, Kyle, 3 fake accounts)
- Each post shows: avatar, username, image, like button, like count, caption, comments preview
- Like toggle: persists to localStorage per logged-in user
- Comments display (read-only, no new comment submission required)
- Post timestamps displayed as relative time ("2 days ago")

### 4. Profile (Abby)
- Avatar, display name, username, bio
- Follower / following / post counts
- 3x3 image grid of Abby's posts
- Tapping a grid image opens post detail (optional stretch goal)
- Edit profile button visible when logged in as Abby (non-functional, film prop)

### 5. Messages
- Single DM thread: Abby ↔ Kyle
- ~14 pre-seeded messages, casual realistic tone
- Logged-in user's messages appear on the right, other user on the left
- New message input field at bottom
- Sent messages persist to localStorage for session
- Timestamps shown per message

---

## Navigation
- Bottom tab bar (Instagram-style): Feed, Search (non-functional), Post (non-functional), Notifications (non-functional), Profile
- Active tab highlighted
- Back navigation where applicable

---

## Data

### Posts seed (~10 posts total)
- sodowntonabby: 4 posts
- kycardio86: 2 posts
- 3 fake accounts: 1 post each
- Each post: id, userId, imageUrl, caption, likes, likedBy[], comments[], timestamp

### Abby's profile grid
- 9 posts minimum for clean 3x3 grid (can overlap with feed posts)

### Messages seed
- ~14 messages between sodowntonabby and kycardio86
- Realistic casual exchange (content TBD based on film script context)
- Mix of short replies and slightly longer messages for visual texture

---

## UI Constraints
- Mobile-first layout, max-width 390px, centered on desktop
- Dark mode (near-black background, white text, muted grays)
- Instagram-influenced visual language — not a copy, an aesthetic echo
- Custom name/logo ("Instalgia") throughout, no Instagram trademarks
- Smooth scroll, no janky reflows
- Assets: placeholder images acceptable for dev, replaced before shoot

---

## Tech Stack
- React + Vite
- React Router v7
- Tailwind CSS
- Zustand (auth + session state)
- localStorage (likes, messages, session)
- Deployed to Render (static site)

---

## Out of Scope
- Real image uploads
- Backend or database of any kind
- More than 2 interactive users
- Push or in-app notifications
- Search, Explore, Reels, Stories
- Real Sign Up flow
- Comment submission (read-only is acceptable)