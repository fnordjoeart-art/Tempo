import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Capacitor imports per gestire la status bar su iOS
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

// Configurazione Capacitor per evitare che l'interfaccia vada sotto la status bar su iPhone
if (Capacitor.isNativePlatform()) {
  // Previene l'overlay della status bar
  StatusBar.setOverlaysWebView({ overlay: false });
  
  // Imposta lo stile della status bar (light content per sfondo scuro)
  StatusBar.setStyle({ style: Style.Dark });
  
  // Imposta il colore di sfondo della status bar
  StatusBar.setBackgroundColor({ color: '#000000' });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
