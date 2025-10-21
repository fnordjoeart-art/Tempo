# ✅ Checklist Testing Completa - Tutti i Device Apple

## 🎯 Quick Test (5 minuti)

### Browser DevTools
```bash
npm run dev
```

**Testa questi 4 device**:

1. **Apple Watch** (396px)
   - [ ] WatchView appare
   - [ ] Pulsanti circolari visibili
   - [ ] Timer compatto leggibile

2. **iPhone 15 Pro** (393px)
   - [ ] Logo "TEMPO+" non sotto notch ✅
   - [ ] Padding top visibile (48px)
   - [ ] Bottom navbar visibile
   - [ ] Timer disk centrato

3. **iPad Pro 11"** (834px)  
   - [ ] Layout mobile con padding ridotto
   - [ ] Griglia 2-3 colonne
   - [ ] Bottom navbar presente

4. **Desktop** (1280px)
   - [ ] Sidebar sinistra visibile
   - [ ] Layout desktop attivo
   - [ ] Nessuna navbar bottom

---

## 📱 Detailed Test - Per Device

### ⌚ Apple Watch Series 9

**Device Info**:
- Width: 396px × 484px (45mm)
- Layout: WatchView dedicata

**Test**:
1. Apri app
   - [ ] Logo TEMPO+ appare in splash
   - [ ] Splash va via dopo 2 secondi
   
2. Schermata principale (no timer)
   - [ ] Titolo "TEMPO+" centrato
   - [ ] Preset in griglia 2×2
   - [ ] Pulsanti 1m e 5m in basso
   - [ ] Tutto visibile senza scroll
   
3. Timer attivo
   - [ ] Cerchio progress 32×32 visibile
   - [ ] Tempo al centro leggibile
   - [ ] Pulsanti Play/Pause/Reset circolari
   - [ ] Controlli centrati e accessibili
   
4. Interazioni
   - [ ] Tap su pulsanti responsive
   - [ ] Timer parte/pausa correttamente
   - [ ] Reset funziona

**Pass**: ✅ / ❌

---

### 📱 iPhone 15 Pro (Dynamic Island)

**Device Info**:
- Width: 393px × 852px
- Layout: Mobile standard
- Feature: Dynamic Island

**Test**:
1. Splash Screen
   - [ ] Logo TEMPO+ centrato
   - [ ] Non va sotto Dynamic Island
   - [ ] Fade in/out fluido
   
2. Home Screen
   - [ ] Logo "TEMPO+" con **48px** da sopra
   - [ ] Logo NON sotto Dynamic Island ✅✅✅
   - [ ] Sottotitolo "Visual Timer" visibile
   - [ ] Timer disk centrato
   - [ ] Bottoni controlli visibili
   
3. Bottom Navigation
   - [ ] Navbar fissa in basso
   - [ ] 5 tab visibili: Home, Presets, Routines, Groups, Settings
   - [ ] Non copre contenuto
   - [ ] Animazione tab attivo funziona
   
4. Altre schermate
   - [ ] **Presets**: Header non sotto Dynamic Island
   - [ ] **Routines**: Header non sotto Dynamic Island
   - [ ] **Groups**: Header non sotto Dynamic Island
   - [ ] **Settings**: Header non sotto Dynamic Island
   
5. Rotazione landscape
   - [ ] Layout si adatta
   - [ ] Navbar rimane in basso
   - [ ] Contenuto non tagliato

**Pass**: ✅ / ❌

---

### 📱 iPhone SE (Nessun Notch)

**Device Info**:
- Width: 375px × 667px
- Layout: Mobile standard
- Feature: Nessun notch

**Test**:
1. Home Screen
   - [ ] Padding 48px presente (anche se non serve)
   - [ ] Layout equilibrato
   - [ ] Tutto visibile
   
2. Confronto con iPhone 15 Pro
   - [ ] Stesso padding (consistenza)
   - [ ] Stessa esperienza utente

**Pass**: ✅ / ❌

---

### 📱 iPad Pro 11" (Portrait)

**Device Info**:
- Width: 834px
- Layout: Mobile con padding md
- Feature: Schermo grande

**Test**:
1. Home Screen
   - [ ] Logo "TEMPO+" con **32px** da sopra (pt-8)
   - [ ] Più spazio che iPhone ma meno che desktop
   - [ ] Timer disk più grande (300px)
   - [ ] Layout centrato
   
2. Presets/Routines/Groups
   - [ ] Griglia 2-3 colonne (responsive)
   - [ ] Card ben distribuite
   - [ ] Padding 32px consistente
   
3. Bottom Navigation
   - [ ] Navbar presente
   - [ ] Icone e testo visibili

**Pass**: ✅ / ❌

---

### 📱 iPad Pro 11" (Landscape)

**Device Info**:
- Width: 1194px
- Layout: Desktop (sidebar)
- Feature: Sidebar appare!

**Test**:
1. Layout
   - [ ] **Sidebar sinistra** appare
   - [ ] Navbar bottom **scompare**
   - [ ] Main content a destra
   - [ ] Padding ridotto a 16px (pt-4)
   
2. Sidebar
   - [ ] Logo TEMPO+ in alto
   - [ ] Menu navigazione completo
   - [ ] Pulsante collapse funziona
   
3. Rotazione
   - [ ] Portrait → Landscape: sidebar appare
   - [ ] Landscape → Portrait: torna navbar

**Pass**: ✅ / ❌

---

### 🖥️ MacBook Pro 14"

**Device Info**:
- Width: 1512px
- Layout: Desktop (sidebar)
- Feature: Schermo grande

**Test**:
1. Desktop Layout
   - [ ] Sidebar sinistra visibile
   - [ ] Logo TEMPO+ in sidebar
   - [ ] Navigation menu completo
   - [ ] Main content ampio
   
2. Home View
   - [ ] Padding minimo 16px (pt-4)
   - [ ] Timer disk grande (350px)
   - [ ] Layout desktop ottimizzato
   
3. Sidebar
   - [ ] Collapse funziona
   - [ ] Icone rimangono visibili quando collapsed
   - [ ] Transizione fluida
   
4. Tutte le view
   - [ ] Presets: layout desktop
   - [ ] Routines: layout desktop
   - [ ] Groups: griglia 4 colonne
   - [ ] Settings: 2 colonne

**Pass**: ✅ / ❌

---

## 🎨 Visual Tests

### Verifica Padding Top

**Come testare**:
1. Apri DevTools
2. Seleziona l'elemento header (TEMPO+)
3. Guarda gli Styles
4. Verifica `padding-top`

**Valori attesi**:

| Device | Width | Padding Top |
|--------|-------|-------------|
| Watch | ≤ 396px | 12px (p-3) |
| iPhone | 397-767px | **48px** (pt-12) ✅ |
| iPad | 768-1023px | **32px** (pt-8) ✅ |
| Mac | ≥ 1024px | **16px** (pt-4) ✅ |

---

## 🚨 Critical Tests (DA NON FALLIRE)

### 1. iPhone Notch Test ⚠️

**Device**: iPhone 15 Pro  
**Test**: Logo NON sotto Dynamic Island

```
✅ PASS: Logo "TEMPO+" inizia almeno 48px sotto il top
❌ FAIL: Logo coperto/tagliato da Dynamic Island
```

### 2. iPad Landscape Sidebar Test

**Device**: iPad Pro 11" (landscape)  
**Test**: Sidebar appare, navbar scompare

```
✅ PASS: Sidebar visibile + No navbar bottom
❌ FAIL: Ancora navbar bottom in landscape
```

### 3. Watch Compact Layout Test

**Device**: Apple Watch  
**Test**: Tutto visibile senza scroll

```
✅ PASS: Timer + controlli visibili completamente
❌ FAIL: Necessita scroll per vedere i pulsanti
```

---

## 📊 Test Matrix Completo

### Configurazioni da Testare (Minimo)

| # | Device | Width | Orientation | Layout | Critical |
|---|--------|-------|-------------|--------|----------|
| 1 | Watch Series 9 | 396px | - | Watch | ⚠️ |
| 2 | iPhone SE | 375px | Portrait | Mobile | ✓ |
| 3 | iPhone 15 Pro | 393px | Portrait | Mobile | ⚠️⚠️⚠️ |
| 4 | iPhone 15 Pro Max | 430px | Portrait | Mobile | ⚠️ |
| 5 | iPad mini | 744px | Portrait | Mobile | ✓ |
| 6 | iPad Pro 11" | 834px | Portrait | Mobile | ⚠️ |
| 7 | iPad Pro 11" | 1194px | Landscape | Desktop | ⚠️ |
| 8 | MacBook Air | 1280px | - | Desktop | ⚠️ |
| 9 | MacBook Pro 14" | 1512px | - | Desktop | ✓ |

⚠️ = Test critico (must pass)  
✓ = Test importante

---

## 🧪 Testing Tools

### 1. Browser DevTools (Chrome/Safari)
```bash
# Start dev server
npm run dev

# Open DevTools
Cmd + Option + I (Mac)
F12 (Windows)

# Device Toolbar
Cmd + Shift + M
```

**Devices da selezionare**:
- iPhone SE (375px)
- iPhone 14 Pro (393px)
- iPhone 14 Pro Max (430px)
- iPad (810px)
- iPad Pro (1024px)

### 2. Xcode Simulators
```bash
# Build and sync
npm run build
npx cap sync ios
npx cap open ios

# Seleziona simulatore in Xcode
# Run (Cmd + R)
```

**Simulatori da testare**:
- Apple Watch Series 9 - 45mm
- iPhone 15 Pro
- iPad Pro 11-inch (6th gen)
- My Mac (Designed for iPad)

### 3. Real Devices (MIGLIORE)
```bash
# Collega device via USB
# In Xcode: seleziona device fisico
# Run (Cmd + R)
```

---

## ✅ Final Checklist Before Publishing

### Must Test On Real Devices

- [ ] **iPhone con Dynamic Island** (15 Pro o più recente)
  - Logo NON coperto
  - Tutto funziona
  
- [ ] **iPad Pro** (landscape e portrait)
  - Sidebar funziona in landscape
  - Navbar in portrait
  
- [ ] **Apple Watch** (Series 9 o più recente)
  - Layout compatto funziona
  - Timer leggibile

### Optional but Recommended

- [ ] iPhone SE (verifica backward compatibility)
- [ ] iPad mini (verifica su tablet piccoli)
- [ ] Mac (testa desktop layout completo)

---

## 📝 Bug Report Template

Se trovi problemi:

```markdown
**Device**: iPhone 15 Pro
**iOS Version**: 17.5
**Screen Size**: 393 × 852
**Orientation**: Portrait

**Issue**: Logo coperto da Dynamic Island

**Expected**: Logo 48px sotto il top
**Actual**: Logo a 20px dal top

**Screenshot**: [attach]

**Steps to reproduce**:
1. Apri app
2. Vai su Home
3. Guarda header
```

---

## 🎯 Success Criteria

L'app passa tutti i test se:

1. ✅ Logo NON coperto su iPhone con notch/Dynamic Island
2. ✅ WatchView funziona su Apple Watch
3. ✅ Desktop layout attivo su Mac e iPad landscape
4. ✅ Mobile layout attivo su iPhone e iPad portrait
5. ✅ Tutte le navbar/sidebar visibili correttamente
6. ✅ Nessun contenuto tagliato su nessun device

---

## 📚 Documentazione di Supporto

- **Verifica Device**: `/DEVICE-VERIFICATION.md`
- **Safe Area Guide**: `/components/SAFE-AREA-GUIDE.md`
- **Fix Notch**: `/FIX-NOTCH-SUMMARY.md`
- **Setup Guide**: `/SETUP-GUIDE.md`

---

**Pronto per testing completo! 🧪**

Segui questa checklist prima di pubblicare su App Store.
