# ResQLink Web — Landing & Dashboard

Public-facing landing page and LGU web dashboard for the [ResQLink](https://resqlink.org) emergency response platform.

**Live site:** [resqlink.org](https://resqlink.org)
**Web app:** [web.resqlink.org](https://web.resqlink.org)
**Android APK:** [Google Drive](https://drive.google.com/open?id=1-dKhWDNAa9fW0pK6UyLdinbitGvq-Px3&usp=drive_fs)

---

## Stack

- **Vite 6** + React 18 + TypeScript
- **Tailwind CSS 4** + shadcn/ui (Radix UI)
- **recharts** for KPI charts
- **Appwrite** for auth integration

## Development

```bash
./run.sh          # dev server with .env.dev
./run.sh release  # production build with .env.prod
./run.sh preview  # preview production bundle locally
```

Or manually:

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # outputs to build/
```

## Environment

| File | Purpose |
|---|---|
| `.env.dev` | Local development config |
| `.env.prod` | Production config (used by `./run.sh release`) |
| `.env.example` | Template — copy to `.env` to get started |

Key variables:

```env
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_PROJECT_NAME=
VITE_APPWRITE_ENDPOINT=
```

## Docker

```bash
# Build and serve on port 80
docker build -t resqlink-web .
docker run -p 80:80 resqlink-web
```

> **Note:** Dockerfile uses the `.env` present at build time. Copy `.env.prod` → `.env` before building for a production Docker image.

## Project Structure

```
src/
├── components/       # Page sections and UI components
│   ├── HeroSection.tsx
│   ├── DownloadAppSection.tsx
│   ├── DashboardPreview.tsx   # Animated demo mode
│   ├── Navigation.tsx
│   └── ui/                    # shadcn/ui primitives
├── context/
│   └── DemoModeContext.tsx    # Demo mode toggle
├── hooks/
│   └── useScenarioPlayback.ts # Scenario simulation engine
└── assets/
    └── data/scenarios/        # Demo scenario data
```

## Authors

VILLAROSA, Jam Emmanuel A. — Project Manager · `jvillarosa.a12240987@umak.edu.ph`
TENORIO, Rallon Phillip
CUIZON, Mark — Partnerships & LGU Relations · `mcuizon.a12241782@umak.edu.ph`
SIAZON, Mark
