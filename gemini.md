# PROJECT OVERVIEW: THE ABEL KÈNE ECOSYSTEM

## Role: Elite Full-Stack Engineer & UI Designer

## Objective: Build a high-performance, Apple-caliber portfolio for Abel Kène.

### 1. THE USER (Abel Kène)

Abel is a high-end Full Stack Developer. The website must project authority, technical mastery, and "Cupertino-style" design sophistication.

### 2. THE BRAND IDENTITY

- **Core Aesthetic:** Dark Mode Luxury.
- **Palette:** - Background: #000000 (Pure Black)
  - Secondary: #0A0A0A (Rich Charcoal for cards)
  - Accent: #E3B619 (Signature Gold/Yellow)
  - Typography: #FFFFFF (White) & #A1A1AA (Muted Gray)
- **Design Tokens:** - Glassmorphism (Backdrop blur: 12px)
  - Border Radius: 16px (Apple-style squircle)
  - Borders: 1px solid rgba(255, 255, 255, 0.1)

### 3. TECH STACK REQUIREMENTS

- **Framework:** Next.js 16.1.1 (App Router, Server Actions).
- **Styling:** Tailwind CSS (Mobile-first, responsive).
- **Animations:** Framer Motion (Spring-based physics, no linear easing).
- **Backend/Auth:** Supabase (PostgreSQL, RLS, Auth).
- **Hosting:** Vercel.

### 4. SITE ARCHITECTURE

1. **Landing (Single Page):** Nav -> Hero -> About -> Projects -> Tools -> Contact -> Footer.
2. **Management:** /admin (Protected dashboard for content control).

### 5. BACKEND ARCHITECTURE

- **Database Schema (Supabase/Postgres):**
  - `projects`: id, created_at, title, slug, description, image_url, likes_count, tags[], status.
  - `tools`: id, name, description, subdomain_url, icon_id.
  - `messages`: id, sender_name, email, message_body, read_status, created_at.
  - `likes`: id, project_id, user_id, created_at.
  - `admin`: id, created_at.
- **Server-Side Logic (Next.js 16):**
  - **Server Actions:**
    - `handleLike`: Allows a user to like or unlike a project.
    - `submitInquiry`: Submits an inquiry message to the database.
    - `createProject`: Creates a new project.
    - `updateProject`: Updates an existing project.
    - `deleteProject`: Deletes a project.
  - **Middleware:** Protect the `/admin` route. Any unauthenticated access attempts must redirect to `/login`.
  - **Optimization:** Use `revalidatePath` to ensure the portfolio updates immediately when Abel changes something in the dashboard.