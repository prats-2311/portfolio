---
description: Repository Information Overview
alwaysApply: true
---

# Portfolio Website Information

## Summary
A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. The site showcases professional experience, projects, skills, blogs, and hackathons with a clean, interactive UI featuring animations and dark/light mode support.

## Structure
- **app/**: Next.js app router implementation with page components
- **components/**: Reusable UI components organized by function
- **lib/**: Utility functions and data files
- **public/**: Static assets and files
- **__tests__/**: Test files for components
- **.github/**: GitHub Actions workflow for deployment

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.x
**Framework**: Next.js 14.0.4
**Build System**: Next.js build system
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- React 18.x and React DOM 18.x
- Next.js 14.0.4
- Framer Motion 10.16.16 (animations)
- React Markdown 10.1.0 (markdown rendering)
- Tailwind CSS 3.3.0 (styling)
- clsx 2.0.0 and tailwind-merge 2.2.0 (class utilities)

**Development Dependencies**:
- Jest 30.0.5 (testing)
- Testing Library (React, Jest DOM, User Event)
- ESLint 8.x
- TypeScript 5.x
- Autoprefixer and PostCSS

## Build & Installation
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run tests
npm test
```

## Testing
**Framework**: Jest with React Testing Library
**Test Location**: `__tests__/` directory
**Configuration**: jest.config.js and jest.setup.js
**Run Command**:
```bash
npm test
# Watch mode
npm run test:watch
# Coverage report
npm run test:coverage
```

## Deployment
**Platform**: GitHub Pages
**Workflow**: GitHub Actions (.github/workflows/deploy.yml)
**Build Output**: Static export (configured in next.config.js)
**Base Path**: '/portfolio' in production