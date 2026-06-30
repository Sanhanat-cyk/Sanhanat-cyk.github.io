# Deployment

## Overview

- **Host**: GitHub Pages
- **Site URL**: `https://sanhanat-cyk.github.io`
- **Repository**: `Sanhanat-cyk/Sanhanat-cyk.github.io`
- **Trigger**: Manual only (workflow_dispatch) — ไม่ auto-deploy on push
- **เหตุผล**: ประหยัด GitHub Actions minutes

## Environment Variables

| Variable | Where to set | Purpose |
|----------|-------------|---------|
| `PUBLIC_LINE_URL` | `.env` + GitHub vars | LINE OA deep link สำหรับทุก CTA |
| `PUBLIC_GA_MEASUREMENT_ID` | `.env` + GitHub vars | GA4 measurement ID (consent-gated) |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | `.env` + GitHub vars | Google Search Console token |

**Local**: Copy `.env.example` → `.env`
**CI**: Set as GitHub repository variables (not secrets — เป็น PUBLIC_ prefix)

## deploy.bat (Windows)

Script ทำทุกอย่างอัตโนมัติ:

1. ตรวจ pnpm + GitHub CLI (install ถ้าไม่มี)
2. ตรวจ branch = master, working tree clean
3. Sync กับ origin/master (push ถ้ามี unpushed commits)
4. `pnpm install --frozen-lockfile`
5. `pnpm run check`
6. `pnpm run build`
7. ถามยืนยัน → trigger workflow_dispatch

## GitHub Actions Pipeline (.github/workflows/deploy.yml)

```yaml
trigger: workflow_dispatch (manual only)
steps:
  1. Checkout
  2. Setup pnpm 10
  3. Setup Node 22
  4. Configure GitHub Pages
  5. pnpm install --frozen-lockfile
  6. pnpm run check
  7. pnpm run build
  8. Upload artifact (./dist)
  9. Deploy to GitHub Pages
```

## Pre-deploy Checklist

1. ✅ อยู่บน `master` branch
2. ✅ Working tree clean (ไม่มี uncommitted changes)
3. ✅ Synced กับ origin/master
4. ✅ `pnpm run check` ผ่าน
5. ✅ `pnpm run build` ผ่าน
6. ✅ ตรวจ `.env` variables ตรงกับ GitHub repository variables
