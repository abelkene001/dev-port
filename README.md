# PROJECT OVERVIEW: THE ABEL KÈNE ECOSYSTEM

This project is a high-performance, Apple-caliber portfolio for Abel Kène, a high-end Full Stack Developer. The website is designed to project authority, technical mastery, and "Cupertino-style" design sophistication.

## Brand Identity

- **Core Aesthetic:** Dark Mode Luxury.
- **Palette:**
  - Background: #000000 (Pure Black)
  - Secondary: #0A0A0A (Rich Charcoal for cards)
  - Accent: #E3B619 (Signature Gold/Yellow)
  - Typography: #FFFFFF (White) & #A1A1AA (Muted Gray)
- **Design Tokens:**
  - Glassmorphism (Backdrop blur: 12px)
  - Border Radius: 16px (Apple-style squircle)
  - Borders: 1px solid rgba(255, 255, 255, 0.1)

## Features

- **Dark Mode Luxury:** A sophisticated dark mode aesthetic with a specific color palette.
- **Glassmorphism:** A beautiful glassmorphism effect on the navigation bar.
- **Animations:** Smooth, spring-based animations using Framer Motion.
- **Responsive Design:** A fully responsive layout that looks great on all devices.

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router, Server Actions).
- **Styling:** Tailwind CSS (Mobile-first, responsive).
- **Animations:** Framer Motion (Spring-based physics, no linear easing).
- **Backend/Auth:** Supabase (PostgreSQL, RLS, Auth).
- **Hosting:** Vercel.

## Site Architecture

1.  **Landing (Single Page):** Nav -> Hero -> About -> Projects -> Tools -> Contact -> Footer.
2.  **Management:** /admin (Protected dashboard for content control).

## Frontend Architecture

- **Navbar:** Floating glass dock. Animated active states with a yellow underline glow.
- **Hero Section:** "Abel Kène" with a gradient shimmer effect and an animated scroll indicator.
- **About Section:** Narrative text and a "Tech Pill Cloud" with the brand's accent color.
- **Projects (The Bento Vault):** A 3-column grid with a like button, "Upcoming" tag, and link to a live demo.
- **Tools Section:** An interactive list of tools.
- **Contact Section:** A minimalist form with floating labels and real-time validation.
- **Footer:** Copyright, social links, and a "Back to Top" button.

## Backend Architecture

- **Database Schema (Supabase/Postgres):**
  - `projects`: id, created_at, title, slug, description, image_url, likes_count, tags[], status (published/upcoming).
  - `tools`: id, name, description, subdomain_url, icon_id.
  - `messages`: id, sender_name, email, message_body, read_status, created_at.
- **Admin Portal (`/admin`):**
  - Authentication via Supabase Auth.
  - Project Manager (CRUD).
  - Tool Manager (CRUD).
  - Inquiry Inbox.
  - Stats Card.
- **Server-Side Logic (Next.js 16):**
  - Server Actions for `handleLike`, `submitInquiry`, and `updateContent`.
  - Middleware to protect the `/admin` route.
  - `revalidatePath` for cache invalidation.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
