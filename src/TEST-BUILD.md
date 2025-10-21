# 🧪 Test Build Completo

## 🎯 Seguire Questi Step Esattamente

### 1️⃣ **Clean Build**
```bash
# Rimuovi vecchia build
rm -rf dist/

# Build fresca
npm run build
```

**✅ Verifica Output**:
```
vite v5.2.0 building for production...
✓ X modules transformed.
dist/index.html              X kB
dist/assets/index-XXX.css    X kB  ← DEVE esserci!
dist/assets/index-XXX.js     X kB
✓ built in Xs
```

**❗ IMPORTANTE**: Controlla che ci sia un file `.css` nella build!

---

### 2️⃣ **Verifica CSS nel Bundle**

```bash
# Cerca se bg-black è presente nel CSS
cat dist/assets/*.css | grep "bg-black"
```

**Dovrebbe mostrare**:
```css
.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}
```

Se vedi questo → ✅ CSS incluso correttamente!

---

### 3️⃣ **Sync Capacitor**

```bash
npm run capacitor:sync
```

**✅ Verifica Output**:
```
[capacitor] ✔ Copying web assets from dist to ios/App/App/public in Xms
[capacitor] ✔ Creating capacitor.config.json in ios/App/App in Xms
[capacitor] ✔ Copying native bridge in Xms
[capacitor] ✔ Copying capacitor.config.json in Xms
[capacitor] ✔ copy ios in Xms
```

---

### 4️⃣ **Apri Xcode e Testa**

```bash
npm run capacitor:ios
```

Oppure:
```bash
npx cap open ios
```

**In Xcode**:
1. Seleziona simulatore (iPhone 15 Pro)
2. Premi Play (CMD+R)
3. Aspetta build e launch

---

### 5️⃣ **Checklist Visiva**

Una volta aperta l'app, verifica:

#### Home Screen:
- [ ] Sfondo NERO (non bianco!)
- [ ] Testo BIANCO
- [ ] Timer disco ARANCIONE
- [ ] Pulsanti con gradienti
- [ ] Bottom navigation con icone colorate

#### Settings:
- [ ] Sfondo NERO
- [ ] Card con bordi
- [ ] Switch funzionanti
- [ ] Colori corretti

#### Presets:
- [ ] Sfondo NERO
- [ ] Card preset con colori
- [ ] Badge e badge outline
- [ ] Filtri gruppi

#### Routines:
- [ ] Sfondo NERO
- [ ] Card routine
- [ ] Step preview
- [ ] Auto-advance badge

#### Groups:
- [ ] Sfondo NERO
- [ ] Card gruppi con icone
- [ ] Colori personalizzati
- [ ] Stats (X preset, Y routine)

---

## 🚨 Se Vedi Ancora Sfondo Bianco

### **Debug Step by Step**:

#### 1. Verifica build contiene CSS:
```bash
ls -lh dist/assets/
```

Dovrebbe mostrare:
```
index-XXX.css   ← Deve esserci!
index-XXX.js
```

#### 2. Verifica contenuto CSS:
```bash
head -20 dist/assets/*.css
```

Dovrebbe iniziare con:
```css
*,:before,:after{box-sizing:border-box;border-width:0;...
.bg-black{...}
.text-white{...}
```

#### 3. Verifica index.html linki il CSS:
```bash
cat dist/index.html | grep stylesheet
```

Dovrebbe mostrare:
```html
<link rel="stylesheet" crossorigin href="/assets/index-XXX.css">
```

#### 4. Verifica iOS app contenga i file:
```bash
ls -lh ios/App/App/public/assets/
```

Dovrebbe contenere gli stessi file di `dist/assets/`

---

## 🔧 Fix Comuni

### **Problema 1: CSS non generato**
```bash
# Reinstalla dependencies
rm -rf node_modules package-lock.json
npm install

# Riprova build
npm run build
```

### **Problema 2: PostCSS non funziona**
Verifica che esista:
```bash
cat postcss.config.js
```

Deve contenere:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### **Problema 3: Tailwind config sbagliato**
```bash
cat tailwind.config.ts
```

Deve avere:
```ts
export default {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./App.tsx",
    "./main.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

### **Problema 4: globals.css sbagliato**
```bash
head -5 styles/globals.css
```

DEVE iniziare con:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

NON DEVE avere:
```css
❌ @import "tailwindcss";
```

---

## 📱 Test su Device Fisico

Se funziona su simulatore ma non su device:

```bash
# 1. Clean Xcode build
# In Xcode: Product > Clean Build Folder (CMD+SHIFT+K)

# 2. Rebuild capacitor
npm run build
npm run capacitor:sync

# 3. Re-run su device
# In Xcode: seleziona il tuo iPhone e premi Play
```

---

## ✅ Successo!

Se vedi:
- ✅ Sfondo NERO
- ✅ Stili corretti
- ✅ Animazioni smooth
- ✅ Colori vivaci

**L'app è pronta! 🎉**

---

## 📊 Timing Atteso

```
npm run build         → 10-30s
npm run capacitor:sync → 5-10s
Xcode build          → 20-60s
App launch           → 2-5s

TOTALE: ~40-105s
```

---

## 🆘 Ancora Problemi?

Invia questi dettagli:

```bash
# 1. Versioni
npm --version
node --version

# 2. Build output
npm run build 2>&1 | tee build-log.txt

# 3. File generati
ls -lh dist/assets/

# 4. CSS content
head -50 dist/assets/*.css

# 5. Capacitor sync output
npm run capacitor:sync 2>&1 | tee sync-log.txt
```

E uno screenshot dell'app risultante!

---

**Buon testing! 🚀**
