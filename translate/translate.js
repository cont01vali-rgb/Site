/**
 * Sistema de traducere pentru site-ul de învățare germană
 * Suportă romana (ro) și engleza (en) cu extensibilitate pentru alte limbi
 * Funcționează offline fără fetch()
 */

class TranslationSystem {
    constructor() {
        this.currentLang = 'en'; // Default engleza pentru utilizatori noi
        this.translations = this.getBuiltInTranslations();
        this.availableLanguages = {
            'ro': { name: 'Română', flag: '🇷🇴' },
            'en': { name: 'English', flag: '🇺🇸' },
            'ua': { name: 'Українська', flag: '🇺🇦' }
        };
        
        this.init();
    }

    // Traduceri încorporate direct în JavaScript pentru funcționare offline
    getBuiltInTranslations() {
        return {
            'ro': {
                "nav": {
                    "home": "Acasă",
                    "learn": "Mediu de învățare", 
                    "test": "Test general",
                    "progress": "Progres"
                },
                "home": {
                    "page_title": "Hai să învățăm germana! 🇩🇪",
                    "title": "Hai să învățăm germana! 🇩🇪",
                    "subtitle": "Alege una dintre opțiunile de mai jos pentru a începe.",
                    "quick_actions": "⚡ Acțiuni rapide",
                    "choose_option": "🎯 Alege o opțiune",
                    "continue_lesson": "Continuă Lecția",
                    "continue_subtitle": "Das deutsche Alphabet",
                    "daily_challenge": "Provocarea Zilei",
                    "daily_subtitle": "5 întrebări rapide",
                    "learn_lessons": "Învață lecțiile",
                    "learn_title": "Învață lecțiile",
                    "learn_desc": "Explorează lecțiile interactive",
                    "general_test": "Testare generală",
                    "test_title": "Testare generală", 
                    "test_desc": "Verifică-ți cunoștințele",
                    "vocabulary_test": "Vokabeltest",
                    "vocab_title": "Vokabeltest",
                    "vocab_desc": "Testează vocabularul",
                    "view_progress": "Vezi progresul tău",
                    "progress_title": "Vezi progresul",
                    "progress_desc": "Analizează performanța"
                },
                "lessons": {
                    "available": "Lecții disponibile"
                },
                "lernziel": {
                    "title": "Fragenkatalog A1 — Das Lernziel",
                    "chapter1": "Capitolul 1",
                    "chapter2": "Capitolul 2",
                    "test_button": "📝 Testează-te →"
                },
                "test": {
                    "title": "Test: Fragenkatalog A1 — Das Lernziel",
                    "progress": "Întrebare",
                    "score": "Scor",
                    "verify": "Verifică",
                    "next_question": "Următoarea întrebare",
                    "back_to_lesson": "Înapoi la lecție"
                },
                "schulsystem": {
                    "test_button": "📝 Testează-te →"
                },
                "schulsystem_test": {
                    "title": "Test: Das Schulsystem",
                    "back_to_lesson": "← Înapoi la lecție"
                },
                "chapter": {
                    "1": "Capitolul 1: Subiecte speciale",
                    "2": "Capitolul 2: Bazele limbii germane",
                    "3": "Capitolul 3: Întrebări și timp",
                    "4": "Capitolul 4: Articole și pronume",
                    "5": "Capitolul 5: Cazuri gramaticale"
                },
                "lesson1": {
                    "intro": "În această lecție vei învăța alfabetul limbii germane și pronunția sunetelor speciale: <strong>Umlaute</strong> și <strong>Doppellaute</strong>.",
                    "listen_alphabet": "🔊 Ascultă alfabetul",
                    "umlaute_title": "Umlaute",
                    "scharfes_desc": "Se citește ca \"s\". În germană se numește <strong>\"scharfes s\"</strong> și există doar ca literă mică.",
                    "doppellaute_title": "Doppellaute (Diftongi)",
                    "other_combinations": "Alte combinații importante",
                    "pronounced_quickly": "pronunțat rapid:",
                    "very_important_title": "⚠️ Foarte important!",
                    "capitalization_rule": "<strong>Groß- und Kleinschreibung</strong> — Scrierea cu majusculă:",
                    "capitalization_desc": "<em>Toate acestea se scriu cu majusculă în limba germană!</em>",
                    "test_button": "Începe testul 📖",
                    "nouns_example": "(substantive)",
                    "proper_names_example": "(nume proprii)",
                    "sentence_beginnings_example": "(începuturile de propoziții)",
                    "places_example": "(țări, orașe, continente, sate)",
                    "politeness_forms_example": "(forme de politețe)"
                },
                "test1": {
                    "title": "Test: Das deutsche Alphabet",
                    "progress": "Întrebare",
                    "score": "Scor",
                    "verify": "Verifică",
                    "next_question": "Următoarea întrebare",
                    "back_to_lesson": "← Înapoi la lecție"
                },
                "akkusativ": {
                    "page_title": "Der Akkusativ - Acuzativul în germană",
                    "title": "Der Akkusativ (Cazul Acuzativ)",
                    "subtitle": "Învață complementul direct în limba germană",
                    "intro_title": "🎯 Germana are 4 cazuri:",
                    "nominativ": "Nominativ:",
                    "nominativ_desc": "Cazul subiectului. Răspunde la întrebarea Cine? Ce?",
                    "akkusativ": "Acuzativ:",
                    "akkusativ_desc": "Cazul complementului direct. Răspunde la întrebarea Pe cine? Ce?",
                    "dativ": "Dativ:",
                    "dativ_desc": "Cazul complementului indirect. Răspunde la întrebarea Cui?",
                    "genitiv": "Genitiv:",
                    "genitiv_desc": "Cazul posesiei. Răspunde la întrebarea Al/a/ai/ale cui?",
                    "main_idea_title": "💡 1. Ideea principală: Complementul Direct",
                    "main_concept": "Cazul Acuzativ este folosit cel mai adesea pentru a marca complementul direct al unei propoziții.",
                    "definition_label": "Definiție simplă:",
                    "definition_text": "Complementul direct este persoana sau lucrul care \"suferă\" direct acțiunea verbului. Este cel care primește acțiunea.",
                    "magic_question_title": "🔍 Întrebarea magică pentru a găsi Acuzativul este:",
                    "magic_question": "(Pe cine sau ce?)",
                    "magic_rule": "Dacă un substantiv răspunde la această întrebare pusă după verb, atunci el este în Acuzativ.",
                    "example_title": "📝 Exemplu:",
                    "example_sentence": "Eu cumpăr o mașină.",
                    "subject_analysis": "Subiect (Cine cumpără?):",
                    "subject_answer": "Eu (Nominativ)",
                    "verb_analysis": "Verb:",
                    "verb_answer": "cumpăr",
                    "object_analysis": "Întrebare: Ce cumpăr eu?",
                    "object_answer": "-> o mașină.",
                    "conclusion": "Deci, \"o mașină\" este complementul direct și în germană va fi în Acuzativ.",
                    "test_button": "📝 Test Akkusativ",
                    "next_lesson": "➡️ Următoarea lecție: Dativ"
                }
            },
            'en': {
                "nav": {
                    "home": "Home",
                    "learn": "Learning Environment", 
                    "test": "General Test",
                    "progress": "Progress"
                },
                "home": {
                    "page_title": "Let's learn German! 🇩🇪",
                    "title": "Let's learn German! 🇩🇪",
                    "subtitle": "Choose one of the options below to start.",
                    "quick_actions": "⚡ Quick actions",
                    "choose_option": "🎯 Choose an option",
                    "continue_lesson": "Continue Lesson",
                    "continue_subtitle": "Das deutsche Alphabet",
                    "daily_challenge": "Daily Challenge",
                    "daily_subtitle": "5 quick questions",
                    "learn_lessons": "Learn lessons",
                    "learn_title": "Learn lessons",
                    "learn_desc": "Explore interactive lessons",
                    "general_test": "General testing",
                    "test_title": "General testing", 
                    "test_desc": "Check your knowledge",
                    "vocabulary_test": "Vokabeltest",
                    "vocab_title": "Vocabulary test",
                    "vocab_desc": "Test your vocabulary",
                    "view_progress": "View your progress",
                    "progress_title": "View progress",
                    "progress_desc": "Analyze performance"
                },
                "lessons": {
                    "available": "Available Lessons"
                },
                "lernziel": {
                    "title": "Fragenkatalog A1 — Das Lernziel",
                    "chapter1": "Chapter 1",
                    "chapter2": "Chapter 2",
                    "test_button": "📝 Test Yourself →"
                },
                "test": {
                    "title": "Test: Fragenkatalog A1 — Das Lernziel",
                    "progress": "Question",
                    "score": "Score",
                    "verify": "Check",
                    "next_question": "Next Question",
                    "back_to_lesson": "Back to Lesson"
                },
                "schulsystem": {
                    "test_button": "📝 Test Yourself →"
                },
                "schulsystem_test": {
                    "title": "Test: Das Schulsystem",
                    "back_to_lesson": "← Back to Lesson"
                },
                "chapter": {
                    "1": "Chapter 1: Special Topics",
                    "2": "Chapter 2: German Language Basics",
                    "3": "Chapter 3: Questions and Time",
                    "4": "Chapter 4: Articles and Pronouns",
                    "5": "Chapter 5: Grammatical Cases"
                },
                "lesson1": {
                    "intro": "In this lesson you will learn the German alphabet and the pronunciation of special sounds: <strong>Umlaute</strong> and <strong>Doppellaute</strong>.",
                    "listen_alphabet": "🔊 Listen to the alphabet",
                    "umlaute_title": "Umlaute",
                    "scharfes_desc": "It is pronounced as \"s\". In German it is called <strong>\"scharfes s\"</strong> and exists only as a lowercase letter.",
                    "doppellaute_title": "Doppellaute (Diphthongs)",
                    "other_combinations": "Other important combinations",
                    "pronounced_quickly": "pronounced quickly:",
                    "very_important_title": "⚠️ Very important!",
                    "capitalization_rule": "<strong>Groß- und Kleinschreibung</strong> — Capitalization:",
                    "capitalization_desc": "<em>All of these are written with capital letters in German!</em>",
                    "test_button": "Start the test 📖",
                    "nouns_example": "(nouns)",
                    "proper_names_example": "(proper names)",
                    "sentence_beginnings_example": "(sentence beginnings)",
                    "places_example": "(countries, cities, continents, villages)",
                    "politeness_forms_example": "(forms of politeness)"
                },
                "test1": {
                    "title": "Test: Das deutsche Alphabet",
                    "progress": "Question",
                    "score": "Score",
                    "verify": "Check",
                    "next_question": "Next Question",
                    "back_to_lesson": "← Back to Lesson"
                },
                "akkusativ": {
                    "page_title": "Der Akkusativ - The Accusative in German",
                    "title": "Der Akkusativ (The Accusative Case)",
                    "subtitle": "Learn the direct object in German",
                    "intro_title": "🎯 German has 4 cases:",
                    "nominativ": "Nominative:",
                    "nominativ_desc": "The subject case. Answers the question Who? What?",
                    "akkusativ": "Accusative:",
                    "akkusativ_desc": "The direct object case. Answers the question Whom? What?",
                    "dativ": "Dative:",
                    "dativ_desc": "The indirect object case. Answers the question To whom?",
                    "genitiv": "Genitive:",
                    "genitiv_desc": "The possessive case. Answers the question Whose?",
                    "main_idea_title": "💡 1. Main Idea: The Direct Object",
                    "main_concept": "The Accusative case is most often used to mark the direct object of a sentence.",
                    "definition_label": "Simple definition:",
                    "definition_text": "The direct object is the person or thing that directly 'suffers' the action of the verb. It is the one that receives the action.",
                    "magic_question_title": "🔍 The magic question to find the Accusative is:",
                    "magic_question": "(Whom or what?)",
                    "magic_rule": "If a noun answers this question asked after the verb, then it is in Accusative.",
                    "example_title": "📝 Example:",
                    "example_sentence": "I buy a car.",
                    "subject_analysis": "Subject (Who buys?):",
                    "subject_answer": "I (Nominative)",
                    "verb_analysis": "Verb:",
                    "verb_answer": "buy",
                    "object_analysis": "Question: What do I buy?",
                    "object_answer": "-> a car.",
                    "conclusion": "So, 'a car' is the direct object and in German will be in Accusative.",
                    "test_button": "📝 Accusative Test",
                    "next_lesson": "➡️ Next lesson: Dative"
                }
            },
            'ua': {
                "nav": {
                    "home": "Головна",
                    "learn": "Навчальне середовище", 
                    "test": "Загальний тест",
                    "progress": "Прогрес"
                },
                "home": {
                    "page_title": "Давайте вивчимо німецьку! 🇩🇪",
                    "title": "Давайте вивчимо німецьку! 🇩🇪",
                    "subtitle": "Виберіть один з варіантів нижче, щоб почати.",
                    "quick_actions": "⚡ Швидкі дії",
                    "choose_option": "🎯 Виберіть опцію",
                    "continue_lesson": "Продовжити урок",
                    "continue_subtitle": "Das deutsche Alphabet",
                    "daily_challenge": "Щоденний виклик",
                    "daily_subtitle": "5 швидких питань",
                    "learn_lessons": "Вивчати уроки",
                    "learn_title": "Вивчати уроки",
                    "learn_desc": "Досліджуйте інтерактивні уроки",
                    "general_test": "Загальне тестування",
                    "test_title": "Загальне тестування", 
                    "test_desc": "Перевірте свої знання",
                    "vocabulary_test": "Тест словникового запасу",
                    "vocab_title": "Тест словника",
                    "vocab_desc": "Тестуйте свій словник",
                    "view_progress": "Переглянути свій прогрес",
                    "progress_title": "Переглянути прогрес",
                    "progress_desc": "Аналізуйте результати"
                },
                "lessons": {
                    "available": "Доступні уроки"
                },
                "lernziel": {
                    "title": "Fragenkatalog A1 — Das Lernziel",
                    "chapter1": "Розділ 1", 
                    "chapter2": "Розділ 2",
                    "test_button": "📝 Тестуйся →"
                },
                "test": {
                    "title": "Тест: Fragenkatalog A1 — Das Lernziel",
                    "progress": "Питання",
                    "score": "Бали",
                    "verify": "Перевірити",
                    "next_question": "Наступне питання",
                    "back_to_lesson": "Повернутися до уроку"
                },
                "schulsystem": {
                    "test_button": "📝 Тестуйся →"
                },
                "schulsystem_test": {
                    "title": "Тест: Das Schulsystem",
                    "back_to_lesson": "← Повернутися до уроку"
                },
                "chapter": {
                    "1": "Розділ 1: Спеціальні теми",
                    "2": "Розділ 2: Основи німецької мови",
                    "3": "Розділ 3: Питання та час",
                    "4": "Розділ 4: Артиклі та займенники",
                    "5": "Розділ 5: Граматичні відмінки"
                },
                "lesson1": {
                    "intro": "У цьому уроці ви вивчите німецький алфавіт та вимову спеціальних звуків: <strong>Umlaute</strong> та <strong>Doppellaute</strong>.",
                    "listen_alphabet": "🔊 Послухати алфавіт",
                    "umlaute_title": "Umlaute",
                    "scharfes_desc": "Вимовляється як \"s\". Німецькою називається <strong>\"scharfes s\"</strong> і існує тільки як мала літера.",
                    "doppellaute_title": "Doppellaute (Дифтонги)",
                    "other_combinations": "Інші важливі комбінації",
                    "pronounced_quickly": "вимовляється швидко:",
                    "very_important_title": "⚠️ Дуже важливо!",
                    "capitalization_rule": "<strong>Groß- und Kleinschreibung</strong> — Велика літера:",
                    "capitalization_desc": "<em>Усе це пишеться з великої літери в німецькій мові!</em>",
                    "test_button": "Почати тест 📖",
                    "nouns_example": "(іменники)",
                    "proper_names_example": "(власні імена)",
                    "sentence_beginnings_example": "(початки речень)",
                    "places_example": "(країни, міста, континенти, села)",
                    "politeness_forms_example": "(форми ввічливості)"
                },
                "test1": {
                    "title": "Тест: Das deutsche Alphabet",
                    "progress": "Питання",
                    "score": "Бали",
                    "verify": "Перевірити",
                    "next_question": "Наступне питання",
                    "back_to_lesson": "← Повернутися до уроку"
                },
                "akkusativ": {
                    "page_title": "Der Akkusativ - Знахідний відмінок у німецькій",
                    "title": "Der Akkusativ (Знахідний відмінок)",
                    "subtitle": "Вивчіть прямий додаток у німецькій мові",
                    "intro_title": "🎯 У німецькій є 4 відмінки:",
                    "nominativ": "Називний:",
                    "nominativ_desc": "Відмінок підмета. Відповідає на питання Хто? Що?",
                    "akkusativ": "Знахідний:",
                    "akkusativ_desc": "Відмінок прямого додатка. Відповідає на питання Кого? Що?",
                    "dativ": "Давальний:",
                    "dativ_desc": "Відмінок непрямого додатка. Відповідає на питання Кому?",
                    "genitiv": "Родовий:",
                    "genitiv_desc": "Присвійний відмінок. Відповідає на питання Чий?",
                    "main_idea_title": "💡 1. Основна ідея: Прямий додаток",
                    "main_concept": "Знахідний відмінок найчастіше використовується для позначення прямого додатка речення.",
                    "definition_label": "Просте визначення:",
                    "definition_text": "Прямий додаток - це особа або річ, яка безпосередньо 'зазнає' дії дієслова. Це той, хто отримує дію.",
                    "magic_question_title": "🔍 Чарівне питання для знаходження Знахідного відмінка:",
                    "magic_question": "(Кого або що?)",
                    "magic_rule": "Якщо іменник відповідає на це питання, поставлене після дієслова, то він у Знахідному відмінку.",
                    "example_title": "📝 Приклад:",
                    "example_sentence": "Я купую машину.",
                    "subject_analysis": "Підмет (Хто купує?):",
                    "subject_answer": "Я (Називний)",
                    "verb_analysis": "Дієслово:",
                    "verb_answer": "купую",
                    "object_analysis": "Питання: Що я купую?",
                    "object_answer": "-> машину.",
                    "conclusion": "Отже, 'машину' - це прямий додаток і в німецькій буде у Знахідному відмінку.",
                    "test_button": "📝 Тест Знахідний відмінок",
                    "next_lesson": "➡️ Наступний урок: Давальний відмінок"
                }
            }
        };
    }

    init() {
        // Încarcă limba salvată sau setează default engleza
        this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
        
        console.log(`Inițializez cu limba: ${this.currentLang}`);
        
        // Aplică traducerile pe pagina curentă
        this.applyTranslations();
        
        // Inițializează selectorul de limbă dacă există
        this.initLanguageSelector();
    }

    switchLanguage(newLang) {
        if (newLang === this.currentLang) return;
        
        console.log(`Schimb limba din ${this.currentLang} în ${newLang}`);
        
        // Salvează în localStorage
        localStorage.setItem('selectedLanguage', newLang);
        this.currentLang = newLang;
        
        // Aplică traducerile
        this.applyTranslations();
        
        // Actualizează selectorul de limbă
        this.updateLanguageSelector();
        
        // Emite eveniment custom pentru alte componente care trebuie să se actualizeze
        const event = new CustomEvent('languageChanged', {
            detail: { language: newLang }
        });
        document.dispatchEvent(event);
    }

    applyTranslations() {
        const currentTranslations = this.translations[this.currentLang];
        if (!currentTranslations) {
            console.error(`Nu există traduceri pentru limba: ${this.currentLang}`);
            return;
        }

        console.log(`Aplic traduceri pentru: ${this.currentLang}`, currentTranslations);

        // Traduce toate elementele marcate cu data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key, currentTranslations);
            if (translation) {
                if (element.tagName.toLowerCase() === 'title') {
                    element.textContent = translation; // Pentru title folosim textContent
                } else {
                    element.innerHTML = translation; // Pentru alte elemente folosim innerHTML
                }
                console.log(`Tradus "${key}": "${translation}"`);
            } else {
                console.warn(`Nu s-a găsit traducerea pentru: ${key}`);
            }
        });

        // Traduce placeholder-urile
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getTranslation(key, currentTranslations);
            if (translation) {
                element.placeholder = translation;
            }
        });

        // Traduce title-urile
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.getTranslation(key, currentTranslations);
            if (translation) {
                element.title = translation;
            }
        });

        console.log(`Traduceri aplicate pentru limba: ${this.currentLang}`);
    }

    getTranslation(key, translations = null) {
        if (!translations) {
            translations = this.translations[this.currentLang];
        }
        
        // Navighează prin obiectul de traduceri folosind cheia (ex: "nav.home")
        const keys = key.split('.');
        let result = translations;
        
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                console.warn(`Traducerea pentru cheia "${key}" nu a fost găsită`);
                return null;
            }
        }
        
        return result;
    }

    initLanguageSelector() {
        const selector = document.getElementById('languageSelector');
        if (!selector) {
            console.log('Selectorul de limbă nu a fost găsit pe această pagină');
            return;
        }

        console.log('Inițializez selectorul de limbă');

        // Populează selectorul cu limbile disponibile
        selector.innerHTML = '';
        Object.entries(this.availableLanguages).forEach(([code, info]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${info.flag} ${info.name}`;
            if (code === this.currentLang) {
                option.selected = true;
            }
            selector.appendChild(option);
        });

        // Adaugă event listener pentru schimbarea limbii
        selector.addEventListener('change', (e) => {
            console.log(`Selectorul schimbat la: ${e.target.value}`);
            this.switchLanguage(e.target.value);
        });
    }

    updateLanguageSelector() {
        const selector = document.getElementById('languageSelector');
        if (selector) {
            selector.value = this.currentLang;
        }
    }

    // Metodă publică pentru a obține limba curentă
    getCurrentLanguage() {
        return this.currentLang;
    }

    // Metodă publică pentru a obține traducerea unei chei specifice
    t(key) {
        return this.getTranslation(key);
    }
}

// Inițializează sistemul de traducere când DOM-ul este gata
let translationSystem;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM încărcat, inițializez sistemul de traducere...');
    translationSystem = new TranslationSystem();
});

// Exportă pentru folosire în alte scripturi
window.TranslationSystem = TranslationSystem;
window.getTranslationSystem = () => translationSystem;