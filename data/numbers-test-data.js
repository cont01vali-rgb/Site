// Numbers Test Data - German Numbers (0-9999)
// Exerciții aleatorii pentru testarea numerelor germane

const numbersTestData = {
    // Numere de bază 0-20 (pentru fill-in și audio)
    basicNumbers: [
        { number: 0, german: "null", audio: "null" },
        { number: 1, german: "eins", audio: "eins" },
        { number: 2, german: "zwei", audio: "zwei" },
        { number: 3, german: "drei", audio: "drei" },
        { number: 4, german: "vier", audio: "vier" },
        { number: 5, german: "fünf", audio: "fünf" },
        { number: 6, german: "sechs", audio: "sechs" },
        { number: 7, german: "sieben", audio: "sieben" },
        { number: 8, german: "acht", audio: "acht" },
        { number: 9, german: "neun", audio: "neun" },
        { number: 10, german: "zehn", audio: "zehn" },
        { number: 11, german: "elf", audio: "elf" },
        { number: 12, german: "zwölf", audio: "zwölf" },
        { number: 13, german: "dreizehn", audio: "dreizehn" },
        { number: 14, german: "vierzehn", audio: "vierzehn" },
        { number: 15, german: "fünfzehn", audio: "fünfzehn" },
        { number: 16, german: "sechzehn", audio: "sechzehn" },
        { number: 17, german: "siebzehn", audio: "siebzehn" },
        { number: 18, german: "achtzehn", audio: "achtzehn" },
        { number: 19, german: "neunzehn", audio: "neunzehn" },
        { number: 20, german: "zwanzig", audio: "zwanzig" }
    ],

    // Zeci (20-90)
    tens: [
        { number: 20, german: "zwanzig", audio: "zwanzig" },
        { number: 30, german: "dreißig", audio: "dreißig" },
        { number: 40, german: "vierzig", audio: "vierzig" },
        { number: 50, german: "fünfzig", audio: "fünfzig" },
        { number: 60, german: "sechzig", audio: "sechzig" },
        { number: 70, german: "siebzig", audio: "siebzig" },
        { number: 80, german: "achtzig", audio: "achtzig" },
        { number: 90, german: "neunzig", audio: "neunzig" }
    ],

    // Numere complexe (21-99, 100-999, 1000-9999)
    complexNumbers: [
        { number: 21, german: "einundzwanzig", audio: "einundzwanzig" },
        { number: 35, german: "fünfunddreißig", audio: "fünfunddreißig" },
        { number: 48, german: "achtundvierzig", audio: "achtundvierzig" },
        { number: 73, german: "dreiundsiebzig", audio: "dreiundsiebzig" },
        { number: 99, german: "neunundneunzig", audio: "neunundneunzig" },
        { number: 100, german: "hundert", audio: "hundert" },
        { number: 101, german: "hunderteins", audio: "hunderteins" },
        { number: 115, german: "hundertfünfzehn", audio: "hundertfünfzehn" },
        { number: 230, german: "zweihundertdreißig", audio: "zweihundertdreißig" },
        { number: 342, german: "dreihundertzweiundvierzig", audio: "dreihundertzweiundvierzig" },
        { number: 456, german: "vierhundertsechsundfünfzig", audio: "vierhundertsechsundfünfzig" },
        { number: 789, german: "siebenhundertneunundachtzig", audio: "siebenhundertneunundachtzig" },
        { number: 999, german: "neunhundertneunundneunzig", audio: "neunhundertneunundneunzig" },
        { number: 1000, german: "tausend", audio: "tausend" },
        { number: 1001, german: "tausendeins", audio: "tausendeins" },
        { number: 1234, german: "tausendzweihundertvierunddreißig", audio: "tausendzweihundertvierunddreißig" },
        { number: 2016, german: "zweitausendsechzehn", audio: "zweitausendsechzehn" },
        { number: 3456, german: "dreitausendvierhundertsechsundfünfzig", audio: "dreitausendvierhundertsechsundfünfzig" },
        { number: 5678, german: "fünftausendsechshundertachtundsiebzig", audio: "fünftausendsechshundertachtundsiebzig" },
        { number: 7890, german: "siebentausendachthundertneunzig", audio: "siebentausendachthundertneunzig" },
        { number: 9999, german: "neuntausendneunhundertneunundneunzig", audio: "neuntausendneunhundertneunundneunzig" }
    ],

    // Traduceri și explicații
    translations: {
        ro: {
            test_title: "Test: Numerele în Germană (0-9999)",
            progress_text: "Întrebare",
            score_text: "Scor",
            verify_button: "Verifică",
            next_button: "Următoarea întrebare",
            back_to_lesson: "← Înapoi la lecție",
            
            // Tipuri de exerciții
            fill_in_title: "🔢 Completează cu numărul în germană",
            audio_title: "🎵 Ascultă și scrie numărul",
            multiple_choice_title: "🤔 Alege răspunsul corect",
            
            // Mesaje de feedback
            correct_answer: "🎉 Excelent! Răspuns corect!",
            wrong_answer: "❌ Nu este corect. Încearcă din nou!",
            correct_answer_was: "Răspunsul corect era",
            
            // Explicații pentru reguli
            basic_numbers_rule: "Numerele de bază (0-20) se învață pe dinafară ca forme speciale.",
            compound_numbers_rule: "Pentru 21-99: unitate + und + zeci (ex: einundzwanzig = unu și douăzeci)",
            hundreds_rule: "Sutele: numărul + hundert (ex: dreihundert = trei sute)",
            thousands_rule: "Miile: numărul + tausend (ex: zweitausend = două mii)",
            special_forms_rule: "Atenție la formele speciale: sechzehn (16), siebzehn (17), dreißig (30), vierzig (40)"
        },
        en: {
            test_title: "Test: German Numbers (0-9999)",
            progress_text: "Question",
            score_text: "Score", 
            verify_button: "Check",
            next_button: "Next question",
            back_to_lesson: "← Back to lesson"
        },
        ua: {
            test_title: "Тест: Німецькі числівники (0-9999)",
            progress_text: "Питання",
            score_text: "Оцінка",
            verify_button: "Перевірити", 
            next_button: "Наступне питання",
            back_to_lesson: "← Назад до уроку"
        }
    },

    // Generare exerciții aleatorii
    generateRandomExercises: function() {
        const exercises = [];
        const usedNumbers = new Set();
        
        // 5 exerciții fill-in (din toate categoriile)
        for (let i = 0; i < 5; i++) {
            const data = this.getRandomNumberData(usedNumbers);
            exercises.push({
                type: 'fill-in',
                id: exercises.length + 1,
                number: data.number,
                correctAnswer: data.german,
                explanation: this.getExplanationForNumber(data.number),
                rule: this.getRuleForNumber(data.number)
            });
        }
        
        // 5 exerciții audio 
        for (let i = 0; i < 5; i++) {
            const data = this.getRandomNumberData(usedNumbers);
            exercises.push({
                type: 'audio',
                id: exercises.length + 1,
                number: data.number,
                german: data.german,
                correctAnswer: data.number.toString(),
                explanation: this.getExplanationForNumber(data.number),
                rule: this.getRuleForNumber(data.number)
            });
        }
        
        // 5 exerciții multiple choice
        for (let i = 0; i < 5; i++) {
            const data = this.getRandomNumberData(usedNumbers);
            const wrongOptions = this.generateWrongOptions(data);
            exercises.push({
                type: 'multiple-choice',
                id: exercises.length + 1,
                number: data.number,
                correctAnswer: data.german,
                options: this.shuffleArray([data.german, ...wrongOptions]),
                explanation: this.getExplanationForNumber(data.number),
                rule: this.getRuleForNumber(data.number)
            });
        }
        
        return this.shuffleArray(exercises);
    },

    getRandomNumberData: function(usedNumbers) {
        const allNumbers = [...this.basicNumbers, ...this.tens, ...this.complexNumbers];
        let data;
        do {
            data = allNumbers[Math.floor(Math.random() * allNumbers.length)];
        } while (usedNumbers.has(data.number));
        
        usedNumbers.add(data.number);
        return data;
    },

    generateWrongOptions: function(correctData) {
        const allNumbers = [...this.basicNumbers, ...this.tens, ...this.complexNumbers];
        const wrongOptions = [];
        const correctAnswer = correctData.german;
        
        while (wrongOptions.length < 3) {
            const randomData = allNumbers[Math.floor(Math.random() * allNumbers.length)];
            if (randomData.german !== correctAnswer && !wrongOptions.includes(randomData.german)) {
                wrongOptions.push(randomData.german);
            }
        }
        
        return wrongOptions;
    },

    getExplanationForNumber: function(number) {
        if (number <= 20) {
            return `Numărul ${number} este o formă de bază care se învață pe dinafară.`;
        } else if (number <= 99) {
            if (number % 10 === 0) {
                return `Numărul ${number} este o zeci care se formează cu terminația -zig.`;
            } else {
                const units = number % 10;
                const tens = Math.floor(number / 10) * 10;
                return `Numărul ${number} se formează: unitatea (${units}) + "und" + zecile (${tens}).`;
            }
        } else if (number <= 999) {
            const hundreds = Math.floor(number / 100);
            return `Numărul ${number} se formează cu ${hundreds} + "hundert" + restul.`;
        } else {
            const thousands = Math.floor(number / 1000);
            return `Numărul ${number} se formează cu ${thousands} + "tausend" + restul.`;
        }
    },

    getRuleForNumber: function(number) {
        if (number <= 20) {
            return "REGULĂ: Numerele 0-20 sunt forme de bază care se memorează.";
        } else if (number <= 99) {
            return "REGULĂ: Pentru 21-99 → unitate + 'und' + zeci (ordinea inversă față de română).";
        } else if (number <= 999) {
            return "REGULĂ: Pentru sute → numărul + 'hundert' + restul (într-un singur cuvânt).";
        } else {
            return "REGULĂ: Pentru mii → numărul + 'tausend' + restul (într-un singur cuvânt).";
        }
    },

    shuffleArray: function(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
};

// Export pentru utilizare în test runner
if (typeof module !== 'undefined' && module.exports) {
    module.exports = numbersTestData;
}