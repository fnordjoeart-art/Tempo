// Multi-language support for TEMPO+
// Automatically detects browser language and provides translations

export type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'pt';

export interface Translations {
  // Splash Screen
  loading: string;
  
  // Navigation
  home: string;
  presets: string;
  routines: string;
  groups: string;
  settings: string;
  
  // Common
  start: string;
  pause: string;
  resume: string;
  reset: string;
  delete: string;
  cancel: string;
  save: string;
  edit: string;
  add: string;
  
  // Privacy
  privacy: string;
  privacyPolicy: string;
  lastUpdated: string;
  contact: string;
  dataCollection: string;
  dataUsage: string;
  dataRetention: string;
  userRights: string;
  children: string;
  changes: string;
}

const translations: Record<Language, Translations> = {
  it: {
    loading: 'CARICAMENTO',
    home: 'Home',
    presets: 'Preset',
    routines: 'Routine',
    groups: 'Gruppi',
    settings: 'Impostazioni',
    start: 'Avvia',
    pause: 'Pausa',
    resume: 'Riprendi',
    reset: 'Reset',
    delete: 'Elimina',
    cancel: 'Annulla',
    save: 'Salva',
    edit: 'Modifica',
    add: 'Aggiungi',
    privacy: 'Privacy',
    privacyPolicy: 'Informativa sulla Privacy',
    lastUpdated: 'Ultimo aggiornamento',
    contact: 'Contatti',
    dataCollection: 'Raccolta dei Dati',
    dataUsage: 'Utilizzo dei Dati',
    dataRetention: 'Conservazione dei Dati',
    userRights: 'I Tuoi Diritti',
    children: 'Privacy dei Minori',
    changes: 'Modifiche alla Privacy Policy',
  },
  en: {
    loading: 'LOADING',
    home: 'Home',
    presets: 'Presets',
    routines: 'Routines',
    groups: 'Groups',
    settings: 'Settings',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    reset: 'Reset',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    add: 'Add',
    privacy: 'Privacy',
    privacyPolicy: 'Privacy Policy',
    lastUpdated: 'Last Updated',
    contact: 'Contact',
    dataCollection: 'Data Collection',
    dataUsage: 'Data Usage',
    dataRetention: 'Data Retention',
    userRights: 'Your Rights',
    children: 'Children\'s Privacy',
    changes: 'Changes to Privacy Policy',
  },
  es: {
    loading: 'CARGANDO',
    home: 'Inicio',
    presets: 'Presets',
    routines: 'Rutinas',
    groups: 'Grupos',
    settings: 'Ajustes',
    start: 'Iniciar',
    pause: 'Pausa',
    resume: 'Reanudar',
    reset: 'Reiniciar',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    add: 'Añadir',
    privacy: 'Privacidad',
    privacyPolicy: 'Política de Privacidad',
    lastUpdated: 'Última actualización',
    contact: 'Contacto',
    dataCollection: 'Recopilación de Datos',
    dataUsage: 'Uso de Datos',
    dataRetention: 'Retención de Datos',
    userRights: 'Tus Derechos',
    children: 'Privacidad de Menores',
    changes: 'Cambios en la Política de Privacidad',
  },
  fr: {
    loading: 'CHARGEMENT',
    home: 'Accueil',
    presets: 'Présets',
    routines: 'Routines',
    groups: 'Groupes',
    settings: 'Paramètres',
    start: 'Démarrer',
    pause: 'Pause',
    resume: 'Reprendre',
    reset: 'Réinitialiser',
    delete: 'Supprimer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    edit: 'Modifier',
    add: 'Ajouter',
    privacy: 'Confidentialité',
    privacyPolicy: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour',
    contact: 'Contact',
    dataCollection: 'Collecte de Données',
    dataUsage: 'Utilisation des Données',
    dataRetention: 'Conservation des Données',
    userRights: 'Vos Droits',
    children: 'Confidentialité des Mineurs',
    changes: 'Modifications de la Politique de Confidentialité',
  },
  de: {
    loading: 'LÄDT',
    home: 'Start',
    presets: 'Presets',
    routines: 'Routinen',
    groups: 'Gruppen',
    settings: 'Einstellungen',
    start: 'Starten',
    pause: 'Pause',
    resume: 'Fortsetzen',
    reset: 'Zurücksetzen',
    delete: 'Löschen',
    cancel: 'Abbrechen',
    save: 'Speichern',
    edit: 'Bearbeiten',
    add: 'Hinzufügen',
    privacy: 'Datenschutz',
    privacyPolicy: 'Datenschutzrichtlinie',
    lastUpdated: 'Zuletzt aktualisiert',
    contact: 'Kontakt',
    dataCollection: 'Datenerfassung',
    dataUsage: 'Datennutzung',
    dataRetention: 'Datenspeicherung',
    userRights: 'Ihre Rechte',
    children: 'Datenschutz für Kinder',
    changes: 'Änderungen der Datenschutzrichtlinie',
  },
  pt: {
    loading: 'CARREGANDO',
    home: 'Início',
    presets: 'Presets',
    routines: 'Rotinas',
    groups: 'Grupos',
    settings: 'Configurações',
    start: 'Iniciar',
    pause: 'Pausar',
    resume: 'Retomar',
    reset: 'Reiniciar',
    delete: 'Excluir',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    add: 'Adicionar',
    privacy: 'Privacidade',
    privacyPolicy: 'Política de Privacidade',
    lastUpdated: 'Última atualização',
    contact: 'Contato',
    dataCollection: 'Coleta de Dados',
    dataUsage: 'Uso de Dados',
    dataRetention: 'Retenção de Dados',
    userRights: 'Seus Direitos',
    children: 'Privacidade de Menores',
    changes: 'Alterações na Política de Privacidade',
  },
};

// Detect browser language and fallback to English
export function detectLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();
  
  // Check for exact match first
  if (browserLang in translations) {
    return browserLang as Language;
  }
  
  // Check for language prefix (e.g., 'en-US' -> 'en')
  const langPrefix = browserLang.split('-')[0];
  if (langPrefix in translations) {
    return langPrefix as Language;
  }
  
  // Default to English
  return 'en';
}

// Get translations for detected language
export function getTranslations(lang?: Language): Translations {
  const language = lang || detectLanguage();
  return translations[language];
}

// Hook for using translations in components
export function useTranslations() {
  const lang = detectLanguage();
  return {
    t: translations[lang],
    lang,
  };
}
