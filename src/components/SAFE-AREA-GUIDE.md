# 📱 Guida Safe Area per iPhone

## Problema: Notch / Dynamic Island

Su iPhone moderni (iPhone X+), il **notch** (o **Dynamic Island**) occupa la parte superiore dello schermo.
Se il contenuto non ha abbastanza padding, il logo e i testi finiscono **sotto la fotocamera**.

---

## ✅ Soluzione Implementata

### 1. **Padding Superiore Aumentato**

Tutti i componenti principali ora hanno padding superiore più grande su mobile:

```tsx
// Prima (troppo piccolo)
pt-2 md:pt-4

// Dopo (sicuro per iPhone)
pt-12 md:pt-8 lg:pt-4
```

**Responsive**:
- `pt-12` (48px) su **iPhone/smartphone** - evita il notch
- `pt-8` (32px) su **iPad/tablet** - spazio confortevole
- `pt-4` (16px) su **Desktop** - spazio minimo

### 2. **Componenti Aggiornati**

Tutti questi componenti hanno ora il padding corretto:

- ✅ `/components/Home.tsx` - Riga 142
- ✅ `/components/MultiTimerView.tsx` - Riga 80
- ✅ `/components/Presets.tsx` - Riga 89
- ✅ `/components/Routines.tsx` - Riga 117
- ✅ `/components/Settings.tsx` - Riga 50
- ✅ `/components/GroupManager.tsx` - Riga 99

### 3. **CSS Safe Area Variables**

Nel file `/styles/globals.css` sono disponibili utility CSS:

```css
:root {
  --safe-area-inset-top: env(safe-area-inset-top, 0px);
  --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
  --safe-area-inset-left: env(safe-area-inset-left, 0px);
  --safe-area-inset-right: env(safe-area-inset-right, 0px);
}
```

**Utility classes**:
```html
<div class="safe-area-inset-top"><!-- +padding top --></div>
<div class="safe-area-inset-bottom"><!-- +padding bottom --></div>
<div class="safe-area-insets"><!-- +padding su tutti i lati --></div>
```

### 4. **Viewport Meta Tag**

Nel file `/index.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

`viewport-fit=cover` è **essenziale** per far funzionare `env(safe-area-inset-*)`.

### 5. **Capacitor StatusBar**

Nel file `/main.tsx`:

```tsx
if (Capacitor.isNativePlatform()) {
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setStyle({ style: Style.Dark });
  StatusBar.setBackgroundColor({ color: '#000000' });
}
```

`overlay: false` impedisce alla StatusBar di sovrapporsi al contenuto.

---

## 📐 Tabella Dimensioni iPhone

| Modello | Notch/Island Height | Safe Area Top |
|---------|---------------------|---------------|
| iPhone X, XS, 11 Pro | ~44px | 44px |
| iPhone XR, 11 | ~48px | 48px |
| iPhone 12/13/14 | ~47px | 47px |
| iPhone 14 Pro+ (Island) | ~54px | 59px |
| iPhone 15 Pro+ (Island) | ~54px | 59px |

**Raccomandazione**: Usa almeno `48px` (pt-12) di padding su mobile.

---

## 🧪 Come Testare

### Nel Browser (Simulazione)
1. Apri DevTools (F12)
2. Attiva la vista mobile (Cmd+Shift+M)
3. Seleziona "iPhone 14 Pro" o "iPhone 15 Pro"
4. Ricarica la pagina
5. Verifica che il logo "TEMPO+" non sia sotto il notch

### Nel Simulatore iOS (Xcode)
1. `npm run build`
2. `npx cap sync ios`
3. `npx cap open ios`
4. Seleziona **iPhone 15 Pro**
5. Run (Cmd+R)
6. Verifica visivamente

### Su Device Reale (Consigliato)
1. Collega iPhone via USB
2. In Xcode seleziona il tuo device
3. Run (Cmd+R)
4. **Questo è il test più affidabile!**

---

## 🎨 Modifiche Personalizzate

### Aumentare il Padding su Mobile
Se vuoi ancora più spazio:

```tsx
// In Home.tsx, MultiTimerView.tsx, etc.
pt-16 md:pt-8 lg:pt-4  // ← pt-16 = 64px invece di 48px
```

### Usare Safe Area Dinamica
Invece di padding fisso, usa le variabili CSS:

```tsx
<div 
  className="relative z-10"
  style={{ 
    paddingTop: 'max(48px, var(--safe-area-inset-top))' 
  }}
>
  <!-- Contenuto -->
</div>
```

Questo usa il maggiore tra 48px e il safe-area reale del device.

### Testare Su Tutti i Device
```tsx
// Hook custom per debug
const { deviceType } = useDevice();

console.log('Device:', deviceType);
console.log('Safe Area Top:', getComputedStyle(document.documentElement)
  .getPropertyValue('--safe-area-inset-top'));
```

---

## 🐛 Troubleshooting

### Problema: Il logo va ancora sotto il notch
**Soluzione**: Aumenta il padding

```tsx
// Cambia da pt-12 a pt-16
pt-16 md:pt-8 lg:pt-4
```

### Problema: C'è troppo spazio sopra su iPad
**Soluzione**: Verifica il responsive

```tsx
// pt-12 solo su mobile, pt-8 su tablet
pt-12 md:pt-8 lg:pt-4
```

### Problema: Safe area non funziona
**Soluzione 1**: Verifica viewport meta tag
```html
<meta name="viewport" content="viewport-fit=cover" />
```

**Soluzione 2**: Verifica Capacitor StatusBar
```tsx
StatusBar.setOverlaysWebView({ overlay: false });
```

### Problema: In browser funziona, su device no
**Soluzione**: Il browser simula, ma il device reale può avere dimensioni diverse.
Testa SEMPRE su device reale prima di pubblicare.

---

## 📚 Risorse

### Apple Docs
- [Human Interface Guidelines - Safe Area](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Designing for iPhone X](https://developer.apple.com/videos/play/fall2017/801/)

### CSS
- [env() CSS Function](https://developer.mozilla.org/en-US/docs/Web/CSS/env)
- [Safe Area Insets](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)

### Capacitor
- [StatusBar Plugin](https://capacitorjs.com/docs/apis/status-bar)
- [iOS Configuration](https://capacitorjs.com/docs/ios/configuration)

---

## ✅ Checklist Finale

Prima di pubblicare, verifica:

- [ ] Logo TEMPO+ non va sotto notch/Dynamic Island
- [ ] Testato su iPhone 15 Pro (simulatore)
- [ ] Testato su device reale
- [ ] Padding corretto su iPhone, iPad, Mac
- [ ] Rotazione schermo funziona
- [ ] StatusBar configurata correttamente
- [ ] viewport-fit=cover presente in index.html
- [ ] Nessun contenuto tagliato in alto
- [ ] Spazio adeguato anche in landscape

---

## 🎯 Best Practices

1. **Usa padding responsive**: `pt-12 md:pt-8 lg:pt-4`
2. **Testa su device reale**: Il simulatore non è sempre accurato
3. **Safe area top**: Minimo 48px su iPhone moderni
4. **Safe area bottom**: Gestito automaticamente dalla navbar fissa
5. **StatusBar dark**: Su sfondo nero usa `Style.Dark`

---

**Safe Area gestita correttamente! ✅**

Ora il logo TEMPO+ è sempre visibile e non va sotto la fotocamera su nessun iPhone.
