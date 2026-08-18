# Foto's

De foto's staan er al in. Dit bestand legt uit hoe ze verdeeld zijn en hoe je
er eentje vervangt of bijzet.

## Wat staat waar

| Bestand | Waar op de site | Bron |
|---|---|---|
| `hero.jpg` | Openingsscherm | `sirvice2.png` |
| `quote.jpg` | Quote-sectie | `about3.png` |
| `contact.jpg` | Contact & Booking | `moments5.png` |
| `footer.jpg` | Afsluiter "Sir Yes Sir" | bruidspaar uit `design/SIR WEBSITE VOORSTELLING.pdf` |
| `about-1` … `about-3` | About-carrousel | `about1-3.png` |
| `sirvice-1` … `sirvice-7` | Sirvice-carrousel | `sirvice.png`, `sirvice1-6.png` |
| `food-1` … `food-14` | Food-carrousel | `food1-14.png` |
| `moments-1` … `moments-7` | Moments-carrousel | `moments1-7.png` |
| `og-image.jpg` | Voorbeeld bij het delen van een link | `sirvice2.png` |

De vier volvlak-beelden worden door de site **automatisch zwart-wit** gezet,
net als in het ontwerp. De carrouselfoto's blijven in kleur.

> De vier volvlak-beelden zijn een keuze, geen vaste regel. Wil je een ander
> beeld als hero of footer, zeg het — of vervang gewoon `hero.jpg` zelf.

## Formaten

- Volvlak (`hero`, `quote`, `contact`, `footer`): **1890 × 1418** (4:3)
- Carrousel: **1400 × 1800** (staand)
- `og-image.jpg`: **1200 × 630**

Alle bestanden zijn progressive JPEG en blijven onder **400 kB**. Samen 9,5 MB,
maar door lazy loading haalt een bezoeker bij het openen maar ~1,2 MB binnen.

## Een foto vervangen

Zet een nieuw bestand met **dezelfde naam** in deze map. Meer hoeft niet.
Let op de verhouding hierboven, anders wordt er bijgesneden (altijd vanuit het
midden).

## Een foto toevoegen aan een carrousel

1. Zet de foto hier neer als bv. `food-15.jpg`.
2. Kopieer in `index.html` één regel `<li class="carousel__slide ph">…</li>`
   binnen de juiste carrousel en pas het nummer aan.

De pijlen en bolletjes passen zich vanzelf aan.

## De originelen

`FOTO's WEBSITE SIR/` bevat de aangeleverde PNG's (198 MB). Die map staat in
`.gitignore` en `.vercelignore`: ze gaat dus niet mee naar GitHub of de site.
Bewaar ze gerust lokaal als archief.
