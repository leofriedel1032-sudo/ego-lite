# Site web — DOMO 31 (Toulouse)

Site vitrine statique pour **DOMO 31**, entreprise de menuiseries extérieures
située 8 route d'Albi, 31200 Toulouse.

Aucun framework, aucune étape de build : ce sont six fichiers HTML, une feuille
de style et un script. Il suffit de déposer le dossier sur n'importe quel
hébergement (OVH, Infomaniak, Netlify, GitHub Pages…).

## Contenu

| Fichier | Page |
| --- | --- |
| `index.html` | Accueil — prestations, méthode, réalisations, zone d'intervention, FAQ |
| `prestations.html` | Détail des six familles de prestations |
| `realisations.html` | Exemples de chantiers |
| `entreprise.html` | Histoire, showroom, valeurs, chiffres clés |
| `contact.html` | Formulaire de devis, coordonnées, horaires, plan d'accès |
| `mentions-legales.html` | Mentions légales et données personnelles |
| `assets/css/style.css` | Feuille de style unique (variables CSS, responsive) |
| `assets/js/main.js` | Menu mobile, formulaire, animations au défilement |
| `assets/img/favicon.svg` | Favicon |

## Prévisualiser en local

```bash
cd websites/domo31
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Informations utilisées

Les coordonnées, horaires et éléments de présentation proviennent des
informations publiques de l'entreprise (adresse 8 route d'Albi à Toulouse,
téléphone 05 34 25 66 66, contact@domo31.fr, showroom de 250 m², activité
depuis 1994, reprise en 2023, appartenance au réseau Décostory).

**À vérifier et compléter avant mise en ligne :**

- `mentions-legales.html` : hébergeur, numéro de TVA intracommunautaire, code
  APE, directeur de la publication, assurance décennale, médiateur de la
  consommation.
- Les éventuelles qualifications (RGE, Qualibat…) ne sont pas affichées sur le
  site : les ajouter uniquement si elles sont en cours de validité.
- Les fiches de `realisations.html` décrivent des chantiers *représentatifs* et
  s'appuient sur des illustrations vectorielles. Les remplacer par de vraies
  photos et de vraies références, avec l'accord des clients.
- Aucun avis client n'a été inventé. Pour en afficher, reprendre des avis
  réellement publiés (Google, Pages Jaunes) en citant leur source.

## Formulaire de contact

Le site étant statique, le formulaire de `contact.html` ouvre par défaut le
logiciel de messagerie du visiteur avec une demande pré-remplie vers
`contact@domo31.fr`.

Pour un envoi côté serveur (Formspree, Netlify Forms, script PHP…), ajouter
l'URL de traitement sur la balise `<form>` :

```html
<form class="formulaire" data-formulaire-devis
      data-endpoint="https://exemple.tld/envoi" method="post"
      action="https://exemple.tld/envoi">
```

Dès que `data-endpoint` est présent, `main.js` laisse le navigateur effectuer
l'envoi POST normal au lieu de composer un e-mail.

## Personnalisation

Toutes les couleurs, polices et espacements sont regroupés en variables CSS en
haut de `assets/css/style.css`, section « Design tokens » :

```css
--bleu: #17518f;        /* couleur principale */
--jaune: #f5b301;       /* accent : tirets, pastilles, boutons de conversion */
--jaune-clair: #fdefc4; /* fond des icônes de prestations */
--anthracite: #13233d;  /* texte et sections sombres */
--brume: #f2f6fb;       /* fond des sections claires */
```

Les illustrations SVG intégrées aux pages reprennent la même palette : façades
et menuiseries en bleu marine, lumière des vitrages en jaune. Si la palette
change, penser à ces couleurs écrites en dur dans les fichiers HTML.

## Ressources externes

- Polices **Fraunces** et **Inter** via Google Fonts.
- Plan d'accès via **OpenStreetMap** (page contact).

Pour un site totalement autonome (RGPD, hors ligne), héberger les polices en
local et remplacer l'iframe du plan par une image cliquable.

## Accessibilité et référencement

- Structure de titres hiérarchisée, lien d'évitement, `aria-current` sur la page
  active, libellés explicites sur chaque champ de formulaire.
- Illustrations SVG décoratives marquées `aria-hidden`, illustrations
  informatives avec `role="img"` et `aria-label`.
- `prefers-reduced-motion` respecté : les animations sont désactivées.
- Balises `title`, `description`, Open Graph et URL canonique sur chaque page ;
  données structurées `HomeAndConstructionBusiness` (schema.org) sur l'accueil.

Avant mise en ligne, remplacer `https://www.domo31.fr/` dans les balises
`canonical` et `og:url` si le site est déployé sur un autre domaine.
