# SIR. — Premium Event Catering

De website van Sir Catering, gebouwd volgens `STYLE SHEET SIR.` en
`SIR WEBSITE VOORSTELLING`.

Eén pagina, statisch, **geen backend en geen build-stap**. Wat je hier ziet is
exact wat de bezoeker krijgt.

---

## Nog open

| # | Wat | Waar |
|---|---|---|
| 1 | **De Instagram-link** | 3× in `index.html`, gemarkeerd met `TODO` |
| 2 | **De definitieve quote** | in `index.html`, sectie *Quote*, gemarkeerd met `TODO` |
| 3 | **Het lettertype LEMON MILK** | `fonts/` — zie [fonts/README.md](fonts/README.md) |

Zolang LEMON MILK ontbreekt vallen de titels netjes terug op Outfit; er breekt
niets.

> Alle open punten terugvinden:
> ```bash
> grep -n "TODO" index.html
> ```

## De foto's

Staan er al in — 36 stuks, van 198 MB PNG teruggebracht naar 9,5 MB JPG
(max. 400 kB per foto). Zie [images/README.md](images/README.md) voor de
indeling en hoe je er eentje vervangt.

De originelen staan in `images/FOTO's WEBSITE SIR/` en gaan bewust **niet** mee
in git of naar Vercel — die map is te zwaar en wordt op de site niet gebruikt.

## Het logo

`design/icon.svg` is de bron. Daaruit zijn afgeleid:

- `favicon.ico`, `assets/img/favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`
- `assets/img/mark.png` — het schild dat als groot, subtiel watermerk achter de
  tekstsecties staat. Het wordt via een CSS-`mask` ingekleurd, dus één bestand
  volstaat voor elke merkkleur.

---

## Structuur

```
index.html            de volledige pagina
assets/css/style.css  huisstijl + alle secties
assets/js/main.js     menu, carrousels, scroll-effecten
assets/img/           favicon
images/               ← jouw foto's
fonts/                ← LEMON MILK
```

De pagina volgt de voorstelling van voor naar achter:

1. **Hero** — `SIR.` over een volvlak-beeld; de punt is tegelijk de menuknop
2. **About** — tekst links, carrousel rechts
3. **Quote** — volvlak-beeld met de gele lijn
4. **Sirvice** — carrousel links, tekst rechts
5. **Food** — tekst links, carrousel rechts
6. **Moments** — carrousel links, tekst rechts
7. **Contact & Booking** — de drie stappen
8. **Footer** — *Sir Yes Sir*

---

## Huisstijl

| Kleur | Hex | Gebruik |
|---|---|---|
| Butter yellow | `#FDF3A0` | logo, titels op donker, accenten |
| Olive Sage | `#627159` | aanhalingstekens |
| Charcoal | `#202020` | tekst, header, donkere vlakken |
| Soft Vanille | `#FFFBEE` | achtergrond |

Lettertypes: **LEMON MILK** voor titels, **Poppins** voor lopende tekst — beide
in bold en italic, zoals de style sheet voorschrijft.

Deze waarden staan als CSS-variabelen bovenaan `assets/css/style.css`. Pas je ze
daar aan, dan verandert de hele site mee.

---

## Lokaal bekijken

```bash
python -m http.server 4173
```

Daarna: <http://localhost:4173>

Openen door dubbel te klikken op `index.html` werkt óók, maar via een servertje
kloppen de paden gegarandeerd.

---

## Publiceren op Vercel

Het is een statische site, dus er valt niets te configureren:

- **Framework Preset**: `Other`
- **Build Command**: leeg laten
- **Output Directory**: leeg laten (de root)

Elke push naar `main` zet de site automatisch live.

---

## Kleine aanpassingen

**Tekst wijzigen** — rechtstreeks in `index.html`.

**Een foto toevoegen aan een carrousel** — kopieer in `index.html` één regel
`<li class="carousel__slide ph">…</li>` en pas de bestandsnaam aan. De pijlen en
bolletjes volgen automatisch.

**Snelheid van de carrousel** — `AUTOPLAY_MS` bovenaan de carrousel-sectie in
`assets/js/main.js` (standaard 6 seconden).

---

## Toegankelijkheid

Ingebouwd, graag zo houden bij aanpassingen:

- volledig met het toetsenbord te bedienen; het menu houdt de focus vast en
  sluit met `Esc`
- carrousels reageren op ← en →, en melden de wissel aan schermlezers
- respecteert *reduce motion* — dan staan de animaties en de autoplay uit
- zonder JavaScript blijft alle tekst gewoon leesbaar
