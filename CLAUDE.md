# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Mastech Cooling Technology** is a Next.js-based marketing website for a car air conditioning specialist company. The site features a modern, production-grade frontend with sections for services, testimonials, FAQs, and contact information.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Database**: Prisma with SQLite (dev), configured for easy swap to production DB
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand
- **Icons**: Lucide React

## Development Commands

```bash
# Development
npm run dev              # Start dev server on port 3000

# Build & Production
npm run build           # Build for production
npm start              # Start production server on port 3000

# Linting
npm run lint           # Run ESLint

# Database (Prisma)
npm run db:push        # Push schema changes without migration
npm run db:generate    # Generate Prisma Client
npm run db:migrate     # Create and apply migration
npm run db:reset       # Reset database (dev only)
```

## Architecture

### App Structure

- **App Router**: Uses Next.js 16 App Router (`src/app/`)
- **Component Organization**:
  - `src/components/sections/` - Page sections (Hero, About, Services, Contact, etc.)
  - `src/components/ui/` - Reusable shadcn/ui components
- **Data & Utils**:
  - `src/lib/services-data.ts` - Service definitions and content
  - `src/lib/utils.ts` - Utility functions (cn, etc.)
  - `src/lib/db.ts` - Prisma client singleton

### Page Flow

The main page (`src/app/page.tsx`) is a single-page application with smooth scroll navigation between sections:
1. Header (sticky navigation with top info bar)
2. Hero (main banner)
3. About
4. Why Choose Us
5. Services (grid with detail modal)
6. Testimonials
7. FAQ (accordion)
8. Contact (form)
9. Footer

The header handles both hash-based smooth scrolling on the home page and navigation from service detail pages back to home.

### Service Detail Pages

- Route: `/services/[id]` (dynamic route)
- Each service has a dedicated page with detailed information
- Services data is centralized in `src/lib/services-data.ts`
- Header navigation adapts to handle cross-page navigation

### Styling System

- **Brand Colors**: Defined in `src/app/globals.css`
  - `--brand-red`: #B91C1C (primary red)
  - `--brand-purple`: #1E3A8A (primary blue/purple)
  - `--brand-yellow`: #F59E0B (accent yellow)
- **Tailwind Classes**: Use custom brand colors via `brand-red`, `brand-purple`, `brand-yellow`
- **Responsive Design**: Mobile-first with breakpoints at `sm`, `md`, `lg`, `xl`

### Key Components

- **Header**: Sticky navigation with mobile menu, smooth scroll, and cross-page routing
- **FloatingWhatsApp**: Persistent WhatsApp contact button (bottom-right)
- **Services**: Grid layout with modal/drawer for service details
- **Contact Form**: Uses React Hook Form with Zod validation

## Important Patterns

### Image Optimization

- Use Next.js `<Image>` component from `next/image` for all images
- Logo and service images are in `/public/`
- Next.js config enables AVIF and WebP formats

### TypeScript Configuration

- Build errors are currently ignored (`ignoreBuildErrors: true` in `next.config.ts`)
- This should be addressed before production deployment

### Database

- Currently uses SQLite for development
- Prisma schema includes basic User and Post models (placeholder)
- To change database provider, update `datasource db` in `prisma/schema.prisma` and run `npm run db:migrate`

## Brand Identity

- **Company Name**: Mastech Cooling Technology
- **Tagline**: "Masters in Cooling"
- **Specialization**: Car Air Conditioning
- **Contact**: +233 24 460 8104, contact@mastechcooling.com
- **Logo**: `/public/mastech-logo.jpeg` (new brand logo)
- **Favicon**: Set in `src/app/layout.tsx` metadata

## SEO Configuration

Metadata is defined in `src/app/layout.tsx`:
- Title, description, keywords
- OpenGraph tags
- Icons/favicon
- Authors metadata

## Deployment

- **Vercel**: Optimized for Vercel deployment (see `vercel.json`)
- **Build**: Ensure TypeScript errors are fixed before deploying to production
- **Environment Variables**: Set `DATABASE_URL` for production database

## Common Modifications

### Adding a New Section
1. Create component in `src/components/sections/`
2. Import and add to `src/app/page.tsx`
3. Add navigation link to `navLinks` array in `Header.tsx`
4. Add corresponding id attribute to section for smooth scroll

### Adding a New Service
1. Add service object to `services` array in `src/lib/services-data.ts`
2. Service will automatically appear on services grid and have its own detail page

### Updating Brand Colors
1. Modify CSS variables in `src/app/globals.css`
2. Colors automatically update throughout the site via Tailwind classes