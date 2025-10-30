/* 
 * CATEGORIILE DISPONIBILE:
 * - family (Familie): 14 substantive - mamă, tată, copil, etc.
 * - haus (Casă/mobilier): 15 substantive - masă, scaun, pat, etc.
 * - kuche (Bucătărie/veselă): 9 substantive - frigider, farfurie, lingură, etc.
 * - essen (Alimente/băuturi): 16 substantive - fructe, legume, băuturi
 * - kleidung (Îmbrăcăminte): 32 substantive - tricou, pantaloni, geacă, etc.
 * - schule (Școală/educație): 21 substantive - școală, carte, creion, etc.
 * - arbeit (Muncă/documente): 16 substantive - profesie, formular, adresă, etc.
 * - objekte (Obiecte/tehnologie): 6 substantive - mașină, computer, telefon, etc.
 * - natur (Natură): 2 substantive - floare, trandafir
 * - orte (Locuri): 5 substantive - stradă, supermarket, parc, etc.
 * 
 * TOTAL: 136 substantive organizate în 10 categorii
 */

// Nouns data
const nounsData = [
  // --- family ---
  {"nomen": "Mutter", "gen": "die", "plural": "Mütter", "traducere": "mamă", "exemplu": "Meine Mutter kocht.", "image": "mutter.jpg", "categorie": "family"},
  {"nomen": "Vater", "gen": "der", "plural": "Väter", "traducere": "tată", "exemplu": "Mein Vater arbeitet.", "image": "vater.jpg", "categorie": "family"},
  {"nomen": "Bruder", "gen": "der", "plural": "Brüder", "traducere": "frate", "exemplu": "Mein Bruder ist 20 Jahre alt.", "image": "bruder.jpg", "categorie": "family"},
  {"nomen": "Schwester", "gen": "die", "plural": "Schwestern", "traducere": "soră", "exemplu": "Meine Schwester studiert in Wien.", "categorie": "family"},
  {"nomen": "Eltern", "gen": "die", "plural": "-", "traducere": "părinți", "exemplu": "Meine Eltern wohnen in Graz.", "image": "eltern.jpg", "categorie": "family"},
  {"nomen": "Geschwister", "gen": "die", "plural": "-", "traducere": "frați", "exemplu": "Ich habe zwei Geschwister.", "categorie": "family"},
  {"nomen": "Sohn", "gen": "der", "plural": "Söhne", "traducere": "fiu", "exemplu": "Mein Sohn spielt Fußball.", "categorie": "family"},
  {"nomen": "Tochter", "gen": "die", "plural": "Töchter", "traducere": "fiică", "exemplu": "Meine Tochter ist fünf Jahre alt.", "categorie": "family"},
  {"nomen": "Kind", "gen": "das", "plural": "Kinder", "traducere": "copil", "exemplu": "Das Kind spielt draußen.", "image": "kind.jpg", "categorie": "family"},
  {"nomen": "Bub", "gen": "der", "plural": "Buben", "traducere": "băiat", "exemplu": "Der Bub spielt im Garten.", "image": "bub.jpg", "categorie": "family"},
  {"nomen": "Mädchen", "gen": "das", "plural": "Mädchen", "traducere": "fată", "exemplu": "Das Mädchen spielt im Park.", "image": "madchen.jpg", "categorie": "family"},
  {"nomen": "Erwachsener", "gen": "der", "plural": "Erwachsenen", "traducere": "adult", "exemplu": "Ein Erwachsener muss Verantwortung zeigen.", "categorie": "family"},
  {"nomen": "Erwachsene", "gen": "die", "plural": "Erwachsenen", "traducere": "adultă", "exemplu": "Die Erwachsene liest ein Buch.", "categorie": "family"},
  {"nomen": "Familie", "gen": "die", "plural": "Familien", "traducere": "familie", "exemplu": "Meine Familie ist groß.", "image": "familie.jpg", "categorie": "family"},

  // --- haus ---
  {"nomen": "Haus", "gen": "das", "plural": "Häuser", "traducere": "casă", "exemplu": "Das Haus ist groß.", "image": "haus.jpg", "categorie": "haus"},
  {"nomen": "Zimmer", "gen": "das", "plural": "Zimmer", "traducere": "cameră", "exemplu": "Das Zimmer ist klein.", "image": "zimmer.jpeg", "categorie": "haus"},
  {"nomen": "Wohnzimmer", "gen": "das", "plural": "Wohnzimmer", "traducere": "sufragerie", "exemplu": "Das Wohnzimmer ist gemütlich.", "image": "wohnzimmer.jpg", "categorie": "haus"},
  {"nomen": "Schlafzimmer", "gen": "das", "plural": "Schlafzimmer", "traducere": "dormitor", "exemplu": "Das Schlafzimmer ist ruhig.", "image": "schlafzimmer.jpg", "categorie": "haus"},
  {"nomen": "Badezimmer", "gen": "das", "plural": "Badezimmer", "traducere": "baie", "exemplu": "Das Badezimmer ist sauber.", "image": "badezimmer.jpg", "categorie": "haus"},
  {"nomen": "Bad", "gen": "das", "plural": "Bäder", "traducere": "baie", "exemplu": "Das Bad ist klein.", "image": "bad.jpg", "categorie": "haus"},
  {"nomen": "Tisch", "gen": "der", "plural": "Tische", "traducere": "masă", "exemplu": "Der Tisch ist groß.", "image": "tisch.jpg", "categorie": "haus"},
  {"nomen": "Stuhl", "gen": "der", "plural": "Stühle", "traducere": "scaun", "exemplu": "Der Stuhl ist bequem.", "image": "stuhl.jpg", "categorie": "haus"},
  {"nomen": "Bett", "gen": "das", "plural": "Betten", "traducere": "pat", "exemplu": "Das Bett ist neu.", "image": "bett.jpg", "categorie": "haus"},
  {"nomen": "Schrank", "gen": "der", "plural": "Schränke", "traducere": "dulap", "exemplu": "Der Schrank ist im Schlafzimmer.", "image": "schrank.jpg", "categorie": "haus"},
  {"nomen": "Sofa", "gen": "das", "plural": "Sofas", "traducere": "canapea", "exemplu": "Das Sofa ist weich.", "image": "sofa.jpg", "categorie": "haus"},
  {"nomen": "Lampe", "gen": "die", "plural": "Lampen", "traducere": "lampă", "exemplu": "Die Lampe ist hell.", "image": "lampe.jpg", "categorie": "haus"},
  {"nomen": "Fenster", "gen": "das", "plural": "Fenster", "traducere": "fereastră", "exemplu": "Das Fenster ist offen.", "image": "fenster.jpg", "categorie": "haus"},
  {"nomen": "Tür", "gen": "die", "plural": "Türen", "traducere": "ușă", "exemplu": "Die Tür ist geschlossen.", "image": "tuer.jpg", "categorie": "haus"},

  // --- kuche ---
  {"nomen": "Küche", "gen": "die", "plural": "Küchen", "traducere": "bucătărie", "exemplu": "Die Küche ist modern.", "image": "kuche.jpg", "categorie": "kuche"},
  {"nomen": "Kühlschrank", "gen": "der", "plural": "Kühlschränke", "traducere": "frigider", "exemplu": "Der Kühlschrank ist leer.", "image": "kuhlschrank.jpg", "categorie": "kuche"},
  {"nomen": "Herd", "gen": "der", "plural": "Herde", "traducere": "aragaz", "exemplu": "Der Herd funktioniert gut.", "image": "herd.jpg", "categorie": "kuche"},
  {"nomen": "Teller", "gen": "der", "plural": "Teller", "traducere": "farfurie", "exemplu": "Ich brauche einen Teller.", "image": "teller.jpg", "categorie": "kuche"},
  {"nomen": "Tasse", "gen": "die", "plural": "Tassen", "traducere": "cană", "exemplu": "Die Tasse ist leer.", "image": "tasse.jpg", "categorie": "kuche"},
  {"nomen": "Glas", "gen": "das", "plural": "Gläser", "traducere": "pahar", "exemplu": "Das Glas ist voll.", "image": "glas.jpg", "categorie": "kuche"},
  {"nomen": "Löffel", "gen": "der", "plural": "Löffel", "traducere": "lingură", "exemplu": "Ich nehme einen Löffel.", "image": "loffel.jpg", "categorie": "kuche"},
  {"nomen": "Gabel", "gen": "die", "plural": "Gabeln", "traducere": "furculiță", "exemplu": "Die Gabel ist sauber.", "image": "gabel.jpg", "categorie": "kuche"},
  {"nomen": "Messer", "gen": "das", "plural": "Messer", "traducere": "cuțit", "exemplu": "Das Messer ist scharf.", "image": "messer.jpg", "categorie": "kuche"},

  // --- essen ---
  {"nomen": "Apfel", "gen": "der", "plural": "Äpfel", "traducere": "măr", "exemplu": "Der Apfel ist rot.", "image": "apfel.jpg", "categorie": "essen"},
  {"nomen": "Banane", "gen": "die", "plural": "Bananen", "traducere": "banană", "exemplu": "Die Banane ist gelb.", "image": "banane.jpg", "categorie": "essen"},
  {"nomen": "Orange", "gen": "die", "plural": "Orangen", "traducere": "portocală", "exemplu": "Die Orange ist süß.", "image": "orange.jpg", "categorie": "essen"},
  {"nomen": "Erdbeere", "gen": "die", "plural": "Erdbeeren", "traducere": "căpșună", "exemplu": "Die Erdbeere ist frisch.", "image": "erdbeere.jpg", "categorie": "essen"},
  {"nomen": "Traube", "gen": "die", "plural": "Trauben", "traducere": "strugure", "exemplu": "Die Trauben sind lila.", "image": "traube.jpg", "categorie": "essen"},
  {"nomen": "Birne", "gen": "die", "plural": "Birnen", "traducere": "pară", "exemplu": "Die Birne ist saftig.", "image": "birne.jpg", "categorie": "essen"},
  {"nomen": "Zitrone", "gen": "die", "plural": "Zitronen", "traducere": "lămâie", "exemplu": "Die Zitrone ist sauer.", "image": "zitrone.jpg", "categorie": "essen"},
  {"nomen": "Tomate", "gen": "die", "plural": "Tomaten", "traducere": "roșie", "exemplu": "Die Tomate ist rot.", "image": "tomate.jpg", "categorie": "essen"},
  {"nomen": "Gurke", "gen": "die", "plural": "Gurken", "traducere": "castravete", "exemplu": "Die Gurke ist grün.", "image": "gurke.jpg", "categorie": "essen"},
  {"nomen": "Kartoffel", "gen": "die", "plural": "Kartoffeln", "traducere": "cartof", "exemplu": "Die Kartoffeln sind billig.", "image": "kartoffel.jpg", "categorie": "essen"},
  {"nomen": "Zwiebel", "gen": "die", "plural": "Zwiebeln", "traducere": "ceapă", "exemplu": "Die Zwiebel ist klein.", "image": "zwiebel.jpg", "categorie": "essen"},
  {"nomen": "Karotte", "gen": "die", "plural": "Karotten", "traducere": "morcov", "exemplu": "Die Karotte ist orange.", "image": "karotte.jpg", "categorie": "essen"},
  {"nomen": "Paprika", "gen": "der", "plural": "Paprikas", "traducere": "ardei", "exemplu": "Der Paprika ist rot.", "image": "paprika.jpg", "categorie": "essen"},
  {"nomen": "Salat", "gen": "der", "plural": "Salate", "traducere": "salată", "exemplu": "Der Salat ist frisch.", "image": "salat.jpg", "categorie": "essen"},
  {"nomen": "Brot", "gen": "das", "plural": "Brote", "traducere": "pâine", "exemplu": "Das Brot ist frisch.", "image": "brot.jpg", "categorie": "essen"},
  {"nomen": "Wasser", "gen": "das", "plural": "-", "traducere": "apă", "exemplu": "Ich trinke Wasser.", "image": "wasser.png", "categorie": "essen"},
  {"nomen": "Milch", "gen": "die", "plural": "-", "traducere": "lapte", "exemplu": "Die Milch ist kalt.", "image": "milch.jpg", "categorie": "essen"},
  {"nomen": "Kaffee", "gen": "der", "plural": "-", "traducere": "cafea", "exemplu": "Der Kaffee ist heiß.", "categorie": "essen"},
  {"nomen": "Tee", "gen": "der", "plural": "-", "traducere": "ceai", "exemplu": "Der Tee ist grün.", "image": "tee.jpg", "categorie": "essen"},

  // --- kleidung ---
  {"nomen": "T-Shirt", "gen": "das", "plural": "T-Shirts", "traducere": "tricou", "exemplu": "Das T-Shirt ist blau.", "image": "tshirt.jpg", "categorie": "kleidung"},
  {"nomen": "Hose", "gen": "die", "plural": "Hosen", "traducere": "pantaloni", "exemplu": "Die Hose ist schwarz.", "image": "hose.png", "categorie": "kleidung"},
  {"nomen": "kurze Hose", "gen": "die", "plural": "kurze Hosen", "traducere": "pantaloni scurți", "exemplu": "Die kurze Hose ist cool.", "image": "khose.png", "categorie": "kleidung"},
  {"nomen": "Schuh", "gen": "der", "plural": "Schuhe", "traducere": "pantof", "exemplu": "Der Schuh ist neu.", "image": "schuh.jpg", "categorie": "kleidung"},
  {"nomen": "Schuhe", "gen": "die", "plural": "Schuhe", "traducere": "pantofi", "exemplu": "Die Schuhe sind neu.", "image": "schuhe.png", "categorie": "kleidung"},
  {"nomen": "Jacke", "gen": "die", "plural": "Jacken", "traducere": "geacă", "exemplu": "Die Jacke ist warm.", "image": "jacke.png", "categorie": "kleidung"},
  {"nomen": "Regenjacke", "gen": "die", "plural": "Regenjacken", "traducere": "jachetă de ploaie", "exemplu": "Die Regenjacke ist wasserdicht.", "image": "regenjacke.png", "categorie": "kleidung"},
  {"nomen": "Jeans", "gen": "die", "plural": "Jeans", "traducere": "blugi", "exemplu": "Die Jeans sind blau.", "image": "jeans.png", "categorie": "kleidung"},
  {"nomen": "Rock", "gen": "der", "plural": "Röcke", "traducere": "fustă", "exemplu": "Der Rock ist kurz.", "image": "rock.png", "categorie": "kleidung"},
  {"nomen": "Hemd", "gen": "das", "plural": "Hemden", "traducere": "cămașă", "exemplu": "Das Hemd ist weiß.", "image": "hemd.png", "categorie": "kleidung"},
  {"nomen": "Bluse", "gen": "die", "plural": "Blusen", "traducere": "bluză", "exemplu": "Die Bluse ist elegant.", "image": "bluse.png", "categorie": "kleidung"},
  {"nomen": "Mantel", "gen": "der", "plural": "Mäntel", "traducere": "palton", "exemplu": "Der Mantel ist lang.", "image": "mantel.png", "categorie": "kleidung"},
  {"nomen": "Sportanzug", "gen": "der", "plural": "Sportanzüge", "traducere": "trening", "exemplu": "Der Sportanzug ist bequem.", "image": "sportanzug.png", "categorie": "kleidung"},
  {"nomen": "Turnschuhe", "gen": "die", "plural": "Turnschuhe", "traducere": "adidași", "exemplu": "Die Turnschuhe sind bequem.", "image": "turnschuhe.png", "categorie": "kleidung"},
  {"nomen": "Mütze", "gen": "die", "plural": "Mützen", "traducere": "căciulă", "exemplu": "Die Mütze ist warm.", "image": "mutze.png", "categorie": "kleidung"},
  {"nomen": "Gürtel", "gen": "der", "plural": "Gürtel", "traducere": "curea", "exemplu": "Der Gürtel ist schwarz.", "image": "gurtel.png", "categorie": "kleidung"},
  {"nomen": "Krawatte", "gen": "die", "plural": "Krawatten", "traducere": "cravată", "exemplu": "Die Krawatte ist elegant.", "image": "krawatte.png", "categorie": "kleidung"},
  {"nomen": "Sandalen", "gen": "die", "plural": "Sandalen", "traducere": "sandale", "exemplu": "Die Sandalen sind leicht.", "image": "sandalen.png", "categorie": "kleidung"},
  {"nomen": "Schal", "gen": "der", "plural": "Schals", "traducere": "fular", "exemplu": "Der Schal ist lang.", "image": "schal.png", "categorie": "kleidung"},
  {"nomen": "Hut", "gen": "der", "plural": "Hüte", "traducere": "pălărie", "exemplu": "Der Hut ist elegant.", "image": "hut.png", "categorie": "kleidung"},
  {"nomen": "Anzug", "gen": "der", "plural": "Anzüge", "traducere": "costum", "exemplu": "Der Anzug ist elegant.", "image": "anzug.png", "categorie": "kleidung"},
  {"nomen": "Kleid", "gen": "das", "plural": "Kleider", "traducere": "rochie", "exemplu": "Das Kleid ist schön.", "image": "kleid.png", "categorie": "kleidung"},
  {"nomen": "Pyjama", "gen": "der", "plural": "Pyjamas", "traducere": "pijama", "exemplu": "Der Pyjama ist weich.", "image": "pyjama.png", "categorie": "kleidung"},
  {"nomen": "Unterhose", "gen": "die", "plural": "Unterhosen", "traducere": "chiloți", "exemplu": "Die Unterhose ist weiß.", "image": "unterhose.png", "categorie": "kleidung"},
  {"nomen": "Unterhemd", "gen": "das", "plural": "Unterhemden", "traducere": "maiou", "exemplu": "Das Unterhemd ist dünn.", "image": "unterhemd.png", "categorie": "kleidung"},
  {"nomen": "Socken", "gen": "die", "plural": "Socken", "traducere": "șosete", "exemplu": "Die Socken sind bunt.", "image": "socken.png", "categorie": "kleidung"},
  {"nomen": "Hausschuhe", "gen": "die", "plural": "Hausschuhe", "traducere": "papuci de casă", "exemplu": "Die Hausschuhe sind warm.", "image": "hausschuhe.png", "categorie": "kleidung"},
  {"nomen": "Weste", "gen": "die", "plural": "Westen", "traducere": "vestă", "exemplu": "Die Weste ist elegant.", "image": "weste.png", "categorie": "kleidung"},
  {"nomen": "Pullover", "gen": "der", "plural": "Pullover", "traducere": "pulover", "exemplu": "Der Pullover ist warm.", "image": "pullover.png", "categorie": "kleidung"},
  {"nomen": "Badeanzug", "gen": "der", "plural": "Badeanzüge", "traducere": "costum de baie", "exemplu": "Der Badeanzug ist schön.", "image": "badeanzug.png", "categorie": "kleidung"},
  {"nomen": "Badeschuhe", "gen": "die", "plural": "Badeschuhe", "traducere": "papuci de plajă", "exemplu": "Die Badeschuhe sind wasserdicht.", "image": "badeschuhe.png", "categorie": "kleidung"},
  {"nomen": "Handschuhe", "gen": "die", "plural": "Handschuhe", "traducere": "mănuși", "exemplu": "Die Handschuhe sind warm.", "image": "handschuhe.png", "categorie": "kleidung"},
  {"nomen": "Brille", "gen": "die", "plural": "Brillen", "traducere": "ochelari", "exemplu": "Meine Brille liegt auf dem Tisch.", "image": "brille.jpg", "categorie": "kleidung"},

  // --- schule ---
  {"nomen": "Schule", "gen": "die", "plural": "Schulen", "traducere": "școală", "exemplu": "Die Schule ist groß.", "image": "schule.jpg", "categorie": "schule"},
  {"nomen": "Deutschkurs", "gen": "der", "plural": "Deutschkurse", "traducere": "curs de germană", "exemplu": "Ich besuche einen Deutschkurs.", "image": "deutschkurs.jpg", "categorie": "schule"},
  {"nomen": "Grammatik", "gen": "die", "plural": "Grammatiken", "traducere": "gramatică", "exemplu": "Die Grammatik ist manchmal schwierig.", "categorie": "schule"},
  {"nomen": "Hausaufgabe", "gen": "die", "plural": "Hausaufgaben", "traducere": "temă pentru acasă", "exemplu": "Ich mache meine Hausaufgaben am Abend.", "categorie": "schule"},
  {"nomen": "Hausübung", "gen": "die", "plural": "Hausübungen", "traducere": "exercițiu pentru acasă", "exemplu": "Die Hausübung ist einfach.", "categorie": "schule"},
  {"nomen": "Hort", "gen": "der", "plural": "Horte", "traducere": "centru de zi", "exemplu": "Das Kind geht in den Hort.", "categorie": "schule"},
  {"nomen": "Kindergarten", "gen": "der", "plural": "Kindergärten", "traducere": "grădiniță", "exemplu": "Mein Sohn geht in den Kindergarten.", "categorie": "schule"},
  {"nomen": "Universität", "gen": "die", "plural": "Universitäten", "traducere": "universitate", "exemplu": "Er studiert an der Universität Graz.", "categorie": "schule"},
  {"nomen": "Aufgabe", "gen": "die", "plural": "Aufgaben", "traducere": "sarcină / exercițiu", "exemplu": "Die Aufgabe ist leicht.", "image": "aufgabe.jpg", "categorie": "schule"},
  {"nomen": "Ausbildung", "gen": "die", "plural": "Ausbildungen", "traducere": "formare profesională", "exemplu": "Sie macht eine Ausbildung als Krankenschwester.", "categorie": "schule"},
  {"nomen": "Berufsschule", "gen": "die", "plural": "Berufsschulen", "traducere": "școală profesională", "exemplu": "Er besucht die Berufsschule.", "categorie": "schule"},
  {"nomen": "Fachhochschule", "gen": "die", "plural": "Fachhochschulen", "traducere": "universitate de științe aplicate", "exemplu": "Er studiert an einer Fachhochschule.", "categorie": "schule"},
  {"nomen": "Gymnasium", "gen": "das", "plural": "Gymnasien", "traducere": "liceu teoretic", "exemplu": "Meine Tochter geht ins Gymnasium.", "categorie": "schule"},
  {"nomen": "Handelsakademie (HAK)", "gen": "die", "plural": "Handelsakademien", "traducere": "academie comercială", "exemplu": "Er besucht die Handelsakademie.", "categorie": "schule"},
  {"nomen": "Höhere Technische Lehranstalt (HTL)", "gen": "die", "plural": "Höheren Technischen Lehranstalten", "traducere": "liceu tehnic superior", "exemplu": "Er lernt an der HTL.", "categorie": "schule"},
  {"nomen": "Kindergartenpflicht", "gen": "die", "plural": "-", "traducere": "obligativitatea grădiniței", "exemplu": "Die Kindergartenpflicht gilt für alle Kinder.", "categorie": "schule"},
  {"nomen": "Kursraum", "gen": "der", "plural": "Kursräume", "traducere": "sală de curs", "exemplu": "Der Kursraum ist groß und hell.", "categorie": "schule"},
  {"nomen": "Lehre", "gen": "die", "plural": "-", "traducere": "ucenicie / instruire", "exemplu": "Er macht eine Lehre als Mechaniker.", "categorie": "schule"},
  {"nomen": "Mittelschule", "gen": "die", "plural": "Mittelschulen", "traducere": "școală gimnazială", "exemplu": "Er geht in die Mittelschule.", "categorie": "schule"},
  {"nomen": "Oberstufe", "gen": "die", "plural": "Oberstufen", "traducere": "ciclu superior", "exemplu": "Die Oberstufe dauert vier Jahre.", "categorie": "schule"},
  {"nomen": "Buch", "gen": "das", "plural": "Bücher", "traducere": "carte", "exemplu": "Das Buch ist interessant.", "image": "buch.jpg", "categorie": "schule"},
  {"nomen": "Heft", "gen": "das", "plural": "Hefte", "traducere": "caiet", "exemplu": "Das Heft ist neu.", "image": "heft.jpg", "categorie": "schule"},
  {"nomen": "Rucksack", "gen": "der", "plural": "Rucksäcke", "traducere": "rucsac", "exemplu": "Der Rucksack ist schwer.", "image": "rucksack.jpg", "categorie": "schule"},
  {"nomen": "Bleistift", "gen": "der", "plural": "Bleistifte", "traducere": "creion", "exemplu": "Ich schreibe mit einem Bleistift.", "image": "bleistift.jpg", "categorie": "schule"},
  {"nomen": "Kugelschreiber", "gen": "der", "plural": "Kugelschreiber", "traducere": "pix", "exemplu": "Der Kugelschreiber liegt auf dem Tisch.", "image": "kuli.jpg", "categorie": "schule"},
  {"nomen": "Füllfeder", "gen": "die", "plural": "Füllfedern", "traducere": "stilou", "exemplu": "Ich schreibe mit einer Füllfeder.", "categorie": "schule"},
  {"nomen": "Block", "gen": "der", "plural": "Blöcke", "traducere": "bloc / caiet", "exemplu": "Ich schreibe in meinen Block.", "image": "block.jpg", "categorie": "schule"},
  {"nomen": "Lineal", "gen": "das", "plural": "Lineale", "traducere": "riglă", "exemplu": "Ich messe die Linie mit dem Lineal.", "image": "lineal.jpg", "categorie": "schule"},
  {"nomen": "Radiergummi", "gen": "der", "plural": "Radiergummis", "traducere": "gumă de șters", "exemplu": "Ich brauche einen neuen Radiergummi.", "image": "radiergummi.jpg", "categorie": "schule"},
  {"nomen": "Mappe", "gen": "die", "plural": "Mappen", "traducere": "mapă / dosar", "exemplu": "Die Mappe ist auf dem Tisch.", "image": "mappe.jpg", "categorie": "schule"},
  {"nomen": "Schere", "gen": "die", "plural": "Scheren", "traducere": "foarfecă", "exemplu": "Die Schere ist scharf.", "image": "schere.jpg", "categorie": "schule"},

  // --- arbeit ---
  {"nomen": "Arbeit", "gen": "die", "plural": "Arbeiten", "traducere": "muncă", "exemplu": "Ich habe heute viel Arbeit.", "image": "arbeit.jpg", "categorie": "arbeit"},
  {"nomen": "Beruf", "gen": "der", "plural": "Berufe", "traducere": "profesie", "exemplu": "Mein Beruf ist Lehrer.", "image": "beruf.jpg", "categorie": "arbeit"},
  {"nomen": "Berufswunsch", "gen": "der", "plural": "Berufswünsche", "traducere": "dorință profesională", "exemplu": "Mein Berufswunsch ist Arzt.", "categorie": "arbeit"},
  {"nomen": "Berater", "gen": "der", "plural": "Berater", "traducere": "consilier", "exemplu": "Der Berater hilft den Kunden.", "image": "berater.jpg", "categorie": "arbeit"},
  {"nomen": "Beraterin", "gen": "die", "plural": "Beraterinnen", "traducere": "consilieră", "exemplu": "Die Beraterin erklärt alles sehr gut.", "image": "beraterin.jpg", "categorie": "arbeit"},
  {"nomen": "Formular", "gen": "das", "plural": "Formulare", "traducere": "formular", "exemplu": "Bitte füllen Sie das Formular aus.", "image": "formular.jpg", "categorie": "arbeit"},
  {"nomen": "Meldezettel", "gen": "der", "plural": "Meldezettel", "traducere": "fișă de înregistrare", "exemplu": "Ich brauche den Meldezettel für das Amt.", "categorie": "arbeit"},
  {"nomen": "Unterschrift", "gen": "die", "plural": "Unterschriften", "traducere": "semnătură", "exemplu": "Bitte geben Sie Ihre Unterschrift hier.", "categorie": "arbeit"},
  {"nomen": "Adresse", "gen": "die", "plural": "Adressen", "traducere": "adresă", "exemplu": "Meine Adresse ist in Wien.", "image": "adresse.jpg", "categorie": "arbeit"},
  {"nomen": "Familienstand", "gen": "der", "plural": "-", "traducere": "stare civilă", "exemplu": "Der Familienstand ist ledig.", "categorie": "arbeit"},
  {"nomen": "Geburtsdatum", "gen": "das", "plural": "Geburtsdaten", "traducere": "data nașterii", "exemplu": "Mein Geburtsdatum ist der 3. Mai.", "categorie": "arbeit"},
  {"nomen": "Geburtsort", "gen": "der", "plural": "Geburtsorte", "traducere": "locul nașterii", "exemplu": "Mein Geburtsort ist Bukarest.", "categorie": "arbeit"},
  {"nomen": "Nationalität", "gen": "die", "plural": "Nationalitäten", "traducere": "naționalitate", "exemplu": "Meine Nationalität ist rumänisch.", "categorie": "arbeit"},
  {"nomen": "Postleitzahl", "gen": "die", "plural": "Postleitzahlen", "traducere": "cod poștal", "exemplu": "Wie ist deine Postleitzahl?", "categorie": "arbeit"},
  {"nomen": "Staatsbürgerschaft", "gen": "die", "plural": "Staatsbürgerschaften", "traducere": "cetățenie", "exemplu": "Ich habe die österreichische Staatsbürgerschaft.", "categorie": "arbeit"},
  {"nomen": "Telefonnummer", "gen": "die", "plural": "Telefonnummern", "traducere": "număr de telefon", "exemplu": "Wie ist deine Telefonnummer?", "categorie": "arbeit"},
  {"nomen": "Hilfe", "gen": "die", "plural": "Hilfen", "traducere": "ajutor", "exemplu": "Danke für deine Hilfe!", "categorie": "arbeit"},
  {"nomen": "Information", "gen": "die", "plural": "Informationen", "traducere": "informație", "exemplu": "Ich brauche mehr Informationen.", "categorie": "arbeit"},
  {"nomen": "Lösung", "gen": "die", "plural": "Lösungen", "traducere": "soluție", "exemplu": "Ich habe die Lösung gefunden.", "categorie": "arbeit"},
  {"nomen": "Antwort", "gen": "die", "plural": "Antworten", "traducere": "răspuns", "exemplu": "Ich habe die richtige Antwort gefunden.", "image": "antwort.jpg", "categorie": "arbeit"},

  // --- objekte ---
  {"nomen": "Auto", "gen": "das", "plural": "Autos", "traducere": "mașină", "exemplu": "Das Auto ist schnell.", "image": "auto.jpg", "categorie": "objekte"},
  {"nomen": "Uhr", "gen": "die", "plural": "Uhren", "traducere": "ceas", "exemplu": "Meine Uhr ist kaputt.", "image": "uhr.jpg", "categorie": "objekte"},
  {"nomen": "Fernseher", "gen": "der", "plural": "Fernseher", "traducere": "televizor", "exemplu": "Der Fernseher ist neu.", "image": "fernseher.jpg", "categorie": "objekte"},
  {"nomen": "Computer", "gen": "der", "plural": "Computer", "traducere": "computer", "exemplu": "Der Computer ist langsam.", "image": "computer.jpg", "categorie": "objekte"},
  {"nomen": "Handy", "gen": "das", "plural": "Handys", "traducere": "telefon mobil", "exemplu": "Mein Handy ist alt.", "image": "handy.jpg", "categorie": "objekte"},
  {"nomen": "Geld", "gen": "das", "plural": "-", "traducere": "bani", "exemplu": "Ich habe kein Geld.", "image": "geld.jpg", "categorie": "objekte"},

  // --- natur ---
  {"nomen": "Blume", "gen": "die", "plural": "Blumen", "traducere": "floare", "exemplu": "Die Blume ist schön.", "image": "blume.jpg", "categorie": "natur"},
  {"nomen": "Rose", "gen": "die", "plural": "Rosen", "traducere": "trandafir", "exemplu": "Die Rose ist schön.", "image": "rose.jpg", "categorie": "natur"},

  // --- orte ---
  {"nomen": "Straße", "gen": "die", "plural": "Straßen", "traducere": "stradă", "exemplu": "Ich wohne in der Hauptstraße.", "categorie": "orte"},
  {"nomen": "Monat", "gen": "der", "plural": "Monate", "traducere": "lună", "exemplu": "Ein Jahr hat zwölf Monate.", "categorie": "orte"},
  {"nomen": "Supermarkt", "gen": "der", "plural": "Supermärkte", "traducere": "supermarket", "exemplu": "Der Supermarkt ist in der Nähe.", "image": "supermarkt.jpg", "categorie": "orte"},
  {"nomen": "Bahnhof", "gen": "der", "plural": "Bahnhöfe", "traducere": "gară", "exemplu": "Der Bahnhof ist alt.", "image": "bahnhof.jpg", "categorie": "orte"},
  {"nomen": "Park", "gen": "der", "plural": "Parks", "traducere": "parc", "exemplu": "Der Park ist schön.", "image": "park.jpg", "categorie": "orte"}
];

window.nounsData = nounsData;
window.nouns = nounsData; // Alternative export name for compatibility

// Load nouns and populate table (cu paginare + TTS robust ca la Verbe)
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#nounsTable tbody');
  const searchInput = document.getElementById('searchInput');
  const paginationEl = document.getElementById('pagination');
  const paginationInfo = document.getElementById('paginationInfo');

  if (!tableBody) return;

  // TTS DE – preferă voce feminină
  function speak(text, lang='de-DE') {
    const synth = window.speechSynthesis;
    if (!synth) return;

    function pickDeVoice() {
      const voices = synth.getVoices() || [];
      const de = voices.filter(v => v.lang && /^de(-|_)/i.test(v.lang));
      const preferredNames = [
        'Google Deutsch', 'Google Deutsch Female', 'Anna', 'Vicki', 'Petra', 'Marlene', 'Helena', 'Katja', 'Steffi'
      ];
      for (const name of preferredNames) {
        const v = de.find(x => x.name && x.name.toLowerCase().includes(name.toLowerCase()));
        if (v) return v;
      }
      const femaleGuess = de.find(v => /fem|frau|female/i.test(v.name || ''));
      if (femaleGuess) return femaleGuess;
      return de[0] || voices.find(v => /german/i.test(v.name || ''));
    }

    const run = () => {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      const v = pickDeVoice();
      if (v) u.voice = v;
      synth.speak(u);
    };

    if (!synth.getVoices().length) {
      const once = () => { synth.onvoiceschanged = null; run(); };
      synth.onvoiceschanged = once;
      setTimeout(run, 200);
    } else run();
  }

  // State paginare + filtre
  let filtered = [...nounsData].sort((a,b)=>a.nomen.localeCompare(b.nomen,'de'));
  let currentPage = 1;
  const pageSize = 25;
  let selectedRowIndex = -1; // index în pagina curentă
  let selectedCategory = 'all'; // categoria selectată

  render();

  // Category filters
  const categoryFilters = document.querySelectorAll('.category-filter-btn');
  
  // Initialize category counts after categoryFilters is defined
  updateCategoryCounts();
  
  categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update button states
      categoryFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update selected category
      selectedCategory = btn.getAttribute('data-category');
      
      // Clear search when changing categories
      if (searchInput) {
        searchInput.value = '';
      }
      
      // Apply filters
      applyFilters();
    });
  });

  // Function to update category counts in buttons
  function updateCategoryCounts() {
    const counts = {};
    nounsData.forEach(item => {
      const cat = item.categorie || 'unknown';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    
    // Map categories to their Romanian names for consistency
    const categoryMap = {
      'all': 'Toate',
      'family': 'Familie',
      'kleidung': 'Îmbrăcăminte',
      'essen': 'Alimente', 
      'haus': 'Casa',
      'kuche': 'Bucătăria',
      'schule': 'Școala',
      'arbeit': 'Munca',
      'objekte': 'Obiecte',
      'orte': 'Locuri'
    };
    
    // Update button text with counts
    categoryFilters.forEach(btn => {
      const category = btn.getAttribute('data-category');
      const originalText = categoryMap[category] || btn.textContent.split(' (')[0];
      
      if (category === 'all') {
        btn.textContent = `${originalText} (${nounsData.length})`;
      } else {
        const count = counts[category] || 0;
        btn.textContent = `${originalText} (${count})`;
      }
    });
  }

  // Function to apply both search and category filters
  function applyFilters() {
    const searchTerm = normalize(searchInput?.value || '');
    
    filtered = nounsData
      .filter(item => {
        // Category filter
        const categoryMatch = selectedCategory === 'all' || item.categorie === selectedCategory;
        
        // Search filter
        const searchMatch = !searchTerm || 
          normalize(item.nomen).includes(searchTerm) ||
          normalize(item.traducere || '').includes(searchTerm) ||
          normalize(item.plural || '').includes(searchTerm);
        
        return categoryMatch && searchMatch;
      })
      .sort((a,b)=>a.nomen.localeCompare(b.nomen,'de'));
    
    currentPage = 1;
    selectedRowIndex = -1;
    render();
  }

  // Căutare live (updated to use applyFilters)
  searchInput?.addEventListener('input', () => {
    applyFilters();
  });

  // Paginare (identic cu Das Verb)
  paginationEl?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-page]');
    if (!btn) return;
    const p = Number(btn.getAttribute('data-page'));
    if (!Number.isNaN(p)) {
      currentPage = p;
      selectedRowIndex = -1;
      render();
    }
  });

  // Navigare cu săgeți + Enter = TTS
  document.addEventListener('keydown', (e) => {
    const rows = tableBody.querySelectorAll('tr');
    if (!rows.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedRowIndex < rows.length - 1) {
        selectedRowIndex++;
      } else if (selectedRowIndex === -1) {
        selectedRowIndex = 0;
      }
      updateSelection(rows);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedRowIndex > 0) {
        selectedRowIndex--;
        updateSelection(rows);
      }
    } else if (e.key === 'Enter' && selectedRowIndex >= 0) {
      e.preventDefault();
      const globalIndex = (currentPage - 1) * pageSize + selectedRowIndex;
      const item = filtered[globalIndex];
      if (item?.nomen) speak(item.nomen);
    }
  });

  function updateSelection(rows) {
    rows.forEach((row, i) => {
      row.classList.toggle('selected-row', i === selectedRowIndex);
      if (i === selectedRowIndex) row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function render() {
    tableBody.innerHTML = '';
    if (!filtered.length) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#666;padding:12px;">Niciun rezultat.</td></tr>`;
      if (paginationEl) paginationEl.innerHTML = '';
      if (paginationInfo) paginationInfo.textContent = '';
      return;
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    pageItems.forEach((item, i) => {
      const row = document.createElement('tr');

      // AUDIO
      const audioCell = document.createElement('td');
      const audioBtn = document.createElement('button');
      audioBtn.innerHTML = '🔊';
      audioBtn.classList.add('audio-btn');
      audioBtn.addEventListener('click', () => speak(item.nomen));
      audioCell.appendChild(audioBtn);
      row.appendChild(audioCell);

      // TEXT
      row.insertAdjacentHTML('beforeend', `
        <td>${escapeHtml(item.nomen)}</td>
        <td>${escapeHtml(item.gen || '')}</td>
        <td>${escapeHtml(item.plural || '')}</td>
        <td>${escapeHtml(item.traducere || '')}</td>
        <td>${escapeHtml(item.exemplu || '')}</td>
      `);

      row.addEventListener('click', () => {
        selectedRowIndex = i;
        updateSelection(tableBody.querySelectorAll('tr'));
      });

      tableBody.appendChild(row);
    });

    selectedRowIndex = -1; // reset la fiecare render
    renderPagination(totalPages);

    if (paginationInfo) {
      paginationInfo.textContent = `Afișez ${start + 1}–${start + pageItems.length} din ${total}`;
    }
  }

  function renderPagination(totalPages) {
    if (!paginationEl) return;
    paginationEl.innerHTML = '';
    if (totalPages <= 1) return;

    const mk = (label, page, active=false) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sub-btn';
      b.setAttribute('data-page', page);
      b.textContent = label;
      if (active) {
        b.style.background = '#2b78c8';
        b.style.color = '#fff';
      }
      return b;
    };

    paginationEl.appendChild(mk('«', Math.max(1, currentPage - 1)));
    const maxButtons = 7;
    let s = Math.max(1, currentPage - Math.floor(maxButtons/2));
    let e = Math.min(totalPages, s + maxButtons - 1);
    if (e - s < maxButtons - 1) s = Math.max(1, e - maxButtons + 1);
    for (let p = s; p <= e; p++) paginationEl.appendChild(mk(String(p), p, p === currentPage));
    paginationEl.appendChild(mk('»', Math.min(totalPages, currentPage + 1)));
  }

  // Normalize text (RO diacritice)
  function normalize(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/ă|â/g,'a').replace(/î/g,'i')
      .replace(/ș|ş/g,'s').replace(/ț|ţ/g,'t');
  }

  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }
});
