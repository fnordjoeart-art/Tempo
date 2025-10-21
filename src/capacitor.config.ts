import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'it.playserious.tempoplus',
  appName: 'TEMPO+',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // Per il development su dispositivo reale, decommentare e inserire l'IP del PC
    // url: 'http://192.168.1.XXX:3000',
    // cleartext: true,
  },
  ios: {
    contentInset: 'always',
    // Configurazioni per la status bar
    preferredContentMode: 'mobile',
    // Abilita swipe back gesture
    swipeBackEnabled: true,
  },
  android: {
    // Abilita hardware acceleration
    allowMixedContent: false,
    captureInput: true,
    // Status bar trasparente
    backgroundColor: '#000000',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#000000',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#000000',
      overlaysWebView: false,
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true,
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#F97316',
    },
  },
};

export default config;
