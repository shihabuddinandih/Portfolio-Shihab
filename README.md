# Shihab — Web & Game Developer Portfolio

Portofolio berbahasa Indonesia untuk proyek pengembangan web, sistem informasi, dan game. Dibangun dengan Next.js App Router, Tailwind CSS v4, Framer Motion, React Three Fiber, Drei, Three.js, dan Lucide icons.

## Art direction
- Neo-Brutalism: oversized type, hard contrast, visible grid, bold color blocks.
- Liquid Glass: translucent floating navigation, glass cards, layered highlights.
- Experimental Playground: asymmetric project cards, chrome-inspired gradients, playful motion.
- Hybrid canvas: warm paper sections alternate with charcoal and acid-lime sections.

## Requirements
- Node.js 20.9+
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Build
```bash
npm run build
npm start
```

## Portfolio content
- Project details, repository links, and project video links are maintained in the `projects` array in `components/portfolio.tsx`.
- Update the About copy, project timeline, technology list, and GitHub profile links in the same component as your experience changes.
- Replace the abstract profile artwork with a portrait in `public/` when a personal photo is ready.
- Adjust palette variables at the top of `app/globals.css`.

## Deployment
Recommended: Vercel. Push this folder to a Git repository, import it into Vercel, keep the default Next.js build settings, and deploy. No environment variables are required for this starter.

## Notes
- The hero sculpture now uses React Three Fiber + Drei for a real-time animated 3D liquid-chrome effect. If performance is limited on a device, replace it with a static WebP/AVIF fallback.
- Framer Motion is used for reveal and hover motion. Reduced-motion preferences are respected.
- Project cards link to their repositories; BrackIt, LADZ-27-Outbreak, and Atturin also include project videos.
- Google Fonts are loaded from CSS; self-host fonts for stricter privacy/offline requirements.
