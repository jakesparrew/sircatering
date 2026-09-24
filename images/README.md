# Foto's

De foto's staan er al in. Dit bestand legt uit hoe ze verdeeld zijn en hoe je
er eentje vervangt of bijzet.

## Wat staat waar

| Bestand | Waar op de site | Bron |
|---|---|---|
| `hero.jpg` | Openingsscherm | `sirvice2.png` |
| `quote.jpg` | Quote-sectie | `SIR ABOUT FINAL/73.png` |
| `contact.jpg` | Contact & Booking | `SIR MOMENTS FINAL/112.jpg` |
| `footer.jpg` | Afsluiter "Sir Yes Sir" | bruidspaar uit `design/SIR WEBSITE VOORSTELLING.pdf` |
| `reviews.jpg` | Reviews-sectie | aangeleverd |
| `hero-mobile.jpg` | Openingsscherm op gsm (staand) | aangeleverd |
| `footer-mobile.jpg` | Afsluiter op gsm (staand) | aangeleverd |
| `about-1` … `about-11` | About-carrousel | door SIR aangeleverde selectie |
| `sirvice-1` … `sirvice-13` | Sirvice-carrousel | `SIR SIRVICE FINAL/` |
| `food-1` … `food-13` | Food-carrousel | `SIR FOOD FINAL/` |
| `moments-1` … `moments-11` | Moments-carrousel | `SIR MOMENTS FINAL/` |
| `og-image.jpg` | Voorbeeld bij het delen van een link | `SIR FOOD FINAL/84.png` |

De vier volvlak-beelden worden door de site **automatisch zwart-wit** gezet,
net als in het ontwerp. De carrouselfoto's blijven in kleur.

> De vier volvlak-beelden zijn een keuze, geen vaste regel. Wil je een ander
> beeld als hero of footer, zeg het — of vervang gewoon `hero.jpg` zelf.

## Formaten

- Volvlak (`hero`, `quote`, `contact`, `footer`): **1890 × 1418** (4:3)
- Carrousel: **1400 × 1800** (staand)
- `og-image.jpg`: **1200 × 630**

Alle bestanden zijn progressive JPEG. De carrouselfoto's blijven onder **400 kB**;
zes zeer detailrijke beelden zitten daar net boven (tot 518 kB) omdat verder
comprimeren zichtbaar kwaliteitsverlies gaf. Samen 20 MB, maar door lazy loading
haalt een bezoeker bij het openen maar ~1,2 MB binnen.

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

`FOTO's WEBSITE SIR/` en de vier mappen `SIR ABOUT/SIRVICE/FOOD/MOMENTS FINAL/`
bevatten de aangeleverde originelen. Die mappen staan in `.gitignore` en
`.vercelignore`: ze gaan dus niet mee naar GitHub of de site. Bewaar ze gerust
lokaal als archief.
