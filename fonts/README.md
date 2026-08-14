# Lettertypes

De styleguide schrijft twee lettertypes voor: **LEMON MILK** voor de titels en
**Poppins** voor de lopende tekst.

## Poppins — al geregeld

Wordt geladen via Google Fonts. Je hoeft hier niets voor te doen.

## LEMON MILK — staat erin

Versie 5.0 van Marsnev, vier gewichten × recht en cursief. Elk `.otf` is naast
een `.woff2` gezet: die is ~38 % kleiner en wordt als eerste geprobeerd. De
`.otf`'s blijven als origineel bewaard, maar gaan niet mee naar Vercel.

```
LEMONMILK-Light        (300)   LEMONMILK-LightItalic
LEMONMILK-Regular      (400)   LEMONMILK-RegularItalic
LEMONMILK-Medium       (500)   LEMONMILK-MediumItalic
LEMONMILK-Bold      (700–900)  LEMONMILK-BoldItalic
```

### Twee dingen om te weten

**1. Deze versie heeft geen kleine letters.** Een `a` toont als `A` — het is een
all-caps lettertype. Dat is geen fout: LEMON MILK Pro (betalend) voegt de
onderkast toe. Op de site is dit onzichtbaar, want overal waar LEMON MILK
gebruikt wordt staat `text-transform: uppercase`.

> Gebruik dit lettertype dus **nooit** voor lopende tekst. Daar staat Poppins.

**2. Commercieel gebruik vraagt een donatie.** `READ_ME.txt` van de maker zegt:
gratis voor persoonlijk, educatief en non-profit gebruik; voor commercieel
gebruik vraagt Marsnev een vrije bijdrage (marsnev@marsnev.com). Een
cateringsite is commercieel, dus dat is iets om even te regelen.

## Terugval

Laadt LEMON MILK om een of andere reden niet, dan pakken de titels **Outfit**.
Ik heb Outfit, Jost, Poppins, Montserrat en Archivo naast het specimen uit de
styleguide gelegd; Outfit lag er het dichtst bij.

De volgorde staat bovenaan `assets/css/style.css`:

```css
--font-display: 'Lemon Milk', 'Outfit', 'Poppins', system-ui, sans-serif;
```
