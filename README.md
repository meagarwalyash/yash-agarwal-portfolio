# Yash Agarwal (MeAgarwalYash) — Executive Growth Architect Platform

A modern, high-performance executive personal branding platform built with **React 18**, **Vite**, **TypeScript**, and **Tailwind CSS**. Optimized for ultra-fast load times, responsive design, interactive 3D particle animations, multilingual internationalization (6 languages), and seamless static deployment to **Cloudflare Pages**, **Vercel**, and **Netlify**.

---

## 🚀 Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Framer Motion & HTML5 Canvas Matrix Engine
- **Deployment Platform**: Cloudflare Pages / Vercel / Netlify

---

## 📁 Repository Structure

```
MAY Website/
│
├── public/                     # Static assets served directly
│   ├── favicon.svg             # Brand SVG Favicon
│   ├── manifest.json           # Web App Manifest
│   ├── robots.txt              # Search engine crawler instructions
│   ├── sitemap.xml             # Search engine index sitemap
│   ├── _routes.json            # Cloudflare Pages routing rules
│   ├── _headers                # Performance & security HTTP headers
│   ├── no godfather cover.png  # Book cover asset
│   └── yashdp.png              # Executive portrait asset
│
├── src/                        # Application source code
│   ├── assets/                 # Local image & graphic assets
│   ├── components/             # Modular React components
│   │   ├── About.tsx           # Executive narrative & key competencies
│   │   ├── AdminDashboard.tsx  # Interactive CMS lead management modal
│   │   ├── AiAssistant.tsx     # Executive AI chatbot assistant
│   │   ├── BlogSection.tsx     # Strategy articles & insights
│   │   ├── BookSection.tsx     # "No Godfather" book spotlight
│   │   ├── Brands.tsx          # Client logos & enterprise scaleups
│   │   ├── ContactSection.tsx  # Lead capture form & Calendly integration
│   │   ├── Experience.tsx      # Interactive career timeline
│   │   ├── Footer.tsx          # Site footer & social links
│   │   ├── Hero.tsx            # Main hero banner & CTA buttons
│   │   ├── MediaCoverage.tsx   # Press features (Forbes, ANI, ET)
│   │   ├── Navigation.tsx     # Floating multi-language glass dock
│   │   ├── ParticleCanvas.tsx  # 3D interactive matrix background
│   │   ├── Portfolio.tsx       # Case studies & ROI metrics modal
│   │   ├── ResumeModal.tsx     # Executive CV preview & download
│   │   ├── Services.tsx        # 12 Strategic capability cards
│   │   ├── SpeakingSection.tsx # Keynotes & executive masterclasses
│   │   └── Testimonials.tsx   # Client endorsements & video reviews
│   │
│   ├── i18n/                   # Multi-language translation dictionaries
│   │   └── translations.ts     # EN, HI, MR, GU, BN, PA translations
│   │
│   ├── App.tsx                 # Main Application Layout Component
│   ├── main.tsx                # React DOM render entry point
│   ├── index.css               # Global Tailwind CSS & design tokens
│   └── types.ts                # TypeScript interface & type definitions
│
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML5 Vite entry point with full SEO meta
├── package.json                # Project dependencies & npm scripts
├── postcss.config.js           # PostCSS configuration for Tailwind
├── tailwind.config.js          # Tailwind CSS design system tokens
├── tsconfig.json               # TypeScript compiler options & paths
├── tsconfig.node.json          # Vite node engine configuration
└── vite.config.ts              # Vite bundler, path aliases & output settings
```

---

## 🛠️ Local Development & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher (v22 recommended)
- **npm**: v9.0.0 or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
This compiles the application and generates optimized static assets in the `dist` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ⚡ Deployment Instructions

### Cloudflare Pages Deployment (Recommended)

1. Connect your GitHub repository to **Cloudflare Pages**.
2. Set the build configuration settings as follows:

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Node.js Version** | `22` |

3. Add environment variable under **Settings -> Environment variables**:
   - `NODE_VERSION`: `22`
4. Click **Save and Deploy**.

---

### Vercel Deployment

1. Import the repository in [Vercel](https://vercel.com).
2. Framework Preset will automatically detect **Vite**.
3. Output Directory: `dist`
4. Click **Deploy**.

---

### Netlify Deployment

1. Connect your repository to [Netlify](https://netlify.com).
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Click **Deploy Site**.

---

## 🔒 Verification & Quality Checklist

- [x] **Zero TypeScript Errors**: `tsconfig.json` correctly includes `src/**/*` and uses path aliases.
- [x] **Clean Repository Structure**: Nested `.git` folder in `src/` removed.
- [x] **Production Bundle**: Generates static assets in `dist/` with zero warnings.
- [x] **SEO Optimized**: Open Graph, Twitter Cards, JSON-LD Schema.org, `robots.txt`, and `sitemap.xml` configured.
- [x] **Asset Resolution**: All images, icons, and fonts resolve cleanly.
