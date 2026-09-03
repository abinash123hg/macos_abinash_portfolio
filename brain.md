# Abinash Swain Portfolio Project Brain

## Project Purpose
This is a personal portfolio operating system for Abinash Swain. It provides an AI/ML and Data Analytics focused entry landing page plus existing macOS desktop and iPhone mobile portfolio experiences.

## Preservation Rules
- Do not rebuild the project from scratch.
- Preserve existing portfolio data, projects, links, certifications, images, videos, wallpapers, applications, state, local storage, API integrations, and handlers.
- Do not duplicate or replace existing data arrays and objects with invented content.
- Keep existing macOS and iPhone systems, apps, animations, and functionality intact.
- Make the smallest change required for a requested feature.
- Do not rename or move files unnecessarily.

## Architecture
- `src/App.tsx` owns the top-level device experience and desktop entry handoff.
- `src/context/DeviceContext.tsx` owns device state, automatic viewport detection, desktop windows, iPhone state, and shared handlers.
- Desktop uses the existing macOS components under `src/components/desktop` and `src/components/mac`.
- Mobile uses the existing iPhone components under `src/components/iphone` and `src/components/mobile`.
- `src/components/common/LandingScreen.tsx` is the shared recruiter-facing entry landing surface.
- `src/data/portfolioData.ts` is the canonical portfolio content source.
- `src/utils/mediaResolver.ts` resolves existing local media assets.

## Device Behavior
- Automatic device detection uses the existing viewport media query in `DeviceContext`.
- Desktop/laptop view opens the existing macOS portfolio experience.
- Mobile view opens the existing iPhone portfolio experience.
- Do not add a manual macOS/iPhone selector to the entry page.

## Landing Behavior
- The landing page is an entry layer only, not a replacement for either operating system.
- Use actual portfolio identity and data: Abinash Swain, AI/ML, Machine Learning, Data Analytics, real projects, contact links, and existing assets.
- The primary landing CTA must call the existing portfolio handoff callback without reloading or duplicating the portfolio.
- Keep landing content responsive, accessible, keyboard usable, and free of horizontal overflow.
- Background media must remain behind content and must not block pointer events.

## Styling and Motion
- Follow existing CSS and Tailwind conventions before introducing new abstractions.
- Keep important content in normal layout flow; avoid brittle absolute positioning for content.
- Animate opacity and transforms only for ambient or entrance motion.
- Respect `prefers-reduced-motion`.
- Maintain readable contrast over video and decorative backgrounds.

## Validation
- Run TypeScript validation with `node .\\node_modules\\typescript\\bin\\tsc --noEmit` from the quoted workspace path.
- Run the production Vite build with `node .\\node_modules\\vite\\bin\\vite.js build`.
- When practical, verify the landing page in a browser at desktop and mobile widths.
- Verify the landing CTA opens the existing desktop or iPhone experience.
- Report unrelated existing build warnings without changing unrelated systems.
