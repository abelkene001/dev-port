# FRONTEND ARCHITECTURE: VISUAL & INTERACTIVE SPECS

### 1. COMPONENT BREAKDOWN

- **Navbar:** Floating glass dock. Animated active states with a yellow underline glow.
- **Hero Section:** - H1: "Abel Kène" with a gradient shimmer effect.
  - Subtext: Animated typewriter or fade-in effect.
  - Interaction: A "Scroll Indicator" that bounces subtly.
- **About Section:** - Narrative text on the left.
  - Interactive "Skills Orbit" or "Tech Pill Cloud" on the right using #E3B619 accents.
- **Projects (The Bento Vault):** - Visuals: 3-column grid (Desktop), 1-column (Mobile).
  - Features: Like button (Real-time count), "Upcoming" tag (Glow effect), Link to live demo.
- **Tools Section:** - Interactive list of tools. Each item redirects to a unique subdomain.
- **Contact Section:** - Minimalist form with floating labels.
  - Validation: Real-time feedback using Abel's brand colors.
- **Footer:** Copyright, Social Links (GitHub, LinkedIn, X), and "Back to Top" button.

### 2. MOTION GUIDELINES

- **Entrance:** All sections must use `viewport` triggers to fade/slide up.
- **Transitions:** Use `framer-motion` for layout transitions between the main site and the admin portal.
- **Hover:** All interactive elements must scale up by 1.02x and increase brightness.
