# Supplied Stitch export → implemented routes

The supplied HTML exports were inspected before implementation. The project includes the screens found in the exports:

| Supplied design | Route | Status |
|---|---|---|
| Dashboard | `/` | Implemented |
| Profile | `/profile` | Implemented |
| Resume Analyzer | `/resume` | Implemented |
| Skill Gap | `/skill-gap` | Implemented |
| Roadmap | `/roadmap` | Implemented |
| DSA Practice | `/dsa` | Implemented |
| AI Mock Interview | `/mock-interview` | Implemented |
| Company Prep: Infosys | `/company-prep` | Implemented with company selector |
| Job Tracker | `/jobs` | Implemented |
| Career Coach | `/coach` | Functional companion route; the supplied nav references it but no standalone screen was present in the inspected exports |
| Analytics | `/analytics` | Implemented |
| Settings | `/settings` | Implemented |

Shared design characteristics retained from the exports:
- Inter typography
- Material Symbols icons
- Indigo primary `#3525CD` / `#4F46E5`
- Light surface/card hierarchy
- 4/8/12/16/24/32/48/64 spacing rhythm
- 8/12px rounded cards and controls
- desktop 256px navigation + top bar
- mobile bottom navigation
- progress bars, circular progress, bento cards, timeline, kanban, tabs and glass panels

The two raw pasted design exports used as references are stored under `reference/`.
