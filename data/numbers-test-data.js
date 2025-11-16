// Numbers Test Data - German Numbers (0-9999)
// Exerciții simple pentru testarea numerelor germane

const numbersTestData = {
    // Toate numerele disponibile pentru testare
    allNumbers: [
        { number: 0, german: "null" },
        { number: 1, german: "eins" },
        { number: 2, german: "zwei" },
        { number: 3, german: "drei" },
        { number: 4, german: "vier" },
        { number: 5, german: "fünf" },
        { number: 6, german: "sechs" },
        { number: 7, german: "sieben" },
        { number: 8, german: "acht" },
        { number: 9, german: "neun" },
        { number: 10, german: "zehn" },
        { number: 11, german: "elf" },
        { number: 12, german: "zwölf" },
        { number: 13, german: "dreizehn" },
        { number: 14, german: "vierzehn" },
        { number: 15, german: "fünfzehn" },
        { number: 16, german: "sechzehn" },
        { number: 17, german: "siebzehn" },
        { number: 18, german: "achtzehn" },
        { number: 19, german: "neunzehn" },
        { number: 20, german: "zwanzig" },
        { number: 21, german: "einundzwanzig" },
        { number: 22, german: "zweiundzwanzig" },
        { number: 23, german: "dreiundzwanzig" },
        { number: 24, german: "vierundzwanzig" },
        { number: 25, german: "fünfundzwanzig" },
        { number: 26, german: "sechsundzwanzig" },
        { number: 27, german: "siebenundzwanzig" },
        { number: 28, german: "achtundzwanzig" },
        { number: 29, german: "neunundzwanzig" },
        { number: 30, german: "dreißig" },
        { number: 31, german: "einunddreißig" },
        { number: 32, german: "zweiunddreißig" },
        { number: 33, german: "dreiunddreißig" },
        { number: 34, german: "vierunddreißig" },
        { number: 35, german: "fünfunddreißig" },
        { number: 36, german: "sechsunddreißig" },
        { number: 37, german: "siebenunddreißig" },
        { number: 38, german: "achtunddreißig" },
        { number: 39, german: "neununddreißig" },
        { number: 40, german: "vierzig" },
        { number: 41, german: "einundvierzig" },
        { number: 42, german: "zweiundvierzig" },
        { number: 43, german: "dreiundvierzig" },
        { number: 44, german: "vierundvierzig" },
        { number: 45, german: "fünfundvierzig" },
        { number: 46, german: "sechsundvierzig" },
        { number: 47, german: "siebenundvierzig" },
        { number: 48, german: "achtundvierzig" },
        { number: 49, german: "neunundvierzig" },
        { number: 50, german: "fünfzig" },
        { number: 51, german: "einundfünfzig" },
        { number: 52, german: "zweiundfünfzig" },
        { number: 53, german: "dreiundfünfzig" },
        { number: 54, german: "vierundfünfzig" },
        { number: 55, german: "fünfundfünfzig" },
        { number: 56, german: "sechsundfünfzig" },
        { number: 57, german: "siebenundfünfzig" },
        { number: 58, german: "achtundfünfzig" },
        { number: 59, german: "neunundfünfzig" },
        { number: 60, german: "sechzig" },
        { number: 61, german: "einundsechzig" },
        { number: 62, german: "zweiundsechzig" },
        { number: 63, german: "dreiundsechzig" },
        { number: 64, german: "vierundsechzig" },
        { number: 65, german: "fünfundsechzig" },
        { number: 66, german: "sechsundsechzig" },
        { number: 67, german: "siebenundsechzig" },
        { number: 68, german: "achtundsechzig" },
        { number: 69, german: "neunundsechzig" },
        { number: 70, german: "siebzig" },
        { number: 71, german: "einundsiebzig" },
        { number: 72, german: "zweiundsiebzig" },
        { number: 73, german: "dreiundsiebzig" },
        { number: 74, german: "vierundsiebzig" },
        { number: 75, german: "fünfundsiebzig" },
        { number: 76, german: "sechsundsiebzig" },
        { number: 77, german: "siebenundsiebzig" },
        { number: 78, german: "achtundsiebzig" },
        { number: 79, german: "neunundsiebzig" },
        { number: 80, german: "achtzig" },
        { number: 81, german: "einundachtzig" },
        { number: 82, german: "zweiundachtzig" },
        { number: 83, german: "dreiundachtzig" },
        { number: 84, german: "vierundachtzig" },
        { number: 85, german: "fünfundachtzig" },
        { number: 86, german: "sechsundachtzig" },
        { number: 87, german: "siebenundachtzig" },
        { number: 88, german: "achtundachtzig" },
        { number: 89, german: "neunundachtzig" },
        { number: 90, german: "neunzig" },
        { number: 91, german: "einundneunzig" },
        { number: 92, german: "zweiundneunzig" },
        { number: 93, german: "dreiundneunzig" },
        { number: 94, german: "vierundneunzig" },
        { number: 95, german: "fünfundneunzig" },
        { number: 96, german: "sechsundneunzig" },
        { number: 97, german: "siebenundneunzig" },
        { number: 98, german: "achtundneunzig" },
        { number: 99, german: "neunundneunzig" },
        { number: 100, german: "hundert" },
        { number: 101, german: "hunderteins" },
        { number: 111, german: "hundertelf" },
        { number: 123, german: "hundertdreiundzwanzig" },
        { number: 200, german: "zweihundert" },
        { number: 205, german: "zweihundertfünf" },
        { number: 212, german: "zweihundertzwölf" },
        { number: 221, german: "zweihunderteinundzwanzig" },
        { number: 234, german: "zweihundertvierunddreißig" },
        { number: 250, german: "zweihundertfünfzig" },
        { number: 267, german: "zweihundertsiebenundsechzig" },
        { number: 289, german: "zweihundertneunundachtzig" },
        { number: 300, german: "dreihundert" },
        { number: 315, german: "dreihundertfünfzehn" },
        { number: 332, german: "dreihundertzweiunddreißig" },
        { number: 345, german: "dreihundertfünfundvierzig" },
        { number: 378, german: "dreihundertachtundsiebzig" },
        { number: 400, german: "vierhundert" },
        { number: 411, german: "vierhundertelf" },
        { number: 432, german: "vierhundertzweiunddreißig" },
        { number: 456, german: "vierhundertsechsundfünfzig" },
        { number: 489, german: "vierhundertneunundachtzig" },
        { number: 500, german: "fünfhundert" },
        { number: 517, german: "fünfhundertsiebzehn" },
        { number: 543, german: "fünfhundertdreiundvierzig" },
        { number: 567, german: "fünfhundertsiebenundsechzig" },
        { number: 591, german: "fünfhunderteinundneunzig" },
        { number: 600, german: "sechshundert" },
        { number: 624, german: "sechshundertvierundzwanzig" },
        { number: 655, german: "sechshundertfünfundfünfzig" },
        { number: 678, german: "sechshundertachtundsiebzig" },
        { number: 700, german: "siebenhundert" },
        { number: 719, german: "siebenhundertneunzehn" },
        { number: 746, german: "siebenhundertsechsundvierzig" },
        { number: 789, german: "siebenhundertneunundachtzig" },
        { number: 800, german: "achthundert" },
        { number: 825, german: "achthundertfünfundzwanzig" },
        { number: 857, german: "achthundertsiebenundfünfzig" },
        { number: 890, german: "achthundertneunzig" },
        { number: 900, german: "neunhundert" },
        { number: 913, german: "neunhundertdreizehn" },
        { number: 948, german: "neunhundertachtundvierzig" },
        { number: 975, german: "neunhundertfünfundsiebzig" },
        { number: 999, german: "neunhundertneunundneunzig" },
        { number: 1000, german: "tausend" },
        { number: 1001, german: "tausendeins" },
        { number: 1111, german: "tausendelf" },
        { number: 1234, german: "tausendzweihundertvierunddreißig" },
        { number: 2000, german: "zweitausend" },
        { number: 2345, german: "zweitausenddreihundertfünfundvierzig" },
        { number: 3456, german: "dreitausendvierhundertsechsundfünfzig" },
        { number: 4567, german: "viertausendfünfhundertsiebenundsechzig" },
        { number: 5678, german: "fünftausendsechshundertachtundsiebzig" },
        { number: 6789, german: "sechstausendsiebenhundertneunundachtzig" },
        { number: 7890, german: "siebentausendachthundertneunzig" },
        { number: 8901, german: "achttausendneunhunderteins" },
        { number: 9999, german: "neuntausendneunhundertneunundneunzig" }
    ],

    // Funcție pentru colorarea numerelor germane
    colorizeGermanNumber: function(germanNumber) {
        let colorizedNumber = germanNumber;

        // 1. Mai întâi colorează formele speciale complete (0-19)
        const specialNumbers = ['null', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
        specialNumbers.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'g');
            colorizedNumber = colorizedNumber.replace(regex, `<span class="number-special">${word}</span>`);
        });

        // 2. Colorează prefixele pentru sute (ein, zwei, drei etc. + hundert)
        const unitPrefixes = ['ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
        unitPrefixes.forEach(unit => {
            // Pentru sute: "einh", "zweih", etc.
            const hundredRegex = new RegExp(`\\b(${unit})(?=hundert)`, 'g');
            colorizedNumber = colorizedNumber.replace(hundredRegex, `<span class="number-unit">$1</span>`);
            
            // Pentru mii: "eint", "zweit", etc.
            const thousandRegex = new RegExp(`\\b(${unit})(?=tausend)`, 'g');
            colorizedNumber = colorizedNumber.replace(thousandRegex, `<span class="number-unit">$1</span>`);
            
            // Pentru unități în numerele compuse (21-99): "einund", "zweiund", etc.
            const compoundRegex = new RegExp(`\\b(${unit})(?=und)`, 'g');
            colorizedNumber = colorizedNumber.replace(compoundRegex, `<span class="number-unit">$1</span>`);
        });

        // 3. Colorează "hundert"
        colorizedNumber = colorizedNumber.replace(/\bhundert\b/g, '<span class="number-hundreds">hundert</span>');

        // 4. Colorează "tausend"  
        colorizedNumber = colorizedNumber.replace(/\btausend\b/g, '<span class="number-thousands">tausend</span>');

        // 5. Colorează zecile
        const tens = ['zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
        tens.forEach(ten => {
            const regex = new RegExp(`\\b${ten}\\b`, 'g');
            colorizedNumber = colorizedNumber.replace(regex, `<span class="number-tens">${ten}</span>`);
        });

        // 6. Colorează "zehn" (când apare separat, nu în 10-19)
        colorizedNumber = colorizedNumber.replace(/\bzehn(?![\w])/g, '<span class="number-tens">zehn</span>');

        // 7. Colorează conectorul "und"
        colorizedNumber = colorizedNumber.replace(/\bund\b/g, '<span class="number-connector">und</span>');

        return colorizedNumber;
    },

    // Generare exerciții variate (fill-in, audio, multiple choice)
    generateRandomExercises: function(count = 18) {
        console.log("📝 Generez exerciții pentru test...");
        
        const exercises = [];
        const usedNumbers = new Set();
        
        // Verifică dacă avem date
        if (!this.allNumbers || this.allNumbers.length === 0) {
            console.error("❌ Nu am date pentru numere!");
            return [];
        }

        console.log(`✅ Am ${this.allNumbers.length} numere disponibile`);

        // Tipuri de exerciții cu distribuție echitabilă
        const exerciseTypes = ['fill-in', 'audio', 'multiple-choice'];
        const exercisesPerType = Math.ceil(count / exerciseTypes.length);

        exerciseTypes.forEach((type, typeIndex) => {
            for (let i = 0; i < exercisesPerType && exercises.length < count; i++) {
                // Alege un număr random care nu a fost folosit
                let numberData;
                let attempts = 0;
                do {
                    const randomIndex = Math.floor(Math.random() * this.allNumbers.length);
                    numberData = this.allNumbers[randomIndex];
                    attempts++;
                } while (usedNumbers.has(numberData.number) && attempts < 50);
                
                if (attempts >= 50) {
                    // Dacă nu găsim număr nou, folosim unul random
                    const randomIndex = Math.floor(Math.random() * this.allNumbers.length);
                    numberData = this.allNumbers[randomIndex];
                }
                
                usedNumbers.add(numberData.number);
                
                // Colorează numărul german pentru afișare
                const colorizedGerman = this.colorizeGermanNumber(numberData.german);
                
                let exercise = {
                    id: exercises.length + 1,
                    type: type,
                    number: numberData.number,
                    german: numberData.german,
                    colorizedGerman: colorizedGerman
                };

                // Configurează exercițiul pe baza tipului
                if (type === 'fill-in') {
                    // Alternează între german-to-number și number-to-german
                    const isGermanToNumber = i % 2 === 0;
                    exercise.subtype = isGermanToNumber ? 'german-to-number' : 'number-to-german';
                    exercise.question = isGermanToNumber ? 
                        `Câte este: <span class="german-number-display">${colorizedGerman}</span>?` : 
                        `Cum se spune <span class="romanian-number">${numberData.number}</span> în germană?`;
                    exercise.correctAnswer = isGermanToNumber ? 
                        numberData.number.toString() : 
                        numberData.german;
                        
                } else if (type === 'audio') {
                    exercise.question = `🎵 Ascultă și scrie numărul în cifre:`;
                    exercise.correctAnswer = numberData.number.toString();
                    exercise.audioText = numberData.german;
                    
                } else if (type === 'multiple-choice') {
                    // Alternează între german-to-number și number-to-german
                    const isGermanToNumber = i % 2 === 0;
                    exercise.subtype = isGermanToNumber ? 'german-to-number' : 'number-to-german';
                    
                    if (isGermanToNumber) {
                        exercise.question = `Câte este: <span class="german-number-display">${colorizedGerman}</span>?`;
                        exercise.correctAnswer = numberData.number.toString();
                        exercise.options = this.generateMultipleChoiceNumbers(numberData.number);
                    } else {
                        exercise.question = `Cum se spune <span class="romanian-number">${numberData.number}</span> în germană?`;
                        exercise.correctAnswer = numberData.german;
                        exercise.options = this.generateMultipleChoiceWords(numberData.german);
                    }
                }
                
                exercises.push(exercise);
            }
        });

        // Amestecă exercițiile pentru varietate
        this.shuffleArray(exercises);

        console.log(`✅ Generat ${exercises.length} exerciții (${exerciseTypes.join(', ')})`);
        return exercises;
    },

    // Generează opțiuni multiple choice pentru numere
    generateMultipleChoiceNumbers: function(correctNumber) {
        const options = [correctNumber.toString()];
        const usedNumbers = new Set([correctNumber]);
        
        while (options.length < 4) {
            // Generează numere în aceeași categorie (2 cifre, 3 cifre, etc.)
            let wrongNumber;
            if (correctNumber < 100) {
                // Pentru numere 2 cifre, generează alte numere 2 cifre
                wrongNumber = Math.floor(Math.random() * 80) + 20; // 20-99
            } else if (correctNumber < 1000) {
                // Pentru numere 3 cifre
                wrongNumber = Math.floor(Math.random() * 900) + 100; // 100-999
            } else {
                // Pentru numere 4 cifre
                wrongNumber = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
            }
            
            if (!usedNumbers.has(wrongNumber)) {
                options.push(wrongNumber.toString());
                usedNumbers.add(wrongNumber);
            }
        }
        
        return this.shuffleArray(options);
    },

    // Generează opțiuni multiple choice pentru cuvinte germane
    generateMultipleChoiceWords: function(correctGerman) {
        const options = [correctGerman];
        const usedWords = new Set([correctGerman]);
        
        // Găsește numere similare din baza de date
        const similarNumbers = this.allNumbers.filter(num => {
            const german = num.german;
            // Exclude numărul corect și caută numere cu lungime similară
            return german !== correctGerman && 
                   Math.abs(german.length - correctGerman.length) <= 5;
        });
        
        while (options.length < 4 && similarNumbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * similarNumbers.length);
            const wrongGerman = similarNumbers[randomIndex].german;
            
            if (!usedWords.has(wrongGerman)) {
                options.push(wrongGerman);
                usedWords.add(wrongGerman);
                // Elimină din array pentru a evita repetarea
                similarNumbers.splice(randomIndex, 1);
            }
        }
        
        // Dacă nu avem destule opțiuni similare, adaugă aleatoriu
        while (options.length < 4) {
            const randomIndex = Math.floor(Math.random() * this.allNumbers.length);
            const wrongGerman = this.allNumbers[randomIndex].german;
            
            if (!usedWords.has(wrongGerman)) {
                options.push(wrongGerman);
                usedWords.add(wrongGerman);
            }
        }
        
        return this.shuffleArray(options);
    },

    // Funcție pentru amestecarea array-urilor
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