# Instalgia — Claude Code Spec

## Project Summary
Instalgia is a fictional Instagram clone built as a prop for a short film.
Two users: `sodowntonabby` (Abby) and `kycardio86` (Kyle).
No backend. No database. localStorage only.

---

## Before Starting Any Task
1. Read REQUIREMENTS.md in full
2. Read PROGRESS.md to understand current state
3. Confirm which Phase and Task you are executing
4. Ask for clarification before proceeding if requirements are ambiguous

---

## After Completing Any Task
1. Update PROGRESS.md — mark task done, note any decisions made or deferred
2. Note any open questions that need human input before the next task
3. Do not begin the next task without being explicitly asked

---

## Rules

### Architecture
- Components go in `src/components/`
- Pages go in `src/pages/`
- Seed data lives in `src/data/` — never hardcode content inline in components
- Auth store and session logic live in `src/store/authStore.js`
- Routing defined in `src/App.jsx`

### Code Style
- Components: PascalCase filenames and function names
- All other files: kebab-case
- No default exports from data files — use named exports
- Prefer functional components with hooks throughout
- No class components

### Data
- All seed data must use the schema defined in REQUIREMENTS.md
- No lorem ipsum — all captions, bios, and messages must read as authentic social content
- Timestamps use ISO 8601 format (e.g. `"2024-11-03T13:10:00Z"`)
- Image paths reference `/assets/posts/` and `/assets/avatars/` — use placeholder URLs during dev

### UI
- Tailwind CSS only — no inline styles, no CSS modules
- Mobile-first. Outer container: `max-w-[390px] mx-auto`
- Dark mode: background `#0a0a0a`, surface `#1a1a1a`, text `#f5f5f5`, muted `#6b7280`
- Do not replicate Instagram UI exactly — echo the pattern, apply Instalgia branding
- Bottom tab bar is a shared layout component rendered on Feed, Profile, and Messages

### localStorage Keys
- `instalgia_session` — current logged-in user object
- `instalgia_likes` — object keyed by userId, value is array of liked post IDs
- `instalgia_messages` — array of message objects for the Abby/Kyle thread

---

## Stack Reference
| Concern         | Tool                  |
|-----------------|-----------------------|
| Framework       | React + Vite          |
| Routing         | React Router v7       |
| Styling         | Tailwind CSS v4       |
| State           | Zustand               |
| Persistence     | localStorage          |
| Deploy          | Render (static site)  |

---

## Phase & Task Order

### Notes on Stack Versions
- React Router v7 is installed (spec originally said v6) — API is compatible, same approach
- Tailwind CSS v4 is installed (spec originally said v3) — uses CSS-first config, no `tailwind.config.js`

### Phase 1 — Foundation
- [ ] Task 1: Scaffold Vite + React + Tailwind + React Router v7
- [ ] Task 2: Set up Zustand auth store with localStorage persistence
- [ ] Task 3: Write full seed data file (`src/data/seed.js`) — posts, users, messages

### Phase 2 — Screens
- [ ] Task 4: Splash page (`/`)
- [ ] Task 5: Login page (`/login`) — validates against hardcoded users
- [ ] Task 6: Feed page (`/feed`) — renders posts, like toggle
- [ ] Task 7: Profile page (`/profile/sodowntonabby`) — grid + bio header
- [ ] Task 8: Messages page (`/messages`) — thread view + send UI

### Phase 3 — Polish
- [ ] Task 9: Bottom tab bar (shared layout component)
- [ ] Task 10: Page transitions + micro-animations
- [ ] Task 11: Responsive QA pass at 390px
- [ ] Task 12: Render deploy config (`render.yaml` or static site settings)

---

## Route Map
| Path                        | Component       | Auth Required |
|-----------------------------|-----------------|---------------|
| `/`                         | Splash          | No            |
| `/login`                    | Login           | No            |
| `/feed`                     | Feed            | Yes           |
| `/profile/:username`        | Profile         | Yes           |
| `/messages`                 | Messages        | Yes           |

Unauthenticated access to protected routes redirects to `/login`.

---

## Placeholder Image Strategy (Dev)
Use `https://picsum.photos/seed/{id}/400/400` for post images during development.
Replace with actual art assets before shoot.
Avatars: `https://i.pravatar.cc/150?u={username}`

---

## Open Questions (resolve before or during Phase 2)
- [ ] What is the film's time period? (affects caption language, UI era)
- [ ] What is the dramatic content of the Abby/Kyle message thread?
- [ ] Will the app be shot on a real phone screen or composited in post?
- [ ] Final tagline for Splash page?
- [ ] Does Abby's profile need a Kyle-visible view vs. self-view difference?