# Personal Profile

Modern and responsive profile website built with Next.js App Router, Tailwind CSS, and `next-intl` (domain-based i18n).

## Live

- https://www.marciosobral.net

## Highlights

- Multi-language Support
- Color theme picker
- Dark mode switcher
- Maintenance mode

## Tech Stack

- Next.js
- Tailwind CSS
- next-intl
- TypeScript

## Prerequisites

- Node.js >= 20.19
- pnpm >= 10.15

## Getting Started

Install dependencies:

```bash
pnpm install
```

Set up environment variables:

```bash
cp .env.example .env.local
```

Run dev server:

```bash
pnpm dev
```

## Scripts

```bash
pnpm dev         # Start dev server
pnpm build       # Production build
pnpm start       # Start production server
pnpm lint        # ESLint
pnpm typecheck   # TypeScript typecheck
pnpm format      # Prettier write
pnpm test        # Vitest
pnpm check       # lint + typecheck + test
```

## Environment Variables

```env
MAINTENANCE=false              # Foces all pages to redirect to the maintenance page
```

Notes:

- `MAINTENANCE=true` forces all pages to redirect to the maintenance page.

## Deployment

This project is optimized for Vercel deployment, but can be deployed on any platform that supports Next.js

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/marciosobral/profile)

## License

This project is licensed under the MIT License. Check [LICENSE](LICENSE) for more details
