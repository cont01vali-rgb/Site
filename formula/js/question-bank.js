/*************************************************
 * FORMULA LEARNING - EXPANDED QUESTION BANK
 * Larger German question database for variety
 *************************************************/

const germanQuestionBank = [
    // Basic Vocabulary - Easy
    {
        id: 1,
        text: "What is the German word for 'car'?",
        options: ["Auto", "Haus", "Buch", "Wasser"],
        correct: 0,
        explanation: "Das Auto = the car. This is a fundamental vocabulary word in German.",
        difficulty: "easy",
        category: "vocabulary"
    },
    {
        id: 2,
        text: "How do you say 'hello' in German?",
        options: ["Auf Wiedersehen", "Hallo", "Danke", "Bitte"],
        correct: 1,
        explanation: "Hallo = hello. A basic greeting in German.",
        difficulty: "easy",
        category: "greetings"
    },
    {
        id: 3,
        text: "What does 'Danke' mean?",
        options: ["Please", "Thank you", "Excuse me", "Hello"],
        correct: 1,
        explanation: "Danke = thank you. Essential polite expression.",
        difficulty: "easy",
        category: "politeness"
    },
    {
        id: 4,
        text: "What is the German word for 'water'?",
        options: ["Milch", "Wasser", "Bier", "Kaffee"],
        correct: 1,
        explanation: "Das Wasser = water. Important basic noun.",
        difficulty: "easy",
        category: "vocabulary"
    },
    {
        id: 5,
        text: "How do you say 'yes' in German?",
        options: ["Nein", "Ja", "Vielleicht", "Nie"],
        correct: 1,
        explanation: "Ja = yes. One of the first words to learn.",
        difficulty: "easy",
        category: "basic"
    },

    // Articles and Gender - Medium
    {
        id: 6,
        text: "Which article goes with 'Mädchen' (girl)?",
        options: ["der", "die", "das", "dem"],
        correct: 2,
        explanation: "Das Mädchen - despite referring to a girl, 'Mädchen' is neuter because it ends in '-chen'.",
        difficulty: "medium",
        category: "articles"
    },
    {
        id: 7,
        text: "What is the correct article for 'Mann' (man)?",
        options: ["der", "die", "das", "den"],
        correct: 0,
        explanation: "Der Mann - masculine nouns typically use 'der'.",
        difficulty: "medium",
        category: "articles"
    },
    {
        id: 8,
        text: "Which article belongs to 'Frau' (woman)?",
        options: ["der", "die", "das", "dem"],
        correct: 1,
        explanation: "Die Frau - feminine nouns use 'die'.",
        difficulty: "medium",
        category: "articles"
    },
    {
        id: 9,
        text: "What article goes with 'Kind' (child)?",
        options: ["der", "die", "das", "den"],
        correct: 2,
        explanation: "Das Kind - neuter noun uses 'das'.",
        difficulty: "medium",
        category: "articles"
    },

    // Plurals - Medium
    {
        id: 10,
        text: "What is the correct plural of 'Buch' (book)?",
        options: ["Buchs", "Bücher", "Buchen", "Büchs"],
        correct: 1,
        explanation: "Die Bücher - many German nouns form plurals with umlaut changes.",
        difficulty: "medium",
        category: "plurals"
    },
    {
        id: 11,
        text: "What is the plural of 'Auto' (car)?",
        options: ["Autos", "Auten", "Auti", "Autoer"],
        correct: 0,
        explanation: "Die Autos - some German nouns simply add 's' for plural.",
        difficulty: "medium",
        category: "plurals"
    },
    {
        id: 12,
        text: "What is the plural of 'Mann' (man)?",
        options: ["Mans", "Männer", "Manne", "Männe"],
        correct: 1,
        explanation: "Die Männer - plural with umlaut change and '-er' ending.",
        difficulty: "medium",
        category: "plurals"
    },

    // Verb Conjugation - Medium
    {
        id: 13,
        text: "How do you say 'I am learning German'?",
        options: ["Ich lerne Deutsch", "Ich lernt Deutsch", "Ich lernst Deutsch", "Ich lernen Deutsch"],
        correct: 0,
        explanation: "Ich lerne Deutsch - 'ich' (I) takes the '-e' ending with regular verbs.",
        difficulty: "medium",
        category: "verbs"
    },
    {
        id: 14,
        text: "Choose the correct form: 'Die Kinder _____ gern.'",
        options: ["spielt", "spielen", "spielst", "spiele"],
        correct: 1,
        explanation: "Die Kinder spielen gern - plural subjects take the '-en' ending.",
        difficulty: "medium",
        category: "verbs"
    },
    {
        id: 15,
        text: "How do you say 'You (informal) have'?",
        options: ["du hast", "du haben", "du hat", "du habt"],
        correct: 0,
        explanation: "Du hast - irregular verb 'haben' with 'du' form.",
        difficulty: "medium",
        category: "verbs"
    },

    // Time and Numbers - Medium
    {
        id: 16,
        text: "What time is it? Es ist halb acht.",
        options: ["7:30", "8:30", "7:15", "8:15"],
        correct: 0,
        explanation: "Halb acht = half eight = 7:30. In German, 'half eight' means 30 minutes before eight.",
        difficulty: "medium",
        category: "time"
    },
    {
        id: 17,
        text: "How do you say 'twenty' in German?",
        options: ["zwölf", "zwanzig", "dreißig", "vierzig"],
        correct: 1,
        explanation: "Zwanzig = twenty. Important number to know.",
        difficulty: "medium",
        category: "numbers"
    },
    {
        id: 18,
        text: "What does 'Viertel vor acht' mean?",
        options: ["7:45", "8:15", "7:15", "8:45"],
        correct: 0,
        explanation: "Viertel vor acht = quarter before eight = 7:45.",
        difficulty: "medium",
        category: "time"
    },

    // Cases - Hard
    {
        id: 19,
        text: "Which is the accusative form of 'der Mann'?",
        options: ["der Mann", "dem Mann", "den Mann", "des Mannes"],
        correct: 2,
        explanation: "Den Mann - masculine nouns change from 'der' to 'den' in accusative case.",
        difficulty: "hard",
        category: "cases"
    },
    {
        id: 20,
        text: "What is the genitive form of 'das Kind'?",
        options: ["das Kindes", "des Kindes", "dem Kind", "den Kind"],
        correct: 1,
        explanation: "Des Kindes - neuter nouns in genitive use 'des' + often add '-es' ending.",
        difficulty: "hard",
        category: "cases"
    },
    {
        id: 21,
        text: "Which preposition requires accusative case?",
        options: ["mit", "durch", "von", "bei"],
        correct: 1,
        explanation: "Durch requires accusative case. Mit, von, and bei require dative case.",
        difficulty: "hard",
        category: "cases"
    },

    // Modal Verbs - Hard
    {
        id: 22,
        text: "Which modal verb means 'can/to be able to'?",
        options: ["müssen", "wollen", "können", "sollen"],
        correct: 2,
        explanation: "Können = can/to be able to. Essential modal verb for expressing ability.",
        difficulty: "hard",
        category: "modals"
    },
    {
        id: 23,
        text: "What does 'Ich muss gehen' mean?",
        options: ["I want to go", "I can go", "I should go", "I must go"],
        correct: 3,
        explanation: "Ich muss gehen = I must go. 'Müssen' expresses necessity.",
        difficulty: "hard",
        category: "modals"
    },
    {
        id: 24,
        text: "Choose the correct form: 'Du _____ das machen.'",
        options: ["sollst", "sollen", "soll", "sollt"],
        correct: 0,
        explanation: "Du sollst - 'sollen' with 'du' takes 'sollst' form.",
        difficulty: "hard",
        category: "modals"
    },

    // Advanced Vocabulary - Hard
    {
        id: 25,
        text: "What does 'Entschuldigung' mean?",
        options: ["Thank you", "Excuse me", "Good morning", "Goodbye"],
        correct: 1,
        explanation: "Entschuldigung = Excuse me/Sorry. A very useful polite expression in German.",
        difficulty: "medium",
        category: "politeness"
    },
    {
        id: 26,
        text: "How do you say 'My name is...' in German?",
        options: ["Mein Name bin...", "Mein Name ist...", "Mein Name hat...", "Mein Name wird..."],
        correct: 1,
        explanation: "Mein Name ist... - 'ist' (is) is the correct verb form with 'Name'.",
        difficulty: "easy",
        category: "introduction"
    },
    {
        id: 27,
        text: "What does 'Geschwindigkeit' mean?",
        options: ["Distance", "Speed", "Time", "Position"],
        correct: 1,
        explanation: "Geschwindigkeit = speed/velocity. Perfect for F1 racing!",
        difficulty: "hard",
        category: "vocabulary"
    },
    {
        id: 28,
        text: "What is the German word for 'victory'?",
        options: ["Niederlage", "Sieg", "Rennen", "Start"],
        correct: 1,
        explanation: "Der Sieg = victory. Aim for the Sieg in your race!",
        difficulty: "medium",
        category: "vocabulary"
    },

    // Racing-themed vocabulary
    {
        id: 29,
        text: "What is the German word for 'fast'?",
        options: ["schnell", "langsam", "groß", "klein"],
        correct: 0,
        explanation: "Schnell = fast. Essential word for racing!",
        difficulty: "easy",
        category: "racing"
    },
    {
        id: 30,
        text: "How do you say 'race' in German?",
        options: ["das Spiel", "das Rennen", "der Sport", "die Fahrt"],
        correct: 1,
        explanation: "Das Rennen = the race. Perfect for our F1 theme!",
        difficulty: "medium",
        category: "racing"
    },

    // Food and Drinks
    {
        id: 31,
        text: "What is the German word for 'bread'?",
        options: ["Butter", "Brot", "Käse", "Fleisch"],
        correct: 1,
        explanation: "Das Brot = bread. Important food vocabulary.",
        difficulty: "easy",
        category: "food"
    },
    {
        id: 32,
        text: "How do you say 'coffee' in German?",
        options: ["Tee", "Milch", "Kaffee", "Saft"],
        correct: 2,
        explanation: "Der Kaffee = coffee. Same as in English!",
        difficulty: "easy",
        category: "drinks"
    },

    // Colors
    {
        id: 33,
        text: "What is the German word for 'red'?",
        options: ["blau", "grün", "rot", "gelb"],
        correct: 2,
        explanation: "Rot = red. Like the Ferrari red in F1!",
        difficulty: "easy",
        category: "colors"
    },
    {
        id: 34,
        text: "How do you say 'blue' in German?",
        options: ["blau", "braun", "schwarz", "weiß"],
        correct: 0,
        explanation: "Blau = blue. Another basic color.",
        difficulty: "easy",
        category: "colors"
    },

    // Family
    {
        id: 35,
        text: "What is the German word for 'mother'?",
        options: ["Vater", "Mutter", "Schwester", "Bruder"],
        correct: 1,
        explanation: "Die Mutter = mother. Important family vocabulary.",
        difficulty: "easy",
        category: "family"
    },
    {
        id: 36,
        text: "How do you say 'father' in German?",
        options: ["Vater", "Onkel", "Opa", "Sohn"],
        correct: 0,
        explanation: "Der Vater = father. Basic family term.",
        difficulty: "easy",
        category: "family"
    }
];

// Function to get random questions by difficulty and count
function getRandomQuestions(count, difficulty = 'mixed') {
    let availableQuestions = [...germanQuestionBank];
    
    if (difficulty !== 'mixed') {
        availableQuestions = germanQuestionBank.filter(q => q.difficulty === difficulty);
    }
    
    // Shuffle the questions
    const shuffled = availableQuestions.sort(() => Math.random() - 0.5);
    
    // Return the requested count
    return shuffled.slice(0, count);
}

// Function to get questions by category
function getQuestionsByCategory(category, count = 5) {
    const categoryQuestions = germanQuestionBank.filter(q => q.category === category);
    const shuffled = categoryQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Function to get mixed difficulty questions for balanced gameplay
function getBalancedQuestions(totalCount) {
    const easyCount = Math.floor(totalCount * 0.4);    // 40% easy
    const mediumCount = Math.floor(totalCount * 0.4);  // 40% medium  
    const hardCount = totalCount - easyCount - mediumCount; // 20% hard
    
    const easyQuestions = getRandomQuestions(easyCount, 'easy');
    const mediumQuestions = getRandomQuestions(mediumCount, 'medium');
    const hardQuestions = getRandomQuestions(hardCount, 'hard');
    
    // Mix them together and shuffle
    const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
    return allQuestions.sort(() => Math.random() - 0.5);
}

// Export for use in race-engine.js
if (typeof window !== 'undefined') {
    window.GermanQuestionBank = {
        getAllQuestions: () => germanQuestionBank,
        getRandomQuestions,
        getQuestionsByCategory,
        getBalancedQuestions,
        getTotalQuestionCount: () => germanQuestionBank.length
    };
}