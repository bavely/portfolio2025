# Bavely Tawfik Portfolio 2025

Personal portfolio website built with Next.js, TypeScript, Tailwind CSS, Firebase, and animated React UI components. The site presents a full-stack developer profile, skills, portfolio projects, contact form, and resume viewer.

## Features

- Animated landing page with theme-aware header, live clock, floating dock navigation, and view transitions.
- Routes for About, Skills, Portfolio, Contact, Resume, Private, and Resume Import workflows.
- Portfolio carousel with modal project details, screenshots, GitHub links, live links, and technology tags.
- Skills page with animated circular progress indicators and Simple Icons cloud.
- Contact form with Google reCAPTCHA v3 client integration and Firestore contact persistence.
- Private contact-message table backed by Firestore and TanStack Table.
- Resume PDF viewer plus a protected resume upload route that replaces `public/uploads/resume.pdf`.
- SEO metadata, Open Graph/Twitter metadata, generated sitemap, and robots.txt support.

## Tech Stack

- Next.js 14 App Router
- React 18 and TypeScript
- Tailwind CSS with custom animations and shadcn-style UI primitives
- Firebase Firestore
- Google reCAPTCHA v3
- Nodemailer/Brevo email helper
- Framer Motion, Motion, next-view-transitions, next-themes
- TanStack Table
- next-sitemap

## App Routes

| Route | Purpose |
| --- | --- |
| `/` | Animated portfolio introduction |
| `/about` | Developer summary |
| `/skills` | Skill gauges and icon cloud |
| `/portfolio` | Project carousel and detail modals |
| `/contactme` | Contact form and external profile links |
| `/resume` | Embedded resume PDF viewer |
| `/api/contact` | Contact form API endpoint that saves messages to Firestore |

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` with the variables listed below.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

The app reads these values from environment variables:

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_PRIVATE=
NEXT_PUBLIC_SBREVO_API_NAME=
NEXT_PUBLIC_SBREVO_API_KEY=
```

Notes:

- `NEXT_PUBLIC_PRIVATE` gates the `/private` and `/resumeimport` client-side password prompts.
- The contact API currently saves submissions to Firestore. The Brevo/Nodemailer helper exists in `src/actions/action.ts`, but the active `/api/contact` route does not send email by default.
- The reCAPTCHA token is generated on the client. Server-side verification is present as commented code and should be enabled before relying on reCAPTCHA for abuse prevention.

## Scripts

```bash
npm run dev       # Start local development server
npm run build     # Build production app and run next-sitemap afterward
npm run start     # Start production server
npm run lint      # Run Next.js linting
```

The `postbuild` lifecycle runs `next-sitemap`, using `next-sitemap.config.js` with `https://pavli-tawfik.com` as the configured site URL.

## Project Structure

```text
src/app/                 App Router pages, API route, and route-specific actions
src/components/          Shared layout, navigation, animation, and UI components
src/components/ui/       Reusable UI primitives and visual effects
src/actions/             Shared server actions for contact persistence/email helpers
src/lib/                 Firebase setup and utility functions
src/hooks/               Shared React hooks
src/assets/              Imported logos and profile assets
public/images/           Portfolio screenshots and public image assets
public/uploads/          Resume files served by the resume page
```

## Deployment

Build the site before deployment:

```bash
npm run build
```

Deploy as a standard Next.js application. Configure the environment variables in the hosting provider, ensure Firestore rules allow the intended reads/writes, and keep `next-sitemap.config.js` aligned with the production domain.
