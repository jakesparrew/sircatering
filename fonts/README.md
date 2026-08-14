# Lettertypes

## Poppins — al geregeld

Poppins wordt geladen via Google Fonts. Je hoeft hier niets voor te doen.

## LEMON MILK — hier neer te zetten

LEMON MILK is een betaald lettertype en zit daarom niet in deze repository.
De site is al volledig voorbereid: zet de bestanden in **deze map** met exact
deze namen en ze worden automatisch gebruikt.

```
fonts/
├── LEMONMILK-Regular.woff2
├── LEMONMILK-Bold.woff2
└── LEMONMILK-BoldItalic.woff2
```

`.otf` werkt ook (zelfde namen, andere extensie) — maar `.woff2` is een stuk
kleiner en dus sneller. Converteren kan gratis via
<https://cloudconvert.com/otf-to-woff2>.

## Zolang LEMON MILK ontbreekt

Dan valt de site terug op **Outfit**, een geometrische sans uit Google Fonts die
er dicht bij ligt. De site oogt dan al helemaal juist; alleen de titels zijn nog
niet 100 % merkgetrouw. Er breekt niets.

De volgorde staat bovenaan `assets/css/style.css`:

```css
--font-display: 'Lemon Milk', 'Outfit', 'Poppins', system-ui, sans-serif;
```
