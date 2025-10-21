# ⚡ TEMPO+ - Comandi Rapidi

Copia e incolla questi comandi per setup rapido.

---

## 🚀 Setup Iniziale

```bash
# 1. Entra nella cartella progetto
cd tempo-plus

# 2. Installa TUTTE le dipendenze
npm install

# 3. Testa in browser
npm run dev
# Apri http://localhost:3000
# Vedrai la splash screen TEMPO+ per 2 secondi, poi l'app
```

### 🎬 Info Splash Screen
- **Logo**: `/public/logo.svg` e `/public/app-icon.svg`
- **Durata**: 2 secondi (modificabile in `/components/SplashScreen.tsx`)
- **Guida completa**: Vedi `/components/SPLASH-SCREEN-INFO.md`

---

## 📱 Setup iOS (Prima Volta)

```bash
# 1. Installa Capacitor iOS
npm install @capacitor/ios

# 2. Aggiungi piattaforma iOS
npx cap add ios

# 3. Installa plugin status bar e haptics
npm install @capacitor/status-bar @capacitor/haptics @capacitor/keyboard

# 4. Build del progetto web
npm run build

# 5. Sincronizza con iOS
npx cap sync ios

# 6. Apri Xcode
npx cap open ios

# In Xcode:
# - Seleziona il team developer
# - Seleziona un simulatore (iPhone 15 Pro)
# - Premi Cmd+R per eseguire
```

---

## 🤖 Setup Android (Prima Volta)

```bash
# 1. Installa Capacitor Android
npm install @capacitor/android

# 2. Aggiungi piattaforma Android
npx cap add android

# 3. Build del progetto web
npm run build

# 4. Sincronizza con Android
npx cap sync android

# 5. Apri Android Studio
npx cap open android

# In Android Studio:
# - Clicca su "Sync Project with Gradle Files"
# - Aspetta che finisca
# - Seleziona un emulatore o device
# - Premi Run ▶️
```

---

## 🔄 Dopo Modifiche al Codice

```bash
# 1. Build
npm run build

# 2. Sincronizza (iOS + Android)
npx cap sync

# 3a. Riapri Xcode (se modifiche native)
npx cap open ios

# 3b. Oppure run direttamente su device iOS
npx cap run ios

# 3c. Oppure run su Android
npx cap run android
```

---

## 🛠️ Fix Problemi Comuni

### Problema: Moduli mancanti
```bash
rm -rf node_modules package-lock.json
npm install
npx cap sync
```

### Problema: Build iOS non funziona
```bash
cd ios/App
pod install
cd ../..
npx cap sync ios
```

### Problema: Xcode cache corrotta
```bash
# In Xcode: Product → Clean Build Folder (Cmd+Shift+K)
# Poi chiudi Xcode e:
rm -rf ios/App/Pods
rm -rf ios/App/build
cd ios/App
pod install
cd ../..
npx cap open ios
```

### Problema: Android Gradle errori
```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

---

## 📦 Build per Production

### iOS Archive (per App Store)
```bash
# 1. Build web production
npm run build

# 2. Sync
npx cap sync ios

# 3. Apri Xcode
npx cap open ios

# In Xcode:
# 1. Seleziona "Any iOS Device (arm64)"
# 2. Product �� Archive
# 3. Aspetta 5-10 minuti
# 4. Organizer → Distribute App → App Store Connect → Upload
```

### Android APK (per test)
```bash
npm run build
npx cap sync android
npx cap open android

# In Android Studio:
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

### Android App Bundle (per Play Store)
```bash
# In Android Studio:
# Build → Generate Signed Bundle / APK
# Seleziona "Android App Bundle"
# Segui wizard per firmare
```

---

## 🧹 Pulizia Completa

```bash
# Elimina tutto e ricomincia
rm -rf node_modules
rm -rf ios
rm -rf android
rm package-lock.json

# Reinstalla
npm install
npx cap add ios
npx cap add android
npm run build
npx cap sync
```

---

## 📊 Info Utili

### Versioni correnti
```bash
node --version    # Dovrebbe essere 18+
npm --version     # Dovrebbe essere 9+
npx cap --version # Dovrebbe essere 6.0+
```

### Dimensioni build
```bash
# Dopo npm run build
du -sh dist/
# Dovrebbe essere ~2-5 MB
```

### Log dispositivo iOS (Debug)
```bash
# Mentre app è in esecuzione su device reale
# Safari → Develop → [Nome iPhone] → localhost
```

### Log dispositivo Android (Debug)
```bash
# Mentre app è in esecuzione
npx cap run android --livereload --external

# Oppure Chrome DevTools:
# Chrome → chrome://inspect → Seleziona device
```

---

## 🎯 Workflow Consigliato

### Sviluppo quotidiano
```bash
# Terminal 1: Dev server sempre attivo
npm run dev

# Terminal 2: Quando serve testare su mobile
npm run build && npx cap sync
npx cap run ios  # o android
```

### Prima di commit Git
```bash
# Verifica che tutto compili
npm run build

# Aggiungi files
git add .
git commit -m "feat: nuova funzionalità X"
git push
```

### Prima di pubblicare su App Store
```bash
# 1. Incrementa versione in package.json
# "version": "1.0.1"

# 2. Build production
npm run build

# 3. Sync
npx cap sync ios

# 4. Apri Xcode e verifica versione/build number
npx cap open ios

# 5. Archive e upload (vedi sopra)
```

---

## 🔗 Link Utili da Salvare

- **Apple Developer**: https://developer.apple.com
- **App Store Connect**: https://appstoreconnect.apple.com
- **Google Play Console**: https://play.google.com/console
- **Capacitor Docs**: https://capacitorjs.com/docs
- **TestFlight**: Per beta testing iOS
- **Firebase App Distribution**: Per beta testing Android

---

## 💡 Tips & Tricks

### Velocizza i test
```bash
# Invece di chiudere/riaprire Xcode ogni volta:
# In Xcode fai solo Cmd+R dopo aver fatto:
npm run build && npx cap sync
```

### Hot reload su device
```bash
# Modifica capacitor.config.ts:
# server: {
#   url: 'http://192.168.1.XXX:3000',  # IP del tuo Mac
#   cleartext: true
# }

# Poi:
npm run dev
npx cap run ios

# Ora le modifiche si ricaricano automaticamente!
# (RIMUOVI prima di pubblicare!)
```

### Testa più device contemporaneamente
```bash
# Terminal 1
npx cap run ios --target="iPhone 15 Pro"

# Terminal 2  
npx cap run ios --target="iPad Pro"

# Terminal 3
npx cap run android
```

---

**Salva questi comandi - ti torneranno utili! ⭐**
