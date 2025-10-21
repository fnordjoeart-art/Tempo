# 📁 Struttura Progetto TEMPO+

## ✅ Setup Attuale (Corretto)

### **Stack Tecnologico**:
```
- React 18.3.1
- TypeScript 5.4.3
- Vite 5.2.0
- Tailwind CSS v4.0 ⚠️ (non v3!)
- Capacitor 6.0 (NO Ionic Framework)
```

---

## 📂 Struttura File

```
/
├── main.tsx              ← Entry point (non src/main.tsx)
├── App.tsx               ← Root component
├── index.html            ← HTML entry
├── vite.config.ts        ← Vite config
├── package.json
├── capacitor.config.ts
│
├── styles/
│   └── globals.css       ← CSS principale con Tailwind v4
│
├── components/           ← Tutti i componenti React
│   ├── Home.tsx
│   ├── Settings.tsx
│   ├── Presets.tsx
│   ├── Routines.tsx
│   ├── GroupManager.tsx
│   ├── TimerContext.tsx
│   ├── i18n.tsx
│   ├── ui/              ← Shadcn components
│   ├── hooks/           ← Custom hooks
│   └── figma/           ← Figma utilities
│
├── public/              ← Assets statici
│   ├── logo.svg
│   └── app-icon.svg
│
└── guidelines/
    └── Guidelines.md
```

---

## 🎨 Tailwind CSS v4.0

### ⚠️ **IMPORTANTE**: Tailwind v4 usa sintassi diversa!

#### ❌ **Tailwind v3** (vecchio):
```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### ✅ **Tailwind v4** (attuale):
```css
/* styles/globals.css */
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  /* CSS variables */
}

@theme inline {
  /* Tailwind theme customization */
}

@layer base {
  /* Base styles */
}
```

---

## 📝 File Principali

### 1. `/main.tsx` (Entry Point)
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css'; // ← Import CSS globale

// Capacitor Status Bar setup
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

if (Capacitor.isNativePlatform()) {
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setStyle({ style: Style.Dark });
  StatusBar.setBackgroundColor({ color: '#000000' });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 2. `/styles/globals.css` (Tailwind v4)
```css
@import "tailwindcss"; /* ← NECESSARIO per Tailwind v4 */

@custom-variant dark (&:is(.dark *));

:root {
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  /* ... altre variabili */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode variables */
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

/* Typography, Safe Area, iOS support */
```

### 3. `/vite.config.ts`
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
    host: true, // Per testing mobile
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['motion/react'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
  },
});
```

---

## ⚠️ Differenze con Setup Tradizionale

### **NO src/ folder**
- ✅ Struttura flat (root) funziona perfettamente con Vite
- ✅ main.tsx nella root
- ✅ components/ nella root

### **NO Ionic Framework**
- ❌ NO `@ionic/react`
- ❌ NO Ionic CSS imports
- ✅ Solo Capacitor per funzionalità native

### **NO Tailwind Config File**
- ❌ NO `tailwind.config.js/ts`
- ✅ Config inline nel CSS con `@theme inline`
- ✅ Tailwind v4 usa PostCSS automaticamente

### **NO @tailwind directives**
- ❌ NO `@tailwind base/components/utilities`
- ✅ Solo `@import "tailwindcss"`

---

## 📦 Capacitor (NO Ionic)

Il progetto usa **Capacitor standalone** per:
- ✅ Status Bar
- ✅ Keyboard
- ✅ Haptics (vibrazione)
- ✅ Local Notifications
- ✅ Splash Screen
- ✅ App lifecycle

**MA NON usa**:
- ❌ Ionic Framework
- ❌ Ionic Components
- ❌ Ionic Router
- ❌ Ionic CSS

---

## ✅ Fix Applicato

### **Aggiunto a `/styles/globals.css`**:
```css
@import "tailwindcss";
```

Questo è **essenziale** per Tailwind v4!

---

## 🚀 Come Funziona

### 1. **Vite** legge `/index.html`
```html
<script type="module" src="/main.tsx"></script>
```

### 2. **main.tsx** carica tutto:
```tsx
import './styles/globals.css'; // ← Tailwind + Custom CSS
import App from './App';       // ← Root component
```

### 3. **globals.css** carica Tailwind:
```css
@import "tailwindcss";         // ← Tutto Tailwind v4
```

### 4. **PostCSS** (automatico in Vite) processa:
- Tailwind v4
- Autoprefixer
- CSS custom properties

---

## 📱 Build & Deploy

### Development:
```bash
npm run dev
```

### Build per Web:
```bash
npm run build
```

### Capacitor Sync:
```bash
npm run capacitor:sync
```

### iOS:
```bash
npm run capacitor:ios
```

### Android:
```bash
npm run capacitor:android
```

---

## 🎯 Checklist Setup

- [x] Tailwind v4 con `@import "tailwindcss"`
- [x] main.tsx importa globals.css
- [x] Vite configurato con alias '@'
- [x] Capacitor 6.0 configurato
- [x] TypeScript configurato
- [x] Dark mode forzata in App.tsx
- [x] Status Bar configurata per iOS
- [x] Safe area support per notch/Dynamic Island
- [x] Responsive per tutti i device Apple
- [x] NO Ionic (solo Capacitor)
- [x] NO src/ folder (struttura root)
- [x] NO tailwind.config (inline in CSS)

---

## 📚 Risorse

### Tailwind v4:
- https://tailwindcss.com/docs/v4-beta

### Capacitor:
- https://capacitorjs.com/docs

### Vite:
- https://vitejs.dev/guide/

---

**Setup CORRETTO e OTTIMIZZATO per Tailwind v4 + Capacitor! ✅**

Non servono modifiche alla struttura del progetto!
