# Instalgia — Progress Tracker

## Status: Phase 3 Complete (Task 12 deferred to Leif)

---

## Phase 1 — Foundation

- [x] Task 1: Scaffold Vite + React + Tailwind v4 + React Router v7
- [x] Task 2: Zustand auth store + localStorage persistence
- [x] Task 3: Seed data file (`src/data/seed.js`)

## Phase 2 — Screens

- [x] Task 4: Splash page
- [x] Task 5: Login page
- [x] Task 6: Feed page
- [x] Task 7: Profile page
- [x] Task 8: Messages page

## Phase 3 — Polish

- [x] Task 9: Bottom tab bar
- [x] Task 10: Transitions + micro-animations
- [x] Task 11: Responsive QA at 390px
- [ ] Task 12: Render deploy config — **deferred to Leif**

---

## Decisions Log

**2026-04-15 — Phase 1**

- **Stack versions confirmed:** React Router v7 and Tailwind CSS v4 were already installed; spec updated to reflect this. Tailwind v4 uses CSS-first config (`@import "tailwindcss"` in `index.css`), no `tailwind.config.js` needed.
- **Task 1 (Scaffold):** Vite + React + Tailwind v4 + React Router v7 already scaffolded with page stubs and route structure. Marked complete.
- **Task 2 (Auth store):** `src/store/authStore.js` created using Zustand `persist` middleware, keyed to `instalgia_session`. Credentials hardcoded in the store. Password stripped from the stored session object. `ProtectedRoute` component added to `App.jsx` — unauthenticated access to `/feed`, `/profile/:username`, `/messages` redirects to `/login`.
- **Task 3 (Seed data):** `src/data/seed.js` created with named exports: `users`, `posts`, `messages`. Abby has 9 posts (supports 3×3 profile grid); first 4 are recent enough to appear at the top of a feed sort. Kyle has 2 posts. Three fake accounts (`sunsetprague`, `coffeeandchaos_r`, `nate_outside`) have 1 post each. 14 seeded messages in the Abby↔Kyle thread — placeholder dramatic content written (casual tone with mild tension); to be revised once film script is finalized. All captions authentic, all timestamps ISO 8601, placeholder images via picsum.photos and pravatar.cc.
- **Build verified:** `npm run build` passes clean (34 modules, 0 errors).

**2026-04-15 — Phase 2**

- **vite.config.js:** Added `build.emptyOutDir: false` to prevent a permissions error on the pre-existing `dist/` folder from a prior macOS build. Build now works cleanly in both environments.
- **Task 4 (Splash):** Full splash screen with Instalgia serif-italic wordmark, tagline, Log In and Sign Up buttons (both route to `/login`). Redirects to `/feed` if already logged in.
- **Task 5 (Login):** Username + password form, validates against `authStore` credentials, redirects to `/feed` on success, shows inline error on failure. Redirects to `/feed` if session already exists. "Sign Up" link routes to `/login` (film prop).
- **New files:** `src/store/likesStore.js` (Zustand persist, `instalgia_likes` key), `src/utils/formatTime.js` (relative time helper), `src/components/PostCard.jsx` (reusable post card with like toggle).
- **Task 6 (Feed):** All 14 seed posts rendered, sorted newest-first. Sticky header with Instalgia wordmark and DM icon (navigates to `/messages`). Like toggle persists per-user via `likesStore`. Comments preview (first 2 shown, "View all N" shown when more exist). Relative timestamps.
- **Task 7 (Profile):** Works for any `/:username` in the seed. Shows avatar, display name, bio, post/follower/following counts. "Edit Profile" button visible only when `currentUser.username === username` (non-functional film prop). 3×3 lazy-loaded image grid of user's posts sorted newest-first.
- **Task 8 (Messages):** Full DM thread view for the Abby↔Kyle thread. `src/store/messagesStore.js` (Zustand persist, `instalgia_messages` key, seeds from `seed.js` on first load). Logged-in user's messages on the right (blue), other user on the left (dark surface). Auto-scrolls to bottom on new messages. Send input persists to localStorage. Relative timestamps per bubble.

**2026-04-15 — Phase 3**

- **Task 9 (Tab bar):** `src/components/TabLayout.jsx` created — uses React Router `<Outlet>` for nested routes. Fixed bottom nav with Home (Feed) and Profile as active links; Search, Post, and Notifications are non-functional film props (opacity 50%, tabIndex -1). Profile tab links to the logged-in user's own profile. `App.jsx` restructured: Feed and Profile share `TabLayout`; Messages is a separate protected route with no tab bar (it has its own full-screen flex layout and would conflict with the fixed nav).
- **Task 10 (Transitions):** CSS keyframe animations added to `index.css`. `page-enter` (fade + 8px slide-up, 220ms) applied to all page root divs. `heart-pop` (scale 1→1.45→0.9→1, 350ms) triggered on like in `PostCard` via a `heartKey` counter that re-mounts the button on each like event. `bubble-in` defined for future use.
- **Task 11 (QA):** `eslint src/ --max-warnings=0` passes clean. `npm run build` passes clean — 40 modules, 0 errors, 0 warnings. Unused `navigate` import removed from `TabLayout`. No hardcoded widths that exceed 390px. No `console.log` calls. All imports resolve correctly.
- **Task 12 (Render deploy config):** Deferred to Leif per his request.

---

## Deferred / Open Questions

- Film time period (affects tone of seed content)
- Abby/Kyle message thread dramatic content — **placeholder written**, needs revision once script is available
- Shoot method (real phone vs. composited)
- Final Splash tagline — **placeholder:** "moments worth keeping"
- Profile self-view vs. other-view distinction needed?
- Task 12 (Render deploy config) — Leif will handle
