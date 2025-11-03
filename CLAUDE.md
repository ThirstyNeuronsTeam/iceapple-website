# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IceApple Website - A Next.js 15 corporate website with TypeScript, React 19, Tailwind CSS 4, and MongoDB integration. The site provides information about IceApple's technology and business solutions, including services, case studies, careers, and contact forms.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type checking (no dedicated script, use build for type check)
npm run build
```

## Architecture

### Data-Driven Content System

The website follows a **data-driven architecture** where most page content is stored in JSON files under the `/data` directory rather than hardcoded in components. This allows for easy content updates without modifying component logic.

**Key principle**: When updating page content, look for the corresponding JSON file in `/data` first before modifying components.

```
data/
├── home-page/home-page.json         # Homepage content
├── blogs/blog-main.json             # Blog listings
├── careers-page/careers-page.json   # Careers content
├── contact-us-page/                 # Contact page content
├── services-page/                   # Services content
├── industry-page/                   # Industry content
├── footer/footer.json               # Footer content
└── case_study_overview/             # Case study data
```

### Route Structure

```
src/app/
├── page.tsx                          # Homepage
├── layout.tsx                        # Root layout with Navbar + Footer
├── about-us/page.tsx
├── careers/page.tsx
├── contact-us/page.tsx
├── industries/page.tsx
├── services/
│   ├── page.tsx                      # Services overview
│   ├── intelligent-apps/page.tsx
│   └── intelligent-devices/page.tsx
├── resources/
│   ├── blogs/
│   │   ├── page.tsx                  # Blog listing
│   │   └── [id]/page.tsx             # Dynamic blog post
│   └── case-studies/
│       ├── page.tsx                  # Case studies listing
│       └── [id]/page.tsx             # Dynamic case study
└── api/
    ├── career/route.ts               # Career form submission
    ├── check-email/route.ts          # Email validation
    └── client/route.ts               # Client inquiry form
```

### Component Organization

Components are organized by feature/page rather than by type:

```
src/components/
├── common/                           # Shared across multiple pages
│   ├── about-us/
│   ├── hero-section/
│   ├── footer/
│   ├── our-enquiry-form/
│   └── our-career-form/
├── home/                             # Homepage-specific sections
├── blogs/                            # Blog-related components
├── case-studies/                     # Case study components
├── careers/                          # Careers page components
├── contact-us/                       # Contact page components
├── industry/                         # Industry page components
├── app-development/                  # Service-specific components
├── menu-section/                     # Navigation components
└── ui/                               # shadcn/ui components (button, form, etc.)
```

### API Routes & Data Persistence

**MongoDB Integration**: Client and career form submissions are stored in MongoDB and trigger SendGrid emails.

- `api/client/route.ts`: Handles client inquiry forms, stores in MongoDB collection `clients`, sends confirmation emails via SendGrid
- `api/career/route.ts`: Handles career applications, similar pattern
- `lib/mongodb.ts`: MongoDB client singleton with development hot-reload support

**Required Environment Variables**:
```
MONGODB_URI=mongodb://...
SENDGRID_API_KEY=...
SENDGRID_TO=team@iceapple.ai
SENDGRID_FROM=noreply@iceapple.ai
```

### Styling System

- **Tailwind CSS 4** with custom Mosk font family (9 weights: 100-900)
- **Font variables**: `--font-mosk` (primary), `--font-inter` (secondary)
- **shadcn/ui**: Uses "new-york" style with neutral base color
- **Container**: Responsive with max-width 1400px, custom padding per breakpoint
- Custom utilities in `lib/utils.ts` for class name merging (`cn` function)

### Custom Hooks

- `hooks/useDeviceType.ts`: Detects device type (mobile/tablet/desktop) for responsive behavior
  - Mobile: < 768px
  - Tablet: 768px - 1180px
  - Desktop: ≥ 1181px

## Working with Dynamic Routes

### Blogs

Blog posts are prerendered from markdown files. When adding new blogs:
1. Blog metadata is stored in `data/blogs/blog-main.json`
2. Dynamic route: `app/resources/blogs/[id]/page.tsx`

### Case Studies

Case studies follow similar pattern to blogs with dynamic `[id]` routes prerendered from JSON data.

## Path Aliases

TypeScript path alias `@/*` maps to `./src/*`:
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`

## Git Workflow

Main branch: `main`
Current branch: `home-page-ui`
Recent focus: UI improvements, blog/case study prerendering, JSON-based data loading

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
