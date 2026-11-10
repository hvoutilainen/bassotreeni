# Bassotreeni 30

Sovellus bassonsoiton harjoitteluun: 30 päivän ohjelma, 10–15 minuuttia päivässä. Ei riippuvuuksia, ei build-vaihetta.

**Käytä:** https://hvoutilainen.github.io/bassotreeni/

iPadilla/iPhonella: avaa osoite Safarissa → Jaa → *Lisää Koti-valikkoon*. Sovellus toimii myös ilman verkkoa ensimmäisen avauksen jälkeen. Huom: iPadin äänet (metronomi, viritysäänet) eivät kuulu, jos laite on äänettömällä.

## Paikallinen kehitys

```bash
python3 -m http.server 8765
```

Avaa sitten http://localhost:8765.

## Ominaisuudet

- 30 päivän ohjelma neljässä viikossa: perusteet → rytmi ja asteikot → arpeggiot ja groovet → soveltaminen
- Harjoituksissa tabulatuurit, otelautakaaviot ja sormitukset
- Ajastin vie harjoitukset läpi järjestyksessä ja asettaa metronomin tempon
- Metronomi (Web Audio) ja viritysäänet E-A-D-G
- Edistyminen ja harjoitusputki tallentuvat selaimeen (localStorage)

## Tiedostot

- `program.js` – harjoitusohjelman sisältö (muokkaa tätä lisätäksesi tai muuttaaksesi harjoituksia)
- `app.js` – käyttöliittymä, ajastin, metronomi ja tallennus
- `styles.css` – ulkoasu (vaalea ja tumma teema)
- `sw.js`, `manifest.webmanifest` – Koti-valikkoon asennus ja offline-tuki. **Nosta `CACHE`-versiota tiedostossa `sw.js`, kun julkaiset muutoksia.**
- `gen-icons.py` – piirtää kuvakkeet `icons/`-kansioon
