# Starter Kit

A reusable frontend starter for Next.js projects with a scalable folder structure, documentation template, and AI-assisted development workflow.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS 4
- ESLint

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run production build locally |
| `npm run lint` | Run ESLint |

## Documentation

All project documentation lives in [`docs/`](docs/INDEX.md).

Start here: **[docs/INDEX.md](docs/INDEX.md)**

Key documents:

- [Development setup](docs/01-setup/DEVELOPMENT.md)
- [Frontend architecture](docs/02-architecture/FRONTEND_ARCHITECTURE.md)
- [Frontend rules](docs/03-standards/FRONTEND_RULES.md)
- [Style guide](docs/03-standards/STYLE_GUIDE.md)

## Project Structure

```
app/          Next.js App Router
components/   Reusable React components
context/      React Context providers
services/     API calls and integrations
lib/          Library setup
hooks/        Custom React hooks
types/        TypeScript definitions
utils/        Helper functions
config/       Application configuration
constants/    Fixed values and enums
public/       Static assets
docs/         Project documentation
```

## License

Private
