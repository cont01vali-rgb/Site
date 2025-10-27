/**
 * Script pentru traduceri dinamice în lecția Das Schulsystem
 * Gestionează toate elementele cu traduceri personalizate
 */

(function() {
  'use strict';

  // Dicționar cu toate traducerile
  const translations = {
    intro: {
      ro: "Prezentare succintă a sistemului școlar din Austria. Evidențiată vârsta tipică a copiilor/pupilor pentru fiecare nivel.",
      en: "Concise overview of the school system in Austria. Highlighting the typical age of children/pupils for each level.",
      ua: "Стислий огляд шкільної системи Австрії. Виділено типовий вік дітей/учнів для кожного рівня."
    },
    abbreviations_title: {
      ro: "Explicarea prescurtărilor:",
      en: "Explanation of abbreviations:",
      ua: "Пояснення абревіатур:"
    },
    ahs_description: {
      ro: "(Școală superioară de cultură generală / Liceu teoretic)",
      en: "(Upper secondary general education school / Academic high school)",
      ua: "(Старша школа загальної середньої освіти / академічний ліцей)"
    },
    bhs_description: {
      ro: "(Școală superioară profesională / Liceu profesional superior)",
      en: "(Upper secondary vocational school / Higher vocational high school)",
      ua: "(Старша професійна школа / вищий професійний ліцей)"
    },
    bms_description: {
      ro: "(Școală medie profesională)",
      en: "(Intermediate vocational school)",
      ua: "(Середня професійна школа)"
    },
    volksschule_description: {
      ro: "Școala primară: elevii învață bazele — citit, scris, socotit.",
      en: "Primary school: students learn the basics — reading, writing, arithmetic.",
      ua: "Початкова школа: учні вивчають основи — читання, письмо, арифметику."
    },
    hauptschule_description: {
      ro: "Școala generală: elevii își extind cunoștințele generale.",
      en: "General school: students expand their general knowledge.",
      ua: "Загальна школа: учні розширюють свої загальні знання."
    },
    polytechnische_description: {
      ro: "Școala politehnică: clasa a 9-a oferă orientare profesională elevilor.",
      en: "Polytechnic school: 9th grade provides vocational guidance to students.",
      ua: "Політехнічна школа: 9-й клас надає професійну орієнтацію учням."
    },
    lehre_description: {
      ro: "Ucenicia: după învățământul obligatoriu, elevul poate învăța o meserie; ucenicul primește instruire și merge la școala profesională.",
      en: "Apprenticeship: after compulsory education, students can learn a trade; apprentices receive training and attend vocational school.",
      ua: "Учнівство: після обов'язкової освіти учень може вивчити професію; учень отримує навчання та відвідує професійну школу."
    },
    bms_full_description: {
      ro: "Școală medie profesională: oferă formare profesională fără diplomă de Matură.",
      en: "Vocational middle school: provides vocational training without Matura diploma.",
      ua: "Професійна середня школа: надає професійну підготовку без диплому Матури."
    },
    ahs_full_description: {
      ro: "Liceu teoretic: are două cicluri (inferior și superior) și se încheie cu examenul de Matură.",
      en: "Academic secondary school: has two cycles (lower and upper) and ends with the Matura exam.",
      ua: "Академічна середня школа: має два цикли (нижній та верхній) і закінчується іспитом Матура."
    },
    bhs_full_description: {
      ro: "Liceu profesional superior: oferă formare profesională și se finalizează cu Matura.",
      en: "Vocational higher school: provides professional training and ends with Matura.",
      ua: "Професійна вища школа: надає професійну підготовку і закінчується Матурою."
    }
  };

  // Funcție pentru obținerea limbii actuale
  function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';
  }

  // Funcție principală pentru actualizarea traducerilor
  function updateSchulSystemTranslations() {
    const currentLang = getCurrentLanguage();
    console.log('Updating SchulSystem translations to:', currentLang);
    
    // Actualizează toate elementele cu data-key
    document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.getAttribute('data-key');
      if (translations[key] && translations[key][currentLang]) {
        element.textContent = translations[key][currentLang];
        console.log(`Updated ${key} to ${currentLang}`);
      }
    });

    console.log('SchulSystem translations update completed');
  }

  // Funcție pentru inițializare
  function initializeSchulSystem() {
    console.log('Initializing SchulSystem translations...');
    
    // Actualizează traducerile la încărcare
    updateSchulSystemTranslations();
    
    // Listener pentru evenimentul de schimbare a limbii
    document.addEventListener('languageChanged', () => {
      console.log('Language changed event received');
      updateSchulSystemTranslations();
    });
    
    // Listener pentru storage changes (pentru sincronizare între taburi)
    window.addEventListener('storage', (e) => {
      if (e.key === 'selectedLanguage') {
        console.log('Language changed via storage event');
        updateSchulSystemTranslations();
      }
    });
    
    // Listener pentru selectorul de limbă din navbar (fallback direct)
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
      languageSelector.addEventListener('change', () => {
        console.log('Language selector changed directly');
        // Mic delay pentru a permite salvarea în localStorage
        setTimeout(updateSchulSystemTranslations, 100);
      });
    }
    
    console.log('SchulSystem initialization completed');
  }

  // Pornește scriptul când DOM-ul este gata
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSchulSystem);
  } else {
    initializeSchulSystem();
  }

  // Expune funcția pentru debugging
  window.updateSchulSystemTranslations = updateSchulSystemTranslations;

})();