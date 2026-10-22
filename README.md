# PULSEBOARD — SaaS Analytics Dashboard

A dense, calm, working analytics dashboard for a fictional subscription software company. Built with React, TypeScript, Tailwind CSS, Recharts, and Framer Motion.

> **Note:** All metrics, customer records, and activity data shown in the application are fictional and generated for demonstration purposes only.

---

## Features

### Overview Dashboard
- **KPI cards** — Monthly Recurring Revenue, Active Users, Churn Rate, Trial-to-Paid Conversion
- **Interactive time-range selector** — 7 Days, 30 Days, 90 Days, 12 Months
- **Revenue chart** — Area chart with Revenue and MRR series, custom tooltips, and gradient fills
- **User growth chart** — Active users and new signups over time
- **Quick stats panel** — ARPU, support tickets, net revenue retention, and more
- **Recent activity feed** — Real-time-style log of signups, upgrades, cancellations, payments, and support events

### Customers Module
- Searchable table with full-text search across name, email, company, and ID
- Column sorting (ascending/descending) on all columns
- Status filter chips (All, Active, Trial, Churned, Paused)
- Animated empty state when no results match
- Responsive table that scrolls horizontally on small screens

### Notifications
- Typed notifications (alert, info, success, warning) with icons
- Unread indicator badges in sidebar and top bar
- "Mark all read" action
- Animated list with staggered entry

### Activity Feed
- Chronological log of recent platform events
- Color-coded icons by event type
- Staggered animation on render

### Settings
- Sectioned settings with General, Notifications, Security, and Appearance tabs
- Toggle switches with spring animation
- Select dropdowns, text inputs, and density controls
- Save confirmation with animated state feedback

### Profile
- Editable profile form with avatar placeholder
- Bio, company, location, and contact fields
- Save confirmation state

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | Lucide React |
| Build | Vite |

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type-check without building
npm run typecheck
```

The development server runs at `http://localhost:3000`.

---

## Project Structure

```
src/
├── App.tsx                    # Root component, routing, layout orchestration
├── main.tsx                   # Entry point
├── index.css                  # Tailwind imports, theme tokens, global styles
├── types.ts                   # Shared TypeScript interfaces
├── components/
│   ├── Sidebar.tsx            # Left navigation rail (responsive)
│   ├── TopBar.tsx             # Compact toolbar with search, time range, notifications
│   ├── MobileNav.tsx          # Bottom tab bar for mobile
│   ├── MetricsCards.tsx       # KPI summary cards
│   ├── Charts.tsx             # Revenue and user growth charts
│   ├── CustomerTable.tsx      # Searchable, sortable customer table
│   ├── NotificationsPanel.tsx # Notifications list
│   ├── ActivityFeed.tsx       # Recent activity log
│   ├── Settings.tsx           # Settings with sectioned tabs
│   └── Profile.tsx            # User profile editor
└── data/
    └── mockData.ts            # Fictional data generators and static demo data
```

---

## Design Principles

- **Dense but calm** — High information density without visual noise
- **White and slate surfaces** — Clean backgrounds with subtle borders
- **Limited violet accents** — Violet used sparingly for active states, primary actions, and key data
- **Strong numerical hierarchy** — Large bold values, smaller labels, muted secondary text
- **Mobile-first** — Designed from 320px up, with recomposed layouts for each breakpoint
- **Working interface** — Every control is functional; no decorative-only elements

---

## Responsive Behavior

| Breakpoint | Layout |
|-----------|--------|
| 320–767px | Collapsed sidebar (hamburger menu), bottom tab navigation, single-column cards |
| 768–1023px | Collapsed sidebar, two-column metric cards, stacked charts |
| 1024px+ | Persistent sidebar rail, four-column metrics, side-by-side charts |

---

## Accessibility

- Semantic HTML with ARIA labels on all interactive elements
- Keyboard navigation support throughout
- `prefers-reduced-motion` respected — animations are simplified or disabled
- Focus indicators on all interactive controls
- Sufficient color contrast (WCAG AA)
- Status communicated through text and icons, not color alone

---

## Data Disclaimer

This application uses **entirely fictional data** for demonstration purposes. No real user data, real-time metrics, or live API connections are involved. The data is generated client-side on each page load using deterministic seed patterns with controlled randomness.

---

## License

MIT
