// 30 päivän bassonsoiton harjoitusohjelma.
// Oletus: 4-kielinen basso, vakioviritys E-A-D-G.
// Jokainen päivä kestää noin 10–15 minuuttia.
//
// Harjoituksen kentät:
//   title, minutes, bpm (valinnainen), text, tips[] (valinnainen),
//   tab (valinnainen, tabulatuuri tekstinä), fretboard[] (valinnainen: {s, f, l, root})

const WARMUP_OPEN = {
  title: "Lämmittely: avoimet kielet",
  minutes: 2,
  bpm: 70,
  text: "Soita jokaista avointa kieltä neljä neljäsosanuottia, vuorotellen etu- ja keskisormella (i–m). Pidä äänet tasaisina ja yhtä voimakkaina.",
  tab: `G|----------------|----------------|----------------|0---0---0---0---|
D|----------------|----------------|0---0---0---0---|----------------|
A|----------------|0---0---0---0---|----------------|----------------|
E|0---0---0---0---|----------------|----------------|----------------|`,
};

const spider = (bpm, minutes = 3) => ({
  title: "Lämmittely: kromaattinen 1-2-3-4",
  minutes,
  bpm,
  text: "Yksi sormi per nauha: etusormi 1. nauhalle, keskisormi 2., nimetön 3. ja pikkurilli 4. Soita jokainen kieli ylös ja tule sama reitti takaisin alas.",
  tips: ["Pidä sormet lähellä otelautaa myös silloin, kun ne eivät paina.", "Paina juuri nauhan taakse – ei nauhan päälle."],
  tab: `G|------------------------------1-2-3-4-|
D|----------------------1-2-3-4---------|
A|--------------1-2-3-4-----------------|
E|------1-2-3-4-------------------------|`,
});

const C_PROGRESSION_ROOTS = `   C                 G                 Am                F
G|-----------------|-----------------|-----------------|-----------------|
D|-----------------|-----------------|-----------------|-----------------|
A|3-3-3-3-3-3-3-3--|-----------------|-----------------|-----------------|
E|-----------------|3-3-3-3-3-3-3-3--|5-5-5-5-5-5-5-5--|1-1-1-1-1-1-1-1--|`;

const PROGRAM = [
  // ───────────────────────── VIIKKO 1: PERUSTEET ─────────────────────────
  {
    day: 1,
    title: "Viritys, asento ja ensimmäiset äänet",
    goal: "Basso vireessä, rento soittoasento ja tasainen näppäily avoimilla kielillä.",
    exercises: [
      {
        title: "Viritä basso",
        minutes: 3,
        text: "Käytä sivun yläosan viritysääniä (E, A, D, G) tai viritintä. Kielet ylhäältä alas katsottuna: paksuin E, sitten A, D ja ohuin G.",
        tips: ["Viritä aina ylöspäin: jos ääni on liian korkea, laske ensin alle ja nosta sitten oikeaan.", "Tarkista viritys aina harjoituksen alussa."],
      },
      {
        title: "Soittoasento",
        minutes: 2,
        text: "Istu suorassa, basso nojaa vartaloa vasten ja kaula osoittaa hieman ylöspäin. Näppäilykäden peukalo lepää mikrofonin päällä tai E-kielellä. Otekäden peukalo on kaulan takana, suunnilleen keskisormen kohdalla.",
        tips: ["Hartiat alas ja rennoiksi.", "Ranteet mahdollisimman suorina – ei jyrkkiä kulmia."],
      },
      {
        title: "Vuorosorminäppäily avoimella E-kielellä",
        minutes: 5,
        bpm: 60,
        text: "Näppää E-kieltä vuorotellen etusormella (i) ja keskisormella (m). Sormi liikkuu kieltä pitkin kohti seuraavaa kieltä ja jää lepäämään sen päälle (\"rest stroke\"). Soita yksi isku jokaiselle metronomin naksaukselle.",
        tips: ["Laske ääneen: 1–2–3–4.", "Kun tuntuu helpolta, toista A-, D- ja G-kielillä."],
        tab: `  i   m   i   m   i   m   i   m
E|0---0---0---0---|0---0---0---0---|`,
      },
      {
        title: "Kaikki avoimet kielet",
        minutes: 3,
        bpm: 60,
        text: "Soita neljä iskua kullekin kielelle E → A → D → G ja takaisin. Jatka vuorosormin myös kielen vaihdoksissa.",
        tab: WARMUP_OPEN.tab,
      },
    ],
  },
  {
    day: 2,
    title: "Kielenvaihdot ja tasainen ääni",
    goal: "Vaihda kieltä katkeamatta ja pidä äänenvoimakkuus tasaisena.",
    exercises: [
      WARMUP_OPEN,
      {
        title: "Kielenvaihto parein",
        minutes: 4,
        bpm: 65,
        text: "Vaihda kieltä kahden iskun välein: E–A, A–D, D–G. Näppäilykäden peukalo voi siirtyä E-kielelle, kun soitat A:ta tai sitä ylempiä kieliä – se mykistää samalla E-kielen.",
        tab: `G|----------------|----------------|--------0-0-0-0-|
D|----------------|--------0-0-0-0-|0-0-0-0---------|
A|--------0-0-0-0-|0-0-0-0---------|----------------|
E|0-0-0-0---------|----------------|----------------|`,
      },
      {
        title: "Kahdeksasosat",
        minutes: 4,
        bpm: 60,
        text: "Soita kaksi tasaista iskua jokaista metronomin naksausta kohden. Laske \"1 ja 2 ja 3 ja 4 ja\". Aloita E-kieleltä, siirry sitten muille kielille.",
        tab: `E|0-0-0-0-0-0-0-0-|0-0-0-0-0-0-0-0-|`,
        tips: ["Jos rytmi alkaa huojua, laske tempoa 5 bpm."],
      },
      {
        title: "Kuuntele ja vertaa",
        minutes: 2,
        text: "Soita yksi kierros avoimia kieliä ja kuuntele tarkasti: kuuluvatko i- ja m-sormen iskut samanlaisilta? Jos toinen on selvästi voimakkaampi, soita hitaammin ja keskity heikompaan sormeen.",
      },
    ],
  },
  {
    day: 3,
    title: "Otekäsi: yksi sormi per nauha",
    goal: "Puhtaat painetut äänet ilman surinaa.",
    exercises: [
      WARMUP_OPEN,
      {
        title: "Painettu ääni",
        minutes: 3,
        text: "Paina E-kielen 1. nauhaväliä etusormella juuri nauhan takaa ja näppää. Toista 2. nauhalla keskisormella, 3. nimettömällä ja 4. pikkurillillä. Kuuntele: jos ääni surisee, siirrä sormea lähemmäs nauhaa tai paina hieman lujempaa.",
        fretboard: [
          { s: "E", f: 1, l: "1" },
          { s: "E", f: 2, l: "2" },
          { s: "E", f: 3, l: "3" },
          { s: "E", f: 4, l: "4" },
        ],
      },
      {
        title: "Kromaattinen E-kielellä",
        minutes: 5,
        bpm: 60,
        text: "Soita 1-2-3-4 neljäsosina ja tule takaisin 4-3-2-1. Jätä sormet painamaan, kun nouset ylöspäin (1 → 1+2 → 1+2+3 ...).",
        tab: `E|1---2---3---4---|4---3---2---1---|`,
      },
      {
        title: "Sama A-kielellä",
        minutes: 3,
        bpm: 60,
        text: "Toista sama A-kielellä. Näppäilykäden peukalo lepää E-kielen päällä.",
        tab: `A|1---2---3---4---|4---3---2---1---|`,
      },
    ],
  },
  {
    day: 4,
    title: "Kromaattinen harjoitus kaikilla kielillä",
    goal: "Sormien itsenäisyys ja koordinaatio molempien käsien välillä.",
    exercises: [
      WARMUP_OPEN,
      { ...spider(60, 5), text: spider(60).text + " Soita neljäsosina." },
      {
        title: "Kromaattinen kahdeksasosina",
        minutes: 4,
        bpm: 55,
        text: "Sama harjoitus kahdeksasosina (kaksi ääntä per naksaus). Tempo on hitaampi, mutta nuotteja tulee tuplasti.",
        tab: spider(55).tab,
      },
      {
        title: "Siirto ylemmäs",
        minutes: 2,
        bpm: 60,
        text: "Siirrä koko kuvio 5. nauhaväliin (5-6-7-8). Nauhavälit ovat siellä kapeampia, joten sormien venytys on helpompaa.",
      },
    ],
  },
  {
    day: 5,
    title: "Mykistäminen",
    goal: "Vain se kieli soi, jota soitat.",
    exercises: [
      spider(65, 2),
      {
        title: "Otekäden mykistys",
        minutes: 3,
        bpm: 60,
        text: "Paina A-kielen 5. nauhaväliä (D) ja soita neljäsosia. Löysää sormen painetta joka toisen iskun kohdalla niin, että sormi jää kielen päälle – ääni katkeaa. Näin lyhennät ääniä hallitusti.",
        tab: `A|5---x---5---x---|   (x = löysää paine, ääni katkeaa)`,
      },
      {
        title: "Näppäilykäden mykistys",
        minutes: 4,
        bpm: 60,
        text: "Soita vuorotellen E- ja D-kieltä. Kun soitat D-kieltä, peukalo lepää E-kielellä ja estää sitä soimasta. Kun soitat E-kieltä, keskisormi voi jäädä A-kielen päälle.",
        tab: `D|----0-------0---|----0-------0---|
E|0-------0-------|0-------0-------|`,
        tips: ["Kuuntele soiko jokin ääni taustalla – se on merkki mykistämistä vaativasta kielestä."],
      },
      {
        title: "Lyhyet ja pitkät äänet",
        minutes: 3,
        bpm: 70,
        text: "Soita avointa A-kieltä: ensin neljä pitkää ääntä (anna soida koko iskun), sitten neljä lyhyttä (mykistä heti). Vuorottele.",
      },
    ],
  },
  {
    day: 6,
    title: "Äänten nimet E- ja A-kielellä",
    goal: "Tiedät, mistä löydät minkä tahansa perusäänen kahdelta alimmalta kieleltä.",
    exercises: [
      spider(65, 2),
      {
        title: "Luonnolliset äänet E-kielellä",
        minutes: 4,
        text: "Soita E-kieleltä luonnolliset äänet ja sano niiden nimet ääneen: E (0), F (1), G (3), A (5), H (7), C (8), D (10), E (12). Huomaa: E–F ja H–C välissä on vain yksi nauhaväli.",
        fretboard: [
          { s: "E", f: 0, l: "E", root: true },
          { s: "E", f: 1, l: "F" },
          { s: "E", f: 3, l: "G" },
          { s: "E", f: 5, l: "A" },
          { s: "E", f: 7, l: "H" },
          { s: "E", f: 8, l: "C" },
          { s: "E", f: 10, l: "D" },
          { s: "E", f: 12, l: "E", root: true },
        ],
      },
      {
        title: "Luonnolliset äänet A-kielellä",
        minutes: 4,
        text: "Sama A-kielelle: A (0), H (2), C (3), D (5), E (7), F (8), G (10), A (12).",
        fretboard: [
          { s: "A", f: 0, l: "A", root: true },
          { s: "A", f: 2, l: "H" },
          { s: "A", f: 3, l: "C" },
          { s: "A", f: 5, l: "D" },
          { s: "A", f: 7, l: "E" },
          { s: "A", f: 8, l: "F" },
          { s: "A", f: 10, l: "G" },
          { s: "A", f: 12, l: "A", root: true },
        ],
      },
      {
        title: "Etsi ääni",
        minutes: 3,
        text: "Valitse ääni (esim. C) ja etsi se sekä E- että A-kieleltä. Toista G:lle, D:lle ja F:lle. Tämä on pohja kaikille myöhemmille kuvioille.",
      },
    ],
  },
  {
    day: 7,
    title: "Kertaus ja ensimmäinen kompi",
    goal: "Soitat pohjasävelet sointukulkuun tasaisina kahdeksasosina.",
    exercises: [
      spider(70, 3),
      {
        title: "Pohjasävelet kahdeksasosina",
        minutes: 6,
        bpm: 70,
        text: "Soita sointukulku C – G – Am – F niin, että jokaista pohjasäveltä soitetaan kahdeksan kahdeksasosaa. Tämä on yleisimpiä pop-kulkuja – sitä on käytetty sadoissa kappaleissa.",
        tab: C_PROGRESSION_ROOTS,
        tips: ["Siirry seuraavaan pohjasäveleen ilman taukoa – siirto tapahtuu viimeisen iskun aikana.", "Kun tämä sujuu, nosta tempoa 80:een."],
      },
      {
        title: "Vapaa soitto",
        minutes: 3,
        text: "Laita soimaan jokin lempikappaleesi ja yritä löytää korvakuulolta sen ensimmäinen bassoääni E- tai A-kieleltä. Ei haittaa, vaikka et löytäisi heti – kuunteleminen kehittää.",
      },
    ],
  },

  // ───────────────────────── VIIKKO 2: RYTMI JA ASTEIKOT ─────────────────────────
  {
    day: 8,
    title: "Rytmi: neljäsosat ja kahdeksasosat",
    goal: "Vaihdat sujuvasti nuottiarvosta toiseen menettämättä pulssia.",
    exercises: [
      spider(70, 3),
      {
        title: "Rytmien vaihto",
        minutes: 5,
        bpm: 70,
        text: "Soita avointa A-kieltä: yksi tahti neljäsosia, yksi tahti kahdeksasosia, toistuvasti. Laske ääneen \"1 2 3 4 | 1 ja 2 ja 3 ja 4 ja\".",
        tab: `A|0---0---0---0---|0-0-0-0-0-0-0-0-|`,
      },
      {
        title: "Puoli- ja kokonuotit",
        minutes: 3,
        bpm: 70,
        text: "Soita sama, mutta lisää mukaan puolinuotit (ääni kestää 2 iskua) ja kokonuotit (4 iskua). Esim. tahti kokonuottia, tahti puolinuotteja, tahti neljäsosia, tahti kahdeksasosia.",
      },
      {
        title: "Sovella",
        minutes: 3,
        bpm: 75,
        text: "Soita C – G – Am – F -kulku niin, että jokaisessa tahdissa käytät eri nuottiarvoa.",
      },
    ],
  },
  {
    day: 9,
    title: "C-duuriasteikko",
    goal: "Osaat yhden oktaavin duuriasteikon siirrettävällä otteella.",
    exercises: [
      spider(70, 2),
      {
        title: "Duuriasteikon ote",
        minutes: 6,
        bpm: 60,
        text: "Aloita A-kielen 3. nauhavälistä (C) keskisormella. Soita asteikko ylös ja alas neljäsosina. Numerot otelaudalla kertovat sormen.",
        tab: `G|--------------2-4-5-|5-4-2--------------|
D|--------2-3-5-------|------5-3-2--------|
A|----3-5-------------|------------5-3----|`,
        fretboard: [
          { s: "A", f: 3, l: "2", root: true },
          { s: "A", f: 5, l: "4" },
          { s: "D", f: 2, l: "1" },
          { s: "D", f: 3, l: "2" },
          { s: "D", f: 5, l: "4" },
          { s: "G", f: 2, l: "1" },
          { s: "G", f: 4, l: "3" },
          { s: "G", f: 5, l: "4", root: true },
        ],
        tips: ["Sano äänten nimet ääneen: C D E F G A H C.", "Ote on siirrettävä: aloita 5. nauhavälistä niin saat D-duurin."],
      },
      {
        title: "Asteikko kahdeksasosina",
        minutes: 4,
        bpm: 60,
        text: "Kun neljäsosat sujuvat, soita asteikko kahdeksasosina. Pidä tempo hitaana ja äänet tasaisina.",
      },
    ],
  },
  {
    day: 10,
    title: "Pohjasävel ja kvintti",
    goal: "Opit basson tärkeimmän kuvion: pohjasävel + kvintti.",
    exercises: [
      spider(75, 2),
      {
        title: "Kvintin ote",
        minutes: 4,
        bpm: 70,
        text: "Kvintti löytyy aina yhden kielen ylempää ja kaksi nauhaväliä eteenpäin. Soita C (A3) ja G (D5) vuorotellen. Siirrä sama ote G:hen (E3 → A5).",
        fretboard: [
          { s: "A", f: 3, l: "1", root: true },
          { s: "D", f: 5, l: "5" },
          { s: "E", f: 3, l: "1", root: true },
          { s: "A", f: 5, l: "5" },
        ],
      },
      {
        title: "Pohjasävel–kvintti -kompi",
        minutes: 6,
        bpm: 70,
        text: "Soita C – G – Am – F niin, että soitat jokaisessa tahdissa pohjasävel, pohjasävel, kvintti, pohjasävel (neljäsosina).",
        tab: `   C                 G                 Am                F
G|-----------------|-----------------|-----------------|-----------------|
D|--------5--------|-----------------|-----------------|-----------------|
A|3---3-------3----|--------5--------|--------7--------|--------3--------|
E|-----------------|3---3-------3----|5---5-------5----|1---1-------1----|`,
      },
      {
        title: "Kuuntele",
        minutes: 2,
        text: "Etsi kappale, jossa basso soittaa pohjasävel–kvintti -kuviota (esim. kantri- ja rock'n'roll-kappaleet ovat täynnä niitä).",
      },
    ],
  },
  {
    day: 11,
    title: "Oktaavi",
    goal: "Löydät oktaavin mistä tahansa pohjasävelestä.",
    exercises: [
      spider(75, 2),
      {
        title: "Oktaavin ote",
        minutes: 4,
        bpm: 70,
        text: "Oktaavi on kaksi kieltä ylempänä ja kaksi nauhaväliä eteenpäin. Soita pohjasävel etusormella ja oktaavi pikkurillillä (tai nimettömällä). C: A3 → G5. G: E3 → D5.",
        fretboard: [
          { s: "A", f: 3, l: "1", root: true },
          { s: "G", f: 5, l: "8", root: true },
          { s: "E", f: 3, l: "1", root: true },
          { s: "D", f: 5, l: "8", root: true },
        ],
        tips: ["Mykistä välissä olevat kielet: etusormen kärki koskettaa kevyesti seuraavaa kieltä."],
      },
      {
        title: "Oktaavihypyt",
        minutes: 4,
        bpm: 70,
        text: "Soita pohjasävel–oktaavi -pareja kahdeksasosina C – G – Am – F -kulussa.",
        tab: `   C                 G                 Am                F
G|--5---5---5---5--|-----------------|-----------------|-----------------|
D|-----------------|--5---5---5---5--|--7---7---7---7--|--3---3---3---3--|
A|3---3---3---3----|-----------------|-----------------|-----------------|
E|-----------------|3---3---3---3----|5---5---5---5----|1---1---1---1----|`,
      },
      {
        title: "Yhdistä kvintti ja oktaavi",
        minutes: 3,
        bpm: 70,
        text: "Soita jokaiselle soinnulle 1 – 5 – 8 – 5 neljäsosina. Huomaa, että kvintti ja oktaavi ovat samassa nauhavälissä vierekkäisillä kielillä.",
      },
    ],
  },
  {
    day: 12,
    title: "1–5–8 -kompi",
    goal: "Soitat kokonaisen kompin pohjasävelellä, kvintillä ja oktaavilla.",
    exercises: [
      spider(80, 2),
      {
        title: "1–5–8–5 kahdeksasosina",
        minutes: 7,
        bpm: 70,
        text: "Soita jokaisessa tahdissa 1-1-5-5-8-8-5-5. Tämä on klassinen rock/pop-bassolinja.",
        tab: `   C                 G                 Am                F
G|--------5-5------|-----------------|-----------------|-----------------|
D|----5-5-----5-5--|--------5-5------|--------7-7------|--------3-3------|
A|3-3--------------|----5-5-----5-5--|----7-7-----7-7--|----3-3-----3-3--|
E|-----------------|3-3--------------|5-5--------------|1-1--------------|`,
      },
      {
        title: "Tempon nosto",
        minutes: 3,
        bpm: 80,
        text: "Nosta tempoa 80:een. Jos virheitä tulee, palaa 70:een ja nosta 5 bpm kerrallaan.",
      },
    ],
  },
  {
    day: 13,
    title: "Tauot ja äänten pituus",
    goal: "Tauot ovat osa groovea – hallitset äänten lopetuksen.",
    exercises: [
      spider(80, 2),
      {
        title: "Neljäsosa + tauko",
        minutes: 4,
        bpm: 75,
        text: "Soita iskuilla 1 ja 3, mykistä iskuilla 2 ja 4 (tauko). Tauon pitää olla yhtä täsmällinen kuin äänen.",
        tab: `  1   2   3   4
A|3---x---3---x---|   (x = mykistä)`,
      },
      {
        title: "Staccato vs. legato",
        minutes: 4,
        bpm: 75,
        text: "Soita 1–5–8 -kompia kahdesti: ensin legato (äänet soivat seuraavaan asti), sitten staccato (äänet lyhyitä). Kuuntele, miten tunnelma muuttuu.",
      },
      {
        title: "Kuudestoistaosat",
        minutes: 3,
        bpm: 60,
        text: "Soita avointa E-kieltä neljä tasaista ääntä per naksaus (\"1 e ja a\"). Pysy rentona – tempo on hidas tarkoituksella.",
        tab: `E|0000000000000000|   (1 e ja a 2 e ja a ...)`,
      },
    ],
  },
  {
    day: 14,
    title: "Viikon 2 kertaus",
    goal: "Soitat 1–5–8 -kompin ja duuriasteikon varmasti.",
    exercises: [
      spider(80, 2),
      { title: "C-duuriasteikko", minutes: 3, bpm: 70, text: "Ylös ja alas kahdeksasosina. Sano äänet ääneen ainakin kerran." },
      {
        title: "Siirrä asteikkoa",
        minutes: 3,
        bpm: 70,
        text: "Soita sama ote alkaen A-kielen 5. nauhavälistä (D-duuri) ja E-kielen 3. nauhavälistä (G-duuri).",
      },
      {
        title: "Biisiharjoitus",
        minutes: 5,
        bpm: 85,
        text: "Soita C – G – Am – F -kulkua niin, että vaihtelet vapaasti pohjasäveliä, 1–5 -kuviota ja 1–5–8 -kuviota. Soita vähintään neljä kierrosta pysähtymättä.",
      },
    ],
  },

  // ───────────────────────── VIIKKO 3: ARPEGGIOT JA GROOVET ─────────────────────────
  {
    day: 15,
    title: "Duurisoinnun arpeggio",
    goal: "Osaat soittaa duurisoinnun äänet 1–3–5–8.",
    exercises: [
      spider(80, 2),
      {
        title: "C-duuriarpeggio",
        minutes: 5,
        bpm: 70,
        text: "Arpeggio = soinnun äänet yksi kerrallaan. C-duuri: C – E – G – C. Aloita keskisormella A3, etusormi D2, pikkurilli D5 ja G5.",
        tab: `G|------------5---|----------------|
D|----2---5-------|5---2-----------|
A|3---------------|--------3-------|`,
        fretboard: [
          { s: "A", f: 3, l: "1", root: true },
          { s: "D", f: 2, l: "3" },
          { s: "D", f: 5, l: "5" },
          { s: "G", f: 5, l: "8", root: true },
        ],
      },
      {
        title: "Siirrettävä ote",
        minutes: 4,
        bpm: 70,
        text: "Siirrä ote G-duuriin (E3) ja F-duuriin (E1). Soita C – F – G – C, yksi arpeggio per tahti.",
      },
      {
        title: "Arpeggiokompi",
        minutes: 2,
        bpm: 75,
        text: "Soita 1–3–5–3 neljäsosina C:lle ja G:lle vuorotellen.",
      },
    ],
  },
  {
    day: 16,
    title: "Mollisoinnun arpeggio",
    goal: "Erotat duurin ja mollin äänen ja otteen.",
    exercises: [
      spider(80, 2),
      {
        title: "A-molliarpeggio",
        minutes: 5,
        bpm: 70,
        text: "A-molli: A – C – E – A. Etusormi E5, pikkurilli E8, nimetön A7 ja D7. Molliterssi on yhden nauhavälin matalampi kuin duuriterssi.",
        tab: `D|------------7---|----------------|
A|--------7-------|7---------------|
E|5---8-----------|----8---5-------|`,
        fretboard: [
          { s: "E", f: 5, l: "1", root: true },
          { s: "E", f: 8, l: "b3" },
          { s: "A", f: 7, l: "5" },
          { s: "D", f: 7, l: "8", root: true },
        ],
      },
      {
        title: "Duuri vai molli?",
        minutes: 4,
        bpm: 70,
        text: "Soita A-duuri (E5, A4, A7, D7) ja A-molli (E5, E8, A7, D7) vuorotellen. Kuuntele eroa: duuri kuulostaa valoisalta, molli tummalta.",
      },
      {
        title: "Sovella kulkuun",
        minutes: 3,
        bpm: 75,
        text: "Soita C – G – Am – F niin, että jokaiselle soinnulle soitat oikean arpeggion (C, G ja F duuri, Am molli).",
      },
    ],
  },
  {
    day: 17,
    title: "Mollipentatoninen asteikko",
    goal: "Opit basson ja rockin käytetyimmän asteikon.",
    exercises: [
      spider(85, 2),
      {
        title: "A-mollipentatoninen",
        minutes: 6,
        bpm: 70,
        text: "Kaksi ääntä per kieli, etusormi 5. ja pikkurilli 8. tai nimetön 7. nauhavälissä. Soita ylös ja alas.",
        tab: `G|--------------5-7-|7-5--------------|
D|----------5-7-----|----7-5----------|
A|------5-7---------|--------7-5------|
E|--5-8-------------|------------8-5--|`,
        fretboard: [
          { s: "E", f: 5, l: "A", root: true },
          { s: "E", f: 8, l: "C" },
          { s: "A", f: 5, l: "D" },
          { s: "A", f: 7, l: "E" },
          { s: "D", f: 5, l: "G" },
          { s: "D", f: 7, l: "A", root: true },
          { s: "G", f: 5, l: "C" },
          { s: "G", f: 7, l: "D" },
        ],
      },
      {
        title: "Pentatoninen riffi",
        minutes: 4,
        bpm: 75,
        text: "Keksi oma 1 tahdin riffi käyttäen vain näitä ääniä. Aloita ja lopeta A:han. Toista sitä, kunnes se groovaa.",
      },
    ],
  },
  {
    day: 18,
    title: "Lähestymisäänet",
    goal: "Yhdistät pohjasävelet toisiinsa kromaattisilla lähestymisäänillä.",
    exercises: [
      spider(85, 2),
      {
        title: "Kromaattinen lähestyminen alhaalta",
        minutes: 6,
        bpm: 70,
        text: "Soita pohjasäveltä kolme iskua ja neljännellä iskulla ääni puolisävelaskelta (yksi nauhaväli) alempaa kuin seuraava pohjasävel. C → F: viimeinen ääni E. F → C: viimeinen ääni H.",
        tab: `   C                 F
A|3---3---3--------|------------2----|
E|------------0----|1---1---1--------|`,
        tips: ["Lähestymisääni voi tulla myös yläpuolelta: F → C kautta C# (A4)."],
      },
      {
        title: "Sovella kulkuun C – G – Am – F",
        minutes: 4,
        bpm: 70,
        text: "Lisää jokaisen tahdin loppuun lähestymisääni seuraavaan pohjasäveleen: C→G: F# (E2), G→Am: G# (E4), Am→F: E (E0), F→C: H (A2).",
      },
    ],
  },
  {
    day: 19,
    title: "Synkooppi ja tresillo",
    goal: "Soitat rytmin, jossa painotus osuu iskujen väliin.",
    exercises: [
      spider(85, 2),
      {
        title: "Tresillo-rytmi",
        minutes: 5,
        bpm: 75,
        text: "Laske kahdeksasosia \"1 ja 2 ja 3 ja 4 ja\" ja soita kohdissa 1, 2-ja ja 4. Tämä 3+3+2 -rytmi on latinalaisen musiikin, rock'n'rollin ja popin perusta.",
        tab: `  1 & 2 & 3 & 4 &   (& = ja)
A|3-----3-----3---|3-----3-----3---|`,
      },
      {
        title: "Tresillo kulkuun",
        minutes: 4,
        bpm: 75,
        text: "Soita C – G – Am – F tresillo-rytmillä. Kokeile myös korvata keskimmäinen ääni kvintillä.",
      },
      {
        title: "Oma synkooppi",
        minutes: 2,
        bpm: 80,
        text: "Keksi rytmi, jossa vähintään yksi ääni alkaa \"ja\"-kohdalta. Toista se neljä kertaa putkeen.",
      },
    ],
  },
  {
    day: 20,
    title: "12-tahdin blues",
    goal: "Soitat koko 12-tahdin bluesin boogie-kuviolla.",
    exercises: [
      spider(85, 2),
      {
        title: "Boogie-kuvio A:ssa",
        minutes: 4,
        bpm: 80,
        text: "Kuvio 1–3–5–6–b7–6–5–3 kahdeksasosina. Aloita keskisormella E5 (A).",
        tab: `G|----------------|
D|------4-5-4-----|
A|--4-7-------7-4-|
E|5---------------|`,
        tips: ["Helpompi versio: soita vain 1–3–5–6 neljäsosina."],
      },
      {
        title: "Koko 12 tahtia",
        minutes: 6,
        bpm: 80,
        text: "Siirrä sama kuvio D:hen (A5) ja E:hen (A7). Bluesin järjestys: A A A A | D D A A | E D A E. Jokainen kirjain on yksi tahti.",
        tips: ["Laske tahdit ääneen alussa – 12 tahdin muoto tulee pian selkäytimestä."],
      },
    ],
  },
  {
    day: 21,
    title: "Viikon 3 kertaus",
    goal: "Arpeggiot, pentatoninen ja blues tuntuvat tutuilta.",
    exercises: [
      spider(90, 2),
      { title: "Arpeggiot", minutes: 3, bpm: 75, text: "C-duuri, A-molli, G-duuri, F-duuri – yksi arpeggio ylös ja alas kustakin." },
      { title: "Pentatoninen", minutes: 3, bpm: 75, text: "A-mollipentatoninen ylös ja alas kahdeksasosina." },
      { title: "Blues", minutes: 5, bpm: 85, text: "Kaksi kierrosta 12-tahdin bluesia. Lopeta viimeisellä kierroksella A:han." },
    ],
  },

  // ───────────────────────── VIIKKO 4: SOVELTAMINEN ─────────────────────────
  {
    day: 22,
    title: "Walking bass -perusteet",
    goal: "Teet neljäsosakulun, joka 'kävelee' soinnusta toiseen.",
    exercises: [
      spider(90, 2),
      {
        title: "1–3–5 + lähestymisääni",
        minutes: 7,
        bpm: 80,
        text: "Jokaisessa tahdissa: pohjasävel, terssi, kvintti ja lähestymisääni seuraavaan pohjasäveleen. Kulku C – F – G – C.",
        tab: `   C                 F                 G                 C
G|-----------------|-----------------|-----------------|-----------------|
D|----2---5--------|-----------------|-----------------|-----------------|
A|3----------------|----0---3--------|----2---5---4----|3----------------|
E|------------0----|1-----------2----|3----------------|-----------------|`,
      },
      {
        title: "Oma walking",
        minutes: 3,
        bpm: 80,
        text: "Säilytä pohjasävel iskulla 1, mutta valitse muut äänet itse arpeggiosta tai asteikosta.",
      },
    ],
  },
  {
    day: 23,
    title: "Haamuäänet",
    goal: "Lisäät grooveen perkussiivisia mykistettyjä ääniä.",
    exercises: [
      spider(90, 2),
      {
        title: "Mykistetty isku",
        minutes: 3,
        bpm: 75,
        text: "Aseta otekäden sormet kevyesti kielelle painamatta ja näppää: kuuluu vain \"tump\". Tämä on haamuääni (merkitään x).",
      },
      {
        title: "Haamuäänet grooveen",
        minutes: 6,
        bpm: 75,
        text: "Soita kahdeksasosina vuorotellen oikeaa ääntä ja haamuääntä.",
        tab: `A|3-x-3-3-x-3-x-3-|3-x-3-3-x-3-x-3-|`,
        tips: ["Haamuäänen pitää olla hiljaisempi kuin oikean äänen."],
      },
    ],
  },
  {
    day: 24,
    title: "Hammer-on, pull-off ja liuku",
    goal: "Saat äänet soimaan ilman näppäilyä.",
    exercises: [
      spider(90, 2),
      {
        title: "Hammer-on (h)",
        minutes: 3,
        bpm: 70,
        text: "Näppää A3 ja \"vasaroi\" pikkurilli 5. nauhaväliin – näppäilemättä toista ääntä.",
        tab: `A|3h5-----3h5-----|`,
      },
      {
        title: "Pull-off (p)",
        minutes: 3,
        bpm: 70,
        text: "Paina A5 ja A3 yhtä aikaa. Näppää ja nykäise pikkurilli kevyesti alaspäin irti kieleltä, jolloin A3 soi.",
        tab: `A|5p3-----5p3-----|`,
      },
      {
        title: "Liuku (/)",
        minutes: 3,
        bpm: 70,
        text: "Näppää A3 ja liu'uta sormi painettuna 5. nauhaväliin. Liukuja käytetään usein siirtymissä ja fillien alussa.",
        tab: `A|3/5-----5\\3-----|`,
      },
    ],
  },
  {
    day: 25,
    title: "Siirrettävät otteet",
    goal: "Käytät samoja otteita missä tahansa sävellajissa.",
    exercises: [
      spider(90, 2),
      {
        title: "Duuriasteikko eri sävellajeissa",
        minutes: 5,
        bpm: 75,
        text: "Soita duuriasteikko pohjasävelistä E3 (G), A3 (C), A5 (D) ja E5 (A). Ote pysyy samana – vain paikka muuttuu.",
      },
      {
        title: "Pentatoninen eri sävellajeissa",
        minutes: 4,
        bpm: 75,
        text: "Siirrä mollipentatoninen E-molliin (E0 / E12), D-molliin (A5) ja G-molliin (E3).",
      },
    ],
  },
  {
    day: 26,
    title: "Disko-oktaavit",
    goal: "Soitat energisen oktaavikompin tasaisesti.",
    exercises: [
      spider(95, 2),
      {
        title: "Oktaavikompi",
        minutes: 6,
        bpm: 90,
        text: "Vuorottele pohjasäveltä ja oktaavia kahdeksasosina. Am → Dm: E5/D7 ja A5/G7.",
        tab: `   Am                Dm
G|-----------------|--7---7---7---7--|
D|--7---7---7---7--|-----------------|
A|-----------------|5---5---5---5----|
E|5---5---5---5----|-----------------|`,
        tips: ["Pidä näppäilykäsi rentona – kuvio on fyysisesti kuluttava."],
      },
      {
        title: "Sama nopeammin",
        minutes: 3,
        bpm: 105,
        text: "Nosta tempo 105:een. Jos käsi jännittyy, pidä tauko ja jatka.",
      },
    ],
  },
  {
    day: 27,
    title: "Kuudestoistaosagroove",
    goal: "Soitat funkahtavan kuvion kuudestoistaosilla.",
    exercises: [
      spider(95, 2),
      {
        title: "16-osat ja haamuäänet",
        minutes: 5,
        bpm: 70,
        text: "Laske \"1 e ja a\". Soita oikea ääni kohdilla 1, ja ja a, haamuääni kohdalla e.",
        tab: `  1e&a2e&a3e&a4e&a   (& = ja)
E|0x000x000x000x00|`,
      },
      {
        title: "Lisää oktaavi",
        minutes: 4,
        bpm: 70,
        text: "Korvaa jokaisen iskun viimeinen ääni (a) oktaavilla (D2). Kuvio alkaa kuulostaa funkilta.",
      },
    ],
  },
  {
    day: 28,
    title: "Tempopäivä",
    goal: "Nostat aiempien harjoitusten tempoa hallitusti.",
    exercises: [
      spider(100, 3),
      { title: "1–5–8 -kompi", minutes: 3, bpm: 95, text: "Soita päivän 12 kompia 15 bpm alkuperäistä nopeammin." },
      { title: "Blues", minutes: 3, bpm: 95, text: "12-tahdin blues boogie-kuviolla, yksi kierros." },
      { title: "Walking bass", minutes: 3, bpm: 95, text: "Päivän 22 walking-kulku nopeammin." },
    ],
  },
  {
    day: 29,
    title: "Improvisointi",
    goal: "Keksit omia bassolinjoja sointukulun päälle.",
    exercises: [
      spider(100, 2),
      {
        title: "Pentatoninen Am – G – F – G",
        minutes: 7,
        bpm: 80,
        text: "Soita jokaisen tahdin ensimmäinen ääni pohjasävelenä ja muut vapaasti A-mollipentatonisesta. Am: E5, G: E3, F: E1, G: E3.",
        tips: ["Vähemmän on enemmän – hyvä bassolinja jättää tilaa.", "Toista hyvä idea useamman kerran ennen kuin vaihdat."],
      },
      {
        title: "Äänitä itsesi",
        minutes: 3,
        text: "Äänitä puhelimella yksi minuutti improvisointia ja kuuntele. Mikä toimi? Mitä haluaisit muuttaa?",
      },
    ],
  },
  {
    day: 30,
    title: "Loppuetydi",
    goal: "Yhdistät kaiken oppimasi yhdeksi kappaleeksi.",
    exercises: [
      spider(100, 2),
      {
        title: "Etydi: C – G – Am – F",
        minutes: 8,
        bpm: 85,
        text: "Soita kulku neljä kertaa, jokaisella kierroksella eri tyylillä: 1) pohjasävelet kahdeksasosina, 2) 1–5–8–5, 3) arpeggiot, 4) tresillo + lähestymisäänet. Lopeta C:hen.",
      },
      {
        title: "Juhlakierros",
        minutes: 3,
        text: "Soita vapaasti lempikappaleesi tai oma riffisi. Onneksi olkoon – 30 päivää takana! 🎉 Seuraavaksi kannattaa aloittaa ohjelma alusta korkeammilla tempoilla tai opetella kokonaisia kappaleita.",
      },
    ],
  },
];

const WEEKS = [
  { title: "Viikko 1: Perusteet", days: [1, 7] },
  { title: "Viikko 2: Rytmi ja asteikot", days: [8, 14] },
  { title: "Viikko 3: Arpeggiot ja groovet", days: [15, 21] },
  { title: "Viikko 4: Soveltaminen", days: [22, 30] },
];
