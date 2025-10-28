// Bancă de exerciții pentru testul Das Schulsystem
window.schulsystemExercises = [
  // ====== FILL (Completare) ======
  { 
    type: "fill", 
    question: {
      ro: "Ce înseamnă abrevierea \"AHS\"?",
      en: "What does the abbreviation \"AHS\" mean?",
      ua: "Що означає абревіатура \"AHS\"?"
    }, 
    answer: "Allgemeinbildende höhere Schule" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Ce înseamnă abrevierea \"BMS\"?",
      en: "What does the abbreviation \"BMS\" mean?",
      ua: "Що означає абревіатура \"BMS\"?"
    }, 
    answer: "Berufsbildende mittlere Schule" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Ce înseamnă abrevierea \"BHS\"?",
      en: "What does the abbreviation \"BHS\" mean?",
      ua: "Що означає абревіатура \"BHS\"?"
    }, 
    answer: "Berufsbildende höhere Schule" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Cum se numește școala primară în germană?",
      en: "What is primary school called in German?",
      ua: "Як називається початкова школа німецькою?"
    }, 
    answer: "Volksschule" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Cum se numește școala generală în germană?",
      en: "What is general school called in German?",
      ua: "Як називається загальна школа німецькою?"
    }, 
    answer: "Hauptschule" 
  },
  { 
    type: "fill", 
    question: {
      ro: "La ce vârstă începe Volksschule?",
      en: "At what age does Volksschule start?",
      ua: "У якому віці починається Volksschule?"
    }, 
    answer: "6" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Până la ce vârstă durează Volksschule?",
      en: "Until what age does Volksschule last?",
      ua: "До якого віку триває Volksschule?"
    }, 
    answer: "10" 
  },
  { 
    type: "fill", 
    question: {
      ro: "În ce clasă te înscrii la Polytechnische Schule?",
      en: "In which grade do you enroll in Polytechnische Schule?",
      ua: "У якому класі вступаєш до Polytechnische Schule?"
    }, 
    answer: "9" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Cum se numește ucenicul în germană?",
      en: "What is an apprentice called in German?",
      ua: "Як називається учень німецькою?"
    }, 
    answer: "der Lehrling" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Cu ce examen se termină AHS?",
      en: "With what exam does AHS end?",
      ua: "Яким іспитом закінчується AHS?"
    }, 
    answer: "Matura" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Câți ani durează Volksschule?",
      en: "How many years does Volksschule last?",
      ua: "Скільки років триває Volksschule?"
    }, 
    answer: "4" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Ce vârstă au elevii în Hauptschule?",
      en: "What age are students in Hauptschule?",
      ua: "Який вік мають учні в Hauptschule?"
    }, 
    answer: "10-14" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Care sunt cele două părți ale AHS?",
      en: "What are the two parts of AHS?",
      ua: "Які дві частини AHS?"
    }, 
    answer: "Unterstufe și Oberstufe" 
  },

  // ====== MULTIPLE CHOICE ======
  { 
    type: "multiple", 
    question: {
      ro: "Ce înseamnă AHS?",
      en: "What does AHS mean?",
      ua: "Що означає AHS?"
    }, 
    options: ["Allgemeinbildende höhere Schule", "Allgemeine Hauptschule", "Allgemeine höhere Schule"], 
    correct: "Allgemeinbildende höhere Schule" 
  },
  { 
    type: "multiple", 
    question: {
      ro: "Ce înseamnă BMS?",
      en: "What does BMS mean?",
      ua: "Що означає BMS?"
    }, 
    options: ["Berufsbildende mittlere Schule", "Berufsbildende moderne Schule", "Berufliche mittlere Schule"], 
    correct: "Berufsbildende mittlere Schule" 
  },
  { 
    type: "multiple", 
    question: {
      ro: "Ce înseamnă BHS?",
      en: "What does BHS mean?",
      ua: "Що означає BHS?"
    }, 
    options: ["Berufsbildende höhere Schule", "Berufliche höhere Schule", "Berufsbildende Hauptschule"], 
    correct: "Berufsbildende höhere Schule" 
  },
  { 
    type: "multiple", 
    question: {
      ro: "La ce vârstă începe Volksschule?",
      en: "At what age does Volksschule start?",
      ua: "У якому віці починається Volksschule?"
    }, 
    options: {
      ro: ["5 ani", "6 ani", "7 ani"],
      en: ["5 years", "6 years", "7 years"],
      ua: ["5 років", "6 років", "7 років"]
    }, 
    correct: {
      ro: "6 ani",
      en: "6 years",
      ua: "6 років"
    }
  },
  { 
    type: "multiple", 
    question: {
      ro: "De la ce vârstă poți începe \"die Lehre\"?",
      en: "From what age can you start \"die Lehre\"?",
      ua: "З якого віку можна почати \"die Lehre\"?"
    }, 
    options: {
      ro: ["14 ani", "15 ani", "16 ani"],
      en: ["14 years", "15 years", "16 years"],
      ua: ["14 років", "15 років", "16 років"]
    }, 
    correct: {
      ro: "15 ani",
      en: "15 years",
      ua: "15 років"
    }
  },
  { 
    type: "multiple", 
    question: {
      ro: "Câți ani ai în Polytechnische Schule?",
      en: "How old are you in Polytechnische Schule?",
      ua: "Скільки тобі років у Polytechnische Schule?"
    }, 
    options: {
      ro: ["13-14 ani", "14-15 ani", "15-16 ani"],
      en: ["13-14 years", "14-15 years", "15-16 years"],
      ua: ["13-14 років", "14-15 років", "15-16 років"]
    }, 
    correct: {
      ro: "14-15 ani",
      en: "14-15 years",
      ua: "14-15 років"
    }
  },
  { 
    type: "multiple", 
    question: {
      ro: "Ce oferă orientare profesională?",
      en: "What provides career guidance?",
      ua: "Що надає професійну орієнтацію?"
    }, 
    options: ["Volksschule", "Hauptschule", "Polytechnische Schule"], 
    correct: "Polytechnische Schule" 
  },
  { 
    type: "multiple", 
    question: {
      ro: "Care școală se termină cu Matura?",
      en: "Which school ends with Matura?",
      ua: "Яка школа закінчується Matura?"
    }, 
    options: ["BMS", "AHS", "Hauptschule"], 
    correct: "AHS" 
  },
  { 
    type: "multiple", 
    question: {
      ro: "Care școală NU oferă Matura?",
      en: "Which school does NOT offer Matura?",
      ua: "Яка школа НЕ пропонує Matura?"
    }, 
    options: ["AHS", "BHS", "BMS"], 
    correct: "BMS" 
  },
  { 
    type: "multiple", 
    question: {
      ro: "Cum se numește ucenicul în germană?",
      en: "What is an apprentice called in German?",
      ua: "Як називається учень німецькою?"
    }, 
    options: ["der Schüler", "der Lehrling", "der Student"], 
    correct: "der Lehrling" 
  },
  { 
    type: "multiple", 
    question: {
      ro: "Ce învață elevii în Volksschule?",
      en: "What do students learn in Volksschule?",
      ua: "Що вивчають учні у Volksschule?"
    }, 
    options: {
      ro: ["Meserii", "Bazele: citit, scris, socotit", "Materii specializate"],
      en: ["Trades", "Basics: reading, writing, arithmetic", "Specialized subjects"],
      ua: ["Професії", "Основи: читання, письмо, арифметика", "Спеціалізовані предмети"]
    }, 
    correct: {
      ro: "Bazele: citit, scris, socotit",
      en: "Basics: reading, writing, arithmetic",
      ua: "Основи: читання, письмо, арифметика"
    }
  },
  { 
    type: "multiple", 
    question: {
      ro: "Din câte părți constă AHS?",
      en: "How many parts does AHS consist of?",
      ua: "Із скількох частин складається AHS?"
    }, 
    options: {
      ro: ["Una", "Două", "Trei"],
      en: ["One", "Two", "Three"],
      ua: ["Одна", "Дві", "Три"]
    }, 
    correct: {
      ro: "Două",
      en: "Two",
      ua: "Дві"
    }
  },
  { 
    type: "multiple", 
    question: {
      ro: "Până la ce vârstă este învățământul obligatoriu?",
      en: "Until what age is education compulsory?",
      ua: "До якого віку обов'язкова освіта?"
    }, 
    options: {
      ro: ["14 ani", "15 ani", "16 ani"],
      en: ["14 years", "15 years", "16 years"],
      ua: ["14 років", "15 років", "16 років"]
    }, 
    correct: {
      ro: "15 ani",
      en: "15 years",
      ua: "15 років"
    }
  },
  { 
    type: "multiple", 
    question: {
      ro: "Ce școală oferă formare profesională cu Matura?",
      en: "Which school offers vocational training with Matura?",
      ua: "Яка школа пропонує професійну підготовку з Matura?"
    }, 
    options: ["BMS", "BHS", "Hauptschule"], 
    correct: "BHS" 
  },
  { 
    type: "multiple", 
    question: {
      ro: "Unde merge ucenicul pe lângă muncă?",
      en: "Where does the apprentice go besides work?",
      ua: "Куди ходить учень крім роботи?"
    }, 
    options: ["Universitate", "Berufsschule", "Gymnasium"], 
    correct: "Berufsschule" 
  },
  { type: "multiple", question: "Ce vârstă au elevii în AHS?", options: ["6-14 ani", "10-18 ani", "14-19 ani"], correct: "10-18 ani" },
  { type: "multiple", question: "Ce vârstă au elevii în BHS?", options: ["10-18 ani", "10-19 ani", "14-19 ani"], correct: "10-19 ani" },
  { type: "multiple", question: "După câți ani de școală poți merge la BMS?", options: ["8 ani", "9 ani", "10 ani"], correct: "9 ani" },

  // ====== TRUE/FALSE ======
  { 
    type: "truefalse", 
    question: {
      ro: "AHS se termină cu examenul de Matura.",
      en: "AHS ends with the Matura exam.",
      ua: "AHS закінчується іспитом Matura."
    }, 
    correct: true 
  },
  { 
    type: "truefalse", 
    question: {
      ro: "BMS oferă diplomă de Matura.",
      en: "BMS offers a Matura diploma.",
      ua: "BMS пропонує диплом Matura."
    }, 
    correct: false 
  },
  { 
    type: "truefalse", 
    question: {
      ro: "BHS oferă diplomă de Matura.",
      en: "BHS offers a Matura diploma.",
      ua: "BHS пропонує диплом Matura."
    }, 
    correct: true 
  },
  { 
    type: "truefalse", 
    question: {
      ro: "Volksschule începe la 6 ani.",
      en: "Volksschule starts at 6 years old.",
      ua: "Volksschule починається в 6 років."
    }, 
    correct: true 
  },
  { 
    type: "truefalse", 
    question: {
      ro: "Die Lehre este duală (muncă + școală).",
      en: "Die Lehre is dual (work + school).",
      ua: "Die Lehre є подвійною (робота + школа)."
    }, 
    correct: true 
  },
  { 
    type: "truefalse", 
    question: {
      ro: "Polytechnische Schule durează 2 ani.",
      en: "Polytechnische Schule lasts 2 years.",
      ua: "Polytechnische Schule триває 2 роки."
    }, 
    correct: false 
  },
  { 
    type: "truefalse", 
    question: {
      ro: "Hauptschule este pentru elevii de 10-14 ani.",
      en: "Hauptschule is for students aged 10-14.",
      ua: "Hauptschule призначена для учнів 10-14 років."
    }, 
    correct: true 
  },
  { 
    type: "truefalse", 
    question: {
      ro: "AHS are doar o singură parte (Unterstufe).",
      en: "AHS has only one part (Unterstufe).",
      ua: "AHS має тільки одну частину (Unterstufe)."
    }, 
    correct: false 
  },
  { 
    type: "truefalse", 
    question: {
      ro: "Ucenicul se numește \"der Lehrling\".",
      en: "The apprentice is called \"der Lehrling\".",
      ua: "Учень називається \"der Lehrling\"."
    }, 
    correct: true 
  },
  { 
    type: "truefalse", 
    question: {
      ro: "BMS este o școală profesională superioară.",
      en: "BMS is a higher vocational school.",
      ua: "BMS є вищою професійною школою."
    }, 
    correct: false 
  },
  { type: "truefalse", question: "Polytechnische Schule oferă orientare profesională.", correct: true },
  { type: "truefalse", question: "Volksschule durează 4 ani.", correct: true },
  { type: "truefalse", question: "După Hauptschule poți merge direct la universitate.", correct: false },
  { type: "truefalse", question: "Die Lehre începe după învățământul obligatoriu.", correct: true },
  { type: "truefalse", question: "AHS constă din Unterstufe și Oberstufe.", correct: true },
  { type: "truefalse", question: "BHS este o școală doar teoretică.", correct: false },
  { type: "truefalse", question: "Învățământul obligatoriu se termină la 15 ani.", correct: true },
  { type: "truefalse", question: "Lehrling-ul primește instruire practică.", correct: true },
  { type: "truefalse", question: "Volksschule și Hauptschule durează împreună 8 ani.", correct: true },
  { type: "truefalse", question: "Polytechnische Schule este clasa a 9-a.", correct: true },

  // ====== AUDIO (cu pronunție germană) ======
  { 
    type: "audio", 
    question: {
      ro: "Ascultă și alege termenul corect:",
      en: "Listen and choose the correct term:",
      ua: "Слухайте та оберіть правильний термін:"
    }, 
    word: "die Volksschule", 
    options: ["die Volksschule", "die Hauptschule", "die Berufsschule"], 
    correct: "die Volksschule" 
  },
  { 
    type: "audio", 
    question: {
      ro: "Ascultă și alege termenul corect:",
      en: "Listen and choose the correct term:",
      ua: "Слухайте та оберіть правильний термін:"
    }, 
    word: "die Hauptschule", 
    options: ["die Hauptschule", "die Volksschule", "die Realschule"], 
    correct: "die Hauptschule" 
  },
  { 
    type: "audio", 
    question: {
      ro: "Ascultă și alege termenul corect:",
      en: "Listen and choose the correct term:",
      ua: "Слухайте та оберіть правильний термін:"
    }, 
    word: "die Lehre", 
    options: ["die Lehre", "die Schule", "die Klasse"], 
    correct: "die Lehre" 
  },
  { 
    type: "audio", 
    question: {
      ro: "Ascultă și alege termenul corect:",
      en: "Listen and choose the correct term:",
      ua: "Слухайте та оберіть правильний термін:"
    }, 
    word: "der Lehrling", 
    options: ["der Lehrling", "der Schüler", "der Lehrer"], 
    correct: "der Lehrling" 
  },
  { 
    type: "audio", 
    question: {
      ro: "Ascultă și alege termenul corect:",
      en: "Listen and choose the correct term:",
      ua: "Слухайте та оберіть правильний термін:"
    }, 
    word: "die Matura", 
    options: ["die Matura", "die Prüfung", "die Schule"], 
    correct: "die Matura" 
  },
  { 
    type: "audio", 
    question: {
      ro: "Ascultă și scrie ce ai auzit:",
      en: "Listen and write what you heard:",
      ua: "Слухайте та напишіть те, що ви чули:"
    }, 
    word: "Gymnasium", 
    answer: "Gymnasium" 
  },
  { 
    type: "audio", 
    question: {
      ro: "Ascultă și scrie ce ai auzit:",
      en: "Listen and write what you heard:",
      ua: "Слухайте та напишіть те, що ви чули:"
    }, 
    word: "Berufsschule", 
    answer: "Berufsschule" 
  },

  // ====== ÎNTREBĂRI COMPLEXE ======
  { 
    type: "multiple", 
    question: {
      ro: "Care afirmație este corectă despre sistemul școlar austriac?",
      en: "Which statement is correct about the Austrian school system?",
      ua: "Яке твердження є правильним щодо австрійської шкільної системи?"
    }, 
    options: {
      ro: ["Toate școlile se termină cu Matura", "Învățământul obligatoriu durează până la 18 ani", "AHS are două părți: Unterstufe și Oberstufe"],
      en: ["All schools end with Matura", "Compulsory education lasts until 18", "AHS has two parts: Unterstufe and Oberstufe"],
      ua: ["Всі школи закінчуються Matura", "Обов'язкова освіта триває до 18 років", "AHS має дві частини: Unterstufe та Oberstufe"]
    }, 
    correct: {
      ro: "AHS are două părți: Unterstufe și Oberstufe",
      en: "AHS has two parts: Unterstufe and Oberstufe",
      ua: "AHS має дві частини: Unterstufe та Oberstufe"
    }
  },
  { 
    type: "multiple", 
    question: {
      ro: "Ce caracterizează \"die Lehre\"?",
      en: "What characterizes \"die Lehre\"?",
      ua: "Що характеризує \"die Lehre\"?"
    }, 
    options: {
      ro: ["Este doar teoretică", "Combină munca cu școala profesională", "Se face doar la universitate"],
      en: ["It's only theoretical", "It combines work with vocational school", "It's done only at university"],
      ua: ["Це тільки теоретично", "Поєднує роботу з професійною школою", "Робиться тільки в університеті"]
    }, 
    correct: {
      ro: "Combină munca cu școala profesională",
      en: "It combines work with vocational school",
      ua: "Поєднує роботу з професійною школою"
    }
  },
  { type: "multiple", question: "Care este diferența principală între BMS și BHS?", options: ["BMS durează mai mult", "BHS oferă Matura, BMS nu", "BMS este mai grea"], correct: "BHS oferă Matura, BMS nu" },
  { type: "multiple", question: "Care este scopul principal al Polytechnische Schule?", options: ["Pregătirea pentru universitate", "Orientarea profesională", "Învățarea de limbi străine"], correct: "Orientarea profesională" },

  // ====== ÎNTREBĂRI DESPRE VÂRSTE SPECIFICE ======
  { 
    type: "fill", 
    question: {
      ro: "Un copil de 7 ani în ce școală este cel mai probabil?",
      en: "A 7-year-old child is most likely in which school?",
      ua: "7-річна дитина найімовірніше в якій школі?"
    }, 
    answer: "Volksschule" 
  },
  { 
    type: "fill", 
    question: {
      ro: "Un tânăr de 16 ani care lucrează și învață o meserie face:",
      en: "A 16-year-old who works and learns a trade is doing:",
      ua: "16-річний, який працює і вивчає професію, робить:"
    }, 
    answer: "die Lehre" 
  },
  { 
    type: "multiple", 
    question: {
      ro: "Un elev de 12 ani în ce școală poate fi?",
      en: "A 12-year-old student can be in which school?",
      ua: "12-річний учень може бути в якій школі?"
    }, 
    options: {
      ro: ["Volksschule", "Hauptschule sau AHS Unterstufe", "BHS"],
      en: ["Volksschule", "Hauptschule or AHS Unterstufe", "BHS"],
      ua: ["Volksschule", "Hauptschule або AHS Unterstufe", "BHS"]
    }, 
    correct: {
      ro: "Hauptschule sau AHS Unterstufe",
      en: "Hauptschule or AHS Unterstufe",
      ua: "Hauptschule або AHS Unterstufe"
    }
  },
  { 
    type: "multiple", 
    question: {
      ro: "Un tânăr de 17 ani poate fi în:",
      en: "A 17-year-old can be in:",
      ua: "17-річний може бути в:"
    }, 
    options: {
      ro: ["Volksschule", "AHS Oberstufe sau BHS", "Doar în die Lehre"],
      en: ["Volksschule", "AHS Oberstufe or BHS", "Only in die Lehre"],
      ua: ["Volksschule", "AHS Oberstufe або BHS", "Тільки в die Lehre"]
    }, 
    correct: {
      ro: "AHS Oberstufe sau BHS",
      en: "AHS Oberstufe or BHS",
      ua: "AHS Oberstufe або BHS"
    }
  }
];