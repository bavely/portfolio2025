# Bavely Tawfik Portfolio 2025

Personal portfolio website built with Next.js, TypeScript, Tailwind CSS, Firebase, and animated React UI components. The site presents a full-stack developer profile, skills, portfolio projects, contact form, and resume viewer.

## Features

- Animated landing page with theme-aware header, live clock, floating dock navigation, and view transitions.
- Routes for About, Skills, Portfolio, Contact, Resume, Private, and Resume Import workflows.
- Portfolio carousel with modal project details, screenshots, GitHub links, live links, and technology tags.
- Skills page with animated circular progress indicators and Simple Icons cloud.
- Contact form with server-verified Google reCAPTCHA v3, input validation, per-IP rate limiting, and Firestore persistence.
- Private contact-message table backed by Firestore and TanStack Table, behind a server-side admin session.
- Resume PDF served from `public/uploads/resume.pdf` with a download fallback, plus an admin-only resume upload route (PDF only, 5 MB cap, magic-byte checked) that replaces `public/uploads/resume.pdf`.
- SEO metadata, Open Graph/Twitter metadata, generated sitemap, and robots.txt support.

## Tech Stack

- Next.js 14 App Router
- React 18 and TypeScript
- Tailwind CSS with custom animations and shadcn-style UI primitives
- Firebase Firestore, accessed server-side through the Firebase Admin SDK
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
| `/api/contact` | Contact form API endpoint: verifies reCAPTCHA, validates input, rate limits, saves to Firestore |
| `/private` | Admin-only table of contact messages (noindex, requires sign-in) |
| `/resumeimport` | Admin-only resume upload (noindex, requires sign-in) |

## Getting Started

Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env` and fill in the values described below.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Only `NEXT_PUBLIC_*` values are safe to expose: Next.js inlines them into the
JavaScript bundle every visitor downloads. Everything else below is a secret and
must **not** carry that prefix. See `.env.example`.

Public (browser bundle):

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=   # reCAPTCHA v3 site key, public by design
```

Secret (server only):

```bash
RECAPTCHA_SECRET_KEY=             # verifies reCAPTCHA tokens server-side
ADMIN_PASSWORD=                   # gates /private and /resumeimport
ADMIN_SESSION_SECRET=             # HMAC key signing the admin session cookie
FIREBASE_PROJECT_ID=              # Firebase Admin service account
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
BREVO_SMTP_USER=                  # Brevo SMTP relay
BREVO_SMTP_KEY=
CONTACT_NOTIFY_TO=                # where new submissions are announced
CONTACT_FROM_EMAIL=               # sender address; must be verified in Brevo
```

`FIREBASE_SERVICE_ACCOUNT_JSON` may be used instead of the three `FIREBASE_*`
fields, holding the whole service-account JSON in one variable.

Generate a session secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Security model

- **Admin access.** `/private` and `/resumeimport` are server components. The
  password is verified on the server and exchanged for a signed, httpOnly
  session cookie (8 hour lifetime, 5 attempts per IP per 15 minutes). Protected
  data is fetched *after* the session check, so an unauthenticated request never
  receives it. The `upload` server action re-checks the session itself, because
  every export of a `"use server"` module is a public HTTP endpoint that the UI
  cannot protect.
- **Firestore.** All access goes through the Admin SDK server-side. Deploy
  `firestore.rules` (deny-all) so the database cannot be read or written
  directly from a browser — the public web config would otherwise allow it:

  ```bash
  firebase deploy --only firestore:rules
  ```

- **Contact form.** `/api/contact` verifies the reCAPTCHA token with Google
  before writing, validates and length-caps every field, and rate limits to 5
  submissions per IP per hour. Verification fails closed: if the check cannot be
  completed, the submission is rejected.
- **Rate limits** are held in process memory, so on a serverless host they apply
  per instance. Move them to a shared store if abuse becomes a real problem.
- **Contact email.** After a submission is saved, `/api/contact` emails
  `CONTACT_NOTIFY_TO` (with `replyTo` set to the sender, so you can reply
  directly from your inbox) and sends the submitter an acknowledgement. Both are
  best effort: the message is already stored, so a mail failure is logged rather
  than surfaced, to avoid prompting a duplicate resubmission. If
  `CONTACT_NOTIFY_TO` is unset, no notification is sent and the server logs a
  warning. SMTP uses `requireTLS`, so credentials are never sent over an
  unencrypted connection.

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
src/actions/             Server actions (admin sign-in/sign-out)
src/lib/                 Auth, Firebase Admin, reCAPTCHA, rate limiting, validation, utilities
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

Deploy as a standard Next.js application, then:

1. Set every variable from `.env.example` in the hosting provider. The app fails
   loudly at runtime if a required secret is missing.
2. Deploy the Firestore rules: `firebase deploy --only firestore:rules`.
3. Keep `next-sitemap.config.js` aligned with the production domain.

Note: `/resumeimport` writes to `public/uploads/` on the local filesystem. That
works on a persistent server but not on read-only serverless filesystems such as
Vercel, where uploads will fail or not survive a redeploy. Move the resume to
object storage if you deploy there.
