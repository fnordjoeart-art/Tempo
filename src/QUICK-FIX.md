# ⚡ QUICK FIX - Comandi Rapidi

## 🎯 **Il Problema**
App iOS mostra sfondo BIANCO invece di NERO → CSS non generato nella build

## 🔧 **La Causa**
Tailwind v4 BETA nel `package.json` (incompatibile con Vite build)

## ✅ **La Soluzione**
Downgrade a Tailwind v3 stable + reinstalla node_modules

---

## 📝 **Comandi da Eseguire**

### **Online (Codespaces)**
```bash
rm -rf node_modules package-lock.json && npm install && npm run build && git push
```

### **Mac (Locale)**
```bash
git pull && rm -rf node_modules package-lock.json && npm install && npm run capacitor:sync && npm run capacitor:ios
```

---

## ✅ **Verifica Rapida**

### **1. Tailwind v3 installata?**
```bash
npm list tailwindcss
# DEVE dire: tailwindcss@3.4.1 (NON 4.0.0!)
```

### **2. CSS generato?**
```bash
ls -lh dist/assets/*.css
# DEVE mostrare file .css
```

### **3. App funziona?**
- Apri simulatore iOS
- Sfondo DEVE essere NERO
- Testo DEVE essere BIANCO

---

## 🆘 **Se Non Funziona**

### **Ripeti CANCELLANDO node_modules**:
```bash
# IMPORTANTE: Non saltare il "rm -rf"!
rm -rf node_modules package-lock.json
npm install
```

Poi:
```bash
# Online
npm run build && git push

# Mac
git pull && npm run capacitor:sync && npm run capacitor:ios
```

---

## 📚 **Documentazione Completa**

- **`/FIX-INSTRUCTIONS.md`** → Guida step-by-step dettagliata
- **`/REAL-PROBLEM-SOLVED.md`** → Spiegazione tecnica completa
- **`/BUILD-FIX.md`** → Dettagli configurazione Tailwind
- **`/TEST-BUILD.md`** → Come verificare la build

---

## 💡 **RICORDA**

**DEVI cancellare `node_modules` SEMPRE quando cambi versione Tailwind!**

`npm install` da solo NON basta! ❌

```bash
✅ Corretto:
rm -rf node_modules package-lock.json
npm install

❌ Sbagliato:
npm install  # Potrebbe mantenere v4 cached
```

---

**Ora esegui i comandi sopra e l'app funzionerà! 🚀**
