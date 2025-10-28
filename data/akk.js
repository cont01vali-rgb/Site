/*************************************************
 * AKK.JS - Integration cu sistemul principal de traduceri
 *************************************************/

// Extend the main translation system with Akkusativ lesson content
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the main translation system to be ready
    setTimeout(() => {
        if (window.translationSystem && window.translationSystem.translations) {
            console.log('Integrating Akkusativ translations...');
            
            // Add Romanian translations
            if (!window.translationSystem.translations.ro) {
                window.translationSystem.translations.ro = {};
            }
            
            // Add English translations  
            if (!window.translationSystem.translations.en) {
                window.translationSystem.translations.en = {};
            }
            
            // Add Ukrainian translations
            if (!window.translationSystem.translations.ua) {
                window.translationSystem.translations.ua = {};
            }
            
            // Trigger retranslation with current language
            window.translationSystem.translatePage();
        } else {
            console.log('Main translation system not found, retrying...');
            setTimeout(arguments.callee, 200);
        }
    }, 100);
});
    // Traduceri pentru lecție
    translations: {
        RO: {
            // Navbar
            "navbar.home": "🏠 Acasă",
            "navbar.lessons": "📚 Lecții",
            "navbar.tests": "📝 Teste",
            "navbar.progress": "📊 Progres",
            "navbar.language": "🌐 Română",
            
            // Lesson content
            "akkusativ.title": "🎯 Cazul Acuzativ în Germană",
            "akkusativ.subtitle": "Lecție completă despre folosirea și identificarea Acuzativului",
            "akkusativ.level": "Nivel: A1-A2",
            
            // Section 1
            "akkusativ.intro_title": "1. Ce este Acuzativul și cum îl recunoaștem?",
            "akkusativ.intro_text": "Acuzativul (der Akkusativ) este cazul care marchează complementul direct într-o propoziție. El răspunde la întrebările:",
            "akkusativ.question_who": "Pe cine?",
            "akkusativ.question_what": "Pe ce / Ce?",
            "akkusativ.german_equivalent": "În germană: Wen oder was?",
            "akkusativ.simple_example": "Exemplu simplu:",
            "akkusativ.example_sentence": "Ich kaufe einen Apfel.",
            "akkusativ.example_translation": "(Eu cumpăr un măr.)",
            "akkusativ.example_question": "Ce cumpăr?",
            "akkusativ.example_answer": "Un măr (einen Apfel)",
            "akkusativ.example_conclusion": "Prin urmare, 'einen Apfel' este în Acuzativ.",
            
            // Section 2
            "akkusativ.magic_title": "2. Întrebarea 'magică' pentru identificarea Acuzativului",
            "akkusativ.magic_subtitle": "Tehnica infailibilă: 'Wen oder was?'",
            "akkusativ.magic_explanation": "Pentru a identifica complementul direct (Acuzativul) în orice propoziție germană, pune întrebarea:",
            "akkusativ.magic_question": "Wen oder was + verbul?",
            "akkusativ.magic_examples_title": "Să aplicăm formula:",
            "akkusativ.magic_ex1": "Ich trinke Kaffee.",
            "akkusativ.magic_ex1_trans": "(Eu beau cafea.)",
            "akkusativ.magic_ex1_question": "Was trinke ich?",
            "akkusativ.magic_ex1_answer": "Kaffee",
            "akkusativ.magic_ex1_conclusion": "Prin urmare, 'Kaffee' este în Acuzativ.",
            "akkusativ.magic_ex2": "Sie liebt den Mann.",
            "akkusativ.magic_ex2_trans": "(Ea îl iubește pe bărbat.)",
            "akkusativ.magic_ex2_question": "Wen liebt sie?",
            "akkusativ.magic_ex2_answer": "den Mann",
            "akkusativ.magic_ex2_conclusion": "Prin urmare, 'den Mann' este în Acuzativ.",
            
            // Section 3
            "akkusativ.tables_title": "3. Tabelele de declinare pentru Acuzativ",
            "akkusativ.tables_intro": "Să vedem cum se schimbă articolele și pronumele în Acuzativ:",
            "akkusativ.definite_table_title": "Articolele hotărâte:",
            "akkusativ.gender": "Gen",
            "akkusativ.nominativ": "Nominativ",
            "akkusativ.akkusativ": "Acuzativ",
            "akkusativ.masculine": "Masculin",
            "akkusativ.feminine": "Feminin",
            "akkusativ.neuter": "Neutru",
            "akkusativ.plural": "Plural",
            "akkusativ.key_change": "Schimbarea cheie",
            "akkusativ.key_change_text": "Doar masculinul se schimbă în Acuzativ!",
            "akkusativ.indefinite_table_title": "Articolele nehotărâte:",
            "akkusativ.personal_pronouns_title": "Pronumele personale:",
            "akkusativ.pronoun_ich": "eu",
            "akkusativ.pronoun_du": "tu",
            "akkusativ.pronoun_er": "el",
            "akkusativ.pronoun_sie": "ea",
            "akkusativ.pronoun_es": "el/ea (neutru)",
            "akkusativ.pronoun_wir": "noi",
            "akkusativ.pronoun_ihr": "voi",
            "akkusativ.pronoun_sie_plural": "ei/ele",
            "akkusativ.examples_with_pronouns": "Exemple cu pronume:",
            "akkusativ.pronoun_ex1": "Ich sehe ihn.",
            "akkusativ.pronoun_ex1_trans": "(Îl văd pe el.)",
            "akkusativ.pronoun_ex2": "Er liebt mich.",
            "akkusativ.pronoun_ex2_trans": "(El mă iubește.)",
            "akkusativ.pronoun_ex3": "Wir kennen euch.",
            "akkusativ.pronoun_ex3_trans": "(Vă cunoaștem.)",
            
            // Section 4 - Complex example
            "akkusativ.complex_example_title": "4. Exemplu lung: De ce o parte este în Acuzativ și alta nu?",
            "akkusativ.complex_intro": "Aceasta este o întrebare excelentă, care te va ajuta să înțelegi diferența dintre cazuri.",
            "akkusativ.complex_sentence_title": "Propoziție complexă:",
            "akkusativ.complex_translation": "(Profesorul îi dă elevului un pix.)",
            "akkusativ.complex_analysis_title": "Hai să \"disecăm\" propoziția folosind întrebările pentru fiecare caz:",
            "akkusativ.nominativ_search": "Căutăm Subiectul (Nominativ):",
            "akkusativ.nominativ_question": "Întrebare:",
            "akkusativ.nominativ_question_text": "Cine îi dă un pix elevului?",
            "akkusativ.nominativ_answer_label": "Răspuns:",
            "akkusativ.nominativ_answer": "(Profesorul).",
            "akkusativ.nominativ_conclusion": "Concluzie:",
            "akkusativ.nominativ_conclusion_text": "Der Lehrer este subiectul și stă în cazul Nominativ. Articolul este der, forma de bază.",
            "akkusativ.akkusativ_search": "Căutăm Complementul Direct (Acuzativ):",
            "akkusativ.akkusativ_question": "Întrebare:",
            "akkusativ.akkusativ_question_text": "Ce dă profesorul?",
            "akkusativ.akkusativ_answer_label": "Răspuns:",
            "akkusativ.akkusativ_answer": "(un pix).",
            "akkusativ.akkusativ_conclusion": "Concluzie:",
            "akkusativ.akkusativ_conclusion_text": "einen Stift este complementul direct și stă în cazul Acuzativ.",
            "akkusativ.akkusativ_analysis": "Analiză:",
            "akkusativ.akkusativ_analysis_text": "\"Stift\" (pix) este un substantiv masculin (der Stift). Deoarece aici este în Acuzativ, articolul nehotărât ein devine einen. Aici vedem schimbarea!",
            "akkusativ.dativ_search": "Căutăm Complementul Indirect (Dativ):",
            "akkusativ.dativ_question": "Întrebare:",
            "akkusativ.dativ_question_text": "Cui îi dă profesorul pixul?",
            "akkusativ.dativ_answer_label": "Răspuns:",
            "akkusativ.dativ_answer": "(elevului).",
            "akkusativ.dativ_conclusion": "Concluzie:",
            "akkusativ.dativ_conclusion_text": "dem Schüler este complementul indirect și stă în cazul Dativ (pe care îl vei învăța mai târziu). De aceea articolul der (de la der Schüler) se transformă în dem.",
            "akkusativ.recap_title": "Recapitulare analiză:",
            "akkusativ.recap_nominativ": "pentru că el face acțiunea.",
            "akkusativ.recap_akkusativ": "pentru că el primește direct acțiunea (este lucrul \"dat\").",
            "akkusativ.recap_dativ": "pentru că el este \"destinatarul\" indirect al acțiunii.",
            
            // Section 5 - Prepositions
            "akkusativ.prepositions_title": "5. Alte situații când folosim Acuzativul",
            "akkusativ.prepositions_intro": "Pe lângă verbele care cer complement direct, Acuzativul mai este cerut și de anumite prepoziții. La nivelul A1, cele mai importante sunt:",
            "akkusativ.fudge_title": "FUDGE-O (o metodă de a le memora):",
            "akkusativ.prep_fur": "(pentru)",
            "akkusativ.prep_um": "(în jurul, la - pentru ore)",
            "akkusativ.prep_durch": "(prin, de-a lungul)",
            "akkusativ.prep_gegen": "(împotriva, în)",
            "akkusativ.prep_entlang": "(de-a lungul) - stă de obicei după substantiv",
            "akkusativ.prep_ohne": "(fără)",
            "akkusativ.prep_rule_title": "Regulă:",
            "akkusativ.prep_rule_text": "Substantivul care vine după aceste prepoziții va sta întotdeauna în Acuzativ, indiferent de rolul său în propoziție!",
            "akkusativ.prep_examples_title": "Exemple:",
            "akkusativ.prep_ex1": "(Cumpăr flori pentru mama mea.)",
            "akkusativ.prep_ex1_exp": "für cere Acuzativ, die Mutter rămâne neschimbat.",
            "akkusativ.prep_ex2": "(El merge prin parc.)",
            "akkusativ.prep_ex2_exp": "durch cere Acuzativ, der Park devine den Park.",
            "akkusativ.prep_ex3": "(Nu putem începe fără tine.)",
            "akkusativ.prep_ex3_exp": "ohne cere Acuzativ.",
            
            // Section 6 - Tips
            "akkusativ.tips_title": "6. Mici sfaturi de reținere și înțelegere",
            "akkusativ.tip1_title": "Concentrează-te pe masculin:",
            "akkusativ.tip1_text": "Repetă obsesiv: der → den, ein → einen, mein → meinen, kein → keinen. Când vezi un ...en la finalul unui articol sau posesiv în fața unui substantiv, sunt șanse mari să fie Acuzativ masculin.",
            "akkusativ.tip2_title": "Asociază verbe cu Acuzativul:",
            "akkusativ.tip2_intro": "Creează-ți o listă mentală de verbe comune care aproape mereu iau un complement direct:",
            "akkusativ.verb_haben": "(a avea):",
            "akkusativ.verb_sehen": "(a vedea):",
            "akkusativ.verb_lesen": "(a citi):",
            "akkusativ.verb_kaufen": "(a cumpăra):",
            "akkusativ.verb_brauchen": "(a avea nevoie):",
            "akkusativ.verb_essen": "(a mânca):",
            "akkusativ.verb_trinken": "(a bea):",
            "akkusativ.tip3_title": "Pune mereu întrebarea:",
            "akkusativ.tip3_text": "Când citești o propoziție în germană, oprește-te după verb și întreabă-te: \"Wen oder was?\" (Pe cine sau ce?). Dacă găsești un răspuns în propoziție, ai găsit Acuzativul.",
            "akkusativ.tip4_title": "Nu te stresa cu restul:",
            "akkusativ.tip4_text": "La început, e normal să nu știi dacă un substantiv e der, die sau das. Important este să înțelegi mecanismul. Când înveți un substantiv nou, învață-l mereu cu articolul lui (der Hund, die Katze, das Buch).",
            
            // Navigation
            "akkusativ.test_button": "📝 Test Akkusativ",
            "akkusativ.next_lesson": "➡️ Următoarea lecție: Dativ"
        },
        
        EN: {
            // Navbar
            "navbar.home": "🏠 Home",
            "navbar.lessons": "📚 Lessons", 
            "navbar.tests": "📝 Tests",
            "navbar.progress": "📊 Progress",
            "navbar.language": "🌐 English",
            
            // Page title
            "akkusativ.page_title": "Der Akkusativ - The Accusative in German",
            
            // Navigation items
            "nav.home": "🏠 Home",
            "nav.learn": "📚 Learning Environment",
            
            // Lesson content
            "akkusativ.title": "Der Akkusativ (The Accusative Case)",
            "akkusativ.subtitle": "Learn the direct object in German",
            
            // Introduction
            "akkusativ.intro_title": "🎯 German has 4 cases:",
            "akkusativ.nominativ": "Nominative:",
            "akkusativ.nominativ_desc": "The subject case. Answers the question Who? What?",
            "akkusativ.akkusativ": "Accusative:",
            "akkusativ.akkusativ_desc": "The direct object case. Answers the question Whom? What?",
            "akkusativ.dativ": "Dative:",
            "akkusativ.dativ_desc": "The indirect object case. Answers the question To whom?",
            "akkusativ.genitiv": "Genitive:",
            "akkusativ.genitiv_desc": "The possessive case. Answers the question Whose?",
            
            // Section 1
            "akkusativ.main_idea_title": "💡 1. Main Idea: The Direct Object",
            "akkusativ.main_concept": "The Accusative case is most often used to mark the direct object of a sentence.",
            "akkusativ.definition_label": "Simple definition:",
            "akkusativ.definition_text": "The direct object is the person or thing that directly 'suffers' the action of the verb. It is the one that receives the action.",
            "akkusativ.magic_question_title": "🔍 The magic question to find the Accusative is:",
            "akkusativ.magic_question": "(Whom or what?)",
            "akkusativ.magic_rule": "If a noun answers this question asked after the verb, then it is in Accusative.",
            "akkusativ.example_title": "📝 Example:",
            "akkusativ.example_sentence": "I buy a car.",
            "akkusativ.subject_analysis": "Subject (Who buys?):",
            "akkusativ.subject_answer": "I (Nominative)",
            "akkusativ.verb_analysis": "Verb:",
            "akkusativ.verb_answer": "buy",
            "akkusativ.object_analysis": "Question: What do I buy?",
            "akkusativ.object_answer": "-> a car.",
            "akkusativ.conclusion": "So, 'a car' is the direct object and in German will be in Accusative.",
            
            // Section 2
            "akkusativ.declension_title": "⚡ 2. The Big Change: Article Declension in Accusative",
            "akkusativ.golden_tip_title": "🏆 GOLDEN TIP:",
            "akkusativ.golden_tip_text": "The only gender that visibly changes its form in Accusative is MASCULINE. Feminine, neuter and plural look the same as in Nominative. This makes everything much simpler!",
            "akkusativ.table_title": "📊 The table you need to memorize:",
            "akkusativ.table_gen": "Gender",
            "akkusativ.table_nominativ": "Nominative (Who? What?)",
            "akkusativ.table_akkusativ": "Accusative (Whom? What?)",
            "akkusativ.table_change": "Change?",
            "akkusativ.table_man": "(the man)",
            "akkusativ.table_man_acc": "(the man)",
            "akkusativ.table_yes": "YES!",
            "akkusativ.table_man_indef": "(a man)",
            "akkusativ.table_man_indef_acc": "(a man)",
            "akkusativ.table_man_neg": "(no man)",
            "akkusativ.table_man_neg_acc": "(no man)",
            "akkusativ.table_woman": "(the woman)",
            "akkusativ.table_woman_acc": "(the woman)",
            "akkusativ.table_no": "NO",
            "akkusativ.table_woman_indef": "(a woman)",
            "akkusativ.table_woman_indef_acc": "(a woman)",
            "akkusativ.table_woman_neg": "(no woman)",
            "akkusativ.table_woman_neg_acc": "(no woman)",
            "akkusativ.table_child": "(the child)",
            "akkusativ.table_child_acc": "(the child)",
            "akkusativ.table_child_indef": "(a child)",
            "akkusativ.table_child_indef_acc": "(a child)",
            "akkusativ.table_child_neg": "(no child)",
            "akkusativ.table_child_neg_acc": "(no child)",
            "akkusativ.table_people": "(the people)",
            "akkusativ.table_people_acc": "(the people)",
            "akkusativ.table_people_indef": "(people)",
            "akkusativ.table_people_indef_acc": "(people)",
            "akkusativ.table_people_neg": "(no people)",
            "akkusativ.table_people_neg_acc": "(no people)",
            "akkusativ.key_insight_title": "💡 Key insight:",
            "akkusativ.key_insight_text": "Focus 100% on the change der → den and ein → einen. If you master this, you understand 80% of Accusative.",
            
            // Section 3
            "akkusativ.examples_title": "📚 3. Detailed Examples: Identifying Accusative in Sentences",
            "akkusativ.examples_intro": "Let's analyze some sentences to see how everything works.",
            "akkusativ.example1_title": "🔵 Example 1 (Masculine - here you see the change!)",
            "akkusativ.example1_translation": "(I see the dog.)",
            "akkusativ.example1_subject": "Subject (Nominative):",
            "akkusativ.example1_subject_q": "Who sees?",
            "akkusativ.example1_subject_a": "(I).",
            "akkusativ.example1_verb": "Verb:",
            "akkusativ.example1_verb_a": "(see).",
            "akkusativ.example1_object": "Question for Accusative:",
            "akkusativ.example1_object_q": "Whom/what do I see?",
            "akkusativ.example1_object_a": "(the dog).",
            "akkusativ.example1_analysis": "Analysis:",
            "akkusativ.example1_analysis_text": "The noun 'Hund' is masculine (der Hund). Because it's a direct object (in Accusative), the article der transforms into den.",
            
            "akkusativ.example2_title": "🟣 Example 2 (Feminine - no change)",
            "akkusativ.example2_translation": "(He reads a newspaper.)",
            "akkusativ.example2_subject": "Subject (Nominative):",
            "akkusativ.example2_subject_q": "Who reads?",
            "akkusativ.example2_subject_a": "(He).",
            "akkusativ.example2_verb": "Verb:",
            "akkusativ.example2_verb_a": "(reads).",
            "akkusativ.example2_object": "Question for Accusative:",
            "akkusativ.example2_object_q": "What does he read?",
            "akkusativ.example2_object_a": "(a newspaper).",
            "akkusativ.example2_analysis": "Analysis:",
            "akkusativ.example2_analysis_text": "The noun 'Zeitung' is feminine (die Zeitung). Even though it's in Accusative, the indefinite article eine remains unchanged. It looks the same as in Nominative.",
            
            "akkusativ.example3_title": "🟡 Example 3 (Neuter - no change)",
            "akkusativ.example3_translation": "(The child has a bicycle.)",
            "akkusativ.example3_subject": "Subject (Nominative):",
            "akkusativ.example3_subject_q": "Who has?",
            "akkusativ.example3_subject_a": "(The child).",
            "akkusativ.example3_verb": "Verb:",
            "akkusativ.example3_verb_a": "(has).",
            "akkusativ.example3_object": "Question for Accusative:",
            "akkusativ.example3_object_q": "What does the child have?",
            "akkusativ.example3_object_a": "(a bicycle).",
            "akkusativ.example3_analysis": "Analysis:",
            "akkusativ.example3_analysis_text": "The noun 'Fahrrad' is neuter (das Fahrrad). The article ein remains unchanged in Accusative.",
            
            // Section 4 - Complex example
            "akkusativ.complex_example_title": "🧩 4. Long Example: Why is one part in Accusative and another not?",
            "akkusativ.complex_intro": "This is an excellent question that will help you understand the difference between cases.",
            "akkusativ.complex_sentence_title": "📝 Complex sentence:",
            "akkusativ.complex_translation": "(The teacher gives the student a pen.)",
            "akkusativ.complex_analysis_title": "🔍 Let's 'dissect' the sentence using questions for each case:",
            "akkusativ.nominativ_search": "🟦 Looking for the Subject (Nominative):",
            "akkusativ.nominativ_question": "Question:",
            "akkusativ.nominativ_question_text": "Who gives a pen to the student?",
            "akkusativ.nominativ_answer_label": "Answer:",
            "akkusativ.nominativ_answer": "(The teacher).",
            "akkusativ.nominativ_conclusion": "Conclusion:",
            "akkusativ.nominativ_conclusion_text": "Der Lehrer is the subject and stands in Nominative case. The article is der, the basic form.",
            "akkusativ.akkusativ_search": "🟩 Looking for the Direct Object (Accusative):",
            "akkusativ.akkusativ_question": "Question:",
            "akkusativ.akkusativ_question_text": "What does the teacher give?",
            "akkusativ.akkusativ_answer_label": "Answer:",
            "akkusativ.akkusativ_answer": "(a pen).",
            "akkusativ.akkusativ_conclusion": "Conclusion:",
            "akkusativ.akkusativ_conclusion_text": "einen Stift is the direct object and stands in Accusative case.",
            "akkusativ.akkusativ_analysis": "Analysis:",
            "akkusativ.akkusativ_analysis_text": "'Stift' (pen) is a masculine noun (der Stift). Because it's in Accusative here, the indefinite article ein becomes einen. Here we see the change!",
            "akkusativ.dativ_search": "🟪 Looking for the Indirect Object (Dative):",
            "akkusativ.dativ_question": "Question:",
            "akkusativ.dativ_question_text": "To whom does the teacher give the pen?",
            "akkusativ.dativ_answer_label": "Answer:",
            "akkusativ.dativ_answer": "(to the student).",
            "akkusativ.dativ_conclusion": "Conclusion:",
            "akkusativ.dativ_conclusion_text": "dem Schüler is the indirect object and stands in Dative case (which you'll learn later). That's why the article der (from der Schüler) transforms into dem.",
            "akkusativ.recap_title": "📋 Analysis recap:",
            "akkusativ.recap_nominativ": "because he performs the action.",
            "akkusativ.recap_akkusativ": "because it directly receives the action (it's the thing being 'given').",
            "akkusativ.recap_dativ": "because he is the indirect 'recipient' of the action.",
            
            // Section 5 - Prepositions
            "akkusativ.prepositions_title": "🔗 5. Other Situations When We Use Accusative",
            "akkusativ.prepositions_intro": "Besides verbs that require direct objects, Accusative is also required by certain prepositions. At A1 level, the most important ones are:",
            "akkusativ.fudge_title": "🎯 FUDGE-O (a method to memorize them):",
            "akkusativ.prep_fur": "(for)",
            "akkusativ.prep_um": "(around, at - for time)",
            "akkusativ.prep_durch": "(through, along)",
            "akkusativ.prep_gegen": "(against, at)",
            "akkusativ.prep_entlang": "(along) - usually comes after the noun",
            "akkusativ.prep_ohne": "(without)",
            "akkusativ.prep_rule_title": "⚠️ Rule:",
            "akkusativ.prep_rule_text": "The noun that comes after these prepositions will always be in Accusative, regardless of its role in the sentence!",
            "akkusativ.prep_examples_title": "💫 Examples:",
            "akkusativ.prep_ex1": "(I buy flowers for my mother.)",
            "akkusativ.prep_ex1_exp": "für requires Accusative, die Mutter remains unchanged.",
            "akkusativ.prep_ex2": "(He walks through the park.)",
            "akkusativ.prep_ex2_exp": "durch requires Accusative, der Park becomes den Park.",
            "akkusativ.prep_ex3": "(We can't start without you.)",
            "akkusativ.prep_ex3_exp": "ohne requires Accusative.",
            
            // Section 6 - Tips
            "akkusativ.tips_title": "💡 6. Small Tips for Retention and Understanding",
            "akkusativ.tip1_title": "🎯 Focus on masculine:",
            "akkusativ.tip1_text": "Practice obsessively: der → den, ein → einen, mein → meinen, kein → keinen. When you see ...en at the end of an article or possessive in front of a noun, there's a good chance it's Accusative masculine.",
            "akkusativ.tip2_title": "📚 Associate verbs with Accusative:",
            "akkusativ.tip2_intro": "Create a mental list of common verbs that almost always take a direct object:",
            "akkusativ.verb_haben": "(to have):",
            "akkusativ.verb_sehen": "(to see):",
            "akkusativ.verb_lesen": "(to read):",
            "akkusativ.verb_kaufen": "(to buy):",
            "akkusativ.verb_brauchen": "(to need):",
            "akkusativ.verb_essen": "(to eat):",
            "akkusativ.verb_trinken": "(to drink):",
            "akkusativ.tip3_title": "❓ Always ask the question:",
            "akkusativ.tip3_text": "When reading a German sentence, stop after the verb and ask yourself: 'Wen oder was?' (Whom or what?). If you find an answer in the sentence, you've found the Accusative.",
            "akkusativ.tip4_title": "😌 Don't stress about the rest:",
            "akkusativ.tip4_text": "At the beginning, it's normal not to know if a noun is der, die or das. What's important is understanding the mechanism. When learning a new noun, always learn it with its article (der Hund, die Katze, das Buch).",
            
            // Navigation
            "akkusativ.test_button": "📝 Accusative Test",
            "akkusativ.next_lesson": "➡️ Next lesson: Dative"
        },
        
        UA: {
            // Navbar
            "navbar.home": "🏠 Домівка",
            "navbar.lessons": "📚 Уроки",
            "navbar.tests": "📝 Тести", 
            "navbar.progress": "📊 Прогрес",
            "navbar.language": "🌐 Українська",
            
            // Navigation
            "akkusativ.test_button": "📝 Тест Знахідний відмінок",
            "akkusativ.next_lesson": "➡️ Наступний урок: Давальний відмінок"
        }
    }
};

// Initialize translation system when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set up language selector functionality
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        const currentLang = localStorage.getItem('selectedLanguage') || 'RO';
        languageSelect.value = currentLang;
        translatePage(currentLang);
        
        languageSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            localStorage.setItem('selectedLanguage', selectedLang);
            translatePage(selectedLang);
        });
    }
});

function translatePage(language) {
    const translations = window.akkusativData.translations[language];
    if (!translations) return;
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}