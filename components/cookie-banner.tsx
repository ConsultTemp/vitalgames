import Link from "next/link"
import { X, ChevronDown, Cookie, Shield, Info } from "lucide-react"
import Script from "next/script"

const translations = {
  it: {
    title: "Informativa sui Cookie",
    description:
      "Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Alcuni sono essenziali per il funzionamento del sito, mentre altri ci aiutano a migliorare l'esperienza utente.",
    essentialTitle: "Cookie essenziali",
    essentialDesc: "Necessari per il funzionamento del sito web. Non possono essere disattivati.",
    analyticsTitle: "Cookie analitici",
    analyticsDesc: "Ci aiutano a capire come utilizzi il sito, per migliorare i nostri servizi.",
    marketingTitle: "Cookie di marketing",
    marketingDesc: "Utilizzati per mostrarti pubblicità pertinente in base ai tuoi interessi.",
    acceptAll: "Accetta tutti",
    acceptEssential: "Solo essenziali",
    customize: "Personalizza",
    save: "Salva preferenze",
    moreInfo: "Maggiori informazioni",
    active: "Attivo",
  },
  es: {
    title: "Política de Cookies",
    description:
      "Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Algunas son esenciales para el funcionamiento del sitio, mientras que otras nos ayudan a mejorar la experiencia del usuario.",
    essentialTitle: "Cookies esenciales",
    essentialDesc: "Necesarias para el funcionamiento del sitio web. No pueden ser desactivadas.",
    analyticsTitle: "Cookies analíticas",
    analyticsDesc: "Nos ayudan a entender cómo utilizas el sitio, para mejorar nuestros servicios.",
    marketingTitle: "Cookies de marketing",
    marketingDesc: "Utilizadas para mostrarte publicidad relevante según tus intereses.",
    acceptAll: "Aceptar todas",
    acceptEssential: "Solo esenciales",
    customize: "Personalizar",
    save: "Guardar preferencias",
    moreInfo: "Más información",
    active: "Activo",
  },
  en: {
    title: "Cookie Policy",
    description:
      "We use cookies to enhance your experience on our site. Some are essential for the site to function, while others help us improve the user experience.",
    essentialTitle: "Essential cookies",
    essentialDesc: "Necessary for the website to function. They cannot be disabled.",
    analyticsTitle: "Analytics cookies",
    analyticsDesc: "Help us understand how you use the site, to improve our services.",
    marketingTitle: "Marketing cookies",
    marketingDesc: "Used to show you relevant advertising based on your interests.",
    acceptAll: "Accept all",
    acceptEssential: "Essential only",
    customize: "Customize",
    save: "Save preferences",
    moreInfo: "More information",
    active: "Active",
  },
}

interface CookieBannerProps {
  lang: string
}

export default function CookieBanner({ lang }: CookieBannerProps) {
  const validLang = ["it", "es", "en"].includes(lang) ? lang : "it"
  const t = translations[validLang as keyof typeof translations]

  return (
    <>
      {/* Banner compresso e più piccolo */}
      <div
        id="cookie-banner"
        className="fixed inset-x-0 bottom-0 z-[9999] bg-black text-white shadow-2xl border-t-4 border-vitalYellow py-4"
      >
        <div className="container mx-auto p-2 md:p-3 max-w-7xl">
          <div className="relative">

            {/* Intestazione */}
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-vitalYellow p-1.5 rounded-full flex-shrink-0">
                <Cookie size={20} className="text-black" />
              </div>
              <h2 className="text-lg font-bold">{t.title}</h2>
            </div>

            {/* Descrizione */}
            <p className="mb-3 text-gray-300 max-w-4xl leading-tight text-sm">{t.description}</p>

            {/* Pannello di personalizzazione */}
            <div id="customize-panel" className="mb-4 bg-slate-800 rounded-lg p-3 border border-slate-700 hidden">
              <div className="space-y-3">
                {/* Cookie essenziali */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 bg-green-500/20 p-1 rounded-full">
                      <Shield size={14} className="text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{t.essentialTitle}</h3>
                      <p className="text-xs text-gray-400">{t.essentialDesc}</p>
                    </div>
                  </div>
                  <div className="bg-green-500/20 px-2 py-0.5 rounded-full text-xs text-green-500 font-medium">
                    {t.active}
                  </div>
                </div>

                {/* Cookie analitici */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 bg-vitalYellow/20 p-1 rounded-full">
                      <Info size={14} className="text-vitalYellow" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{t.analyticsTitle}</h3>
                      <p className="text-xs text-gray-400">{t.analyticsDesc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="analytics-toggle" className="sr-only peer" />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-vitalYellow rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-vitalYellow"></div>
                  </label>
                </div>

                {/* Cookie di marketing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 bg-purple-500/20 p-1 rounded-full">
                      <Cookie size={14} className="text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{t.marketingTitle}</h3>
                      <p className="text-xs text-gray-400">{t.marketingDesc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="marketing-toggle" className="sr-only peer" />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Pulsanti con padding e testo più piccoli */}
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <button
                id="accept-all"
                type="button"
                className="px-3 py-2 bg-vitalYellow hover:opacity-80 rounded-lg font-medium transition-colors text-black text-sm"
              >
                {t.acceptAll}
              </button>

              <button
                id="accept-essential"
                type="button"
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors text-white text-sm"
              >
                {t.acceptEssential}
              </button>

              <button
                id="customize-btn"
                type="button"
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors flex items-center gap-1 text-white text-sm justify-center"
              >
                <span>{t.customize}</span>
                <ChevronDown size={14} id="customize-icon" />
              </button>

              <button
                id="save-preferences"
                type="button"
                className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors hidden text-white text-sm"
              >
                {t.save}
              </button>

              <Link
                href={`/${validLang}/privacy`}
                className="px-3 py-2 text-gray-300 hover:text-white rounded-lg font-medium transition-colors sm:ml-auto text-center text-sm"
              >
                {t.moreInfo}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Script
        id="cookie-banner-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.CookieBanner = {
              showCustomize: false,
              preferences: {
                essential: true,
                analytics: false,
                marketing: false
              },

              init: function() {
                console.log('Cookie banner inizializzato');
                
                // Controlla se ci sono preferenze salvate
                const hasPrefs = this.loadPreferences();
                if (hasPrefs) {
                  this.hideBanner();
                  return;
                }

                // Aggiungi event listeners
                this.addEventListeners();
              },

              addEventListeners: function() {
                const closeBanner = document.getElementById('close-banner');
                const acceptAll = document.getElementById('accept-all');
                const acceptEssential = document.getElementById('accept-essential');
                const customizeBtn = document.getElementById('customize-btn');
                const savePreferences = document.getElementById('save-preferences');
                const analyticsToggle = document.getElementById('analytics-toggle');
                const marketingToggle = document.getElementById('marketing-toggle');

                if (closeBanner) {
                  closeBanner.onclick = () => this.hideBanner();
                }

                if (acceptAll) {
                  acceptAll.onclick = () => this.acceptAll();
                }

                if (acceptEssential) {
                  acceptEssential.onclick = () => this.acceptEssential();
                }

                if (customizeBtn) {
                  customizeBtn.onclick = () => this.toggleCustomize();
                }

                if (savePreferences) {
                  savePreferences.onclick = () => this.saveCustomPreferences();
                }

                if (analyticsToggle) {
                  analyticsToggle.onchange = (e) => {
                    this.preferences.analytics = e.target.checked;
                  };
                }

                if (marketingToggle) {
                  marketingToggle.onchange = (e) => {
                    this.preferences.marketing = e.target.checked;
                  };
                }

                console.log('Event listeners aggiunti');
              },

              hideBanner: function() {
                const banner = document.getElementById('cookie-banner');
                if (banner) {
                  banner.style.display = 'none';
                  console.log('Banner nascosto');
                }
              },

              showBanner: function() {
                const banner = document.getElementById('cookie-banner');
                if (banner) {
                  banner.style.display = 'block';
                  console.log('Banner mostrato');
                }
              },

              savePrefs: function(prefs) {
                try {
                  localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
                  console.log('Preferenze salvate:', prefs);
                  this.hideBanner();
                } catch (e) {
                  console.error('Errore nel salvare le preferenze:', e);
                }
              },

              loadPreferences: function() {
                try {
                  const saved = localStorage.getItem('cookie-preferences');
                  if (saved) {
                    const prefs = JSON.parse(saved);
                    this.preferences = prefs;
                    
                    const analyticsToggle = document.getElementById('analytics-toggle');
                    const marketingToggle = document.getElementById('marketing-toggle');
                    
                    if (analyticsToggle) analyticsToggle.checked = prefs.analytics;
                    if (marketingToggle) marketingToggle.checked = prefs.marketing;
                    
                    console.log('Preferenze caricate:', prefs);
                    return true;
                  }
                } catch (e) {
                  console.error('Errore nel caricare le preferenze:', e);
                }
                return false;
              },

              acceptAll: function() {
                this.savePrefs({
                  essential: true,
                  analytics: true,
                  marketing: true
                });
              },

              acceptEssential: function() {
                this.savePrefs({
                  essential: true,
                  analytics: false,
                  marketing: false
                });
              },

              saveCustomPreferences: function() {
                this.savePrefs(this.preferences);
              },

              toggleCustomize: function() {
                this.showCustomize = !this.showCustomize;
                const customizePanel = document.getElementById('customize-panel');
                const customizeBtn = document.getElementById('customize-btn');
                const savePreferences = document.getElementById('save-preferences');
                const customizeIcon = document.getElementById('customize-icon');
                
                if (customizePanel) {
                  customizePanel.style.display = this.showCustomize ? 'block' : 'none';
                }
                if (customizeBtn) {
                  customizeBtn.style.display = this.showCustomize ? 'none' : 'flex';
                }
                if (savePreferences) {
                  savePreferences.style.display = this.showCustomize ? 'block' : 'none';
                }
                if (customizeIcon) {
                  customizeIcon.style.transform = this.showCustomize ? 'rotate(180deg)' : 'rotate(0deg)';
                }
              }
            };

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', function() {
                window.CookieBanner.init();
              });
            } else {
              window.CookieBanner.init();
            }
          `,
        }}
      />
    </>
  )
}
