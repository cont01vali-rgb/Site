// Trennbare Verben Test Exercises Data
// A1 Level - 25 exercises total across 10 different types

const trennbareVerbenExercises = {
    exercises: [
        // 1. Fill-in-the-blanks conjugation (3 exercises)
        {
            id: 1,
            type: "fill-in-the-blanks-conjugation",
            difficulty: "A1",
            question: "Ich _____ heute früh _____ (aufstehen).",
            correctAnswer: "stehe|auf",
            prefix: "auf",
            verb: "stehen",
            explanation: "La verbele separabile, prefixul se separă de verb și se pune la sfârșitul propoziției. 'Aufstehen' (a se scula) devine 'stehe...auf'. Verbul 'stehen' se conjugă la persoana I singular ca 'stehe'.",
            rule: "REGULĂ: Verbele separabile în prezent: verbul conjugat rămâne pe poziția a 2-a, iar prefixul merge la sfârșitul propoziției."
        },
        {
            id: 2,
            type: "fill-in-the-blanks-conjugation",
            difficulty: "A1",
            question: "Er _____ das Buch _____ (vorlesen).",
            correctAnswer: "liest|vor",
            prefix: "vor",
            verb: "lesen",
            explanation: "Verbul 'vorlesen' (a citi cu voce tare) este separabil. La persoana a III-a singular, 'lesen' devine 'liest', iar prefixul 'vor' merge la sfârșitul propoziției după obiect.",
            rule: "REGULĂ: Chiar și când avem obiecte în propoziție, prefixul verbului separabil rămâne la sfârșit."
        },
        {
            id: 3,
            type: "fill-in-the-blanks-conjugation",
            difficulty: "A1",
            question: "Wir _____ unsere Freunde _____ (einladen).",
            correctAnswer: "laden|ein",
            prefix: "ein",
            verb: "laden",
            explanation: "'Einladen' (a invita) este un verb separabil. 'Laden' se conjugă la persoana I plural ca 'laden', iar prefixul 'ein' se pune la sfârșitul propoziției.",
            rule: "REGULĂ: Prefixele 'ein-', 'auf-', 'ab-', 'vor-', 'mit-', 'nach-', 'zu-' sunt întotdeauna separabile."
        },

        // 2. Sentence building (3 exercises)
        {
            id: 4,
            type: "sentence-building",
            difficulty: "A1",
            question: "Ordne die Wörter zu einem korrekten Satz:",
            words: ["ich", "fahre", "um", "8", "Uhr", "ab"],
            correctOrder: ["ich", "fahre", "um", "8", "Uhr", "ab"],
            verb: "abfahren",
            explanation: "Verbul separabil 'abfahren' (a pleca) se împarte: 'fahre' rămâne pe poziția a 2-a (după subiect), iar prefixul 'ab' merge la sfârșitul propoziției, chiar și după indicațiile de timp.",
            rule: "REGULĂ: Ordinea cuvintelor: Subiect + Verb conjugat + Timp/Loc + Prefixul separat"
        },
        {
            id: 5,
            type: "sentence-building",
            difficulty: "A1",
            question: "Baue einen Satz aus den Wörtern:",
            words: ["wir", "kommen", "morgen", "an"],
            correctOrder: ["wir", "kommen", "morgen", "an"],
            verb: "ankommen",
            explanation: "La verbul 'ankommen' (a ajunge), prefixul 'an' se pune la sfârșitul propoziției, după toate celelalte părți ale propoziției, inclusiv adverbele de timp ca 'morgen'.",
            rule: "REGULĂ: Prefixul separat ocupă întotdeauna ultima poziție în propoziție, indiferent de alte elemente."
        },
        {
            id: 6,
            type: "sentence-building",
            difficulty: "A1",
            question: "Forme einen korrekten Satz:",
            words: ["sie", "macht", "das", "Licht", "an"],
            correctOrder: ["sie", "macht", "das", "Licht", "an"],
            verb: "anmachen",
            explanation: "Verbul 'anmachen' (a aprinde) se separă: 'macht' rămâne pe poziția a 2-a, iar 'an' merge la sfârșitul propoziției, chiar și după obiectul direct 'das Licht'.",
            rule: "REGULĂ: Chiar când avem obiecte directe sau indirecte, prefixul merge întotdeauna la sfârșitul propoziției."
        },

        // 3. Audio listen and write (2 exercises)
        {
            id: 7,
            type: "audio-listen-and-write",
            difficulty: "A1",
            audioText: "Ich stehe jeden Tag um sieben Uhr auf.",
            question: "Höre zu und schreibe den Satz:",
            correctAnswer: "Ich stehe jeden Tag um sieben Uhr auf.",
            focusVerb: "aufstehen",
            explanation: "Propoziția conține verbul separabil 'aufstehen' (a se scula). Observă cum se separă: 'stehe' pe poziția a 2-a și 'auf' la sfârșitul propoziției. În vorbire, există o pauză între verb și prefix.",
            rule: "REGULĂ: La ascultare, verbele separabile au o pauză naturală între partea conjugată și prefix. Prefixul este accentuat mai tare."
        },
        {
            id: 8,
            type: "audio-listen-and-write",
            difficulty: "A1",
            audioText: "Der Zug fährt um acht Uhr ab.",
            question: "Schreibe den gehörten Satz auf:",
            correctAnswer: "Der Zug fährt um acht Uhr ab.",
            focusVerb: "abfahren",
            explanation: "Verbul 'abfahren' (a pleca - pentru mijloace de transport) se separă: 'fährt' pe poziția a 2-a și 'ab' la sfârșitul propoziției. Observă conjugarea: 'der Zug' (el) → 'fährt'.",
            rule: "REGULĂ: Verbele separabile au accentul pe prefix în pronunție: 'ABfahren', 'AUFstehen', 'ANkommen'."
        },

        // 4. Multiple choice prefix (3 exercises)
        {
            id: 9,
            type: "multiple-choice-prefix",
            difficulty: "A1",
            question: "Wähle das richtige Präfix: Er ___macht das Fenster ___.",
            options: ["auf", "ab", "an", "vor"],
            correctAnswer: "auf",
            completeVerb: "aufmachen",
            explanation: "Pentru a deschide o fereastră folosim 'aufmachen'. Prefixul 'auf' înseamnă de obicei 'deschidere' sau 'mișcare în sus'. Alternativa ar fi 'öffnen' (verb neseparabil).",
            rule: "REGULĂ: Prefixele au înțelesuri specifice: 'auf' = deschidere/sus, 'zu' = închidere, 'an' = pornire/aprindere, 'ab' = plecare/oprire."
        },
        {
            id: 10,
            type: "multiple-choice-prefix",
            difficulty: "A1",
            question: "Ergänze: Wir ___kommen heute spät ___.",
            options: ["an", "ab", "auf", "mit"],
            correctAnswer: "an",
            completeVerb: "ankommen",
            explanation: "'Ankommen' înseamnă 'a ajunge/a sosi'. Prefixul 'an' exprimă ideea de a ajunge la o destinație sau apropierea de ceva. Este diferit de 'kommen' care înseamnă doar 'a veni'.",
            rule: "REGULĂ: Prefixul 'an' indică: sosirea la o destinație, începutul unei acțiuni, sau contactul/apropierea."
        },
        {
            id: 11,
            type: "multiple-choice-prefix",
            difficulty: "A1",
            question: "Was passt? Sie ___lädt ihre Freunde ___.",
            options: ["ein", "aus", "vor", "nach"],
            correctAnswer: "ein",
            completeVerb: "einladen",
            explanation: "'Einladen' înseamnă 'a invita'. Prefixul 'ein' arată mișcarea înăuntru sau includerea cuiva într-o activitate. Observă conjugarea: 'sie lädt' (forma neregulată a verbului 'laden').",
            rule: "REGULĂ: Prefixul 'ein' indică: mișcare înăuntru, includere, sau invitarea cuiva să participe."
        },

        // 5. Transform the sentence (2 exercises)
        {
            id: 12,
            type: "transform-the-sentence",
            difficulty: "A1",
            question: "Ändere von 'ich' zu 'er': Ich lade meine Freunde ein.",
            originalSentence: "Ich lade meine Freunde ein.",
            targetPerson: "er",
            correctAnswer: "Er lädt seine Freunde ein.",
            explanation: "Bei Personenwechsel ändert sich die Verbform ('lade' → 'lädt') und das Possessivpronomen ('meine' → 'seine').",
            rule: "Konjugation + Possessivpronomen müssen bei Personenwechsel angepasst werden."
        },
        {
            id: 13,
            type: "transform-the-sentence",
            difficulty: "A1",
            question: "Ändere von 'wir' zu 'du': Wir stehen früh auf.",
            originalSentence: "Wir stehen früh auf.",
            targetPerson: "du",
            correctAnswer: "Du stehst früh auf.",
            explanation: "Das Verb 'aufstehen' wird konjugiert: 'stehen' (wir) → 'stehst' (du). Das Präfix bleibt unverändert.",
            rule: "Nur das Verb wird konjugiert, das abgetrennte Präfix bleibt immer gleich."
        },

        // 6. Match verb with meaning (3 exercises)
        {
            id: 14,
            type: "match-verb-meaning",
            difficulty: "A1",
            question: "Verbinde das Verb mit der richtigen Bedeutung:",
            verbs: ["aufstehen", "anrufen", "abfahren"],
            meanings: ["to call", "to get up", "to depart"],
            correctMatches: {
                "aufstehen": "to get up",
                "anrufen": "to call", 
                "abfahren": "to depart"
            },
            explanation: "Trennbare Verben haben oft übertragene Bedeutungen, die man auswendig lernen muss.",
            rule: "Bedeutungen trennbarer Verben sind nicht immer aus Präfix + Verb ableitbar."
        },
        {
            id: 15,
            type: "match-verb-meaning",
            difficulty: "A1",
            question: "Ordne die deutschen Verben den englischen Bedeutungen zu:",
            verbs: ["einladen", "aufmachen", "zumachen"],
            meanings: ["to open", "to invite", "to close"],
            correctMatches: {
                "einladen": "to invite",
                "aufmachen": "to open",
                "zumachen": "to close"
            },
            explanation: "Diese Verben zeigen typische Präfix-Bedeutungen: 'ein' = hinein, 'auf' = öffnen, 'zu' = schließen.",
            rule: "Häufige Präfix-Bedeutungen: auf = öffnen, zu = schließen, ein = hinein/einbeziehen."
        },
        {
            id: 16,
            type: "match-verb-meaning",
            difficulty: "A1",
            question: "Verbinde richtig:",
            verbs: ["mitkommen", "vorlesen", "nachdenken"],
            meanings: ["to think about", "to read aloud", "to come along"],
            correctMatches: {
                "mitkommen": "to come along",
                "vorlesen": "to read aloud",
                "nachdenken": "to think about"
            },
            explanation: "Diese Verben zeigen verschiedene Präfix-Bedeutungen: 'mit' = zusammen, 'vor' = vor anderen, 'nach' = zeitlich später.",
            rule: "Präfixe haben verschiedene Bedeutungsebenen: räumlich, zeitlich, und übertragen."
        },

        // 7. Separable or not classification (3 exercises)
        {
            id: 17,
            type: "separable-or-not",
            difficulty: "A1",
            question: "Klassifiziere diese Verben als trennbar oder untrennbar:",
            verbs: ["aufstehen", "verstehen", "anrufen", "bekommen"],
            separable: ["aufstehen", "anrufen"],
            inseparable: ["verstehen", "bekommen"],
            explanation: "Trennbare Präfixe: auf-, an-, ab-, ein-. Untrennbare Präfixe: be-, ver-, ent-, er-.",
            rule: "Betonte Präfixe sind trennbar, unbetonte sind untrennbar."
        },
        {
            id: 18,
            type: "separable-or-not", 
            difficulty: "A1",
            question: "Sortiere die Verben:",
            verbs: ["einladen", "entstehen", "abfahren", "gehören"],
            separable: ["einladen", "abfahren"],
            inseparable: ["entstehen", "gehören"],
            explanation: "Trennbar: ein-, ab- (betont). Untrennbar: ent-, ge- (unbetont).",
            rule: "Betonung entscheidet: 'EINladen' vs. 'entSTEhen'."
        },
        {
            id: 19,
            type: "separable-or-not",
            difficulty: "A1", 
            question: "Teile die Verben richtig ein:",
            verbs: ["zumachen", "empfehlen", "mitkommen", "erklären"],
            separable: ["zumachen", "mitkommen"],
            inseparable: ["empfehlen", "erklären"],
            explanation: "Trennbar: zu-, mit- (stark betont). Untrennbar: emp-, er- (schwach betont).",
            rule: "Starke Betonung auf Präfix = trennbar, schwache Betonung = untrennbar."
        },

        // 8. Find the mistake (2 exercises)
        {
            id: 20,
            type: "find-the-mistake",
            difficulty: "A1",
            question: "Finde und korrigiere den Fehler:",
            incorrectSentence: "Ich aufstehe um sieben Uhr.",
            correctSentence: "Ich stehe um sieben Uhr auf.",
            mistake: "Verb nicht getrennt",
            explanation: "Das trennbare Verb muss getrennt werden: 'stehe' an Position 2, 'auf' am Satzende.",
            rule: "Trennbare Verben müssen im Präsens IMMER getrennt werden."
        },
        {
            id: 21,
            type: "find-the-mistake",
            difficulty: "A1",
            question: "Was ist falsch in diesem Satz?",
            incorrectSentence: "Er ruft an seine Mutter.",
            correctSentence: "Er ruft seine Mutter an.",
            mistake: "Präfix falsche Position",
            explanation: "Das Präfix 'an' muss nach dem Objekt stehen, nicht vor dem Objekt.",
            rule: "Wortstellung: Subjekt + Verb + Objekt + Präfix"
        },

        // 9. Image association (2 exercises)
        {
            id: 22,
            type: "image-association",
            difficulty: "A1",
            question: "Welches Verb passt zur Beschreibung?",
            description: "Eine Person öffnet ein Fenster.",
            options: ["aufmachen", "zumachen", "anmachen"],
            correctAnswer: "aufmachen",
            explanation: "'Aufmachen' bedeutet öffnen. Das Präfix 'auf' zeigt das Öffnen an.",
            rule: "Präfix 'auf' = öffnen, Bewegung nach oben oder Beginn."
        },
        {
            id: 23,
            type: "image-association",
            difficulty: "A1",
            question: "Wähle das passende Verb:",
            description: "Jemand steht morgens aus dem Bett.",
            options: ["aufstehen", "abstehen", "entstehen"],
            correctAnswer: "aufstehen",
            explanation: "'Aufstehen' = aus dem Bett oder Stuhl sich erheben. Wörtlich: 'auf' + 'stehen'.",
            rule: "Viele trennbare Verben haben wörtliche Bedeutung: auf = nach oben."
        },

        // 10. Dialogue completion (2 exercises)
        {
            id: 24,
            type: "dialogue-completion",
            difficulty: "A1",
            question: "Vervollständige den Dialog:",
            dialogue: [
                "A: Wann _____ der Zug _____?",
                "B: Er _____ um 9 Uhr _____."
            ],
            correctAnswers: ["fährt|ab", "fährt|ab"],
            verb: "abfahren",
            explanation: "Beide Sprecher verwenden das trennbare Verb 'abfahren': 'fährt...ab'.",
            rule: "In Fragen und Antworten bleibt die Trennung gleich."
        },
        {
            id: 25,
            type: "dialogue-completion",
            difficulty: "A1",
            question: "Ergänze das Gespräch:",
            dialogue: [
                "A: _____ du mich heute _____?",
                "B: Ja, ich _____ dich um 8 Uhr _____."
            ],
            correctAnswers: ["rufst|an", "rufe|an"],
            verb: "anrufen",
            explanation: "Das Verb 'anrufen' wird in Frage (rufst...an) und Antwort (rufe...an) getrennt.",
            rule: "Personenwechsel ändert nur die Verbkonjugation, nicht die Trennung."
        },

        // 11. Verb conjugation exercises (5 exercises)
        {
            id: 26,
            type: "verb-conjugation",
            difficulty: "A1",
            question: "Conjugă verbul 'aufstehen' (a se scula) pentru următoarele persoane:",
            verb: "aufstehen",
            prefix: "auf",
            baseVerb: "stehen",
            persons: ["ich", "er/sie/es", "wir"],
            correctAnswers: {
                "ich": "stehe auf",
                "er/sie/es": "steht auf", 
                "wir": "stehen auf"
            },
            explanation: "Verbul 'aufstehen' se conjugă ca 'stehen' + prefixul 'auf' la sfârșitul propoziției. Conjugarea: ich stehe, du stehst, er/sie/es steht, wir stehen, ihr steht, sie stehen.",
            rule: "REGULĂ: La verbele separabile, se conjugă doar partea principală a verbului, iar prefixul rămâne nemodificat și se pune la sfârșitul propoziției."
        },
        {
            id: 27,
            type: "verb-conjugation",
            difficulty: "A1", 
            question: "Conjugă verbul 'anrufen' (a suna/telefona) pentru următoarele persoane:",
            verb: "anrufen",
            prefix: "an",
            baseVerb: "rufen",
            persons: ["du", "sie (ea)", "ihr"],
            correctAnswers: {
                "du": "rufst an",
                "sie (ea)": "ruft an",
                "ihr": "ruft an"
            },
            explanation: "Verbul 'anrufen' se conjugă ca 'rufen' + prefixul 'an'. Observă că la persoana a II-a singular (du) se adaugă 's': rufst.",
            rule: "REGULĂ: Verbele cu baza în -f- la persoana a II-a singular (du) primesc terminația -st: du rufst an."
        },
        {
            id: 28,
            type: "conjugation-multiple-choice",
            difficulty: "A1",
            question: "Alege conjugarea corectă pentru 'einladen' (a invita) la persoana a III-a singular (er/sie/es):",
            verb: "einladen",
            person: "er/sie/es",
            options: ["ladet ein", "lädt ein", "laden ein", "ladt ein"],
            correctAnswer: "lädt ein",
            explanation: "Verbul 'einladen' are o conjugare neregulată: 'laden' devine 'lädt' la persoana a III-a singular (er/sie/es). Atenție la schimbarea vocalei a → ä!",
            rule: "REGULĂ: Unele verbe au conjugări neregulate cu schimbarea vocalei: laden → lädt, fahren → fährt, laufen → läuft."
        },
        {
            id: 29,
            type: "conjugation-multiple-choice",
            difficulty: "A1",
            question: "Cum se conjugă 'abfahren' (a pleca - transport) la persoana a II-a plural (ihr)?",
            verb: "abfahren", 
            person: "ihr",
            options: ["fahrt ab", "fährt ab", "fahren ab", "fahrst ab"],
            correctAnswer: "fahrt ab",
            explanation: "La persoana a II-a plural (ihr), verbul 'fahren' se conjugă ca 'fahrt' (fără schimbarea vocalei care apare doar la singular). Prefixul 'ab' rămâne la sfârșitul propoziției.",
            rule: "REGULĂ: Schimbarea vocalei (a→ä, e→i) apare doar la persoanele II și III singular, nu și la plural."
        },
        {
            id: 30,
            type: "verb-conjugation",
            difficulty: "A1",
            question: "Conjugă verbul 'zumachen' (a închide) pentru următoarele persoane:",
            verb: "zumachen",
            prefix: "zu",
            baseVerb: "machen", 
            persons: ["ich", "du", "sie (ei)"],
            correctAnswers: {
                "ich": "mache zu",
                "du": "machst zu",
                "sie (ei)": "machen zu"
            },
            explanation: "Verbul 'zumachen' are conjugare regulată ca 'machen': ich mache, du machst, er macht, etc. Prefixul 'zu' se pune la sfârșitul propoziției.",
            rule: "REGULĂ: Verbele regulate se conjugă predictibil: -e (ich), -st (du), -t (er/sie/es), -en (wir/sie), -t (ihr)."
        },
        {
            id: 31,
            type: "conjugation-multiple-choice",
            difficulty: "A1",
            question: "Care este conjugarea corectă pentru 'mitkommen' (a veni cu) la persoana I plural (wir)?",
            verb: "mitkommen",
            person: "wir", 
            options: ["kommen mit", "kommt mit", "kommst mit", "komme mit"],
            correctAnswer: "kommen mit",
            explanation: "La persoana I plural (wir), verbul 'kommen' rămâne în forma de bază 'kommen'. Prefixul 'mit' se pune la sfârșitul propoziției: 'Wir kommen mit.'",
            rule: "REGULĂ: La persoana I plural (wir) și a III-a plural (sie), verbul rămâne în forma infinitivului fără 'zu'."
        },

        // 12. Fill-in conjugation blanks (4 exercises)
        {
            id: 32,
            type: "fill-conjugation-blanks",
            difficulty: "A1",
            question: "Completează cu forma corectă: Du _____ heute früh _____ (aufwachen - a se trezi).",
            verb: "aufwachen",
            person: "du",
            correctAnswer: "wachst|auf",
            explanation: "Verbul 'aufwachen' la persoana a II-a singular (du) se conjugă: 'wachst' + prefixul 'auf' la sfârșit. Conjugarea: du wachst auf.",
            rule: "REGULĂ: Persoana a II-a singular (du) primește terminația -st: du wachst, du machst, du gehst."
        },
        {
            id: 33,
            type: "fill-conjugation-blanks", 
            difficulty: "A1",
            question: "Completează: Sie (ea) _____ die Tür _____ (aufmachen - a deschide).",
            verb: "aufmachen",
            person: "sie",
            correctAnswer: "macht|auf",
            explanation: "Verbul 'aufmachen' la persoana a III-a singular feminin (sie) se conjugă: 'macht' + prefixul 'auf'. Conjugarea: sie macht auf.",
            rule: "REGULĂ: Persoana a III-a singular (er/sie/es) primește terminația -t: er macht, sie kommt, es geht."
        },
        {
            id: 34,
            type: "fill-conjugation-blanks",
            difficulty: "A1", 
            question: "Completează cu forma corectă: Ihr _____ morgen _____ (ankommen - a ajunge).",
            verb: "ankommen",
            person: "ihr",
            correctAnswer: "kommt|an",
            explanation: "Verbul 'ankommen' la persoana a II-a plural (ihr) se conjugă: 'kommt' + prefixul 'an' la sfârșit. Conjugarea: ihr kommt an.",
            rule: "REGULĂ: Persoana a II-a plural (ihr) primește terminația -t: ihr kommt, ihr macht, ihr geht."
        },
        {
            id: 35,
            type: "fill-conjugation-blanks",
            difficulty: "A1",
            question: "Completează: Wir _____ unsere Freunde _____ (einladen - a invita).",
            verb: "einladen", 
            person: "wir",
            correctAnswer: "laden|ein",
            explanation: "Verbul 'einladen' la persoana I plural (wir) se conjugă: 'laden' (forma de bază) + prefixul 'ein'. Conjugarea: wir laden ein. Atenție: nu este 'läden'!",
            rule: "REGULĂ: La plural (wir, ihr, sie), nu se schimbă vocala principală: wir laden (nu läden), ihr fahrt (nu fährt)."
        }
    ]
};

// Export for use in test runner
if (typeof module !== 'undefined' && module.exports) {
    module.exports = trennbareVerbenExercises;
}