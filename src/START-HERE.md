# 🚀 TEMPO+ - INIZIA QUI

> **⚠️ IMPORTANTE**: Se l'app mostra sfondo BIANCO invece di NERO, leggi **`/FIX-INSTRUCTIONS.md`** prima di procedere!

> **Tempo stimato setup completo**: 1-2 ore (prima volta) | 30 minuti (con esperienza)

---

## 🚨 **FIX CRITICO APPLICATO** (v1.0.8)

**Problema**: Build iOS mostrava sfondo BIANCO senza stili
**Causa**: Tailwind v4 BETA nel package.json (incompatibile con build)
**Soluzione**: Downgrade a Tailwind v3.4.1 stable

### **Se hai già il progetto attivo**:
👉 **Leggi `/FIX-INSTRUCTIONS.md`** per istruzioni dettagliate!

In breve:
```bash
# Sia online che sul Mac
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📋 Checklist Rapida

### ✅ STEP 1: Verifica Prerequisiti (5 minuti)

Hai installato?
- [ ] Node.js 18+ ([Download](https://nodejs.org/))
- [ ] Git ([Download](https://git-scm.com/))
- [ ] Xcode 15+ (solo macOS - per iOS)
- [ ] Account Apple Developer (€99/anno - solo per pubblicare)

```bash
# Verifica versioni
node --version  # Dovrebbe essere 18+
npm --version   # Dovrebbe essere 9+
git --version
```

---

## 🎯 STEP 2: Setup Progetto (15 minuti)

### A) Scarica i file
1. Scarica/copia TUTTI i file da Figma Make
2. Mettili in una cartella `tempo-plus`

### B) Installa dipendenze
```bash
cd tempo-plus
npm install
```

### C) Testa in browser
```bash
npm run dev
```
Apri http://localhost:3000

**Vedrai**: Splash screen TEMPO+ per 2 secondi → App principale

✅ Se funziona, vai allo STEP 3!

---

## 📱 STEP 3: Setup Mobile (30 minuti)

### Per iOS (Mac richiesto)

```bash
# 1. Aggiungi iOS
npm install @capacitor/ios
npx cap add ios

# 2. Installa plugin
npm install @capacitor/status-bar @capacitor/haptics

# 3. Build e sincronizza
npm run build
npx cap sync ios

# 4. Apri Xcode
npx cap open ios
```

**In Xcode**:
1. Seleziona il tuo Team developer
2. Seleziona un simulatore (iPhone 15 Pro)
3. Premi **▶️ Run** (o Cmd+R)

✅ App si apre nel simulatore!

---

## 🎨 STEP 4: Icone App (20 minuti)

### Genera icone da SVG

**Opzione A - Automatico** (CONSIGLIATO):
1. Vai su https://www.appicon.co/
2. Carica `/public/app-icon.svg`
3. Clicca "Generate"
4. Scarica il pacchetto
5. Trascina in Xcode → Assets.xcassets → AppIcon

**Opzione B - Manuale**:
1. Apri `/public/app-icon.svg` in un editor grafico
2. Esporta come PNG 1024x1024
3. Usa un resize tool per creare altre dimensioni

📖 **Guida completa**: `/public/LOGO-README.md`

---

## 🚀 STEP 5: Pubblica su App Store (2-3 giorni)

### Prerequisiti
- [ ] Apple Developer Account attivo (€99/anno)
- [ ] Privacy Policy pubblicata online (obbligatoria)
- [ ] Screenshot app pronti (6.7", 5.5", iPad)

### Procedura
1. **In Xcode**: Product → Archive
2. **Organizer**: Distribute App → Upload to App Store
3. **App Store Connect**: Crea nuova app
4. Compila metadata e carica screenshot
5. Submit for Review

📖 **Guida dettagliata**: `/SETUP-GUIDE.md` (sezione 6)

---

## 🆘 Problemi? Guarda Qui

### Schermo bianco in browser
```bash
npm install
npm run dev
```

### Build fallita in Xcode
```bash
# Pulisci cache
rm -rf node_modules
npm install
npx cap sync ios
```

### Splash screen non si vede
- Controlla che `showSplash` sia `true` in `/App.tsx`
- Verifica che non ci siano errori nella console

### StatusBar sovrapposta su iPhone
- Verifica che `/main.tsx` contenga il config StatusBar
- Dovrebbe esserci: `StatusBar.setOverlaysWebView({ overlay: false })`

---

## 📚 Documentazione Completa

### Guide
- **⭐ `/SETUP-GUIDE.md`** - Setup completo passo-passo (~400 righe)
- **⚡ `/QUICK-COMMANDS.md`** - Comandi pronti da copiare
- **📖 `/README.md`** - Overview progetto

### Logo e Assets
- **🎨 `/public/LOGO-README.md`** - Come generare icone app
- **💻 `/components/LOGO-USAGE-EXAMPLES.md`** - Usare il logo nel codice
- **🎬 `/components/SPLASH-SCREEN-INFO.md`** - Personalizzare splash

### File SVG
- `/public/logo.svg` - Logo orizzontale (400x150px)
- `/public/app-icon.svg` - Icona quadrata (1024x1024px)

---

## 💡 Domande Frequenti

### L'app ha già un'icona?
✅ **Sì!** Il logo TEMPO+ è in `/public/app-icon.svg` (formato SVG vettoriale).
Devi solo convertirlo in PNG usando AppIcon.co o un tool simile.

### Posso cambiare la durata della splash screen?
✅ **Sì!** Apri `/components/SplashScreen.tsx` e modifica la riga 13:
```tsx
}, 2000); // ← Cambia questo numero (millisecondi)
```

### Posso togliere l'animazione splash?
✅ **Sì!** In `/App.tsx` cambia:
```tsx
const [showSplash, setShowSplash] = useState(false); // ← false
```

### Quanto costa pubblicare?
- **Apple App Store**: €99/anno (obbligatorio)
- **Google Play Store**: €25 una tantum
- **Tutto il resto**: Gratis!

### Serve un Mac per iOS?
- **Per pubblicare**: Sì, Xcode gira solo su macOS
- **Per Android**: No, puoi usare Windows/Linux

---

## ⏱️ Timeline Realistica

| Fase | Tempo | Difficoltà |
|------|-------|------------|
| Setup locale | 30 min | ⭐ Facile |
| Setup iOS/Android | 1 ora | ⭐⭐ Media |
| Generare icone | 20 min | ⭐ Facile |
| Test su device | 30 min | ⭐⭐ Media |
| Configurare Xcode | 1 ora | ⭐⭐⭐ Avanzata |
| Pubblicare App Store | 2 giorni | ⭐⭐⭐ Avanzata |

**Totale prima pubblicazione**: ~1 settimana

---

## ✅ Sei Pronto!

Hai tutto quello che serve per pubblicare TEMPO+ sull'App Store!

### Prossimi passi:
1. ✅ Leggi questa guida (fatto!)
2. → Inizia con **STEP 2** (Setup Progetto)
3. → Segui **STEP 3** (Setup Mobile)
4. → Completa **STEP 4** (Icone)
5. → Pubblica con **STEP 5** (App Store)

---

## 🎯 Quick Links

### Setup
- [Setup Completo](/SETUP-GUIDE.md) - Guida dettagliata
- [Comandi Rapidi](/QUICK-COMMANDS.md) - Copy/paste comandi
- [Changelog](/CHANGELOG.md) - Modifiche versione

### Dispositivi
- ⭐ [Tutti i Device Pronti](/ALL-DEVICES-READY.md) - Riepilogo ultra-veloce
- [Verifica Device](/DEVICE-VERIFICATION.md) - Watch, iPhone, iPad, Mac
- [Testing Checklist](/TESTING-CHECKLIST.md) - Test completo pre-pubblicazione

### Logo & Design
- [Logo README](/public/LOGO-README.md) - Generare icone
- [Logo Examples](/components/LOGO-USAGE-EXAMPLES.md) - Usare nel codice
- [Splash Info](/components/SPLASH-SCREEN-INFO.md) - Personalizzare

### File Assets
- [Logo SVG](/public/logo.svg) - Logo orizzontale
- [Icon SVG](/public/app-icon.svg) - Icona app

---

## 📞 Hai Bisogno di Aiuto?

### Documentazione Ufficiale
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Apple Developer](https://developer.apple.com)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)

### Community
- [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)
- [Capacitor Discord](https://discord.gg/UPYYRhtyzp)

---

## 🎉 Buona Fortuna!

**TEMPO+ è pronto per diventare una vera app iOS/Android! 🚀**

Segui gli step e in una settimana sarai su App Store!

---

_Creato con ❤️ usando Figma Make_
_Play Serious © 2025_
