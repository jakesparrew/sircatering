# Lettertypes

De styleguide schrijft twee lettertypes voor: **LEMON MILK** voor de titels en
**Poppins** voor de lopende tekst.

## Poppins — al geregeld

Wordt geladen via Google Fonts. Je hoeft hier niets voor te doen.

## LEMON MILK — dit moet jij aanleveren

LEMON MILK (van Marsnev) is **geen gratis lettertype voor websites**. Het is
gratis voor persoonlijk gebruik, maar zodra het op een commerciële site staat
is een licentie nodig. Daarom staat het bestand niet in deze repository: ik kan
het niet voor je downloaden zonder die licentie.

Waarschijnlijk heeft de ontwerper die het merk maakte de bestanden al — vraag
ze daar eerst. Anders koop je ze bij de maker.

### Zodra je de bestanden hebt

Zet ze in **deze map**. Meer hoeft niet — de site pikt ze automatisch op.

```
fonts/
├── LEMONMILK-Regular.otf
├── LEMONMILK-RegularItalic.otf
├── LEMONMILK-Bold.otf
└── LEMONMILK-BoldItalic.otf
```

`.ttf` werkt ook, en een paar andere veelgebruikte schrijfwijzen
(`LemonMilk-Bold.otf`, `LemonMilkBold.otf`) worden eveneens herkend. Je hoeft
dus meestal niets te hernoemen.

> **Let op:** op Vercel zijn bestandsnamen hoofdlettergevoelig, op Windows niet.
> Werkt het lokaal wel en online niet, kijk dan eerst naar de hoofdletters.

### Sneller maken (aanbevolen)

`.otf` is fors; `.woff2` is ongeveer vier keer kleiner. Converteren kan gratis
via <https://cloudconvert.com/otf-to-woff2>. Zet het resultaat er met dezelfde
naam naast — `.woff2` wordt vóór `.otf` geprobeerd.

## Zolang LEMON MILK ontbreekt

Dan gebruiken de titels **Outfit**, een geometrische sans uit Google Fonts. Ik
heb Outfit, Jost, Poppins, Montserrat en Archivo naast het specimen uit de
styleguide gelegd; Outfit lag er het dichtst bij — zelfde spitse `A`, zelfde
enkelvoudige ronde `a`, zelfde brede geometrie.

De site oogt daarmee al helemaal juist. Alleen de titels zijn nog niet
100 % merkgetrouw, en er breekt niets.

De volgorde staat bovenaan `assets/css/style.css`:

```css
--font-display: 'Lemon Milk', 'Outfit', 'Poppins', system-ui, sans-serif;
```
