// Date pentru testul "Große 9" (folosește window.grosse9Data)
window.grosse9Data = {
  title: "Große 9",
  sections: {
    days: {
      id: "days-section",
      title: "Die Wochentage — Zilele săptămânii",
      tf: [
        { q: "„Montag” înseamnă luni.", a: true },
        { q: "„Sonntag” este ziua de sâmbătă.", a: false },
        { q: "„Freitag” vine înainte de „Samstag”.", a: true },
        { q: "„Donnerstag” înseamnă joi.", a: true },
        { q: "„Dienstag” este duminică.", a: false },
        { q: "„Mittwoch” este mijlocul săptămânii.", a: true }
      ],
      fill: [
        { q: "Der erste Tag der Woche ist", a: "Montag", id: "f1" },
        { q: "Nach Dienstag kommt", a: "Mittwoch", id: "f2" },
        { q: "Am ____ habe ich keine Schule.", a: "Sonntag", id: "f3" },
        { q: "Mein Deutschkurs ist am", a: "Freitag", id: "f4" },
        { q: "_____ ist zwischen Montag und Mittwoch.", a: "Dienstag", id: "f5" },
        { q: "_____ und Sonntag sind das Wochenende.", a: "Samstag", id: "f6" }
      ],
      mc: [
        { q: "Ce zi urmează după „Donnerstag\"?", opts: ["Dienstag","Freitag","Sonntag"], a: 1 },
        { q: "„Wednesday” în germană se spune...", opts: ["Donnerstag","Dienstag","Mittwoch"], a: 2 }
      ],
      audio: [
        { id: "a1", text: "Montag", check: "Montag" },
        { id: "a2", text: "Sonntag", check: ["duminică","duminica"] },
        { id: "a3", text: "Mittwoch", check: "Mittwoch" },
        { id: "a4", text: "Freitag", check: "der", type: "select" },
        { id: "a5", text: "Dienstag", check: "Dienstag" }
      ]
    },
    seasons: {
      id: "seasons-section",
      title: "Die Jahreszeiten — Anotimpurile",
      tf: [
        { q: "„Der Frühling” înseamnă primăvară.", a: true },
        { q: "„Der Sommer” este iarna.", a: false },
        { q: "„Der Herbst” vine după vară.", a: true },
        { q: "„Der Winter” este anotimpul cald.", a: false },
        { q: "În total există patru anotimpuri.", a: true }
      ],
      fill: [
        { q: "Nach dem Winter kommt der", a: "Frühling", id: "s1" },
        { q: "Im ____ ist es sehr heiß.", a: "Sommer", id: "s2" },
        { q: "Im ____ fallen die Blätter von den Bäumen.", a: "Herbst", id: "s3" },
        { q: "Im ____ schneit es oft.", a: "Winter", id: "s4" },
        { q: "Meine Lieblingsjahreszeit ist der", a: null, id: "s5" }
      ],
      mc: [
        { q: "Ce anotimp urmează după toamnă?", opts: ["Sommer","Winter","Frühling"], a: 1 }
      ],
      audio: [
        { id: "s_a1", text: "Frühling", check: "Frühling" }
      ]
    },
    time: {
      id: "time-section",
      title: "Die Uhrzeit — Ore",
      tf: [
        { q: "„Es ist halb drei” înseamnă 3:30.", a: false },
        { q: "„Es ist Viertel nach sieben” = 7:15.", a: true },
        { q: "„Es ist fünf vor acht” = 7:55.", a: true }
      ],
      fill: [
        { q: "_______ Uhr ist es?", a: "Wie spät", id: "t1" },
        { q: "Es ist ____ Uhr. (7:00)", a: "sieben", id: "t2" },
        { q: "Es ist ____ nach neun. (9:15)", a: "Viertel", id: "t3" }
      ],
      mc: [
        { q: "Ce înseamnă „Es ist halb acht\"?", opts: ["7:30","8:30","8:00"], a: 0 }
      ],
      audio: [
        { id: "t_a1", text: "Es ist halb acht", check: ["7:30","07:30"] }
      ]
    },
    parts: {
      id: "parts-section",
      title: "Die Tageszeiten — Părțile zilei",
      tf: [
        { q: "„Der Morgen” înseamnă dimineața.", a: true },
        { q: "„Der Abend” este după-amiaza.", a: false }
      ],
      fill: [
        { q: "Am ____ trinke ich Kaffee.", a: "Morgen", id: "p1" },
        { q: "Der Deutschkurs ist am", a: "Vormittag", id: "p2" }
      ],
      matching: [
        { left: "Montag", rightOptions: ["luni","marți"], a: "luni" },
        { left: "Frühling", rightOptions: ["primăvară","iarna"], a: "primăvară" }
      ]
    }
  }
};