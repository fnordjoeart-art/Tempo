# 🎨 Logo e Icone TEMPO+

## File Disponibili

### 1. `/public/logo.svg`
Logo orizzontale TEMPO+ su sfondo trasparente
- **Uso**: Web, documentazione, marketing
- **Dimensioni**: 400x150px (viewBox)
- **Formato**: SVG vettoriale

### 2. `/public/app-icon.svg`
Icona quadrata TEMPO+ per app
- **Uso**: Icona iOS/Android/Desktop
- **Dimensioni**: 1024x1024px (viewBox)
- **Formato**: SVG vettoriale
- **Background**: Gradient nero con glow arancione

---

## 🔧 Come Generare le Icone App

Per pubblicare su App Store/Play Store, devi convertire il logo SVG in PNG.

### Metodo 1: AppIcon.co (CONSIGLIATO) ⭐
**Il più facile - automatico**

1. Vai su https://www.appicon.co/
2. Carica `/public/app-icon.svg`
3. Clicca "Generate"
4. Scarica il pacchetto completo con TUTTE le dimensioni
5. Trascina in Xcode → Assets.xcassets → AppIcon

✅ Genera automaticamente tutte le dimensioni iOS/Android/macOS

---

### Metodo 2: CloudConvert
**Conversione SVG → PNG**

1. Vai su https://cloudconvert.com/svg-to-png
2. Carica `/public/app-icon.svg`
3. Imposta dimensioni: **1024x1024px**
4. Converti e scarica
5. Usa tool come [ResizeImage.net](https://resizeimage.net/) per creare altre dimensioni

---

### Metodo 3: Figma/Sketch (Per Designer)
**Controllo completo**

#### In Figma:
1. Crea un frame 1024x1024px
2. Importa `/public/app-icon.svg`
3. Adatta al frame
4. Export as PNG:
   - 1024x1024 (1x)
   - 2048x2048 (2x)
   - 3072x3072 (3x)

#### In Sketch:
1. Importa SVG
2. Crea artboard 1024x1024
3. Export → iOS Icon template

---

### Metodo 4: ImageMagick (Linea di comando)
**Per sviluppatori**

```bash
# Installa ImageMagick
brew install imagemagick

# Converti SVG → PNG 1024x1024
convert -background none -density 300 app-icon.svg -resize 1024x1024 app-icon-1024.png

# Genera tutte le dimensioni iOS
for size in 20 29 40 58 60 76 80 87 120 152 167 180 1024; do
  convert app-icon-1024.png -resize ${size}x${size} app-icon-${size}.png
done
```

---

## 📱 Dimensioni Richieste

### iOS App Icon
- **20x20** - Notification (2x, 3x)
- **29x29** - Settings (2x, 3x)
- **40x40** - Spotlight (2x, 3x)
- **60x60** - App (2x, 3x)
- **76x76** - iPad App (1x, 2x)
- **83.5x83.5** - iPad Pro
- **1024x1024** - App Store

### Android App Icon
- **48x48** - mdpi
- **72x72** - hdpi
- **96x96** - xhdpi
- **144x144** - xxhdpi
- **192x192** - xxxhdpi
- **512x512** - Play Store

### macOS App Icon
- **16x16, 32x32, 128x128, 256x256, 512x512, 1024x1024**

---

## 🎨 Colori Usati

```css
/* Gradient principale */
#EF4444 → #F97316 → #FB923C
(rosso → arancione → arancione chiaro)

/* Background */
#000000 → #1a1a1a (gradient nero)

/* Glow effect */
#F97316 con opacità 30%
```

---

## 🔄 Personalizzazione

### Cambiare i colori:
Modifica i gradient in `/public/app-icon.svg`:

```xml
<linearGradient id="plusGradient">
  <stop offset="0%" stop-color="#TUO_COLORE_1" />
  <stop offset="50%" stop-color="#TUO_COLORE_2" />
  <stop offset="100%" stop-color="#TUO_COLORE_3" />
</linearGradient>
```

### Cambiare il testo:
Trova `<text>TEMPO</text>` e `<text>+</text>` nel file SVG e modifica.

---

## ✅ Checklist Icone App Store

Prima di pubblicare, verifica:

- [ ] Icona 1024x1024 senza trasparenza
- [ ] Nessun angolo arrotondato (iOS li aggiunge automaticamente)
- [ ] Nessun testo troppo piccolo
- [ ] Contrasto sufficiente
- [ ] Riconoscibile anche in piccolo (29x29)
- [ ] Non usa solo parole (logo visivo importante)
- [ ] Non contiene screenshot dell'app
- [ ] Non usa elementi Apple (es. emoji Apple)

---

## 📖 Risorse Utili

- [Apple HIG - App Icons](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [AppIcon Generator](https://www.appicon.co/)
- [Icon Slate](https://www.kodlian.com/apps/icon-slate) - Mac app per icone
- [Asset Catalog Creator](https://apps.apple.com/app/asset-catalog-creator/id866571115)

---

**Buon design! 🎨**

---

## 📱 Safe Area & Device Optimization

Il logo è stato progettato considerando tutti i dispositivi Apple:

### ⌚ Apple Watch
- Logo nella splash screen
- Layout WatchView dedicato
- Nessun logo fisso nell'header (spazio limitato)

### 📱 iPhone
- Logo nell'header con **48px** di padding superiore
- Safe area per notch/Dynamic Island
- Logo sempre visibile

### 📱 iPad
- Logo nell'header con **32px** di padding
- Layout responsive ottimizzato

### 🖥️ Mac
- Logo in sidebar desktop layout
- Versione compatta nella navigazione

Per dettagli: `/DEVICE-VERIFICATION.md` e `/VISUAL-DEVICE-LAYOUTS.md`
