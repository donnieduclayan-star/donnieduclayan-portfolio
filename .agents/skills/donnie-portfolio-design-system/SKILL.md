---
name: donnie-portfolio-design-system
description: >
  Dark cinematic portfolio design system for Donnie Duclayan's developer portfolio.
  Synthesized from anthropics/skills, taste-skill, ui-ux-pro-max, gsap-skills,
  magic-mcp, shadcn-ui-mcp, claudedesignskills, vercel-labs/agent-skills, and
  convex/agent-skills. Use when building, maintaining, or enhancing Donnie's portfolio
  with premium dark aesthetics, editorial typography, GSAP-inspired scroll animations,
  glassmorphism, and anti-slop design taste.
---

# Donnie Portfolio Design System

## Design DNA

This portfolio uses a **Dark Cinematic Editorial** aesthetic:

- Deep dark backgrounds (#0a0a0f / #12121a) with high-contrast text
- Editorial typography: Outfit (display), Playfair Display (accent serif), Inter (body), JetBrains Mono (code)
- Glassmorphism as information overlays, NOT decoration
- Framer Motion for all animations (already installed)
- Indigo/violet accent palette (#6366f1 / #8b5cf6) with emerald highlight (#10b981)
- Anti-slop: No generic gradients, random blobs, or template aesthetics

## Color Tokens (Tailwind v4 @theme)

```css
--color-primary: #0a0a0f;
--color-secondary: #12121a;
--color-surface: #1a1a2e;
--color-accent: #6366f1;
--color-accent-hover: #818cf8;
--color-accent-glow: rgba(99, 102, 241, 0.3);
--color-emerald: #10b981;
--color-dark: #f0f0f5;
--color-muted: #7c7c9a;
--color-border: rgba(255, 255, 255, 0.08);
--color-glass-bg: rgba(255, 255, 255, 0.04);
--color-glass-border: rgba(255, 255, 255, 0.08);
```

## Typography Rules

- **Display headings:** font-display (Outfit), 700-800 weight, clamp sizes
- **Accent words:** font-serif (Playfair Display), italic, ONE word per headline
- **Body:** font-sans (Inter), 400-500 weight, text-muted color
- **Code snippets:** font-mono (JetBrains Mono)
- **Letter spacing:** tight on display text ONLY, normal everywhere else

## Animation Timing

All animations use Framer Motion (project dependency):

| Animation | Duration | Easing | Delay Pattern |
|-----------|----------|--------|---------------|
| Section reveal | 700ms | [0.22, 1, 0.36, 1] | stagger 100ms |
| Card entry | 500ms | [0.22, 1, 0.36, 1] | stagger 40ms |
| Hover lift | 300ms | ease-out | none |
| Text reveal | 500ms | [0.22, 1, 0.36, 1] | word stagger 30ms |
| Progress bar | 1200ms | [0.22, 1, 0.36, 1] | stagger 60ms |
| Parallax | scroll-linked | linear | none |

## Glass UI Specification

```css
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1);
}
```

## Section Structure

1. **Hero:** Full-viewport, gradient mesh bg, floating stats, role carousel, parallax
2. **About:** Split layout with image and bio text
3. **Skills:** Tabbed filter with glass cards in grid
4. **Experience:** Vertical timeline with alternating cards
5. **Projects:** Bento-style grid, hover reveals, tech stack tags
6. **Leadership:** Achievement cards with timeline
7. **Education:** Editorial card with coursework grid
8. **Certifications:** Compact credential cards
9. **Contact:** Bold CTA with glass form
10. **Footer:** Minimal dark footer

## Anti-Patterns (from taste-skill)

NEVER:
- Use generic gradient blob backgrounds
- Make every card glass (use solid dark cards for content-heavy sections)
- Use placeholder text or "Lorem ipsum"
- Over-round every element
- Use competing CTAs in one viewport
- Leave light-theme remnants in dark mode
- Use stock-looking decorative elements

## Component Architecture (from shadcn/magic-mcp)

- Keep components focused and single-responsibility
- Use data files for content (portfolioData.ts)
- Use Lucide icons consistently
- Use Framer Motion's useInView for scroll triggers
- Keep client-side state minimal
- Use CSS custom properties for theming

## Responsive Rules

- Test at 390px, 768px, 1440px
- Hide decorative elements on mobile
- Keep CTA visible in first viewport
- Use clamp() for display text only
- No horizontal overflow ever
