# BYOS

Bring Your Own Software is a front-end prototype of an internal catalog for developer tools. The idea is that engineers submit software they want to use, a security review assigns a status, and approved tools appear in a Software Locker.

This repository is a UI demo with static sample data. It is a prototype for showing the workflow, built by [Mithun](https://github.com/MithunXcpu), a solutions engineer.

## What you can do in the demo

The home page is the whole app:

- Read a short overview of the certification idea
- See counts of the sample tools: total, certified, pending, and denied
- Browse the **Software Locker**. Search matches name, description, and category. Filters cover status (certified, pending, denied) and category (IDE, DevOps, AI/ML, and the rest of the list in `app/data.ts`)
- Open a tool card for its sample security score, risk level, permissions, and data-access labels
- Scan a table of recent sample results (tool, submitter, date, status, risk, score)
- Read policy cards for the kinds of checks a review might cover: SOC 2 alignment, GDPR data handling, OAuth scope review, dependency vulnerability scanning, and network access audit
- Follow a four-step explanation: submit a tool, automated scan, risk assessment, then certified or denied

Search and filters run in the browser against the sample list.

Names, scores, dates, and permissions in the UI are fictional demo content from `app/data.ts`. The policy cards are descriptions only. This prototype has no scanner, submission form, accounts, or database.

The header links to `/locker`, `/submit`, `/security`, and `/how-it-works`. Those routes have no pages. The locker, scans, policies, and how-it-works content are sections on the home page. The hero buttons jump to the locker section (`#locker`).

## Stack

- [Next.js](https://nextjs.org/) 15 (App Router) and React 19
- TypeScript
- Tailwind CSS 4, loaded with `@tailwindcss/postcss`
- Geist and Geist Mono through `next/font`
- Inline SVG icons

`npm run dev` starts Next.js with Turbopack. `next.config.ts` is the default empty config.

## Run it

Node.js 18.18 or newer (the Next.js 15 minimum) and npm.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts from `package.json`:

- `npm run build` — production build
- `npm start` — serve that build
- `npm run lint` — `next lint`

## Project files

- `app/page.tsx` — home page UI
- `app/layout.tsx` — header, footer, and metadata
- `app/data.ts` — sample tools, scans, categories, and policies
- `app/globals.css` — Tailwind theme (dark surfaces and status colors)
