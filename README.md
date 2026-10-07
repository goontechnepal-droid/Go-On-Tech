# Go-On-Tech

Official web platform for **Go On Tech Pvt. Ltd.** (Kathmandu, Nepal) — specialising in cybersecurity, VAPT, cloud infrastructure, SaaS platforms, bank card printing, ID card personalisation, and enterprise IT solutions.

---

## 🚀 Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Vanilla CSS Design System with responsive grid, glassmorphism, and custom typography
- **State & Data**: TanStack React Query + React Router v6
- **Database & Storage**: Supabase (PostgreSQL, Row Level Security, Storage Buckets)
- **Forms & Validation**: React Hook Form + Zod

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or pnpm

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Database Setup
Database migrations and seed scripts are located in `supabase/`:
- `supabase/migrations/0001_init.sql`: Tables, indexes, triggers, and Row Level Security policies.
- `supabase/seed.sql`: Initial services and client portfolio data.

### 5. Run Locally
```bash
npm run dev
```

### 6. Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
├── public/                 # Static assets and client logos
├── scripts/                # Utility scripts (seed generation)
├── src/
│   ├── assets/             # Images and design assets
│   ├── components/         # Reusable UI & section components
│   ├── config/             # Site configuration and navigation
│   ├── data/               # Types and fallback data
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Supabase client and database types
│   ├── pages/              # Application route pages
│   ├── styles/             # Global design tokens and styles
│   ├── main.tsx            # Application entry point
│   └── router.tsx          # Client-side router configuration
├── supabase/               # SQL migrations and seed data
└── vercel.json             # SPA routing rewrite configuration
```

---

## 📄 License

Proprietary © Go On Tech Pvt. Ltd. All rights reserved.
