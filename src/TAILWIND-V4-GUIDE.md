# 🎨 Tailwind CSS v4 - Guida Rapida

## ⚠️ IMPORTANTE: Questo progetto usa Tailwind v4!

Le istruzioni per Tailwind v3 **NON funzionano** con v4!

---

## 🔄 Differenze Principali

### ❌ **Tailwind v3** (Vecchio)

#### CSS File:
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
body {
  margin: 0;
}
```

#### Config File:
```js
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F97316',
      }
    },
  },
  plugins: [],
}
```

#### Main JS:
```ts
// src/main.tsx
import './index.css'
```

---

### ✅ **Tailwind v4** (Attuale)

#### CSS File:
```css
/* styles/globals.css */
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --background: #ffffff;
  --primary: #F97316;
}

@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
}

@layer base {
  body {
    @apply bg-background;
  }
}
```

#### Config File:
```
❌ NON SERVE!
Config inline nel CSS con @theme
```

#### Main JS:
```ts
// main.tsx
import './styles/globals.css'
```

---

## 📝 Sintassi Tailwind v4

### 1. Import Tailwind
```css
@import "tailwindcss";
```

Equivale a:
```css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. Custom Variants
```css
@custom-variant dark (&:is(.dark *));
```

Definisce come funziona `dark:` nelle classi.

### 3. CSS Variables
```css
:root {
  --background: #ffffff;
  --foreground: #000000;
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
}
```

### 4. Theme Mapping
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

Mappa le variabili CSS alle classi Tailwind:
- `bg-background` → `var(--color-background)`
- `text-foreground` → `var(--color-foreground)`

### 5. Layers
```css
@layer base {
  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded;
  }
}

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

---

## 🎯 Vantaggi Tailwind v4

### 1. **No Config File**
✅ Tutto inline nel CSS
✅ Più semplice da mantenere
✅ Nessun JS necessario

### 2. **CSS Variables Native**
✅ Dark mode più semplice
✅ Theming dinamico
✅ Performance migliori

### 3. **PostCSS Automatico**
✅ Niente configurazione PostCSS
✅ Autoprefixer incluso
✅ Ottimizzazione automatica

### 4. **Import Standard**
✅ `@import "tailwindcss"`
✅ Nessun plugin speciale
✅ Compatibile con tutti i bundler

---

## 🔧 Setup Completo TEMPO+

### `/styles/globals.css`:
```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  /* ... altre variabili */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... theme mapping */
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}

/* Typography */
@layer base {
  :where(:not(:has([class*=" text-"]), :not(:has([class^="text-"])))) {
    h1 {
      font-size: var(--text-2xl);
      font-weight: var(--font-weight-medium);
    }
    
    p {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
    }
  }
}

html {
  font-size: var(--font-size);
}

/* iOS Safe Area */
:root {
  --safe-area-inset-top: env(safe-area-inset-top, 0px);
  --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
}

.safe-area-insets {
  padding-top: var(--safe-area-inset-top);
  padding-bottom: var(--safe-area-inset-bottom);
}

/* Prevent zoom on iOS */
input, select, textarea {
  font-size: 16px !important;
}
```

### `/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css'; // ← Import CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### `/package.json`:
```json
{
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.18"
  }
}
```

---

## ❓ FAQ

### Q: Dove sono i @tailwind directives?
**A**: In v4 si usa `@import "tailwindcss"` invece.

### Q: Dove è tailwind.config.js?
**A**: Non serve! Config inline con `@theme inline`.

### Q: Come aggiungo colori custom?
**A**: 
```css
:root {
  --my-color: #FF0000;
}

@theme inline {
  --color-my-color: var(--my-color);
}
```

Poi usa: `bg-my-color`, `text-my-color`, etc.

### Q: Come funziona dark mode?
**A**:
```css
@custom-variant dark (&:is(.dark *));

:root {
  --background: white;
}

.dark {
  --background: black;
}
```

Poi applica `.dark` all'`<html>`:
```tsx
document.documentElement.classList.add('dark');
```

### Q: Posso usare @apply?
**A**: Sì! Funziona come v3:
```css
@layer components {
  .btn {
    @apply px-4 py-2 bg-primary rounded;
  }
}
```

---

## 🚀 Migrazione da v3 a v4

Se hai istruzioni per v3, ecco come convertirle:

### 1. CSS File
```diff
- @tailwind base;
- @tailwind components;
- @tailwind utilities;
+ @import "tailwindcss";
```

### 2. Config File
```diff
- // tailwind.config.js
- module.exports = {
-   content: ['./src/**/*.{js,jsx,ts,tsx}'],
-   theme: { ... },
- }

+ /* styles/globals.css */
+ @theme inline {
+   --color-primary: #F97316;
+ }
```

### 3. Dark Mode
```diff
- // tailwind.config.js
- module.exports = {
-   darkMode: 'class',
- }

+ /* styles/globals.css */
+ @custom-variant dark (&:is(.dark *));
```

---

## ✅ Checklist Tailwind v4

- [x] `@import "tailwindcss"` in CSS
- [x] NO tailwind.config.js/ts
- [x] Config inline con `@theme inline`
- [x] CSS variables in `:root` e `.dark`
- [x] Dark mode con `@custom-variant`
- [x] @layer base/components/utilities funzionano
- [x] @apply funziona
- [x] PostCSS automatico (no config)
- [x] Classi Tailwind normali (`flex`, `bg-red-500`, etc.)

---

## 📚 Risorse Ufficiali

- **Docs**: https://tailwindcss.com/docs/v4-beta
- **Migration Guide**: https://tailwindcss.com/docs/v4-beta#migrating-from-v3
- **CSS @import**: https://tailwindcss.com/docs/v4-beta#using-the-css-import
- **@theme**: https://tailwindcss.com/docs/v4-beta#theme-configuration

---

**Tailwind v4 Setup Completo in TEMPO+! ✅**

Funziona perfettamente con Vite + React + TypeScript + Capacitor!
