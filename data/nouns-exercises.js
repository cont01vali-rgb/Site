// Exerciții offline — varianta JS (folosește window.nounsExercises)
window.nounsExercises = [
  {"type":"img","question":"Ce vezi în imagine?","image":"apfel.jpg","answer":"Apfel"},
  {"type":"img","question":"Ce vezi în imagine?","image":"auto.jpg","answer":"Auto"},
  {"type":"img","question":"Ce vezi în imagine?","image":"berater.jpg","answer":"Berater"},
  {"type":"img","question":"Ce vezi în imagine?","image":"beraterin.jpg","answer":"Beraterin"},
  {"type":"img","question":"Ce vezi în imagine?","image":"bleistift.jpg","answer":"Bleistift"},
  {"type":"img","question":"Ce vezi în imagine?","image":"block.jpg","answer":"Block"},
  {"type":"img","question":"Ce vezi în imagine?","image":"blume.jpg","answer":"Blume"},
  {"type":"img","question":"Ce vezi în imagine?","image":"brille.jpg","answer":"Brille"},
  {"type":"img","question":"Ce vezi în imagine?","image":"bub.jpg","answer":"Bub"},
  {"type":"img","question":"Ce vezi în imagine?","image":"eltern.jpg","answer":"Eltern"},
  {"type":"img","question":"Ce vezi în imagine?","image":"formular.jpg","answer":"Formular"},
  {"type":"img","question":"Ce vezi în imagine?","image":"haus.jpg","answer":"Haus"},
  {"type":"img","question":"Ce vezi în imagine?","image":"kuli.jpg","answer":"Kuli"},
  {"type":"img","question":"Ce vezi în imagine?","image":"lineal.jpg","answer":"Lineal"},
  {"type":"img","question":"Ce vezi în imagine?","image":"madchen.jpg","answer":"Mädchen"},
  {"type":"img","question":"Ce vezi în imagine?","image":"mappe.jpg","answer":"Mappe"},
  {"type":"img","question":"Ce vezi în imagine?","image":"radiergummi.jpg","answer":"Radiergummi"},
  {"type":"img","question":"Ce vezi în imagine?","image":"rose.jpg","answer":"Rose"},
  {"type":"img","question":"Ce vezi în imagine?","image":"schere.jpg","answer":"Schere"},
  {"type":"img","question":"Ce vezi în imagine?","image":"uhr.jpg","answer":"Uhr"},

  {"type":"truefalse","question":"„Die Adresse” este un substantiv feminin.","correct":true},
  {"type":"truefalse","question":"„Der Bruder” este un substantiv feminin.","correct":false},
  {"type":"truefalse","question":"„Der Bub” este masculin și înseamnă băiat.","correct":true},
  {"type":"truefalse","question":"„Die Arbeit” are pluralul „die Arbeiten”.","correct":true},
  {"type":"truefalse","question":"„Das Formular” este un substantiv feminin.","correct":false},
  {"type":"truefalse","question":"„Die Eltern” este un substantiv care are doar formă de plural.","correct":true},
  {"type":"truefalse","question":"„Der Erwachsene” și „die Erwachsene” se referă la adult (masculin / feminin).","correct":true},
  {"type":"truefalse","question":"„Der Familienstand” înseamnă starea civilă.","correct":true},
  {"type":"truefalse","question":"„Das Geburtsdatum” este masculin.","correct":false},
  {"type":"truefalse","question":"„Die Grammatik” este un substantiv neutru.","correct":false},

  {"type":"fill","question":"Meine _______ (adresă) ist in Wien.","answer":"Adresse"},
  {"type":"fill","question":"Ich habe heute viel _______ (muncă).","answer":"Arbeit"},
  {"type":"fill","question":"Mein _______ (frate) lebt in Salzburg.","answer":"Bruder"},
  {"type":"fill","question":"Der _______ (băiat) spielt im Park.","answer":"Bub"},
  {"type":"fill","question":"Der _______ (curs de germană) beginnt morgen.","answer":"Deutschkurs"},
  {"type":"fill","question":"Meine _______ (părinți) wohnen in Linz.","answer":"Eltern"},
  {"type":"fill","question":"Jeder _______ (adult, masc.) muss ein Formular ausfüllen.","answer":"Erwachsene"},
  {"type":"fill","question":"Die _______ (adultă, fem.) arbeitet als Lehrerin.","answer":"Erwachsene"},
  {"type":"fill","question":"Bitte füllen Sie das _______ (formularul) aus.","answer":"Formular"},
  {"type":"fill","question":"Mein _______ (copil) geht in den Kindergarten.","answer":"Kind"},
  {"type":"fill","question":"Ich brauche einen neuen _______ (Formular de înregistrare/locuință).","answer":"Meldezettel"},
  {"type":"fill","question":"Mein _______ (lună) Lieblingsmonat ist Juli.","answer":"Monat"},

  {"type":"multiple","question":"Alege articolul corect pentru 'Adresse'.","options":["der","die","das"],"correct":"die"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Arbeit'.","options":["der","die","das"],"correct":"die"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Bruder'.","options":["der","die","das"],"correct":"der"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Bub'.","options":["der","die","das"],"correct":"der"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Deutschkurs'.","options":["der","die","das"],"correct":"der"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Eltern'.","options":["der","die","das"],"correct":"die"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Erwachsene' (masc.).","options":["der","die","das"],"correct":"der"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Erwachsene' (fem.).","options":["der","die","das"],"correct":"die"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Familienstand'.","options":["der","die","das"],"correct":"der"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Formular'.","options":["der","die","das"],"correct":"das"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Geburtsdatum'.","options":["der","die","das"],"correct":"das"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Geschwister'.","options":["der","die","das"],"correct":"die"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Grammatik'.","options":["der","die","das"],"correct":"die"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Hausaufgabe'.","options":["der","die","das"],"correct":"die"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Hort'.","options":["der","die","das"],"correct":"der"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Kind'.","options":["der","die","das"],"correct":"das"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Kindergarten'.","options":["der","die","das"],"correct":"der"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Meldezettel'.","options":["der","die","das"],"correct":"der"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Monat'.","options":["der","die","das"],"correct":"der"},
  {"type":"multiple","question":"Cum se spune în germană la 'adresa'?","options":["die Adresse","der Adresse","das Adresse"],"correct":"die Adresse"},
  {"type":"multiple","question":"Cum se spune în germană la 'munca'?","options":["die Arbeit","der Arbeit","das Arbeit"],"correct":"die Arbeit"},
  {"type":"multiple","question":"Cum se spune în germană la 'fratele'?","options":["der Bruder","die Bruder","das Bruder"],"correct":"der Bruder"},
  {"type":"multiple","question":"Cum se spune în germană la 'băiatul'?","options":["der Bub","die Bub","das Bub"],"correct":"der Bub"},
  {"type":"multiple","question":"Cum se spune în germană la 'cursul de germană'?","options":["der Deutschkurs","die Deutschkurs","das Deutschkurs"],"correct":"der Deutschkurs"},
  {"type":"multiple","question":"Cum se spune în germană la 'părinții'?","options":["die Eltern","der Eltern","das Eltern"],"correct":"die Eltern"},
  {"type":"multiple","question":"Cum se spune în germană la 'formularul'?","options":["das Formular","die Formular","der Formular"],"correct":"das Formular"},
  {"type":"multiple","question":"Cum se spune în germană la 'data nașterii'?","options":["das Geburtsdatum","die Geburtsdatum","der Geburtsdatum"],"correct":"das Geburtsdatum"},
  {"type":"multiple","question":"Cum se spune în germană la 'gramatica'?","options":["die Grammatik","der Grammatik","das Grammatik"],"correct":"die Grammatik"},
  {"type":"multiple","question":"Cum se spune în germană la 'copilul'?","options":["das Kind","der Kind","die Kind"],"correct":"das Kind"},
  {"type":"multiple","question":"Cum se spune în germană la 'grădinița'?","options":["der Kindergarten","die Kindergarten","das Kindergarten"],"correct":"der Kindergarten"},
  {"type":"multiple","question":"Cum se spune în germană la 'luna'?","options":["der Monat","die Monat","das Monat"],"correct":"der Monat"},
  {"type":"multiple","question":"Care este forma de plural pentru 'die Adresse'?","options":["die Adressen","die Adresse","die Adressenes"],"correct":"die Adressen"},
  {"type":"multiple","question":"Care este forma de plural pentru 'die Arbeit'?","options":["die Arbeiten","die Arbeit","die Arbeites"],"correct":"die Arbeiten"},
  {"type":"multiple","question":"Care este forma de plural pentru 'der Bruder'?","options":["die Brüder","die Bruder","die Brudern"],"correct":"die Brüder"},
  {"type":"multiple","question":"Care este forma de plural pentru 'der Bub'?","options":["die Buben","die Bub","die Bubs"],"correct":"die Buben"},
  {"type":"multiple","question":"Care este forma de plural pentru 'der Deutschkurs'?","options":["die Deutschkurse","die Deutschkurs","die Deutschkurses"],"correct":"die Deutschkurse"},
  {"type":"multiple","question":"Care este forma de plural pentru 'das Formular'?","options":["die Formulare","die Formular","die Formularen"],"correct":"die Formulare"},
  {"type":"multiple","question":"Care este forma de plural pentru 'das Geburtsdatum'?","options":["die Geburtsdaten","die Geburtsdatum","die Geburtsdatums"],"correct":"die Geburtsdaten"},
  {"type":"multiple","question":"Care este forma de plural pentru 'die Hausaufgabe'?","options":["die Hausaufgaben","die Hausaufgabe","die Hausaufgabens"],"correct":"die Hausaufgaben"},
  {"type":"multiple","question":"Care este forma de plural pentru 'das Kind'?","options":["die Kinder","das Kinder","die Kinds"],"correct":"die Kinder"},
  {"type":"audio","question":"Ascultă cuvântul și scrie ce auzi (germană).","word":"Adresse","options":["Adresse","Arbeit","Bruder"],"correct":"Adresse"},
  {"type":"audio","question":"Ascultă și scrie articolul corect pentru cuvântul auzit.","word":"Bruder","options":["der","die","das"],"correct":"der"},
  {"type":"audio","question":"Ascultă și scrie forma de plural auzită.","word":"Kinder","options":["Kinder","Kinderes","Kinde"],"correct":"Kinder"},
  {"type":"audio","question":"Ascultă și traduce în română.","word":"Arbeit","options":["munca","adresa","copil"],"correct":"munca"},
  {"type":"audio","question":"Completează propoziția audio: Das _______ ist am 15. März.","word":"Geburtsdatum","options":["Geburtsdatum","Adresse","Monat"],"correct":"Geburtsdatum"},
  {"type":"audio","question":"Completează propoziția audio: Ich habe viele _______ heute.","word":"Arbeiten","options":["Arbeiten","Brüder","Adressen"],"correct":"Arbeiten"},

  // === A1 noi: imagini (obiecte casă / veselă / fructe / legume)
  {"type":"img","question":"Ce vezi în imagine?","image":"tisch.jpg","answer":"Tisch"},
  {"type":"img","question":"Ce vezi în imagine?","image":"stuhl.jpg","answer":"Stuhl"},
  {"type":"img","question":"Ce vezi în imagine?","image":"bett.jpg","answer":"Bett"},
  {"type":"img","question":"Ce vezi în imagine?","image":"schrank.jpg","answer":"Schrank"},
  {"type":"img","question":"Ce vezi în imagine?","image":"kuhlschrank.jpg","answer":"Kühlschrank"},
  {"type":"img","question":"Ce vezi în imagine?","image":"lampe.jpg","answer":"Lampe"},
  {"type":"img","question":"Ce vezi în imagine?","image":"fenster.jpg","answer":"Fenster"},
  {"type":"img","question":"Ce vezi în imagine?","image":"tuer.jpg","answer":"Tür"},
  {"type":"img","question":"Ce vezi în imagine?","image":"teller.jpg","answer":"Teller"},
  {"type":"img","question":"Ce vezi în imagine?","image":"tasse.jpg","answer":"Tasse"},
  {"type":"img","question":"Ce vezi în imagine?","image":"glas.jpg","answer":"Glas"},
  {"type":"img","question":"Ce vezi în imagine?","image":"loffel.jpg","answer":"Löffel"},
  {"type":"img","question":"Ce vezi în imagine?","image":"gabel.jpg","answer":"Gabel"},
  {"type":"img","question":"Ce vezi în imagine?","image":"messer.jpg","answer":"Messer"},
  {"type":"img","question":"Ce vezi în imagine?","image":"banane.jpg","answer":"Banane"},
  {"type":"img","question":"Ce vezi în imagine?","image":"orange.jpg","answer":"Orange"},
  {"type":"img","question":"Ce vezi în imagine?","image":"tomate.jpg","answer":"Tomate"},
  {"type":"img","question":"Ce vezi în imagine?","image":"gurke.jpg","answer":"Gurke"},
  {"type":"img","question":"Ce vezi în imagine?","image":"kartoffel.jpg","answer":"Kartoffel"},

  // === A1 noi: multiple-choice articole
  {"type":"multiple","question":"Alege articolul corect pentru 'Tisch'.","options":["der","die","das"],"correct":"der"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Lampe'.","options":["der","die","das"],"correct":"die"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Bett'.","options":["der","die","das"],"correct":"das"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Tomate'.","options":["der","die","das"],"correct":"die"},
  {"type":"multiple","question":"Alege articolul corect pentru 'Salat'.","options":["der","die","das"],"correct":"der"},

  // === A1 noi: fill (traduceri/forme)
  {"type":"fill","question":"Traducere RO: „______” (masă)","answer":"Tisch"},
  {"type":"fill","question":"Plural: der Stuhl → die ______","answer":"Stühle"},
  {"type":"fill","question":"Traducere RO: „______” (roșie – legumă)","answer":"Tomate"},
  {"type":"fill","question":"Plural: die Banane → die ______","answer":"Bananen"},
  {"type":"fill","question":"Traducere RO: „______” (castron)","answer":"Schüssel"},
  {"type":"fill","question":"Plural: die Schüssel → die ______","answer":"Schüsseln"},

  // === A1 noi: audio (pronunță cuvântul și răspunde)
  {"type":"audio","question":"Ascultă cuvântul și scrie ce auzi (germană).","word":"Lampe","options":["Lampe","Bett","Teller"],"correct":"Lampe"},
  {"type":"audio","question":"Ascultă și alege articolul corect.","word":"Fenster","options":["der","die","das"],"correct":"das"},
  {"type":"audio","question":"Ascultă și scrie forma de plural auzită.","word":"Kartoffeln","options":["Kartoffeln","Kartoffel","Kartoffeles"],"correct":"Kartoffeln"},
  {"type":"audio","question":"Ascultă și traduce în română.","word":"Gabel","options":["furculiță","cuțit","lingură"],"correct":"furculiță"},

  // Antwort
  { type:"multiple", lemma:"Antwort", question:"Alege traducerea corectă pentru „Antwort”.", options:["răspuns","întrebare","temă"], correct:"răspuns", image:"antwort.jpg" },
  { type:"fill",     lemma:"Antwort", question:"Plural: die Antwort → die ______", answer:"Antworten" },
  { type:"audio",    lemma:"Antwort", question:"Ascultă și alege cuvântul auzit.", word:"Antwort", options:["Antwort","Aufgabe","Ausbildung"], correct:"Antwort" },

  // Aufgabe
  { type:"multiple", lemma:"Aufgabe", question:"„Aufgabe” înseamnă...", options:["răspuns","exercițiu/sarcină","știre"], correct:"exercițiu/sarcină", image:"aufgabe.jpg" },
  { type:"fill",     lemma:"Aufgabe", question:"Plural: die Aufgabe → die ______", answer:"Aufgaben" },
  { type:"audio",    lemma:"Aufgabe", question:"Ascultă și alege cuvântul auzit.", word:"Aufgabe", options:["Antwort","Aufgabe","Ausbildung"], correct:"Aufgabe" },

  // Ausbildung
  { type:"multiple", lemma:"Ausbildung", question:"„Ausbildung” se traduce prin...", options:["formare profesională","universitate","lecție"], correct:"formare profesională" },
  { type:"fill",     lemma:"Ausbildung", question:"Articol corect: ___ Ausbildung", answer:"die" },

  // Badezimmer
  { type:"img",      lemma:"Badezimmer", question:"Ce vezi în imagine?", image:"badezimmer.jpg", answer:"Badezimmer" },
  { type:"multiple", lemma:"Badezimmer", question:"„Badezimmer” este...", options:["der","die","das"], correct:"das" },
  { type:"fill",     lemma:"Badezimmer", question:"Traducere RO: ______ (Camera băii)", answer:"Badezimmer" },

  // Bahnhof
  { type:"img",      lemma:"Bahnhof", question:"Ce vezi în imagine?", image:"bahnhof.jpg", answer:"Bahnhof" },
  { type:"fill",     lemma:"Bahnhof", question:"Plural: der Bahnhof → die ______", answer:"Bahnhöfe" },
  { type:"multiple", lemma:"Bahnhof", question:"Articol corect pentru „Bahnhof”", options:["der","die","das"], correct:"der" },

  // Birne
  { type:"img",      lemma:"Birne", question:"Ce fruct este în imagine?", image:"birne.jpg", answer:"Birne" },
  { type:"fill",     lemma:"Birne", question:"Plural: die Birne → die ______", answer:"Birnen" },
  { type:"multiple", lemma:"Birne", question:"Traducere RO pentru „Birne”", options:["pară","pere","piersică"], correct:"pară" },

  // Geld
  { type:"img",      lemma:"Geld", question:"Ce vezi în imagine?", image:"geld.jpg", answer:"Geld" },
  { type:"multiple", lemma:"Geld", question:"„Geld” are plural?", options:["da","nu"], correct:"nu" },
  { type:"fill",     lemma:"Geld", question:"Traducere RO: ______ (bani)", answer:"Geld" },

  // Gabel
  { type:"img",      lemma:"Gabel", question:"Ce obiect este în imagine?", image:"gabel.jpg", answer:"Gabel" },
  { type:"multiple", lemma:"Gabel", question:"Articol corect pentru „Gabel”", options:["der","die","das"], correct:"die" },
  { type:"fill",     lemma:"Gabel", question:"Plural: die Gabel → die ______", answer:"Gabeln" },

  // Füllfeder
  { type:"multiple", lemma:"Füllfeder", question:"„Füllfeder” se traduce prin...", options:["creion","stilou","foarfecă"], correct:"stilou" },
  { type:"fill",     lemma:"Füllfeder", question:"Articol corect: ___ Füllfeder", answer:"die" },
  { type:"audio",    lemma:"Füllfeder", question:"Ascultă și alege cuvântul auzit.", word:"Füllfeder", options:["Füllfeder","Lineal","Bleistift"], correct:"Füllfeder" },
 
  // Obiecte din casă
  { type:"img", question:"Ce vezi în imagine?", image:"kuche.jpg", answer:"Küche" },
  { type:"img", question:"Ce vezi în imagine?", image:"sofa.jpg", answer:"Sofa" },
  { type:"img", question:"Ce vezi în imagine?", image:"fernseher.jpg", answer:"Fernseher" },
  { type:"img", question:"Ce vezi în imagine?", image:"computer.jpg", answer:"Computer" },
  { type:"img", question:"Ce vezi în imagine?", image:"fenster.jpg", answer:"Fenster" },
  { type:"multiple", question:"Articol corect pentru „Fenster”", options:["der","die","das"], correct:"das" },
  { type:"multiple", question:"Articol corect pentru „Küche”", options:["der","die","das"], correct:"die" },
  { type:"fill", question:"Plural: der Fernseher → die ______", answer:"Fernseher" },

  // Îmbrăcăminte
  { type:"img", question:"Ce vezi în imagine?", image:"jacke.jpg", answer:"Jacke" },
  { type:"multiple", question:"Articol corect pentru „Jacke”", options:["der","die","das"], correct:"die" },
  { type:"fill", question:"Traducere RO: ______ (geacă)", answer:"Jacke" },

  // Locuri
  { type:"img", question:"Ce vezi în imagine?", image:"schule.jpg", answer:"Schule" },
  { type:"img", question:"Ce vezi în imagine?", image:"park.jpg", answer:"Park" },
  { type:"multiple", question:"Articol corect pentru „Schule”", options:["der","die","das"], correct:"die" },
  { type:"fill", question:"Plural: der Park → die ______", answer:"Parks" },

  // Consum
  { type:"multiple", question:"„Wasser” are plural?", options:["da","nu"], correct:"nu" },
  { type:"multiple", question:"Articol corect pentru „Kaffee”", options:["der","die","das"], correct:"der" },

  // Audio extra
  { type:"audio", question:"Ascultă și alege articolul:", word:"Tür", options:["der","die","das"], correct:"die" },
  { type:"audio", question:"Ascultă și selectează substantivul:", word:"Kühlschrank", options:["Kühlschrank","Fenster","Sofa"], correct:"Kühlschrank" }
];