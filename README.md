# PlacementPilot AI / CareerAI — Complete React App

A production-style React + TypeScript + Vite implementation based on the supplied Google Stitch HTML exports. The design system follows the supplied screens: Inter typography, indigo primary palette, 4/8/12/16/24/32px spacing rhythm, rounded cards, glass panels, responsive side navigation and mobile bottom navigation.

## Routes
- `/` Dashboard
- `/profile` Student Profile
- `/resume` Resume Analyzer
- `/skill-gap` Skill Gap Analysis
- `/roadmap` 30-Day Roadmap
- `/dsa` DSA Practice
- `/mock-interview` AI Mock Interview
- `/company-prep` Company Prep (Infosys and selectable companies)
- `/jobs` Job Tracker
- `/coach` Career Coach
- `/analytics` Placement Analytics
- `/settings` Settings

## Run
```bash
npm install
npm run dev
```

Production build:
```bash
npm run build
npm run preview
```

## Data / backend
No backend is required for the current build. Interactions use React state and browser local state where appropriate. Replace `src/data` and `src/services/storage.ts` with API calls later.

## Included interactions
- React Router navigation across all supplied screens
- Responsive desktop/mobile navigation
- Resume file picker UI
- Profile editing
- Roadmap completion
- DSA search, topic/difficulty filtering, solve state and AI explanation
- Mock interview answer → feedback → next question
- Company selector, tabs and Copilot chat
- Job tracker search/filter/add application modal
- Analytics charts
- Settings theme/notification controls
- Career Coach chat
