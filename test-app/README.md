# Test App

Simple React app with React Router v6 and App Router pattern for testing and development.

## Features

- **React Router v6** - Modern routing with `createBrowserRouter`
- **App Router Pattern** - Layout with nested routes
- **Navigation** - Clean navigation between pages
- **Multiple Pages:**
  - **Home** - Welcome page with navigation cards
  - **Counter** - Simple counter with increment/decrement
  - **Items** - Dynamic list management (add/remove)
  - **Form** - Contact form with validation

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout with navigation
│   └── index.ts            # Component exports
├── pages/
│   ├── HomePage.tsx        # Home page component
│   ├── CounterPage.tsx     # Counter page component
│   ├── ItemsPage.tsx       # Items list page component
│   ├── FormPage.tsx        # Form page component
│   └── index.ts            # Page exports
├── App.tsx                 # Main app with router config
└── main.tsx                # App entry point
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Router Structure

```
/ (Layout)
├── / (HomePage) - Index route
├── /counter (CounterPage) - Counter functionality
├── /items (ItemsPage) - Items list management
└── /form (FormPage) - Contact form
```

## Development

This is a clean Vite + React + TypeScript + React Router v6 app with organized file structure. Perfect for:

- Testing React Router v6 concepts
- Learning App Router pattern
- Prototyping multi-page applications
- Development experiments with routing
- Learning component organization

## Tech Stack

- **Vite** - Build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **CSS** - Styling

## Navigation

- **Active Link Highlighting** - Current page is highlighted in navigation
- **Back Buttons** - Each page has a back button to return home
- **Responsive Design** - Works on all screen sizes

## File Organization

- **`/components`** - Reusable UI components (Layout, etc.)
- **`/pages`** - Page-specific components
- **`index.ts` files** - Clean imports and exports
- **Separation of concerns** - Each component has its own file
