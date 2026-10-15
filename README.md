# 🌿 FreshKeep — Food Expiry Tracker

A polished frontend-only food expiry tracker UI built with **React**, **JavaScript**, and **Tailwind CSS v4**. Designed to help people track groceries, spot expiring food, and reduce waste.

> **Note:** This is a design-only UI. No backend, API, local storage, or simulated CRUD behavior is included. All controls are visually complete and ready for real functionality to be connected later.

---

## ✨ Features

- **Dashboard** — Welcome screen with summary cards, urgent items area, category breakdown, and first-use welcome banner
- **Inventory** — Responsive grid with search, status/category filters, sorting, and view toggle (grid/list)
- **Add/Edit Item** — Full form UI with validation preview, storage location picker, and all required fields
- **Item Detail** — Detailed view with expiry countdown, info grid, notes, and action buttons
- **UI States Gallery** — Showcase of empty states, loading skeletons, error messages, status badges, and button variants

## 🎨 Visual Design

- **Warm palette**: cream, soft sage, citrus yellow, tomato coral, and muted lavender
- **Liquid glass effects**: translucent surfaces, backdrop blur, layered gradients, refraction highlights
- **Typography**: Fredoka (display) + Inter (body) from Google Fonts
- **Motion**: Staggered entrance animations, hover lift, press feedback, ambient floating decorations
- **Responsive**: Desktop sidebar + mobile bottom nav
- **Accessible**: Focus states, `prefers-reduced-motion` support, ARIA labels, adequate contrast

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Installation

```bash
cd "Food Expiry Tracker"
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` (or the next available port) in your browser.

### Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── decorative/
│   │   └── BackgroundDecor.jsx     # Ambient floating background elements
│   ├── layout/
│   │   ├── AppShell.jsx            # Root layout with sidebar + main area
│   │   ├── Sidebar.jsx             # Desktop navigation sidebar
│   │   └── MobileNav.jsx           # Mobile bottom navigation bar
│   └── ui/
│       ├── Button.jsx              # Multi-variant button component
│       ├── CategoryBreakdown.jsx   # Category icon grid
│       ├── EmptyState.jsx          # Empty state with icon + message
│       ├── FilterChip.jsx          # Selectable filter pill
│       ├── FormField.jsx           # Form input with label + validation
│       ├── GlassCard.jsx           # Liquid glass card component
│       ├── InventoryItemCard.jsx   # Food item card for inventory
│       ├── Modal.jsx               # Overlay modal dialog
│       ├── SearchBar.jsx           # Search input with clear button
│       ├── SkeletonCard.jsx        # Loading shimmer placeholder
│       ├── StatusBadge.jsx         # Expiry status badge (fresh/expiring/expired/used)
│       └── SummaryCard.jsx         # Dashboard metric card
├── pages/
│   ├── AddItem.jsx                 # Add/edit food item form
│   ├── Dashboard.jsx               # Main dashboard
│   ├── Inventory.jsx               # Inventory grid with filters
│   ├── ItemDetail.jsx              # Single item detail view
│   └── UIStates.jsx                # UI states showcase gallery
├── App.jsx                         # Router configuration
├── index.css                       # Tailwind v4 + custom theme + animations
└── main.jsx                        # Entry point
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| React Router | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first styling |
| Lucide React | — | Icon library |
| Vite | 8 | Build tool & dev server |

---

## 📝 License

MIT
