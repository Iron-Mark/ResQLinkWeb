# ResQLink Web

Public-facing landing page for the **ResQLink** emergency response platform, with an interactive LGU command dashboard demo.

**Live site:** [resqlink.org](https://resqlink.org)

## Stack

- **Vite 6** + React 18 + TypeScript
- **Tailwind CSS 4** + shadcn/ui (52 Radix UI primitives)
- **recharts** for KPI charts
- **react-router 7** for client-side routing
- **Lucide React** for icons

## Prerequisites

- **Node.js** v18+ (or Bun)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your Appwrite credentials:

| Variable                     | Required | Description                                |
| ---------------------------- | -------- | ------------------------------------------ |
| `VITE_APPWRITE_PROJECT_ID`   | Yes      | Appwrite project ID                        |
| `VITE_APPWRITE_PROJECT_NAME` | No       | Project display name (default: `ResQLink`) |
| `VITE_APPWRITE_ENDPOINT`     | Yes      | Appwrite endpoint URL                      |

### 3. Run

```bash
# Development
npm run dev               # http://localhost:3000

# Or use the run script
./run.sh                  # Dev server
./run.sh release          # Production build
./run.sh preview          # Preview production bundle locally
```

### 4. Build for production

```bash
npm run build             # Outputs to build/
```

## Project Structure

```
src/
├── main.tsx                    React Router setup (/, /terms-and-conditions)
├── App.tsx                     Landing page orchestrator
├── index.css                   Tailwind imports
├── styles/globals.css          Theme variables (OKLCH colors, dark mode)
├── components/
│   ├── Navigation.tsx          Sticky header, mobile menu, scroll-active links
│   ├── HeroSection.tsx         Hero with gradient backgrounds and CTAs
│   ├── Achievements.tsx        InfoTech Productivity Champion badge + photos
│   ├── FeaturesShowcase.tsx    12+ feature cards (SOS, AI Triage, BLE Mesh, etc.)
│   ├── AITriageFlow.tsx        3-step AI triage visualization
│   ├── DashboardPreview.tsx    Interactive demo mode with animated LGU dashboard
│   ├── PlatformOverview.tsx    Citizen / Rescuer / LGU platform cards
│   ├── SDGSection.tsx          UN SDG 11 & 13 impact section
│   ├── DownloadAppSection.tsx  App download CTAs
│   ├── figma/
│   │   └── ImageWithFallback.tsx  Image component with fallback
│   └── ui/                     52 shadcn/ui primitives (button, card, dialog, etc.)
├── context/
│   └── DemoModeContext.tsx     Demo mode toggle (isDemoActive, activateDemo, etc.)
├── hooks/
│   └── useScenarioPlayback.ts  Scenario simulation engine (1s tick, 300s loop)
├── pages/
│   └── terms-and-conditions.tsx  Terms & Conditions page
├── utils/
│   └── seo.ts                  SEO meta tags, Open Graph, JSON-LD structured data
└── assets/
    ├── logos/                  App icons (adaptive, hdpi–xxxhdpi)
    │   └── sdg/                UN SDG goal icons
    ├── data/scenarios/
    │   └── disaster_scenario_1.json  Demo playback data (10 incidents, 14 events)
    └── *.jpg, *.png            Achievement section photos, InfoTech logo

public/
├── robots.txt                  Crawl directives + sitemap reference
├── sitemap.xml                 2 URLs (/, /terms-and-conditions)
├── .well-known/assetlinks.json Android deep link verification
└── recovery.html               Error recovery page

```

## Landing Page Sections

1. **Navigation** — Sticky header with logo, nav links, mobile hamburger menu
2. **Hero** — "Actionable Intelligence when lives depend on it" + CTAs
3. **Achievements** — Photo backgrounds + InfoTech Productivity Champion badge
4. **Features** — SOS Reporting, AI Triage, Grab-Style Matching, BLE Mesh, and more
5. **AI Triage Flow** — 3-step visual: Report Submission → AI Summarization → Smart Reranking
6. **Dashboard Preview** — Interactive demo mode with live KPIs, incident cards, responder roster
7. **Platforms** — Citizen Portal, Rescuer Dashboard, LGU Command Center
8. **SDG Impact** — UN Goals 11 (Sustainable Cities) & 13 (Climate Action)
9. **Download App** — Android APK download
10. **Contact/Footer** — Emergency hotline, support emails, partnership inquiries

## Demo Mode

Self-contained scenario playback — no API calls required.

- **Toggle**: "Demo" pill in navigation bar (dimmed → green pulse when active)
- **Playback**: `useScenarioPlayback` hook drives 1-second ticks over a 300-second loop
- **Features**: Live incident spawning, KPI calculations, status changes, responder assignments
- **Data**: `src/assets/data/scenarios/disaster_scenario_1.json` (Typhoon Luzon — 10 incidents, 3 rescue teams, 14 timeline events)

## SEO

- Open Graph + Twitter Card meta tags
- JSON-LD structured data (Organization, SoftwareApplication, BreadcrumbList)
- Sitemap at `/sitemap.xml`
- Robots.txt with crawl directives

## Environment

| File           | Purpose                                  |
| -------------- | ---------------------------------------- |
| `.env.example` | Template — copy to `.env` to get started |
| `.env`         | Active config (used by all commands)     |

## Docker

Multi-stage build: Bun (install + build) → Nginx (serve static).

```bash
docker build -t resqlink-web .
docker run -p 80:80 resqlink-web
```

> Dockerfile uses `.env` at build time. Ensure it has production values before building.

## Authors

- VILLAROSA, Jam Emmanuel A. — Project Manager & Lead Developer
- TENORIO, Rallon Phillip - Research Lead
- CUIZON, Antoinette — QA Lead
- SIAZON, Mark Angelo - Product Designer & Full-Stack Developer

---

_Last updated: 2026-04-08_
