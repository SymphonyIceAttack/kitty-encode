# AGENTS.md

Guidelines for AI agents working in this repository.

## Project Overview

Next.js 16 SEO starter project with React 19, Tailwind CSS 4, and shadcn/ui components. Uses App Router with internationalization support via `[lang]` dynamic route.

## Commands

```bash
# Development
pnpm run dev          # Start development server

# Build & Production
pnpm run build        # Build for production
pnpm run start        # Start production server

# Code Quality
pnpm run lint         # Run Biome linter (biome check)
pnpm run format       # Format code (biome format --write)
```

## Project Structure

```
app/
├── layout.tsx       # Root layout with fonts and metadata
├── page.tsx         # Home page
├── sitemap.ts       # SEO sitemap generation
├── robots.ts        # SEO robots.txt configuration
├── globals.css      # Global styles and Tailwind theme
├── favicon.ico
└── [lang]/          # i18n dynamic route (currently empty)
    ├── layout.tsx
    └── page.tsx
lib/
└── utils.ts         # Utility functions (cn for class merging)
public/              # Static assets (SVGs)
```

## Code Conventions

### TypeScript
- Strict mode enabled
- Use `type` imports for type-only imports: `import type { Metadata } from "next"`
- Path alias: `@/*` maps to project root

### Formatting (Biome)
- 2-space indentation
- Recommended rules enabled with some disabled:
  - `useExhaustiveDependencies`: off
  - `noArrayIndexKey`: off
  - `noDangerouslySetInnerHtml`: off
  - `noImgElement`: off (use Next.js Image component anyway)
- Auto-organizes imports on save

### Styling
- Tailwind CSS v4 with PostCSS
- Dark mode: class-based (`.dark` selector)
- Color system: Uses CSS custom properties with oklch colors
- Use `cn()` utility from `@/lib/utils` for conditional class merging

### Fonts
- Geist Sans: `--font-geist-sans` (body text)
- Geist Mono: `--font-geist-mono` (code)

## SEO Configuration

### Sitemap & Robots
- **sitemap.ts**: 自动生成多语言 sitemap.xml，包含所有语言版本的页面
- **robots.ts**: 配置 robots.txt，允许搜索引擎索引公开内容
- **支持的页面类型**:
  - 多语言主页和工具页面 (优先级 0.8-1.0)
  - 博客文章和静态页面 (优先级 0.5-0.7)
  - 更新频率根据页面类型动态调整

### Environment Variables
- `NEXT_PUBLIC_SITE_URL`: 设置网站的基础URL (默认: https://kitty-encode.top)

## shadcn/ui Integration

Configured for shadcn/ui component library:
- Style: `new-york`
- React Server Components: enabled
- Icon library: `lucide-react`
- Component paths:
  - Components: `@/components`
  - UI components: `@/components/ui`
  - Utilities: `@/lib/utils`
  - Hooks: `@/hooks`

Add components with:
```bash
npx shadcn@latest add <component-name>
```

## Development Environment

Uses devenv.sh with Nix for reproducible environments:
- Environment file: `.env.crush`
- Auto-runs `biome check --write` on shell entry

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.0.7 | React framework |
| react | 19.2.0 | UI library |
| tailwindcss | 4.x | CSS framework |
| @biomejs/biome | 2.2.4 | Linter/formatter |
| class-variance-authority | 0.7.1 | Variant styling |
| clsx | 2.1.1 | Class merging |
| tailwind-merge | 3.4.0 | Tailwind class merging |
| lucide-react | 0.555.0 | Icons |

## Gotchas

1. **Empty i18n files**: `app/[lang]/layout.tsx` and `app/[lang]/page.tsx` are currently empty placeholders
2. **Next.js 16**: Uses canary/beta features - check compatibility before using new APIs
3. **React 19**: Server components are the default; use `"use client"` directive for client components
4. **Tailwind v4**: Uses the new CSS-first configuration in `globals.css` rather than `tailwind.config.js`
5. **No test setup**: No testing framework configured yet
