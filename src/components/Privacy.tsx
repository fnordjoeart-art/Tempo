import { useTranslations } from './i18n';
import { ScrollArea } from './ui/scroll-area';
import { Mail, Globe, Building2, Shield, Eye, Database, Clock, UserCheck, Baby, FileText } from 'lucide-react';

export function Privacy() {
  const { t, lang } = useTranslations();

  const content = {
    it: {
      title: 'INFORMATIVA SULLA PRIVACY',
      subtitle: 'TEMPO+ Visual Timer',
      updated: 'Ottobre 2024',
      
      intro: 'Play Serious S.r.l. ("noi", "nostro" o "Play Serious") rispetta la tua privacy e si impegna a proteggere i tuoi dati personali. Questa informativa sulla privacy ti informa su come trattiamo i tuoi dati personali quando utilizzi la nostra app TEMPO+ e ti informa sui tuoi diritti in materia di privacy.',
      
      company: {
        name: 'Play Serious S.r.l.',
        address: 'Via Esempio 123, Milano, Italia',
        email: 'info@playserious.it',
        website: 'https://playserious.it',
      },
      
      dataCollection: {
        title: 'Raccolta dei Dati',
        content: 'TEMPO+ è progettata con la privacy come priorità. L\'app funziona completamente offline e non raccoglie, trasmette o condivide alcun dato personale. Tutti i tuoi timer, preset, routine e impostazioni sono memorizzati localmente sul tuo dispositivo.',
        items: [
          '✓ Nessun account richiesto',
          '✓ Nessun tracciamento',
          '✓ Nessuna raccolta di dati personali',
          '✓ Tutti i dati rimangono sul tuo dispositivo',
          '✓ Nessun server esterno coinvolto',
        ],
      },
      
      dataUsage: {
        title: 'Utilizzo dei Dati',
        content: 'Poiché non raccogliamo alcun dato, non utilizziamo, elaboriamo o condividiamo alcuna informazione personale. L\'app funziona interamente sul tuo dispositivo.',
      },
      
      dataRetention: {
        title: 'Conservazione dei Dati',
        content: 'Tutti i dati dell\'app (timer, preset, routine, impostazioni) sono memorizzati localmente sul tuo dispositivo. Puoi eliminare questi dati in qualsiasi momento disinstallando l\'app o cancellando i dati dell\'app dalle impostazioni del tuo dispositivo.',
      },
      
      userRights: {
        title: 'I Tuoi Diritti',
        content: 'Hai il pieno controllo sui tuoi dati:',
        items: [
          'Diritto di accesso: tutti i tuoi dati sono visibili nell\'app',
          'Diritto di cancellazione: puoi eliminare i dati disinstallando l\'app',
          'Diritto alla portabilità: i tuoi dati rimangono sul tuo dispositivo',
          'Diritto di opposizione: non raccogliamo dati, quindi nulla da opporsi',
        ],
      },
      
      thirdParty: {
        title: 'Servizi di Terze Parti',
        content: 'TEMPO+ non utilizza servizi di analisi, pubblicità o altri servizi di terze parti che raccolgono dati. L\'app non contiene tracker o SDK di terze parti.',
      },
      
      children: {
        title: 'Privacy dei Minori',
        content: 'TEMPO+ è sicura per utenti di tutte le età. Non raccogliamo alcuna informazione da nessuno, inclusi i minori di 13 anni. L\'app può essere utilizzata da bambini sotto la supervisione dei genitori senza preoccupazioni per la privacy.',
      },
      
      security: {
        title: 'Sicurezza',
        content: 'Anche se non raccogliamo dati, prendiamo sul serio la sicurezza. L\'app è progettata seguendo le best practice di Apple per la sicurezza e la privacy. Tutti i dati sono memorizzati nel sandbox dell\'app sul tuo dispositivo.',
      },
      
      changes: {
        title: 'Modifiche alla Privacy Policy',
        content: 'Potremmo aggiornare questa informativa sulla privacy periodicamente. Ti informeremo di eventuali modifiche pubblicando la nuova informativa sulla privacy in questa pagina e aggiornando la data di "Ultimo aggiornamento".',
      },
      
      contact: {
        title: 'Contattaci',
        content: 'Se hai domande su questa informativa sulla privacy, contattaci:',
      },
    },
    
    en: {
      title: 'PRIVACY POLICY',
      subtitle: 'TEMPO+ Visual Timer',
      updated: 'October 2024',
      
      intro: 'Play Serious S.r.l. ("we", "our" or "Play Serious") respects your privacy and is committed to protecting your personal data. This privacy policy informs you about how we handle your personal data when you use our TEMPO+ app and informs you about your privacy rights.',
      
      company: {
        name: 'Play Serious S.r.l.',
        address: 'Via Esempio 123, Milan, Italy',
        email: 'info@playserious.it',
        website: 'https://playserious.it',
      },
      
      dataCollection: {
        title: 'Data Collection',
        content: 'TEMPO+ is designed with privacy as a priority. The app works completely offline and does not collect, transmit, or share any personal data. All your timers, presets, routines, and settings are stored locally on your device.',
        items: [
          '✓ No account required',
          '✓ No tracking',
          '✓ No personal data collection',
          '✓ All data stays on your device',
          '✓ No external servers involved',
        ],
      },
      
      dataUsage: {
        title: 'Data Usage',
        content: 'Since we don\'t collect any data, we don\'t use, process, or share any personal information. The app works entirely on your device.',
      },
      
      dataRetention: {
        title: 'Data Retention',
        content: 'All app data (timers, presets, routines, settings) is stored locally on your device. You can delete this data at any time by uninstalling the app or clearing the app data from your device settings.',
      },
      
      userRights: {
        title: 'Your Rights',
        content: 'You have full control over your data:',
        items: [
          'Right of access: all your data is visible in the app',
          'Right to deletion: you can delete data by uninstalling the app',
          'Right to portability: your data remains on your device',
          'Right to object: we don\'t collect data, so nothing to object to',
        ],
      },
      
      thirdParty: {
        title: 'Third-Party Services',
        content: 'TEMPO+ does not use analytics, advertising, or other third-party services that collect data. The app contains no trackers or third-party SDKs.',
      },
      
      children: {
        title: 'Children\'s Privacy',
        content: 'TEMPO+ is safe for users of all ages. We do not collect any information from anyone, including children under 13. The app can be used by children under parental supervision without privacy concerns.',
      },
      
      security: {
        title: 'Security',
        content: 'Although we don\'t collect data, we take security seriously. The app is designed following Apple\'s best practices for security and privacy. All data is stored in the app sandbox on your device.',
      },
      
      changes: {
        title: 'Changes to Privacy Policy',
        content: 'We may update this privacy policy periodically. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.',
      },
      
      contact: {
        title: 'Contact Us',
        content: 'If you have questions about this privacy policy, contact us:',
      },
    },
    
    es: {
      title: 'POLÍTICA DE PRIVACIDAD',
      subtitle: 'TEMPO+ Visual Timer',
      updated: 'Octubre 2024',
      
      intro: 'Play Serious S.r.l. ("nosotros", "nuestro" o "Play Serious") respeta tu privacidad y se compromete a proteger tus datos personales. Esta política de privacidad te informa sobre cómo manejamos tus datos personales cuando usas nuestra app TEMPO+ y te informa sobre tus derechos de privacidad.',
      
      company: {
        name: 'Play Serious S.r.l.',
        address: 'Via Esempio 123, Milán, Italia',
        email: 'info@playserious.it',
        website: 'https://playserious.it',
      },
      
      dataCollection: {
        title: 'Recopilación de Datos',
        content: 'TEMPO+ está diseñada con la privacidad como prioridad. La app funciona completamente offline y no recopila, transmite ni comparte datos personales. Todos tus temporizadores, presets, rutinas y configuraciones se almacenan localmente en tu dispositivo.',
        items: [
          '✓ No se requiere cuenta',
          '✓ Sin seguimiento',
          '✓ Sin recopilación de datos personales',
          '✓ Todos los datos permanecen en tu dispositivo',
          '✓ Sin servidores externos involucrados',
        ],
      },
      
      dataUsage: {
        title: 'Uso de Datos',
        content: 'Como no recopilamos datos, no usamos, procesamos ni compartimos información personal. La app funciona completamente en tu dispositivo.',
      },
      
      dataRetention: {
        title: 'Retención de Datos',
        content: 'Todos los datos de la app (temporizadores, presets, rutinas, configuraciones) se almacenan localmente en tu dispositivo. Puedes eliminar estos datos en cualquier momento desinstalando la app o borrando los datos de la app desde la configuración de tu dispositivo.',
      },
      
      userRights: {
        title: 'Tus Derechos',
        content: 'Tienes control total sobre tus datos:',
        items: [
          'Derecho de acceso: todos tus datos son visibles en la app',
          'Derecho de eliminación: puedes eliminar datos desinstalando la app',
          'Derecho a la portabilidad: tus datos permanecen en tu dispositivo',
          'Derecho de oposición: no recopilamos datos, así que nada a lo que oponerse',
        ],
      },
      
      thirdParty: {
        title: 'Servicios de Terceros',
        content: 'TEMPO+ no utiliza servicios de análisis, publicidad u otros servicios de terceros que recopilen datos. La app no contiene rastreadores ni SDKs de terceros.',
      },
      
      children: {
        title: 'Privacidad de Menores',
        content: 'TEMPO+ es segura para usuarios de todas las edades. No recopilamos información de nadie, incluidos menores de 13 años. La app puede ser utilizada por niños bajo supervisión parental sin preocupaciones de privacidad.',
      },
      
      security: {
        title: 'Seguridad',
        content: 'Aunque no recopilamos datos, tomamos la seguridad en serio. La app está diseñada siguiendo las mejores prácticas de Apple para seguridad y privacidad. Todos los datos se almacenan en el sandbox de la app en tu dispositivo.',
      },
      
      changes: {
        title: 'Cambios en la Política de Privacidad',
        content: 'Podemos actualizar esta política de privacidad periódicamente. Te notificaremos cualquier cambio publicando la nueva política de privacidad en esta página y actualizando la fecha de "Última actualización".',
      },
      
      contact: {
        title: 'Contáctanos',
        content: 'Si tienes preguntas sobre esta política de privacidad, contáctanos:',
      },
    },
    
    fr: {
      title: 'POLITIQUE DE CONFIDENTIALITÉ',
      subtitle: 'TEMPO+ Visual Timer',
      updated: 'Octobre 2024',
      
      intro: 'Play Serious S.r.l. ("nous", "notre" ou "Play Serious") respecte votre vie privée et s\'engage à protéger vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont nous traitons vos données personnelles lorsque vous utilisez notre app TEMPO+ et vous informe de vos droits en matière de confidentialité.',
      
      company: {
        name: 'Play Serious S.r.l.',
        address: 'Via Esempio 123, Milan, Italie',
        email: 'info@playserious.it',
        website: 'https://playserious.it',
      },
      
      dataCollection: {
        title: 'Collecte de Données',
        content: 'TEMPO+ est conçue avec la confidentialité comme priorité. L\'app fonctionne complètement hors ligne et ne collecte, ne transmet ni ne partage aucune donnée personnelle. Tous vos minuteurs, préréglages, routines et paramètres sont stockés localement sur votre appareil.',
        items: [
          '✓ Aucun compte requis',
          '✓ Aucun suivi',
          '✓ Aucune collecte de données personnelles',
          '✓ Toutes les données restent sur votre appareil',
          '✓ Aucun serveur externe impliqué',
        ],
      },
      
      dataUsage: {
        title: 'Utilisation des Données',
        content: 'Puisque nous ne collectons aucune donnée, nous n\'utilisons, ne traitons ni ne partageons aucune information personnelle. L\'app fonctionne entièrement sur votre appareil.',
      },
      
      dataRetention: {
        title: 'Conservation des Données',
        content: 'Toutes les données de l\'app (minuteurs, préréglages, routines, paramètres) sont stockées localement sur votre appareil. Vous pouvez supprimer ces données à tout moment en désinstallant l\'app ou en effaçant les données de l\'app depuis les paramètres de votre appareil.',
      },
      
      userRights: {
        title: 'Vos Droits',
        content: 'Vous avez un contrôle total sur vos données:',
        items: [
          'Droit d\'accès: toutes vos données sont visibles dans l\'app',
          'Droit de suppression: vous pouvez supprimer les données en désinstallant l\'app',
          'Droit à la portabilité: vos données restent sur votre appareil',
          'Droit d\'opposition: nous ne collectons pas de données, donc rien à contester',
        ],
      },
      
      thirdParty: {
        title: 'Services Tiers',
        content: 'TEMPO+ n\'utilise pas de services d\'analyse, de publicité ou d\'autres services tiers qui collectent des données. L\'app ne contient aucun tracker ni SDK tiers.',
      },
      
      children: {
        title: 'Confidentialité des Mineurs',
        content: 'TEMPO+ est sûre pour les utilisateurs de tous âges. Nous ne collectons aucune information de personne, y compris les enfants de moins de 13 ans. L\'app peut être utilisée par des enfants sous supervision parentale sans préoccupations de confidentialité.',
      },
      
      security: {
        title: 'Sécurité',
        content: 'Bien que nous ne collections pas de données, nous prenons la sécurité au sérieux. L\'app est conçue en suivant les meilleures pratiques d\'Apple pour la sécurité et la confidentialité. Toutes les données sont stockées dans le bac à sable de l\'app sur votre appareil.',
      },
      
      changes: {
        title: 'Modifications de la Politique de Confidentialité',
        content: 'Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page et en mettant à jour la date de "Dernière mise à jour".',
      },
      
      contact: {
        title: 'Contactez-nous',
        content: 'Si vous avez des questions sur cette politique de confidentialité, contactez-nous:',
      },
    },
    
    de: {
      title: 'DATENSCHUTZRICHTLINIE',
      subtitle: 'TEMPO+ Visual Timer',
      updated: 'Oktober 2024',
      
      intro: 'Play Serious S.r.l. ("wir", "unser" oder "Play Serious") respektiert Ihre Privatsphäre und verpflichtet sich zum Schutz Ihrer persönlichen Daten. Diese Datenschutzrichtlinie informiert Sie darüber, wie wir Ihre persönlichen Daten handhaben, wenn Sie unsere TEMPO+ App verwenden, und informiert Sie über Ihre Datenschutzrechte.',
      
      company: {
        name: 'Play Serious S.r.l.',
        address: 'Via Esempio 123, Mailand, Italien',
        email: 'info@playserious.it',
        website: 'https://playserious.it',
      },
      
      dataCollection: {
        title: 'Datenerfassung',
        content: 'TEMPO+ wurde mit Datenschutz als Priorität entwickelt. Die App funktioniert vollständig offline und sammelt, überträgt oder teilt keine persönlichen Daten. Alle Ihre Timer, Voreinstellungen, Routinen und Einstellungen werden lokal auf Ihrem Gerät gespeichert.',
        items: [
          '✓ Kein Konto erforderlich',
          '✓ Keine Verfolgung',
          '✓ Keine Sammlung persönlicher Daten',
          '✓ Alle Daten bleiben auf Ihrem Gerät',
          '✓ Keine externen Server beteiligt',
        ],
      },
      
      dataUsage: {
        title: 'Datennutzung',
        content: 'Da wir keine Daten sammeln, verwenden, verarbeiten oder teilen wir keine persönlichen Informationen. Die App funktioniert vollständig auf Ihrem Gerät.',
      },
      
      dataRetention: {
        title: 'Datenspeicherung',
        content: 'Alle App-Daten (Timer, Voreinstellungen, Routinen, Einstellungen) werden lokal auf Ihrem Gerät gespeichert. Sie können diese Daten jederzeit löschen, indem Sie die App deinstallieren oder die App-Daten aus den Geräteeinstellungen löschen.',
      },
      
      userRights: {
        title: 'Ihre Rechte',
        content: 'Sie haben volle Kontrolle über Ihre Daten:',
        items: [
          'Zugriffsrecht: alle Ihre Daten sind in der App sichtbar',
          'Löschrecht: Sie können Daten durch Deinstallation der App löschen',
          'Recht auf Portabilität: Ihre Daten bleiben auf Ihrem Gerät',
          'Widerspruchsrecht: wir sammeln keine Daten, daher nichts zum Widersprechen',
        ],
      },
      
      thirdParty: {
        title: 'Drittanbieterdienste',
        content: 'TEMPO+ verwendet keine Analyse-, Werbe- oder andere Drittanbieterdienste, die Daten sammeln. Die App enthält keine Tracker oder Drittanbieter-SDKs.',
      },
      
      children: {
        title: 'Datenschutz für Kinder',
        content: 'TEMPO+ ist sicher für Benutzer jeden Alters. Wir sammeln keine Informationen von niemandem, einschließlich Kindern unter 13 Jahren. Die App kann von Kindern unter elterlicher Aufsicht ohne Datenschutzbedenken verwendet werden.',
      },
      
      security: {
        title: 'Sicherheit',
        content: 'Obwohl wir keine Daten sammeln, nehmen wir Sicherheit ernst. Die App ist nach den Best Practices von Apple für Sicherheit und Datenschutz konzipiert. Alle Daten werden in der App-Sandbox auf Ihrem Gerät gespeichert.',
      },
      
      changes: {
        title: 'Änderungen der Datenschutzrichtlinie',
        content: 'Wir können diese Datenschutzrichtlinie regelmäßig aktualisieren. Wir werden Sie über Änderungen informieren, indem wir die neue Datenschutzrichtlinie auf dieser Seite veröffentlichen und das Datum "Zuletzt aktualisiert" aktualisieren.',
      },
      
      contact: {
        title: 'Kontaktieren Sie uns',
        content: 'Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns:',
      },
    },
    
    pt: {
      title: 'POLÍTICA DE PRIVACIDADE',
      subtitle: 'TEMPO+ Visual Timer',
      updated: 'Outubro 2024',
      
      intro: 'Play Serious S.r.l. ("nós", "nosso" ou "Play Serious") respeita sua privacidade e está comprometida em proteger seus dados pessoais. Esta política de privacidade informa como lidamos com seus dados pessoais quando você usa nosso app TEMPO+ e informa sobre seus direitos de privacidade.',
      
      company: {
        name: 'Play Serious S.r.l.',
        address: 'Via Esempio 123, Milão, Itália',
        email: 'info@playserious.it',
        website: 'https://playserious.it',
      },
      
      dataCollection: {
        title: 'Coleta de Dados',
        content: 'TEMPO+ foi projetado com privacidade como prioridade. O app funciona completamente offline e não coleta, transmite ou compartilha dados pessoais. Todos os seus timers, presets, rotinas e configurações são armazenados localmente no seu dispositivo.',
        items: [
          '✓ Nenhuma conta necessária',
          '✓ Sem rastreamento',
          '✓ Sem coleta de dados pessoais',
          '✓ Todos os dados permanecem no seu dispositivo',
          '✓ Nenhum servidor externo envolvido',
        ],
      },
      
      dataUsage: {
        title: 'Uso de Dados',
        content: 'Como não coletamos dados, não usamos, processamos ou compartilhamos informações pessoais. O app funciona completamente no seu dispositivo.',
      },
      
      dataRetention: {
        title: 'Retenção de Dados',
        content: 'Todos os dados do app (timers, presets, rotinas, configurações) são armazenados localmente no seu dispositivo. Você pode excluir esses dados a qualquer momento desinstalando o app ou limpando os dados do app nas configurações do seu dispositivo.',
      },
      
      userRights: {
        title: 'Seus Direitos',
        content: 'Você tem controle total sobre seus dados:',
        items: [
          'Direito de acesso: todos os seus dados são visíveis no app',
          'Direito de exclusão: você pode excluir dados desinstalando o app',
          'Direito à portabilidade: seus dados permanecem no seu dispositivo',
          'Direito de oposição: não coletamos dados, portanto nada para se opor',
        ],
      },
      
      thirdParty: {
        title: 'Serviços de Terceiros',
        content: 'TEMPO+ não usa serviços de análise, publicidade ou outros serviços de terceiros que coletam dados. O app não contém rastreadores ou SDKs de terceiros.',
      },
      
      children: {
        title: 'Privacidade de Menores',
        content: 'TEMPO+ é seguro para usuários de todas as idades. Não coletamos informações de ninguém, incluindo crianças menores de 13 anos. O app pode ser usado por crianças sob supervisão dos pais sem preocupações de privacidade.',
      },
      
      security: {
        title: 'Segurança',
        content: 'Embora não coletemos dados, levamos a segurança a sério. O app é projetado seguindo as melhores práticas da Apple para segurança e privacidade. Todos os dados são armazenados no sandbox do app no seu dispositivo.',
      },
      
      changes: {
        title: 'Alterações na Política de Privacidade',
        content: 'Podemos atualizar esta política de privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política de privacidade nesta página e atualizando a data de "Última atualização".',
      },
      
      contact: {
        title: 'Entre em Contato',
        content: 'Se você tiver dúvidas sobre esta política de privacidade, entre em contato:',
      },
    },
  };

  const currentContent = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <ScrollArea className="h-screen">
        <div className="max-w-4xl mx-auto pb-32">
          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <Shield className="w-12 h-12 text-orange-500" />
            </div>
            <h1 className="text-orange-500 mb-2 tracking-wider">
              {currentContent.title}
            </h1>
            <p className="text-gray-400 mb-2">{currentContent.subtitle}</p>
            <p className="text-gray-500 text-sm">
              {t.lastUpdated}: {currentContent.updated}
            </p>
          </div>

          {/* Intro */}
          <div className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-orange-500/20">
            <p className="text-gray-300 leading-relaxed">{currentContent.intro}</p>
          </div>

          {/* Company Info */}
          <section className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-orange-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-orange-500" />
              <h2 className="text-orange-500">{t.contact}</h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-500" />
                <div>
                  <p>{currentContent.company.name}</p>
                  <p className="text-sm text-gray-400">{currentContent.company.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <a href={`mailto:${currentContent.company.email}`} className="text-orange-500 hover:text-orange-400">
                  {currentContent.company.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <a href={currentContent.company.website} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">
                  {currentContent.company.website}
                </a>
              </div>
            </div>
          </section>

          {/* Data Collection */}
          <section className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-green-500" />
              <h2 className="text-green-500">{currentContent.dataCollection.title}</h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">{currentContent.dataCollection.content}</p>
            <ul className="space-y-2">
              {currentContent.dataCollection.items.map((item, index) => (
                <li key={index} className="text-green-400 flex items-start gap-2">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Data Usage */}
          <section className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-500" />
              <h2 className="text-blue-500">{currentContent.dataUsage.title}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{currentContent.dataUsage.content}</p>
          </section>

          {/* Data Retention */}
          <section className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-purple-500" />
              <h2 className="text-purple-500">{currentContent.dataRetention.title}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{currentContent.dataRetention.content}</p>
          </section>

          {/* User Rights */}
          <section className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-orange-500/20">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-orange-500" />
              <h2 className="text-orange-500">{currentContent.userRights.title}</h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">{currentContent.userRights.content}</p>
            <ul className="space-y-2 text-gray-300">
              {currentContent.userRights.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Third Party */}
          <section className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-red-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-red-500" />
              <h2 className="text-red-500">{currentContent.thirdParty.title}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{currentContent.thirdParty.content}</p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-pink-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Baby className="w-6 h-6 text-pink-500" />
              <h2 className="text-pink-500">{currentContent.children.title}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{currentContent.children.content}</p>
          </section>

          {/* Security */}
          <section className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-cyan-500" />
              <h2 className="text-cyan-500">{currentContent.security.title}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{currentContent.security.content}</p>
          </section>

          {/* Changes */}
          <section className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-yellow-500/20">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-yellow-500" />
              <h2 className="text-yellow-500">{currentContent.changes.title}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{currentContent.changes.content}</p>
          </section>

          {/* Contact Section */}
          <section className="p-6 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl border border-orange-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-orange-500" />
              <h2 className="text-orange-500">{currentContent.contact.title}</h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">{currentContent.contact.content}</p>
            <div className="flex flex-col gap-2">
              <a 
                href={`mailto:${currentContent.company.email}`} 
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {currentContent.company.email}
              </a>
              <a 
                href={currentContent.company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
              >
                <Globe className="w-4 h-4" />
                {currentContent.company.website}
              </a>
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}
