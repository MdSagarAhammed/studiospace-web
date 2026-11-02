# StudioSpace — Frontend

The frontend for **StudioSpace**, a peer-to-peer marketplace where creators
book photography studios, cinema sound stages, podcast lounges, music suites
and art workshops by the hour.

**Stack:** Next.js (App Router) · JavaScript · Tailwind CSS v4 · shadcn/ui (Base UI) · BetterAuth client · Swiper · Sonner

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Open http://localhost:3000

## Environment variables

| Variable | Purpose |
| --- | --- |
| `BACKEND_ORIGIN` | Backend origin for the server-side Next.js proxy (defaults to `http://localhost:5010`) |
| `NEXT_PUBLIC_IMGBB_API_KEY` | imgbb key used by the studio image uploader |

Browser API and auth requests use the same-origin `/api/backend` route, which
the Next.js server proxies to `BACKEND_ORIGIN`. This keeps session cookies
first-party when the frontend and backend use different hosting domains.

For deployment, set `BACKEND_ORIGIN` on the frontend host to the backend
origin (for this deployment: `https://studiospace-server-gr2y.vercel.app`).
On the backend, set `CLIENT_URL` to the exact frontend origin and set
`BETTER_AUTH_URL` to `https://studiospace-web.onrender.com/api/backend/auth`.
Update the Google OAuth redirect URI to
`https://studiospace-web.onrender.com/api/backend/auth/callback/google`.
Redeploy both apps after changing their environment variables.

## Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Hero slider, featured studios (limit 6), categories, how-it-works, host guarantee |
| `/studios` | Public | Explore grid with search, category filter & sort (`?category=` pre-select supported) |
| `/studios/[id]` | Public | Gallery, specs, amenities, host card, reviews, booking modal |
| `/login` · `/register` | Public | Email/password auth (password rules validated client-side) + Google social login |
| `/add-studio` | Private | List a new studio (imgbb upload, read-only host info) |
| `/studios/edit/[id]` | Private | Pre-filled update form |
| `/my-listings` | Private | Owner table with update/delete + delete confirmation modal |
| `/my-bookings` | Private | Booking list with status badges & pending-slot cancellation |
| `/dashboard` | Private | Quick links hub |

## Backend contract

This frontend expects the Express API (separate repository) to serve:

- `GET /studios?search&category&sort` · `GET /studios/featured` · `GET /studios/:id` · `GET /studios/mine`
- `POST /studios` · `PUT /studios/:id` · `DELETE /studios/:id` (ownership enforced server-side)
- `POST /bookings` (status `Pending`) · `GET /bookings/mine` · `PATCH /bookings/:id/cancel`
- BetterAuth mounted at `/api/auth` with the MongoDB adapter, JWT sessions and the Google provider.

Requests send cookies (`credentials: "include"`) — enable CORS with credentials on the backend.
