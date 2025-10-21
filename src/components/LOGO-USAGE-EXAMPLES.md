# 🎨 Come Usare il Logo TEMPO+ nel Codice

## Componente TempoLogo

Il componente `/components/TempoLogo.tsx` rende semplice usare il logo ovunque nell'app.

---

## 📖 Esempi d'Uso

### 1. Logo Base
```tsx
import { TempoLogo } from './components/TempoLogo';

<TempoLogo />
```

### 2. Logo con Dimensioni Diverse
```tsx
// Small (24px)
<TempoLogo size="small" />

// Medium (36px)
<TempoLogo size="medium" />

// Large (56px) - default
<TempoLogo size="large" />

// Extra Large (72px)
<TempoLogo size="xlarge" />
```

### 3. Logo Senza il "+"
```tsx
<TempoLogo showPlus={false} />
// Mostra solo "TEMPO"
```

### 4. Logo con Classi Custom
```tsx
<TempoLogo 
  size="medium"
  className="opacity-50 hover:opacity-100 transition-opacity"
/>
```

---

## 🎯 Casi d'Uso Comuni

### Nella Navbar
```tsx
export function Navbar() {
  return (
    <nav className="bg-black border-b border-gray-800 px-4 py-3">
      <TempoLogo size="small" />
    </nav>
  );
}
```

### In un Modal/Dialog
```tsx
<Dialog>
  <DialogContent>
    <div className="text-center mb-4">
      <TempoLogo size="medium" />
    </div>
    <p>Contenuto del modal...</p>
  </DialogContent>
</Dialog>
```

### Nella Settings Page
```tsx
export function Settings() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-6">
        <TempoLogo size="small" />
        <h1>Impostazioni</h1>
      </div>
      {/* ... */}
    </div>
  );
}
```

### Loading State
```tsx
export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <TempoLogo size="large" />
      </motion.div>
    </div>
  );
}
```

### Error Page
```tsx
export function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <TempoLogo size="medium" className="opacity-30" />
      <h1>Oops! Qualcosa è andato storto</h1>
      <button>Riprova</button>
    </div>
  );
}
```

---

## 🎨 Personalizzazione Avanzata

### Logo con Animazione
```tsx
import { motion } from 'motion/react';
import { TempoLogo } from './components/TempoLogo';

<motion.div
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ type: "spring", duration: 0.8 }}
>
  <TempoLogo size="large" />
</motion.div>
```

### Logo con Hover Effect
```tsx
<motion.div
  whileHover={{ scale: 1.1, rotate: 5 }}
  whileTap={{ scale: 0.95 }}
  className="cursor-pointer"
>
  <TempoLogo size="medium" />
</motion.div>
```

### Logo con Glow
```tsx
<div className="relative">
  <div 
    className="absolute inset-0 blur-2xl opacity-30"
    style={{ background: 'linear-gradient(to right, #EF4444, #F97316)' }}
  />
  <TempoLogo size="large" />
</div>
```

---

## 📝 Modificare il Componente TempoLogo

### Cambiare i Colori
Apri `/components/TempoLogo.tsx` e modifica:

```tsx
// Cambio colore "TEMPO"
<text className="fill-white" {/* ← fill-blue-500 */}>
  TEMPO
</text>

// Cambio gradient "+"
<linearGradient id="plusGradient">
  <stop offset="0%" stopColor="#EF4444" /> {/* ← tuo colore 1 */}
  <stop offset="50%" stopColor="#F97316" /> {/* ← tuo colore 2 */}
  <stop offset="100%" stopColor="#FB923C" /> {/* ← tuo colore 3 */}
</linearGradient>
```

### Aggiungere Nuove Dimensioni
```tsx
const sizes = {
  small: { fontSize: '24px', plusSize: '16px', spacing: '4px' },
  medium: { fontSize: '36px', plusSize: '24px', spacing: '6px' },
  large: { fontSize: '56px', plusSize: '32px', spacing: '8px' },
  xlarge: { fontSize: '72px', plusSize: '42px', spacing: '10px' },
  huge: { fontSize: '120px', plusSize: '80px', spacing: '16px' }, // ← nuova dimensione
};
```

Poi usa così:
```tsx
<TempoLogo size="huge" />
```

### Aggiungere Varianti di Colore
```tsx
interface TempoLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'default' | 'blue' | 'purple'; // ← nuovo prop
  className?: string;
  showPlus?: boolean;
}

export function TempoLogo({ 
  size = 'large', 
  variant = 'default', // ← nuovo default
  className = '', 
  showPlus = true 
}: TempoLogoProps) {
  
  const gradients = {
    default: ['#EF4444', '#F97316', '#FB923C'],
    blue: ['#3B82F6', '#60A5FA', '#93C5FD'],
    purple: ['#A855F7', '#C084FC', '#E9D5FF'],
  };
  
  const [start, mid, end] = gradients[variant];
  
  return (
    // ... resto del codice
    <linearGradient id={`plusGradient-${variant}`}>
      <stop offset="0%" stopColor={start} />
      <stop offset="50%" stopColor={mid} />
      <stop offset="100%" stopColor={end} />
    </linearGradient>
  );
}
```

Uso:
```tsx
<TempoLogo variant="blue" />
<TempoLogo variant="purple" />
```

---

## 🖼️ Usare i File SVG Direttamente

### Come Immagine
```tsx
<img 
  src="/public/logo.svg" 
  alt="TEMPO+"
  className="w-48 h-auto"
/>
```

### Come Background
```tsx
<div 
  className="w-full h-64 bg-center bg-no-repeat"
  style={{ backgroundImage: 'url(/public/logo.svg)' }}
/>
```

### Inline SVG (Importato)
```tsx
import logoSvg from '/public/logo.svg?raw';

<div dangerouslySetInnerHTML={{ __html: logoSvg }} />
```

---

## ✅ Best Practices

1. **Usa il componente TempoLogo** invece di copiare/incollare il codice SVG
2. **Dimensioni coerenti**: usa le size predefinite (small/medium/large/xlarge)
3. **Accessibilità**: aggiungi sempre `alt` text quando usi come immagine
4. **Performance**: il componente SVG è leggero, usalo liberamente
5. **Colori**: mantieni i colori del brand (arancione/rosso gradient)

---

## 🎯 Quando NON Usare il Logo

- ❌ Come icona piccola (< 16px) - usa lucide-react icons invece
- ❌ In liste con molti elementi - rallenta il rendering
- ❌ Come watermark su ogni card/elemento

---

## 📚 Risorse

- **Componente**: `/components/TempoLogo.tsx`
- **SVG Logo**: `/public/logo.svg`
- **SVG Icon**: `/public/app-icon.svg`
- **Guida Logo**: `/public/LOGO-README.md`

---

**Usa il logo con stile! 🎨**
