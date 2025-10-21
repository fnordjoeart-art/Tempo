# 🚀 TEMPO+ - Guida Setup Completa

## 📋 Prerequisiti

### Software Necessario:
- **Node.js** 18+ e npm ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Xcode** 15+ (solo per iOS/watchOS) - solo su macOS
- **Android Studio** (solo per Android)
- **Apple Developer Account** (€99/anno) - per pubblicare su App Store
- **CocoaPods** (per iOS): `sudo gem install cocoapods`

---

## 🎯 STEP 1: Setup Progetto Locale

### 1.1 Crea la cartella del progetto
```bash
mkdir tempo-plus
cd tempo-plus
```

### 1.2 Inizializza Git (opzionale ma consigliato)
```bash
git init
```

### 1.3 Copia tutti i file da Figma Make
Copia tutti i file e cartelle nella directory `tempo-plus`:
- `/components/` (tutta la cartella)
- `/styles/` (tutta la cartella)
- `/guidelines/` (tutta la cartella)
- `App.tsx`
- `main.tsx`
- `index.html`
- `package.json`
- `vite.config.ts`
- `capacitor.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`

### 1.4 Installa le dipendenze
```bash
npm install
```

### 1.5 Testa in browser
```bash
npm run dev
```
Apri http://localhost:3000 e verifica che tutto funzioni.

---

## 📱 STEP 2: Setup Capacitor

### 2.1 Inizializza Capacitor
```bash
npx cap init
```
Quando richiesto:
- **App name**: TEMPO+
- **App package ID**: it.playserious.tempoplus
- **Web asset directory**: dist

### 2.2 Aggiungi le piattaforme

#### Per iOS:
```bash
npm install @capacitor/ios
npx cap add ios
```

#### Per Android:
```bash
npm install @capacitor/android
npx cap add android
```

### 2.3 Build e sincronizza
```bash
npm run build
npx cap sync
```

---

## 🍎 STEP 3: Setup iOS (macOS richiesto)

### 3.1 Apri il progetto in Xcode
```bash
npx cap open ios
```

### 3.2 Configurazioni in Xcode

#### A) General Tab
1. **Display Name**: TEMPO+
2. **Bundle Identifier**: it.playserious.tempoplus
3. **Version**: 1.0.0
4. **Build**: 1
5. **Team**: Seleziona il tuo team developer
6. **Minimum Deployments**: iOS 15.0

#### B) Signing & Capabilities
1. **Automatically manage signing**: ✅ abilitato
2. **Team**: seleziona il tuo team
3. Aggiungi Capabilities:
   - ✅ **Background Modes**: Audio (per suoni timer)
   - ✅ **Push Notifications** (se userai notifiche)

#### C) Info.plist - Aggiungi permessi
Clicca su `Info.plist` e aggiungi:

```xml
<key>NSUserNotificationsUsageDescription</key>
<string>TEMPO+ usa le notifiche per avvisarti quando un timer termina</string>
<key>UIBackgroundModes</key>
<array>
    <string>audio</string>
</array>
```

#### D) Assets - Aggiungi Icone App

**LOGO INCLUSO**: Trovi il logo TEMPO+ in `/public/app-icon.svg`

1. Vai su **Assets.xcassets** → **AppIcon**
2. Genera le icone:
   - Apri `/public/app-icon.svg` in qualsiasi editor grafico
   - Oppure usa [AppIcon.co](https://www.appicon.co/) (carica il file SVG)
   - Genera tutte le dimensioni: 20x20, 29x29, 40x40, 60x60, 76x76, 83.5x83.5, 1024x1024
3. Trascina le icone generate in Xcode

💡 **Tip**: Il file SVG può essere convertito in PNG con questi tool:
   - [AppIcon.co](https://www.appicon.co/) - Automatico, genera tutte le dimensioni
   - [CloudConvert](https://cloudconvert.com/) - SVG to PNG converter
   - Sketch/Figma/Adobe XD - Esporta manualmente

#### E) Launch Screen (Splash)
1. Vai su **LaunchScreen.storyboard**
2. Imposta background nero
3. Aggiungi logo TEMPO+ al centro

### 3.3 Test su Simulatore
1. Seleziona un simulatore (es. iPhone 15 Pro)
2. Premi **Cmd+R** o clicca ▶️ Run
3. L'app si aprirà nel simulatore

### 3.4 Test su Dispositivo Reale
1. Collega iPhone via USB
2. Sblocca iPhone e autorizza il Mac
3. Seleziona il tuo iPhone dalla lista dispositivi in Xcode
4. Premi **Cmd+R**
5. Sul telefono: Settings → General → VPN & Device Management → Autorizza il tuo team

---

## 🤖 STEP 4: Setup Android (opzionale)

### 4.1 Apri in Android Studio
```bash
npx cap open android
```

### 4.2 Configurazioni

#### A) build.gradle (app level)
```gradle
android {
    namespace "it.playserious.tempoplus"
    compileSdk 34
    
    defaultConfig {
        applicationId "it.playserious.tempoplus"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }
}
```

#### B) Aggiungi icone
1. Vai su **res** → **mipmap**
2. Sostituisci `ic_launcher.png` con le tue icone
3. Usa [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)

### 4.3 Test su Emulatore
1. AVD Manager → Create Virtual Device
2. Seleziona Pixel 7 Pro, Android 14
3. Run ▶️

---

## ⌚ STEP 5: Apple Watch App (Avanzato)

### 5.1 Aggiungi Watch Target
1. In Xcode: **File** → **New** → **Target**
2. Seleziona **watchOS** → **Watch App**
3. Nome: TEMPO+ Watch
4. Bundle ID: it.playserious.tempoplus.watchkitapp

### 5.2 Sviluppo Watch App
L'app Watch richiede codice nativo SwiftUI separato. Opzioni:
- **Versione semplificata**: Solo visualizzazione timer attivi
- **Versione completa**: Timer indipendenti su Watch

*Nota: lo sviluppo Watch esula da questa guida base*

---

## 🚢 STEP 6: Pubblicazione App Store

### 6.1 Preparazione

#### A) Apple Developer Account
1. Registrati su [developer.apple.com](https://developer.apple.com)
2. Paga €99/anno
3. Completa il profilo

#### B) App Store Connect
1. Vai su [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. **My Apps** → **+** → **New App**
3. Compila:
   - **Platform**: iOS (e watchOS se hai Watch app)
   - **Name**: TEMPO+
   - **Primary Language**: Italian
   - **Bundle ID**: it.playserious.tempoplus
   - **SKU**: TEMPOPLUS001

### 6.2 Metadata App Store

#### Testi richiesti:
- **Name**: TEMPO+ (max 30 caratteri)
- **Subtitle**: Visual Timer Professionale (max 30 caratteri)
- **Description**: [Max 4000 caratteri] Descrivi le funzionalità
- **Keywords**: timer,visual,cronografo,pomodoro,produttività
- **Support URL**: Il tuo sito web
- **Marketing URL**: (opzionale)
- **Privacy Policy URL**: OBBLIGATORIO ([vedi sotto](#privacy-policy))

#### Screenshot richiesti:
- **6.7" Display** (iPhone 15 Pro Max): 1-10 immagini
- **6.5" Display** (iPhone 11 Pro Max): 1-10 immagini  
- **5.5" Display** (iPhone 8 Plus): 1-10 immagini
- **iPad Pro 12.9"**: 1-10 immagini (se supporti iPad)
- **Apple Watch**: 1-10 immagini (se hai Watch app)

Dimensioni esatte:
- 6.7": 1290 x 2796 px
- 6.5": 1242 x 2688 px
- 5.5": 1242 x 2208 px

Usa Xcode Simulator + **Cmd+S** per fare screenshot.

#### App Preview (video opzionale):
- Max 30 secondi
- Formati: .mov, .m4v, .mp4

### 6.3 Privacy Policy

**OBBLIGATORIO!** Crea una pagina web con:

```markdown
# Privacy Policy - TEMPO+

Data: [oggi]

## Raccolta Dati
TEMPO+ NON raccoglie né trasmette dati personali.

## Dati Locali
Tutti i timer, preset e impostazioni sono salvati localmente sul dispositivo.

## Permessi
- Notifiche: per avvisi timer completati
- Audio: per riproduzione suoni

## Contatti
Email: [tua email]

Ultimo aggiornamento: [data]
```

Pubblica su:
- GitHub Pages (gratuito)
- Il tuo sito web
- Notion (pubblico)

### 6.4 Build per Distribuzione

#### In Xcode:
1. Seleziona **Any iOS Device (arm64)**
2. **Product** → **Archive**
3. Attendi la build (5-10 minuti)
4. Nella finestra **Organizer**:
   - Seleziona l'archivio
   - **Distribute App**
   - **App Store Connect**
   - **Upload**
5. Attendi upload (10-30 minuti)

### 6.5 Submit for Review

1. Torna su **App Store Connect**
2. Seleziona la build appena caricata
3. Compila tutte le sezioni:
   - ✅ App Information
   - ✅ Pricing
   - ✅ App Privacy
   - ✅ Prepare for Submission
4. **Add for Review**
5. **Submit**

### 6.6 Review Process
- ⏱️ **Tempo medio**: 24-48 ore
- 📧 Riceverai email quando:
  - Review inizia
  - App approvata o rifiutata
- Se rifiutata: leggi i feedback e correggi

### 6.7 Pubblicazione
Una volta approvata:
- **Release Automatica**: si pubblica subito
- **Release Manuale**: tu decidi quando

---

## 🔧 STEP 7: Comandi Utili

### Development
```bash
# Dev server web
npm run dev

# Build web
npm run build

# Preview build
npm run preview
```

### Capacitor
```bash
# Sync dopo modifiche al codice
npm run capacitor:sync

# Apri Xcode
npm run capacitor:ios

# Apri Android Studio
npm run capacitor:android

# Run direttamente su device iOS
npm run capacitor:run:ios

# Run direttamente su device Android
npm run capacitor:run:android
```

### Debug
```bash
# Safari Web Inspector (iOS)
# Safari → Develop → [Nome iPhone] → localhost

# Chrome DevTools (Android)
# Chrome → chrome://inspect → Seleziona device
```

---

## 🐛 Troubleshooting Comuni

### Problema: "Could not find module 'X'"
```bash
npm install
npx cap sync
```

### Problema: Schermo bianco su iOS
Verifica in `capacitor.config.ts`:
```typescript
server: {
  cleartext: true, // Solo per dev
}
```

### Problema: Status bar sovrapposta
Controlla che `main.tsx` abbia:
```typescript
StatusBar.setOverlaysWebView({ overlay: false });
```

### Problema: Build fallita in Xcode
1. Product → Clean Build Folder (Cmd+Shift+K)
2. Chiudi Xcode
3. Elimina `ios/App/Pods`
4. `cd ios/App && pod install`
5. Riapri Xcode

### Problema: Certificati scaduti
1. Xcode → Preferences → Accounts
2. Seleziona team → Download Manual Profiles
3. Riprova build

---

## 📚 Risorse Utili

### Documentazione
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Apple Developer](https://developer.apple.com/documentation/)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)

### Tool
- [AppIcon Generator](https://www.appicon.co/)
- [Screenshot Frames](https://www.screely.com/)
- [App Store Preview](https://launchkit.io/)

### Community
- [Capacitor Discord](https://discord.gg/UPYYRhtyzp)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)

---

## ✅ Checklist Finale

Prima di pubblicare, verifica:

- [ ] App funziona perfettamente in simulator
- [ ] App funziona su device reale
- [ ] Tutti i timer funzionano correttamente
- [ ] Suoni vengono riprodotti
- [ ] Vibrazioni funzionano (device reale)
- [ ] Dark mode applicato
- [ ] Rotazione schermo gestita
- [ ] Nessun crash o errori console
- [ ] Privacy Policy pubblicata online
- [ ] Screenshot App Store pronti
- [ ] Icone app in tutte le dimensioni
- [ ] Versione e build number corretti
- [ ] Metadata App Store completati
- [ ] Testato su iPhone e iPad (se supportato)
- [ ] Testato su Apple Watch (se supportato)

---

## 🎉 Conclusione

Seguendo questa guida dovresti riuscire a:
1. ✅ Far girare TEMPO+ in locale
2. ✅ Compilare l'app per iOS/Android
3. ✅ Testarla su simulatore e device
4. ✅ Pubblicarla sull'App Store

**Tempo stimato totale**: 1-2 settimane (prima app) o 2-3 giorni (se hai esperienza)

---

**Buona fortuna! 🚀**

Per domande o problemi, consulta la documentazione ufficiale o cerca su Stack Overflow.
