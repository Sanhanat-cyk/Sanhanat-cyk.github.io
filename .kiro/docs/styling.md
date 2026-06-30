# Styling System

## Approach

- **No CSS framework** — Custom CSS variables + scoped `<style>` per component
- **Design tokens** in `src/styles/global.css` `:root`
- **Scoped styles** — ทุก component มี `<style>` ของตัวเอง ไม่ leak ข้าม component
- **Responsive** — Mobile-first, breakpoints at 680/700/760/800/860/980px
- **Accessibility** — `prefers-reduced-motion` support, `.sr-only` class

## Design Tokens (CSS Variables)

### Colors
```css
--color-bg: #f4efea          /* Cream background */
--color-surface: #fffdfa     /* Card/panel white */
--color-surface-strong: #fff8f0
--color-text: #6a2300        /* Dark brown (main text) */
--color-muted: #9b613f       /* Muted brown (secondary text) */
--color-primary: #d47b23     /* Orange (CTAs, accents) */
--color-primary-dark: #9f4f08
--color-border: #e6d6c8      /* Light border */
--color-green: #06c755       /* LINE green */
```

### Shadows & Radius
```css
--shadow-sm: 0 10px 30px rgb(106 35 0 / 8%)
--shadow-lg: 0 24px 70px rgb(106 35 0 / 14%)
--radius-md: 18px
--radius-lg: 30px
```

### Layout
```css
--page-width: 1120px
--section-space: clamp(4.5rem, 9vw, 7.5rem)
```

## Global Utility Classes

| Class | Purpose |
|-------|---------|
| `.container` | `width: min(calc(100% - 2rem), var(--page-width)); margin-inline: auto` |
| `.section` | `padding-block: var(--section-space)` |
| `.section-heading` | Centered heading block (max-width 720px) |
| `.button` | Base button (min-height 48px, pill shape) |
| `.button-primary` | Orange gradient + shadow |
| `.button-secondary` | Bordered, white bg |
| `.sr-only` | Screen reader only (visually hidden) |

## Typography

- **Font**: Noto Sans Thai (loaded via Astro font provider, fontsource)
- **CSS variable**: `var(--font-noto-sans-thai)`
- **Fallbacks**: Leelawadee UI → Tahoma → Arial → sans-serif
- **Responsive sizing**: `clamp()` throughout

## Component Style Pattern

```astro
<!-- ทุก component ใช้ scoped style -->
<section class="my-section section">
  <div class="container">...</div>
</section>
<style>
  .my-section { /* styles scoped to this component */ }
</style>
```

## Button Gradient

```css
.button-primary {
  background: linear-gradient(135deg, #e0943d, #a85808);
  color: white;
  box-shadow: 0 8px 24px rgb(224 148 61 / 35%);
}
```

## Footer Dark Section

Footer uses `background: #5b1e05` with white text.
