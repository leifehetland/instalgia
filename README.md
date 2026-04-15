# Instalgia

> *moments worth keeping*

A mobile-first social photo feed app — think Instagram with a dark, nostalgic aesthetic. Built as a prototype/demo with React + Vite.

## What it does

- **Feed** — scroll a curated photo feed from multiple users, like posts
- **Profiles** — view user profiles with post grids, follower/following counts, and bios
- **Messages** — browse direct message threads (read-only in this demo)
- **Auth** — login/logout with session persistence via localStorage

The app is constrained to a 390px mobile viewport and is best experienced in a browser at that width or in Chrome's mobile device emulator.

## Tech stack

| Layer | Library |
|---|---|
| UI | React 19 + Tailwind CSS v4 |
| Routing | React Router v7 |
| State | Zustand (with `persist` middleware) |
| Build | Vite 8 |

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Test logins

| Username | Password |
|---|---|
| `sodowntonabby` | `abby1234` |
| `kycardio86` | `kyle1234` |

## Other scripts

```bash
npm run build    # production build
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```
