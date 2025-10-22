# ⏱️ TEMPO+ | Visual Timer Professionale

> 🚨 **IMPORTANTE**: Se l'app mostra sfondo BIANCO invece di NERO:
> 👉 Leggi **[/PROBLEMA-RISOLTO.md](/PROBLEMA-RISOLTO.md)** o **[/FIX-INSTRUCTIONS.md](/FIX-INSTRUCTIONS.md)**
> 
> ✅ **Fix v1.0.8 applicato**: Downgrade Tailwind v4→v3 per build produzione
> 
> 🚀 **Setup Iniziale**: Leggi [START-HERE.md](/START-HERE.md)
> 
> Logo disponibile in `/public/logo.svg` e `/public/app-icon.svg`

App Visual Timer in stile Time Timer per **iOS, iPadOS, watchOS e Android**, con splash screen elegante, gestione routine avanzate e sistema di gruppi.

![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20iPadOS%20%7C%20watchOS%20%7C%20Android-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![Capacitor](https://img.shields.io/badge/Capacitor-6.0-119eff)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6)

---

## ✨ Features

### 🎯 Core
- **Visual Timer Disk** - Disco colorato che si "consuma" mostrando il tempo rimanente
- **Splash Screen Elegante** - Logo TEMPO+ con dissolvenza fluida
- **Timer Multipli** - Gestisci più timer contemporaneamente
- **Routine con Auto-advance** - Sequenze di timer che si avviano automaticamente

### 🎨 Design
- **Logo TEMPO+** personalizzato con gradiente arancione/rosso
- **Sfondo nero** con colori vivaci (arancione/rosso/blu)
- **Animazioni fluide** a 60fps con Motion
- **Dark mode** nativo
- **Responsive** per tutti i dispositivi Apple
- **Safe Area** - Ottimizzato per iPhone con notch/Dynamic Island

### 🔧 Funzionalità
- **Preset personalizzabili** - Salva i tuoi timer preferiti
- **Sistema Gruppi** - Organizza timer, preset e routine con icone colorate
- **Sound Library** - 9 suoni professionali
- **Multilingua** - Italiano, Inglese, Spagnolo, Francese, Tedesco, Portoghese
- **Accessibilità** - VoiceOver, Dynamic Type, Reduce Motion

---

## 🚀 Quick Start

### Prerequisiti
- Node.js 18+
- Xcode 15+ (per iOS/watchOS) - solo macOS
- Android Studio (per Android)
- Apple Developer Account (€99/anno per pubblicare)

### Installazione

```bash
# 1. Clona/scarica il progetto
cd tempo-plus

# 2. Installa dipendenze
npm install

# 3. Avvia dev server
npm run dev
```

Apri http://localhost:3000

### Build per Mobile

```bash
# iOS
npm run capacitor:ios

# Android  
npm run capacitor:android
```

📖 **Guida completa**: vedi [SETUP-GUIDE.md](./SETUP-GUIDE.md)

---

## 📱 Tecnologie

- **React 18** + **TypeScript**
- **Tailwind CSS 4.0** - Styling
- **Motion (Framer Motion)** - Animazioni
- **Capacitor 6** - Native bridge
- **Radix UI** - Componenti accessibili
- **Lucide React** - Icone
- **Recharts** - Grafici (se necessario)

---

## 📂 Struttura Progetto

```
tempo-plus/
├── components/
│   ├── Home.tsx              # Dashboard principale
│   ├── VisualTimerDisk.tsx   # Disco timer animato
│   ├── ChronographDisplay.tsx # Cronografo racing
│   ├── MultiTimerView.tsx    # Vista timer multipli
│   ├── Routines.tsx          # Gestione routine
│   ├── Presets.tsx           # Preset salvati
│   ├── GroupManager.tsx      # Sistema gruppi
│   ├── Settings.tsx          # Impostazioni
│   ├── SoundLibrary.tsx      # Libreria suoni
│   ├── Privacy.tsx           # Privacy policy
│   ├── TimerContext.tsx      # State management
│   ├── i18n.tsx             # Traduzioni
│   └── ui/                   # Shadcn components
├── styles/
│   └── globals.css          # Stili globali + Tailwind
├── App.tsx                  # Root component
├── main.tsx                 # Entry point + Capacitor config
├── capacitor.config.ts      # Configurazione Capacitor
└── vite.config.ts           # Build config

```

---

## 🎨 Design System

### Colori
- **Background**: `#000000` (nero)
- **Timer primario**: `#F97316` (arancione)
- **Timer secondario**: `#EF4444` (rosso)
- **Accent**: `#3B82F6` (blu)
- **Viola**: `#A855F7`

### Typography
- **System font** ottimizzato per iOS/Android
- **Dynamic Type** support
- Font sizes responsive

---

## 🌍 Lingue Supportate

- 🇮🇹 Italiano (default)
- 🇬🇧 Inglese
- 🇪🇸 Spagnolo
- 🇫🇷 Francese
- 🇩🇪 Tedesco
- 🇧🇷 Portoghese

---

## 📦 Build & Deploy

### Development
```bash
npm run dev              # Dev server
npm run build            # Build production
npm run preview          # Preview build
```

### Capacitor
```bash
npm run capacitor:sync           # Sync dopo modifiche
npm run capacitor:ios            # Apri Xcode
npm run capacitor:android        # Apri Android Studio
npm run capacitor:run:ios        # Run su device iOS
npm run capacitor:run:android    # Run su device Android
```

### App Store
Vedi [SETUP-GUIDE.md](./SETUP-GUIDE.md) sezione "Pubblicazione App Store"

---

## 🔐 Privacy

TEMPO+ **NON raccoglie dati personali**.
- Tutti i dati sono salvati **localmente** sul dispositivo
- Nessuna connessione a server esterni
- Nessun tracking o analytics

Privacy Policy: [da pubblicare online]

---

## 📄 Licenza

Proprietario: Play Serious  
Versione: 1.0.0

---

## 🆘 Supporto

### Problemi comuni
- **Schermo bianco**: verifica `npm install && npx cap sync`
- **Status bar sovrapposta**: controlla `main.tsx`
- **Build fallita**: `Product → Clean Build Folder` in Xcode

### Documentazione
- [Setup completo](./SETUP-GUIDE.md)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Apple Developer](https://developer.apple.com)

---

## 🎯 Roadmap

- [x] Visual Timer core
- [x] Timer multipli
- [x] Sistema routine
- [x] Preset e gruppi
- [x] Multilingua
- [x] Sound library
- [ ] Apple Watch app indipendente
- [ ] Widget iOS 17
- [ ] Siri Shortcuts
- [ ] Sincronizzazione iCloud
- [ ] Statistiche e analytics locali

---

## 👨‍💻 Autore

**Play Serious**  
Creato con ❤️ usando Figma Make

---

**Pronto per essere pubblicato sull'App Store! 🚀**
