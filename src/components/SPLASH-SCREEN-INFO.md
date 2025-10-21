# 🎬 Splash Screen TEMPO+

## Descrizione

La splash screen è stata **semplificata** e mostra solo il logo TEMPO+ con una elegante dissolvenza su sfondo nero.

## Caratteristiche

✅ **Nessuna animazione complessa** - Solo fade in/out fluido
✅ **Logo TEMPO+ centrale** - Testo bianco con "+" gradient arancione/rosso
✅ **Durata**: 2 secondi
✅ **Transizione fluida** verso l'app principale
❌ **NO effetti glow/pulsing** - Splash screen pulita e semplice

## File Coinvolti

### `/components/SplashScreen.tsx`
Componente principale della splash screen

**Durata**: Modificabile nella riga 15
```tsx
const timer = setTimeout(() => {
  onComplete();
}, 2000); // ← Cambia qui (millisecondi)
```

**Personalizzazione colori**:
- Logo "TEMPO": `fill-white`
- Logo "+": Gradient da `#EF4444` a `#FB923C`
- Background: `bg-black`

### `/App.tsx`
Gestisce quando mostrare/nascondere la splash

```tsx
const [showSplash, setShowSplash] = useState(true);

<AnimatePresence mode="wait">
  {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
</AnimatePresence>
```

## Modifiche Possibili

### 1. Cambiare la durata
```tsx
// In SplashScreen.tsx riga 13-15
setTimeout(() => {
  onComplete();
}, 3000); // 3 secondi invece di 2
```

### 2. Disabilitare completamente
```tsx
// In App.tsx
const [showSplash, setShowSplash] = useState(false); // ← false
```

### 3. Cambiare animazione
```tsx
// In SplashScreen.tsx riga 20-24
<motion.div
  initial={{ opacity: 0, scale: 0.9 }} // ← Modifica qui
  animate={{ opacity: 1, scale: 1 }}
  transition={{ 
    duration: 0.8, // ← Velocità animazione
    ease: "easeOut"
  }}
```

Altre animazioni possibili:
```tsx
// Slide dal basso
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}

// Rotate
initial={{ opacity: 0, rotate: -10 }}
animate={{ opacity: 1, rotate: 0 }}

// Blur
initial={{ opacity: 0, filter: "blur(10px)" }}
animate={{ opacity: 1, filter: "blur(0px)" }}
```

### 4. Aggiungere testo sotto il logo
```tsx
// In SplashScreen.tsx dopo il logo SVG
<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="text-gray-400 mt-8 tracking-widest"
>
  Visual Timer Professionale
</motion.p>
```

### 5. ~~Effetto glow~~ ❌ RIMOSSO
**L'effetto glow pulsante è stato completamente rimosso per mantenere la splash screen semplice e pulita.**

Se vuoi riaggiungere un effetto (non raccomandato):
```tsx
// Dopo il logo SVG in SplashScreen.tsx
<motion.div
  className="absolute w-64 h-64 rounded-full -z-10"
  style={{
    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, transparent 70%)',
  }}
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.1, 0.3],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>
```

## Comportamento su Dispositivi

### iPhone/iPad
- Splash screen copre tutto lo schermo
- StatusBar gestita automaticamente da Capacitor
- Transizione fluida verso l'app

### Apple Watch
- Splash screen viene mostrata anche su Watch
- Si adatta automaticamente allo schermo piccolo

### Desktop (Mac)
- Splash screen centrata
- Dimensioni ottimizzate per desktop

## Note Tecniche

### AnimatePresence
Gestisce l'exit animation quando la splash scompare:
```tsx
<AnimatePresence mode="wait">
  {showSplash && <SplashScreen ... />}
</AnimatePresence>
```

`mode="wait"` aspetta che la splash finisca l'animazione exit prima di mostrare l'app.

### Durata vs Animation
```
Durata totale = 2000ms
├─ Fade in: 600ms (0.0s - 0.6s)
├─ Visibile: 1400ms (0.6s - 2.0s)  
└─ Fade out: 500ms (gestito da AnimatePresence)
```

Totale percepito dall'utente: ~2.5 secondi

**Animazioni**:
- ✅ Fade in logo: 0.6s
- ✅ Fade out screen: 0.5s
- ❌ NO scaling, pulsing, glow, blur

## Confronto: Prima vs Dopo

### ❌ PRIMA (Cronografo racing)
- Animazione complessa con cerchio che ruota
- 60 tick marks animati
- Lancetta rotante
- Countdown progressivo
- Durata ~1 secondo
- Background gradient animato

### ✅ ADESSO (Logo fade)
- Logo TEMPO+ semplice
- Solo fade in/out elegante
- Nessun effetto glow/pulsing
- Durata 2 secondi
- Transizione fluida

## Best Practices Apple

✅ **Veloce**: 2-3 secondi massimo
✅ **Semplice**: Non troppi elementi
✅ **Brand**: Logo chiaro e riconoscibile
✅ **Fluida**: Transizione smooth verso l'app
✅ **Coerente**: Stessi colori dell'app

## Checklist Prima di Pubblicare

- [ ] Splash screen si vede su tutti i device (iPhone, iPad, Watch)
- [ ] Logo leggibile e centrato
- [ ] Durata appropriata (1-3 secondi)
- [ ] Transizione fluida verso Home
- [ ] No crash o errori console
- [ ] Performance 60fps

---

**Splash screen pronta! 🚀**
