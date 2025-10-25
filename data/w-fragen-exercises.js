// Bancă de exerciții pentru testul W‑Fragen
window.wfragenExercises = [
  // ====== FILL ======
  { type: "fill", question: "____ kommst du? (originea)", answer: "Woher" },
  { type: "fill", question: "____ gehst du? (direcția)", answer: "Wohin" },
  { type: "fill", question: "____ arbeitest du? (loc – stare)", answer: "Wo" },
  { type: "fill", question: "____ beginnt der Kurs? (când)", answer: "Wann" },
  { type: "fill", question: "____ kostet das? (cât?)", answer: "Wie viel" },
  { type: "fill", question: "____ Bücher hast du? (câți/câte?)", answer: "Wie viele" },
  { type: "fill", question: "____ geht es dir? (cum?)", answer: "Wie" },
  { type: "fill", question: "____ Auto ist das? (al cui?)", answer: "Wessen" },
  { type: "fill", question: "____ schreibst du? (cu ce?)", answer: "Womit" },
  { type: "fill", question: "____ wartest du? (pe ce?)", answer: "Worauf" },
  { type: "fill", question: "____ denkst du? (la ce?)", answer: "Woran" },
  { type: "fill", question: "____ sprichst du? (despre ce?)", answer: "Worüber" },

  // ====== MULTIPLE ======
  { type: "multiple", question: "Alege întrebarea corectă pentru „de unde?”", options: ["Wo", "Wohin", "Woher"], correct: "Woher" },
  { type: "multiple", question: "Alege întrebarea corectă pentru „încotro?”", options: ["Wohin", "Woher", "Wo"], correct: "Wohin" },
  { type: "multiple", question: "Alege forma corectă pentru cantitate numărabilă:", options: ["Wie viel", "Wie viele", "Wie alt"], correct: "Wie viele" },
  { type: "multiple", question: "Completare: ___ lernst du Deutsch? – Weil ich in Wien arbeite.", options: ["Warum", "Wann", "Wie"], correct: "Warum" },
  { type: "multiple", question: "Pentru persoane cu prepoziții folosim:", options: ["wo(r)+prepoziție", "prepoziție + wem/wen", "doar „wo”"], correct: "prepoziție + wem/wen" },
  { type: "multiple", question: "Ce W‑cuvânt cere subiectul propoziției?", options: ["Wen", "Wer", "Wem"], correct: "Wer" },
  { type: "multiple", question: "Care se potrivește: ___ Uhr ist es?", options: ["Wie viel", "Wie viele", "Wie"], correct: "Wie viel" },
  { type: "multiple", question: "Alege varianta corectă: ___ gehst du ins Kino? – Mit meinem Bruder.", options: ["Mit wem", "Womit", "Woran"], correct: "Mit wem" },
  { type: "multiple", question: "Alege varianta corectă pentru „la ce?”", options: ["Woran", "Worauf", "Worum"], correct: "Woran" },
  { type: "multiple", question: "Alege varianta corectă pentru „pe ce?”", options: ["Woran", "Worauf", "Womit"], correct: "Worauf" },

  // ====== TRUE/FALSE ======
  { type: "truefalse", question: "În W‑Fragen, verbul stă pe poziția 2.", correct: true },
  { type: "truefalse", question: "„Wen” întreabă despre subiect (Nominativ).", correct: false },
  { type: "truefalse", question: "„Wo” cere direcția, nu locul.", correct: false },
  { type: "truefalse", question: "„Warum” și „Wieso” sunt sinonime.", correct: true },

  // ====== AUDIO (MC) ======
  { type: "audio", question: "Ascultă și alege întrebarea: (originea)", word: "Woher kommst du?", options: ["Wo kommst du?", "Wohin kommst du?", "Woher kommst du?"], correct: "Woher kommst du?" },
  { type: "audio", question: "Ascultă și alege întrebarea: (direcția)", word: "Wohin gehst du?", options: ["Wohin gehst du?", "Wo gehst du?", "Woher gehst du?"], correct: "Wohin gehst du?" },
  { type: "audio", question: "Ascultă și alege întrebarea: (motiv)", word: "Warum lernst du Deutsch?", options: ["Wann lernst du Deutsch?", "Warum lernst du Deutsch?", "Wie lernst du Deutsch?"], correct: "Warum lernst du Deutsch?" },
  { type: "audio", question: "Ascultă și alege varianta corectă:", word: "Mit wem sprichst du?", options: ["Mit wem sprichst du?", "Womit sprichst du?", "Worüber sprichst du?"], correct: "Mit wem sprichst du?" },

  // ====== AUDIO (răspuns scris) ======
  { type: "audio", question: "Scrie W‑cuvântul pe care îl auzi:", word: "Wessen", answer: "Wessen" }
];