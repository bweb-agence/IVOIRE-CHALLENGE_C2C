# Design System — Ivoire Challenge Corporation (2C)

> **Site vitrine immobilier · Côte d'Ivoire**
> Version 1.0 — 17 juillet 2026
> Baseline : « De locataire à propriétaire, sans se ruiner. »

**Socle de marque figé pour ce système :**

| | |
|---|---|
| **Couleurs** | `#ffffff` (blanc) · `#08699b` (bleu 2C, primaire) · `#ed9f00` (or 2C, accent) |
| **Typographies** | **DM Sans** (titres) · **Inter** (corps, UI, données) |
| **Périmètre** | Accueil · Nos Biens · Détail d'un bien · À propos · Contact |

Ce document est la **source de vérité unique** pour le design, le développement et le contenu du site. Les tokens (couleurs, typo, espacement, rayons, ombres) sont **verrouillés** : on les copie exactement, on ne les réinvente pas. Les ratios de contraste cités ont été calculés et validés — ne pas les recalculer.

**Comment lire ce document** — Les sections 1 à 5 posent les **fondations** (marque, couleur, typo, mise en page, style). Les sections 6 et 7 spécifient les **composants** (des boutons aux cartes « bien »). La section 8 couvre **motion, accessibilité, contenu et gouvernance**. La section 9 fournit **l'export machine** des tokens (CSS + JSON) à coller directement dans le code.

---

## Sommaire

- [1. Fondations de marque & principes](#1-fondations-de-marque--principes)
- [2. Système de couleur](#2-système-de-couleur)
- [3. Typographie](#3-typographie)
- [4. Mise en page, grille & espacement](#4-mise-en-page-grille--espacement)
- [5. Style visuel : rayons, ombres, iconographie, imagerie](#5-style-visuel--rayons-ombres-iconographie-imagerie)
- [6. Composants — éléments de base](#6-composants--éléments-de-base)
- [7. Composants — blocs & patterns de page](#7-composants--blocs--patterns-de-page)
- [8. Motion, accessibilité, contenu & gouvernance](#8-motion-accessibilité-contenu--gouvernance)
- [9. Design tokens — export développeur (CSS & JSON)](#9-design-tokens--export-développeur-css--json)

---

## 1. Fondations de marque & principes

### 1.1 Objet du document & audience

Ce document définit le socle commun sur lequel repose toute l'expérience du site vitrine **Ivoire Challenge Corporation (2C)**. Il traduit la promesse de marque — *« De locataire à propriétaire, sans se ruiner. »* — en décisions de design vérifiables et réutilisables, pour que chaque page (Accueil, Nos Biens, Détail d'un bien, À propos, Contact) transmette la même impression : **sérieuse, rassurante, accessible, humaine, « premium abordable »**.

| Rôle | Ce que cette section fournit | Ce qu'on en attend |
|---|---|---|
| **Design** | Palette, typo, échelle, principes de composition | Composer chaque écran sans réinventer ni improviser une couleur/taille |
| **Développement** | Tokens (couleurs, espacement, rayons, ombres, motion), ratios de contraste déjà validés | Implémenter fidèlement, sans « corriger » les hex ni recalculer l'accessibilité |
| **Marketing / Contenu** | Personnalité, voix & ton, règles d'écriture FR, matrice « à écrire / à éviter » | Rédiger des libellés, CTA et messages cohérents et conformes |

> **Règle d'or transverse :** les tokens de cette section sont **verrouillés**. On copie les hex et les valeurs **exactement**. On n'invente pas de nuance intermédiaire, on ne « rapproche » pas une couleur au jugé.

---

### 1.2 L'ADN 2C traduit en design

2C vend un projet de vie à fort enjeu (terrains documentés ACD/titre foncier, briques à crédit, accompagnement construction) à un public prudent, souvent primo-accédant. La confiance n'est pas un supplément décoratif : **c'est le produit**. Trois piliers de marque, trois traductions visuelles.

| Pilier de marque | Signification métier 2C | Traduction design | Token(s) |
|---|---|---|---|
| **Confiance & sécurité** | Documentation légale, terrains sécurisés, institution sérieuse | Le **bleu 2C** structure : en-têtes, navigation, liens, boutons primaires, badges « Site approuvé » | `primary-600 #08699b` (base) · `primary-700 #075884` · `primary-50 #eef6fb` (fonds) |
| **Valeur & opportunité** | « À partir de X FCFA », paiement 1/3 puis 12 mois, chaleur humaine | L'**or 2C** ponctue : accent d'un prix, CTA secondaire, micro-signal « bonne affaire », jamais en aplat de texte | `accent-500 #ed9f00` (aplats/déco) · `accent-700 #a76700` (texte or sur blanc) |
| **Accessibilité & clarté** | Sans se ruiner, sans jargon, compréhensible par tous | Le **blanc** respire : fonds, surfaces de cartes, marges généreuses ; hiérarchie lisible ; ardoise bleutée pour le texte | `white #ffffff` · `ink #10222e` (texte) · neutres `#f6f8fa`→`#0e141a` |

**Le rapport de force chromatique est volontairement déséquilibré :** environ 70 % de blanc/neutres (respiration, sérieux), 20 % de bleu (structure, institution), 10 % d'or (accent, opportunité). L'or qui « déborde » détruit le positionnement premium abordable et vire au clinquant — exactement l'inverse du rassurant.

---

### 1.3 Principes de design actionnables

Six principes. Chacun tranche une décision réelle du site 2C.

**1. La preuve avant la promesse.**
Un acheteur de terrain a peur de se faire escroquer ; on rassure par la documentation, pas par l'adjectif.
- *Implication :* le badge **« Documentation légale ACD / titre foncier »** et le statut du bien sont visibles **dès la carte** et en haut du **Détail d'un bien**, avant le prix et avant tout superlatif. On montre le document, la localité, la superficie — pas « le meilleur terrain de Côte d'Ivoire ».

**2. Le prix se lit d'un coup d'œil.**
Le prix « à partir de X FCFA » est l'information n°1 de décision ; il doit être trouvable en < 1 seconde.
- *Implication :* prix en **Inter 600**, couleur `ink #10222e`, jamais en or clair sur blanc (`accent-500` = 2,20:1 → illisible). La mention « à partir de » en `Body-sm 14/22`, le montant en `H4 20/28` minimum. `FCFA` toujours suffixé, espace insécable, séparateur de milliers.

**3. Le bleu structure, l'or ponctue.**
Le bleu porte l'architecture et la confiance ; l'or n'apparaît que pour signaler une valeur ou une action secondaire.
- *Implication :* CTA primaire = **bleu plein** (`primary-600`, blanc dessus = 5,99:1 AA). CTA secondaire / accent = or **en fond** avec texte foncé (`ink` sur `accent-500` = 9,56:1 AAA). Pour du **texte or sur blanc**, une seule nuance autorisée : `accent-700 #a76700` (4,58:1 AA). Un écran ne compte jamais deux zones d'or concurrentes.

**4. Mobile d'abord.**
La cible ivoirienne navigue majoritairement au téléphone, souvent en réseau contraint.
- *Implication :* on conçoit à partir du breakpoint **sm 640**, échelle typo mobile (`Display 36/44`, `H1 30/38`…), cibles tactiles ≥ 44 px, CTA **WhatsApp** et **téléphone** accessibles au pouce (bas d'écran / sticky). Grille 12 colonnes, conteneur max **1200**, gouttière **24** seulement à partir de `lg 1024`.

**5. Accessible par défaut.**
L'accessibilité est une condition de sérieux, pas une option de fin de projet.
- *Implication :* on ne cite que les **contrastes déjà validés** de cette charte. Texte courant en `ink` (16,3:1) ou `neutral-600 #526170` (6,35:1). `neutral-500 #6b7c8d` (4,29:1) réservé au texte large / désactivé, **jamais** au corps. Focus visible, `prefers-reduced-motion` respecté, jamais la couleur seule pour porter un sens (statut = pastille **+ libellé**).

**6. Rassurer à chaque écran.**
Aucune page n'est un cul-de-sac anxiogène : partout un repère de confiance et une porte de sortie humaine.
- *Implication :* chaque écran expose au moins un **signal de réassurance** (badge légal, statut, témoignage) **et** un **contact humain** (« Parler à un conseiller » WhatsApp / téléphone). Les états vides, erreurs et « bien Réservé/Vendu » proposent toujours une alternative, jamais une impasse.

---

### 1.4 Personnalité de marque

Trois adjectifs directeurs. Chacun avec sa frontière — ce que 2C **n'est pas**.

| Nous sommes… | …nous ne sommes pas | Ce que ça change à l'écran |
|---|---|---|
| **Fiables** (documentés, institutionnels) | Bureaucratiques, froids, tatillons | Preuve légale mise en avant, mais formulée simplement ; pas de mur de mentions juridiques |
| **Accessibles** (clairs, « sans se ruiner ») | Bas de gamme, discount, criards | Blanc et respiration, or maîtrisé ; on parle d'échelonnement, pas de « prix cassés » |
| **Humains** (proches, à l'écoute) | Familiers, désinvoltes, survendeurs | Conseiller joignable, ton chaleureux ; jamais d'urgence factice ni de « !!! » |

---

### 1.5 Voix & ton — écriture d'interface (FR)

Toute la rédaction produit est en **français**. La voix 2C est **claire, directe, chiffrée et humaine**. On explique un engagement financier important à des gens prudents : chaque mot doit réduire l'incertitude.

**Principes d'écriture**
- **Clair avant tout.** Phrases courtes, une idée par phrase. On préfère « Payez 1/3 au départ, le reste sur 12 mois » à une tournure administrative.
- **Direct et orienté action.** CTA à l'infinitif ou à l'impératif, verbe concret : *Voir le bien*, *Parler à un conseiller*.
- **Chiffré et précis.** Superficie en m², prix en **FCFA**, durée en mois. Un chiffre vaut mieux qu'un adjectif (« 12 mois » > « rapidement »).
- **Sans jargon juridique inutile.** On garde les termes qui rassurent et sont compris (**ACD**, **titre foncier**), on explicite le reste en langage courant. Pas de clauses ni d'abréviations obscures dans l'UI.
- **Rassurant, jamais pressant.** Pas d'urgence artificielle, pas de majuscules criardes, pas de points d'exclamation en rafale. La confiance ne se crie pas.
- **Humain.** On s'adresse à la personne (« vous »), avec respect et chaleur, sans familiarité excessive.

**Matrice « à écrire / à éviter »**

| Contexte | ✅ À écrire | ❌ À éviter |
|---|---|---|
| **CTA principal (bien)** | `Voir le bien` | `Cliquez ici` · `En savoir + !!!` |
| **CTA contact** | `Parler à un conseiller` · `Appeler le conseiller` | `Contactez-nous maintenant !!!` |
| **Prix** | `À partir de 5 000 000 FCFA` | `PRIX FOU 💥` · `5M seulement !` |
| **Badge confiance** | `Documentation légale` · `Site approuvé` · `ACD / titre foncier` | `100% garanti` · `Zéro risque` |
| **Statut — Disponible** | `Disponible` (pastille `success #1a8f5c`) | `LIBRE VITE !` |
| **Statut — Réservé** | `Réservé` (pastille `warning #cf8500`) | `Presque parti…` |
| **Statut — Vendu** | `Vendu` (pastille `neutral-500`) + « Voir des biens similaires » | `Trop tard pour vous` |
| **Financement** | `1/3 au départ, le reste jusqu'à 12 mois` | `Crédit facile sans effort` |
| **Message d'erreur (formulaire)** | `Numéro de téléphone requis pour vous rappeler.` | `Erreur ! Champ invalide.` |
| **Confirmation d'envoi** | `Merci, un conseiller vous recontacte sous 24 h.` | `Envoyé.` (sec, sans suite) |
| **Bien indisponible** | `Ce bien n'est plus disponible. Découvrez des terrains similaires.` | `Aucun résultat.` |

**Règles de forme (FR) :** montants toujours suffixés `FCFA` avec espace insécable et séparateur de milliers (`5 000 000 FCFA`) ; superficie en `m²` ; « à partir de » en minuscules devant le prix ; overline en MAJUSCULES avec interlettrage `+0.08em` ; pas de point final sur un libellé de bouton.

> **Note bilingue.** L'interface est **française par défaut**. Si un libellé anglais est requis (contexte international, pictogramme partagé), le mettre en **appui** et non en remplacement : `Voir le bien` reste primaire, un `(View)` discret est toléré uniquement si le besoin est avéré. Équivalences de référence : *Voir le bien → View property* · *Parler à un conseiller → Talk to an advisor* · *Disponible / Réservé / Vendu → Available / Reserved / Sold* · *À partir de → From*. On ne mélange jamais FR et EN dans un même libellé de CTA.

---

## 2. Système de couleur

Le système repose sur **3 couleurs socle** fournies par le client, déclinées en rampes complètes (50 → 950) pour couvrir tous les besoins d'interface d'un site vitrine immobilier : surfaces respirantes, structure institutionnelle, mises en avant commerciales (prix, badges de confiance, CTA), et signaux d'état (Disponible / Réservé / Vendu). La règle d'or : **le blanc respire, le bleu structure, l'or ponctue**.

### 2.1 Couleurs socle & signification

| Couleur | Hex | Rôle de marque | Signification 2C |
|---|---|---|---|
| **Blanc** | `#ffffff` | Fond principal, surfaces, respiration | Clarté, transparence, honnêteté du parcours « de locataire à propriétaire » |
| **Bleu 2C** | `#08699b` | Primaire (`primary-600`) | Confiance, sécurité, cadre institutionnel — la garantie ACD / titre foncier, le sérieux du crédit |
| **Or 2C** | `#ed9f00` | Accent (`accent-500`) | Valeur, opportunité, chaleur, patrimoine — l'ambition d'accéder à la propriété « sans se ruiner » |

> L'or est une **couleur d'accent, pas une couleur de fond de page**. Il signale ce qui a de la valeur (prix « à partir de », CTA secondaire, badge « Site approuvé ») et ne dépasse jamais ~10 % de la surface visible.

### 2.2 Rampe Primaire — Bleu 2C

Base = `primary-600` = `#08699b`.

| Token | Hex | Usage |
|---|---|---|
| `primary-50` | `#eef6fb` | Fonds de section très légers, survol de ligne, fond de champ actif, fond `info` |
| `primary-100` | `#d3e7f3` | Bandeaux d'information, fond de badge bleu, séparateurs teintés |
| `primary-200` | `#a7cfe7` | Bordures de composants bleus, états désactivés sur fond bleu, chips |
| `primary-300` | `#6fb0d6` | Illustrations, icônes décoratives, graphes secondaires |
| `primary-400` | `#3a8ec1` | Survol d'éléments bleus clairs, accents de data-viz |
| `primary-500` | `#167aad` | Liens au survol, icônes actives, dégradés |
| **`primary-600`** | **`#08699b`** | **Couleur primaire : boutons principaux, liens, en-têtes, barre de recherche active, `info`** |
| `primary-700` | `#075884` | Survol/`:active` des boutons primaires, texte de titre sur fond très clair |
| `primary-800` | `#0a4869` | Footer, bandeaux CTA profonds, en-tête de tableau |
| `primary-900` | `#0c3a54` | Fonds héros sombres, overlays de photo, pied de page dense |
| `primary-950` | `#072536` | Texte bleu très foncé, base des dégradés, fond immersif nocturne |

### 2.3 Rampe Accent — Or 2C

Base = `accent-500` = `#ed9f00`. **Réservée aux aplats et éléments décoratifs** ; pour du **texte or sur blanc**, utiliser `accent-700`.

| Token | Hex | Usage |
|---|---|---|
| `accent-50` | `#fff8e6` | Fond de badge « Opportunité », fond `warning` doux, ruban « à partir de » |
| `accent-100` | `#fdecbf` | Bandeaux promotionnels légers, surlignage de prix |
| `accent-200` | `#fadd8a` | Bordures de badge or, séparateurs chaleureux |
| `accent-300` | `#f6c94d` | Décor, motifs, étoiles de témoignage (pleines) |
| `accent-400` | `#f2b31f` | Survol d'aplats or, accents graphiques |
| **`accent-500`** | **`#ed9f00`** | **Aplat de CTA secondaire, fond de badge, filet d'accent — texte foncé `#10222e` uniquement par-dessus** |
| `accent-600` | `#cf8500` | Survol/`:active` d'un aplat or ; = couleur `warning` |
| **`accent-700`** | **`#a76700`** | **LA nuance d'or pour du TEXTE or sur blanc (prix mis en avant, lien or, libellé de badge)** |
| `accent-800` | `#855100` | Texte or renforcé, icônes or sur fond clair |
| `accent-900` | `#6e4300` | Texte or très foncé, base de dégradé or |
| `accent-950` | `#3f2500` | Ombres teintées or, base de dégradé profond |

### 2.4 Rampe Neutre — Ardoise bleutée

Neutres légèrement bleutés pour rester en cohésion avec le Bleu 2C.

| Token | Hex | Usage |
|---|---|---|
| `white` | `#ffffff` | Fond principal, surface des cartes « bien », fond de formulaire |
| `neutral-50` | `#f6f8fa` | Surface alternée (`surface-alt`), fond de section, ligne zébrée |
| `neutral-100` | `#eceff3` | Fond désactivé, séparateur de bloc, skeleton de chargement |
| `neutral-200` | `#dbe1e8` | **Bordure hairline (1px)**, contour de carte, filet de séparation |
| `neutral-300` | `#c0cad4` | Bordure de champ au repos, icônes tertiaires, états désactivés |
| `neutral-400` | `#94a3b3` | Placeholder de champ, texte désactivé, icônes discrètes |
| `neutral-500` | `#6b7c8d` | Texte large / légendes secondaires, **PAS le corps de texte** (contraste limite) |
| `neutral-600` | `#526170` | **Texte secondaire** (localisation, superficie, méta) — AA OK |
| `neutral-700` | `#3d4a57` | Texte de renfort, sous-titres, libellés de formulaire |
| `neutral-800` | `#29333d` | Titres sur fond clair (alternative à `ink`) |
| `neutral-900` | `#182028` | Fonds sombres, footer alternatif |
| `neutral-950` | `#0e141a` | Fond ultra-sombre, base d'ombre |
| **`ink`** | **`#10222e`** | **Texte principal (titres + corps) — contraste AAA 16,3:1** |

### 2.5 Couleurs sémantiques (état & feedback)

Utilisées pour les statuts de bien, les messages de formulaire et les bandeaux système.

| Rôle | Texte / icône | Fond | Usage 2C |
|---|---|---|---|
| **Success** | `#1a8f5c` | `#e6f5ee` | Statut **Disponible**, confirmation d'envoi de formulaire, paiement enregistré |
| **Warning** | `#cf8500` | `#fff4d6` | Statut **Réservé**, échéance de crédit à venir, champ à vérifier |
| **Error** | `#d1362f` | `#fbeceb` | Statut **Vendu** (indisponible), erreur de formulaire, champ requis manquant |
| **Info** | `#08699b` | `#eef6fb` | Bandeau « Documentation légale ACD/titre foncier », aide contextuelle |

```css
/* Statuts de bien */
--status-disponible-fg: #1a8f5c;  --status-disponible-bg: #e6f5ee;
--status-reserve-fg:    #cf8500;  --status-reserve-bg:    #fff4d6;
--status-vendu-fg:      #d1362f;  --status-vendu-bg:      #fbeceb;
```

### 2.6 Tokens sémantiques d'application (rôles)

Couche d'abstraction entre la palette brute et les composants : on stylise avec ces rôles, jamais avec les hex directement.

| Token de rôle | Valeur | Hex | Usage |
|---|---|---|---|
| `--color-surface` | `white` | `#ffffff` | Fond de page, carte « bien », panneau de formulaire |
| `--color-surface-alt` | `neutral-50` | `#f6f8fa` | Section alternée, fond de barre de recherche/filtres |
| `--color-surface-sunken` | `neutral-100` | `#eceff3` | Zone en creux, champ désactivé, skeleton |
| `--color-border` | `neutral-200` | `#dbe1e8` | Bordure hairline 1px des cartes et blocs |
| `--color-border-strong` | `neutral-300` | `#c0cad4` | Bordure de champ, contour renforcé 1.5px |
| `--color-text` (ink) | `ink` | `#10222e` | Texte principal, titres, prix |
| `--color-text-secondary` | `neutral-600` | `#526170` | Texte secondaire : ville, superficie, méta |
| `--color-text-muted` | `neutral-500` | `#6b7c8d` | Texte large / désactivé uniquement |
| `--color-text-on-primary` | `white` | `#ffffff` | Texte sur aplat bleu (bouton primaire, footer) |
| `--color-text-on-accent` | `ink` | `#10222e` | Texte sur aplat or (CTA secondaire, badge) |
| `--color-primary` | `primary-600` | `#08699b` | Action primaire, en-tête, éléments structurants |
| `--color-primary-hover` | `primary-700` | `#075884` | Survol/`:active` du primaire |
| `--color-accent` | `accent-500` | `#ed9f00` | Aplat d'accent (CTA secondaire, badge, filet) |
| `--color-accent-text` | `accent-700` | `#a76700` | **Texte or sur blanc** (prix mis en avant, lien or) |
| `--color-link` | `primary-600` | `#08699b` | Liens au repos |
| `--color-link-hover` | `primary-700` | `#075884` | Liens au survol |
| `--color-focus-ring` | `primary-600` | `#08699b` | Anneau de focus clavier (halo 3px `#08699b` @ 40 %) |
| `--color-cta-whatsapp` | `success` | `#1a8f5c` | CTA « Parler à un conseiller » (vert de confiance) |

```css
/* Anneau de focus — accessibilité clavier, sur tous les éléments interactifs */
:focus-visible {
  outline: 2px solid var(--color-focus-ring); /* #08699b */
  outline-offset: 2px;
  border-radius: inherit;
}
```

### 2.7 Règle d'équilibre 60-30-10

| Part | Couleur | Rôle | Où, concrètement |
|---|---|---|---|
| **~60 %** | Blanc `#ffffff` + neutre `#f6f8fa` | **Dominante** — respiration | Fonds de page, surfaces de cartes, marges, formulaires |
| **~30 %** | Bleu 2C `#08699b` (+ rampe) | **Structure** | En-tête, boutons primaires, liens, footer, titres, barre de recherche |
| **≤ 10 %** | Or 2C `#ed9f00` / texte `#a76700` | **Ponctuation** | Prix « à partir de X FCFA », badge « Site approuvé », CTA secondaire, filets d'accent |

**Principe :** l'or est un **surligneur de valeur**. Sur une page « Nos Biens », il n'apparaît que sur le prix mis en avant et les badges de confiance — pas sur les fonds de cartes ni les grands aplats. Si l'œil voit « beaucoup d'or », on a dépassé les 10 %.

### 2.8 Accessibilité — contrastes WCAG (valeurs verrouillées)

Ratios déjà calculés dans les fondations, à respecter tels quels.

| Paire (premier plan / fond) | Ratio | Verdict | Usage autorisé |
|---|---|---|---|
| `#08699b` (primary-600) sur blanc | **5,99:1** | AA texte normal ✅ · AAA ❌ | Liens, boutons, texte bleu, icônes |
| Blanc sur `#08699b` (primary-600) | **5,99:1** | AA texte normal ✅ · AAA ❌ | Libellé de bouton primaire, texte de footer |
| `#ed9f00` (accent-500) sur blanc | **2,20:1** | ❌ ÉCHEC texte | **JAMAIS en texte.** Aplats/fonds avec texte foncé, ou décor uniquement |
| `#10222e` (ink) sur `#ed9f00` (accent-500) | **9,56:1** | AAA ✅ | Texte foncé sur aplat/badge or (CTA secondaire) |
| `#a76700` (accent-700) sur blanc | **4,58:1** | AA texte normal ✅ | **LA** nuance pour du **texte or sur blanc** (prix, lien or) |
| `#10222e` (ink) sur blanc | **16,3:1** | AAA ✅ | Texte principal : titres, corps, prix |
| `#526170` (neutral-600) sur blanc | **6,35:1** | AA ✅ | Texte secondaire : ville, superficie, méta |
| `#6b7c8d` (neutral-500) sur blanc | **4,29:1** | Limite ⚠️ | Texte large / désactivé uniquement — **PAS le corps** |

> **Règle absolue sur l'or :** `#ed9f00` (accent-500) **ne sert JAMAIS de couleur de texte sur blanc** (2,20:1 = échec). Deux seuls usages conformes :
> 1. **Texte or sur blanc → `#a76700`** (accent-700, 4,58:1, AA). Ex. : « **À partir de 3 500 000 FCFA** ».
> 2. **Texte foncé `#10222e` sur aplat or `#ed9f00`** (9,56:1, AAA). Ex. : bouton « Réserver ce terrain », badge « Site approuvé ».

```html
<!-- ✅ Prix mis en avant : texte or lisible -->
<p class="prix">À partir de <strong style="color:#a76700">3 500 000 FCFA</strong></p>

<!-- ✅ CTA secondaire : aplat or + texte foncé -->
<button style="background:#ed9f00; color:#10222e">Parler à un conseiller</button>

<!-- ❌ INTERDIT : or accent-500 en texte sur blanc (2,20:1) -->
<span style="color:#ed9f00">À partir de 3 500 000 FCFA</span>
```

### 2.9 Dégradés de marque autorisés

Trois dégradés seulement, appliqués avec parcimonie (héros, bandeau CTA, overlay photo). Toujours vérifier le contraste du **texte posé par-dessus**.

```css
/* 1. Bleu institutionnel — héros, bandeau CTA, en-tête de page.
   Texte BLANC autorisé (contraste ≥ celui de primary-600). */
--gradient-primary: linear-gradient(135deg, #075884 0%, #08699b 100%); /* 700 → 600 */

/* 2. Or valeur — aplat de badge/CTA secondaire, ruban « Opportunité ».
   Texte FONCÉ #10222e uniquement (≥ 9,56:1). Jamais de texte clair. */
--gradient-accent: linear-gradient(135deg, #ed9f00 0%, #cf8500 100%); /* 500 → 600 */

/* 3. Overlay photo — lisibilité du texte sur visuel de terrain/bien.
   Dégradé bleu profond transparent → opaque, du haut vers le bas. */
--gradient-photo-overlay: linear-gradient(
  180deg,
  rgba(12, 58, 84, 0)   0%,   /* primary-900 transparent */
  rgba(12, 58, 84, .45) 55%,
  rgba(7, 37, 54, .82)  100%  /* primary-950 dense */
);
```

**Usage :** l'overlay se pose sur les photos de biens (cartes, détail, héros) pour garantir la lisibilité du nom du bien, de la localisation et du prix en blanc, quelle que soit l'image.

### 2.10 À faire / À éviter

**✅ À faire**
- Utiliser le **blanc comme dominante** (~60 %) : les cartes « bien » respirent, le contenu prime.
- Réserver l'**or aux points de valeur** : prix « à partir de », badge « Site approuvé »/« Documentation légale », CTA secondaire, filet d'accent.
- Écrire tout **texte or sur blanc en `#a76700`** (accent-700) ; sur **aplat or**, texte foncé `#10222e`.
- Employer le **bleu `#08699b` pour la structure** : navigation, boutons primaires, liens, footer.
- Coder les statuts avec les **couples sémantiques** : Disponible = vert, Réservé = or/warning, Vendu = rouge.
- Poser un **overlay bleu** sur toute photo portant du texte (lisibilité garantie).
- Styliser via les **tokens de rôle** (`--color-primary`, `--color-accent-text`…), jamais avec les hex en dur.
- Toujours afficher un **anneau de focus `#08699b`** visible sur les éléments interactifs (clavier).

**❌ À éviter**
- **Colorer un bloc entier ou une carte en or** : l'or est un accent, pas un fond de surface.
- Utiliser `#ed9f00` (accent-500) **en couleur de texte** sur blanc (2,20:1 = échec WCAG).
- Mettre du **texte clair/blanc sur aplat or** (utiliser `#10222e`).
- Employer `#6b7c8d` (neutral-500) pour le **corps de texte** (4,29:1, limite) — le réserver au texte large/désactivé.
- Multiplier les **dégradés** ou en inventer hors des 3 autorisés.
- **Superposer bleu et or en texte** (ex. lien or sur fond bleu) sans revalider le contraste.
- Poser du texte sur une **photo sans overlay**.
- Faire de l'or un **signal d'état** (garder Disponible/Réservé/Vendu sur les couples sémantiques dédiés).

---

## 3. Typographie

Le système typographique de 2C repose sur **deux familles verrouillées, jamais plus**. Elles portent la promesse « premium abordable » : une signature de marque chaleureuse pour les titres, une lisibilité irréprochable pour les prix, les surfaces légales et les formulaires. Aucune autre police ne doit être introduite (pas de police décorative pour les prix, pas de serif pour les titres).

### 3.1 Les deux familles et leurs rôles verrouillés

| Rôle | Famille | Poids autorisés | Pourquoi |
|---|---|---|---|
| **Titres / Display** | **DM Sans** | 500, 700 | Grotesque géométrique, formes rondes et ouvertes : chaleureuse et humaine sans être fantaisiste. Elle porte la voix « sérieuse mais accessible » de 2C sur les accroches, titres de section et titres de bien. |
| **Corps / UI / données / prix** | **Inter** | 400, 500, 600 | Dessinée pour l'écran : hauteur d'x élevée, chiffres nets, excellente lisibilité en petit corps. Indispensable pour les prix en FCFA, les mentions légales (ACD / titre foncier), les libellés de formulaire et les filtres. |

**Règle d'or : DM Sans ne descend jamais sous le corps H4 ; Inter ne remonte jamais au-dessus de H4.** Un titre reste en DM Sans, une donnée reste en Inter — même à taille égale.

**Fallback (identique pour les deux familles) :**

```css
/* Chaîne de secours commune */
--font-fallback: ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

:root {
  --font-display: "DM Sans", var(--font-fallback);   /* Titres */
  --font-body:    "Inter",   var(--font-fallback);   /* Corps / UI / données / prix */
}
```

---

### 3.2 Import des polices

**Poids à charger — et seulement ceux-là** (chaque poids superflu alourdit le chargement) :
- **DM Sans** : 500, 700
- **Inter** : 400, 500, 600

#### Option A — Google Fonts (recommandé pour un site vitrine)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;700&family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet">
```

`display=swap` : le texte s'affiche immédiatement en fallback puis bascule sur la police finale — pas d'écran blanc, meilleure perception de rapidité (important sur les connexions mobiles en Côte d'Ivoire).

#### Option B — Auto-hébergement `@font-face` (performance / offline maîtrisé)

```css
/* Woff2 auto-hébergé : évite la dépendance à un tiers, formats sous-ensemblés latin */
@font-face {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 500 700;               /* plage variable 500→700 */
  font-display: swap;
  src: url("/fonts/dmsans-variable.woff2") format("woff2");
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400 600;               /* plage variable 400→600 */
  font-display: swap;
  src: url("/fonts/inter-variable.woff2") format("woff2");
}
```

> À faire dans les deux cas : précharger la police du titre principal de la page d'accueil (`<link rel="preload" as="font" type="font/woff2" crossorigin>`) pour éviter un décalage visuel sur le Hero.

---

### 3.3 Échelle typographique

Tailles en **px / interligne px**, mobile entre parenthèses. Le mobile s'applique en dessous du breakpoint **md 768**.

| Style | Famille | Poids | Desktop (px) | Mobile (px) | Letter-spacing | Usage 2C |
|---|---|---|---|---|---|---|
| **Display** | DM Sans | 700 | 48 / 56 | 36 / 44 | −0.02em | Accroche Hero accueil : « De locataire à propriétaire, sans se ruiner. » |
| **H1** | DM Sans | 700 | 40 / 48 | 30 / 38 | −0.02em | Titre de page : « Nos biens », « À propos », titre du bien en page détail |
| **H2** | DM Sans | 700 | 32 / 40 | 26 / 34 | −0.015em | Titres de section : « Terrains sécurisés », « Briques à crédit », « Nos services » |
| **H3** | DM Sans | 700 | 24 / 32 | 22 / 30 | −0.01em | Sous-sections, titre de bloc CTA, titre de carte service |
| **H4** | DM Sans | 500 | 20 / 28 | 20 / 28 | −0.01em | **Titre de carte « bien »**, en-tête de formulaire, titre de témoignage |
| **Body-lg** | Inter | 400 | 18 / 28 | 18 / 28 | 0 | Chapô, intro de section, argumentaire de réassurance |
| **Body** | Inter | 400 | 16 / 26 | 16 / 26 | 0 | Texte courant, descriptions de bien, mentions légales ACD / titre foncier |
| **Body-sm** | Inter | 400 | 14 / 22 | 14 / 22 | 0 | Métadonnées de carte (superficie, ville), aide de champ, labels de filtre |
| **Caption** | Inter | 500 | 13 / 18 | 13 / 18 | 0 | Légende de carte de localisation, note de bas de carte, horodatage |
| **Overline** | Inter | 600 | 12 / 16 | 12 / 16 | +0.08em (MAJ) | **Badges** « SITE APPROUVÉ », « DOCUMENTATION LÉGALE », éyebrow de section |

Rappel : **titres −0.01 à −0.02em**, **corps 0**, **overline +0.08em (en MAJUSCULES)**.

```css
/* Extrait de tokens — mêmes valeurs que le tableau */
.t-display { font-family: var(--font-display); font-weight: 700; font-size: 48px; line-height: 56px; letter-spacing: -0.02em; }
.t-h2      { font-family: var(--font-display); font-weight: 700; font-size: 32px; line-height: 40px; letter-spacing: -0.015em; }
.t-h4      { font-family: var(--font-display); font-weight: 500; font-size: 20px; line-height: 28px; letter-spacing: -0.01em; }
.t-body    { font-family: var(--font-body);    font-weight: 400; font-size: 16px; line-height: 26px; letter-spacing: 0; }
.t-overline{ font-family: var(--font-body);    font-weight: 600; font-size: 12px; line-height: 16px; letter-spacing: 0.08em; text-transform: uppercase; }
```

---

### 3.4 Règles de composition

- **Longueur de ligne : 60 à 75 caractères** pour tout paragraphe de corps. On limite avec `max-width` plutôt qu'en cassant les lignes à la main.
  ```css
  .prose { max-width: 68ch; }   /* ≈ 60–75 caractères par ligne */
  ```
- **Interlignage.** Les valeurs du tableau sont fixes et ne se recalculent pas : titres serrés (ratio ~1.1–1.2), corps aéré (~1.5–1.6 pour Body 16/26). Ne jamais réduire l'interligne du corps sous 1.4.
- **Hiérarchie.** Un seul **Display** et un seul **H1** par page. On descend l'échelle sans sauter de niveau pour l'accessibilité (H1 → H2 → H3). La taille, le poids et l'espace au-dessus (`space-*`) créent la hiérarchie — pas la couleur.
- **Gras vs couleur pour l'emphase.** L'emphase dans un paragraphe se fait avec **Inter 600** (poids), pas avec de la couleur. La couleur est réservée aux liens (`primary-600 #08699b`) et aux statuts sémantiques. **On n'utilise jamais l'or `accent-500 #ed9f00` pour du texte** : contraste 2,20:1 sur blanc → échec WCAG. Pour un mot en **texte or sur blanc**, utiliser **`accent-700 #a76700`** (4,58:1 → AA). Pour de longs passages, éviter l'italique : préférer le poids.
- **Contrastes texte (déjà calculés, à respecter) :**
  - Texte principal `ink #10222e` sur blanc = **16,3:1** (AAA).
  - Texte secondaire `neutral-600 #526170` sur blanc = **6,35:1** (AA).
  - `neutral-500 #6b7c8d` = **4,29:1** → réservé au texte large / champ désactivé, **jamais** pour un paragraphe.
  - Lien / accent bleu `primary-600 #08699b` sur blanc = **5,99:1** (AA).

---

### 3.5 Chiffres et prix (FCFA)

Les prix sont un point de confiance : ils doivent être **nets, alignés et lisibles**. Tout chiffre est en **Inter**.

**Format canonique : `12 000 000 FCFA`** — séparateur de milliers = espace fine insécable (`U+202F`), et espace insécable (`U+00A0`) avant « FCFA » pour que le montant ne se coupe jamais en fin de ligne.

**`tabular-nums` obligatoire** partout où des chiffres s'empilent ou se comparent (grille de biens, tableau de prix, échéancier de paiement) : les chiffres gardent une largeur constante, les montants s'alignent à la virgule près.

```css
/* Prix et données chiffrées alignées */
.price,
.data-num {
  font-family: var(--font-body);          /* Inter */
  font-variant-numeric: tabular-nums;      /* chiffres à chasse fixe */
  font-feature-settings: "tnum" 1;         /* fallback navigateurs anciens */
}

.price {
  font-weight: 600;
  color: var(--ink, #10222e);              /* 16,3:1 sur blanc */
}
.price__from {                             /* mention « à partir de » */
  font-weight: 400;
  font-size: 14px;                          /* Body-sm */
  color: #526170;                           /* neutral-600, 6,35:1 */
}
```

```html
<!-- « à partir de X FCFA » — la mention reste discrète, le montant domine -->
<p class="price">
  <span class="price__from">À partir de&nbsp;</span>
  <span class="price__amount">12&#8239;000&#8239;000&nbsp;FCFA</span>
</p>
```

Règles : prix **jamais en or**, jamais en italique. Le « FCFA » n'est pas mis en exposant ni raccourci. Sur un statut **Vendu**, on peut barrer/griser le prix (`neutral-500`) mais on garde `tabular-nums`.

---

### 3.6 Exemples appliqués (composants 2C)

**Titre de carte « bien »** — DM Sans 500, H4 (20/28), `ink` :
```html
<h3 class="t-h4">Villa basse 4 pièces — Bingerville</h3>
<p class="t-body-sm" style="color:#526170">450 m² · Bingerville, Abidjan</p>
```

**Prix « à partir de »** — Inter, `tabular-nums`, montant en 600 :
```html
<p class="price"><span class="price__from">À partir de </span>18&#8239;500&#8239;000&nbsp;FCFA</p>
```

**Overline « Site approuvé »** — Inter 600, 12/16, MAJ, +0.08em. Le texte du badge doit rester foncé : si le fond est or `accent-500 #ed9f00`, poser du texte `ink #10222e` (9,56:1 → AAA) ; si le texte est or sur blanc, utiliser `accent-700 #a76700`.
```html
<!-- Badge sur aplat or : texte foncé -->
<span class="t-overline" style="background:#ed9f00;color:#10222e;padding:4px 10px;border-radius:999px">
  Site approuvé
</span>

<!-- Éyebrow or sur fond blanc : accent-700 -->
<span class="t-overline" style="color:#a76700">Documentation légale</span>
```

**Libellé de bouton** — Inter **600**, 14–16 px, sans letter-spacing négatif, casse phrase (pas de MAJUSCULES) :
```html
<button class="btn btn--primary" style="font-family:var(--font-body);font-weight:600">Voir le bien</button>
<button class="btn btn--whatsapp" style="font-family:var(--font-body);font-weight:600">Parler à un conseiller</button>
```

---

### 3.7 Responsive et fluidité

L'échelle du tableau donne deux points d'ancrage (mobile < 768, desktop ≥ 768). Pour les **très gros titres** (Display, H1), on peut lisser la transition avec `clamp()` — le titre grandit continûment avec la fenêtre au lieu de sauter au breakpoint.

```css
/* Display : 36px (mobile) → 48px (desktop), interligne fluide 44→56 */
.t-display--fluid {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.25rem, 1.5rem + 3.2vw, 3rem);   /* 36px → 48px */
  line-height: clamp(2.75rem, 2rem + 3.2vw, 3.5rem);  /* 44px → 56px */
  letter-spacing: -0.02em;
}

/* H1 : 30px → 40px */
.t-h1--fluid {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.875rem, 1.35rem + 2.2vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
}
```

Le **corps de texte reste en tailles fixes** (Body 16, Body-sm 14…) : sa fluidité n'apporte rien et nuit à la longueur de ligne cible de 60–75 caractères. `clamp()` est réservé aux titres Display / H1 / H2.

---

### 3.8 À faire / À éviter

**✅ À faire**
- Se limiter strictement à **deux familles** : DM Sans (titres) + Inter (tout le reste).
- Charger **uniquement** les poids prévus : DM Sans 500/700, Inter 400/500/600.
- Utiliser **`tabular-nums`** sur tous les prix et données chiffrées ; format `12 000 000 FCFA` avec espaces insécables.
- Créer l'emphase par le **poids (Inter 600)** et la taille, pas par la couleur.
- Limiter les paragraphes à **68ch** (`max-width`) pour rester dans 60–75 caractères.
- Pour du texte or sur blanc, n'employer que **`accent-700 #a76700`** (AA).
- Un seul **Display** et un seul **H1** par page ; respecter l'ordre H1 → H2 → H3.

**❌ À éviter**
- Introduire une **3ᵉ police** (police « fantaisie » pour les prix, serif pour les titres).
- Mettre du **texte en or `accent-500 #ed9f00`** sur blanc (2,20:1 → échec WCAG).
- Utiliser **`neutral-500 #6b7c8d`** pour du corps de texte (4,29:1 → réservé au texte large / désactivé).
- Écrire de **longs titres tout en MAJUSCULES** (les MAJ sont réservées à l'Overline court : badges, éyebrows).
- Mettre un prix en **italique, en or, ou sans espace insécable** (risque de coupure `12 000 000` / `FCFA` en fin de ligne).
- **Recalculer** interlignes, tailles ou ratios de contraste : les valeurs des fondations sont verrouillées.
- Rendre `clamp()` sur le corps de texte ou casser des lignes de paragraphe à la main.

---

## 4. Mise en page, grille & espacement

La mise en page de 2C repose sur une **grille 12 colonnes** et une **échelle d'espacement multiple de 4px**. Objectif : une lecture calme et institutionnelle, où les cartes de biens, les prix en FCFA et les badges de confiance respirent, sans jamais donner l'impression d'un site « surchargé » ou « bricolé ». La respiration (le blanc `#ffffff`) est un actif de marque au même titre que le Bleu 2C.

### 4.1 Échelle d'espacement (tokens `space-*`)

Base **4px**. Tous les paddings, marges et gaps se composent avec ces tokens — aucune valeur « à la main » hors échelle.

| Token | px | Usage typique sur le site 2C |
|---|---|---|
| `space-0` | 0 | Réinitialisation, collage bord à bord (image pleine largeur du hero) |
| `space-0.5` | 2 | Décalage d'ombre, filet interne d'un badge « Site approuvé » |
| `space-1` | 4 | Espace icône↔texte dans un statut (pastille « Disponible ») |
| `space-2` | 8 | Gap entre puce et libellé, padding vertical d'un tag « Titre foncier » |
| `space-3` | 12 | Padding interne d'un champ de la barre de recherche (Type / Ville / Budget) |
| `space-4` | 16 | Gap entre libellé et valeur ; padding interne compact d'une carte |
| `space-5` | 20 | Padding d'une carte témoignage ; espacement entre lignes de méta (superficie, prix) |
| `space-6` | 24 | **Padding intérieur des cartes « bien »** · **gouttière de la grille** · gap entre cartes |
| `space-8` | 32 | Padding des grands blocs (formulaire de contact), marge sous un titre de section |
| `space-10` | 40 | Espace entre un H2 de section et sa grille de contenu |
| `space-12` | 48 | Marge de section **mobile** (haut/bas), padding d'un bandeau CTA WhatsApp |
| `space-16` | 64 | Padding généreux d'un bandeau CTA desktop, gap entre grands blocs |
| `space-20` | 80 | Marge de section intermédiaire desktop |
| `space-24` | 96 | **Marge de section standard desktop** (haut/bas) |
| `space-32` | 128 | Respiration maximale : hero d'accueil, séparation entre univers de page |

> Règle : **padding de carte = `space-6` (24)**, **gap de grille = `space-6` (24)**, **section desktop = `space-24` (96)**, **section mobile = `space-12` (48–56)**.

### 4.2 Principe base 4 / 8px

- **Grille douce de 4px** pour les micro-ajustements (icônes, filets, badges).
- **Rythme fort de 8px** pour tout ce qui structure la page (paddings de carte, gaps, marges de section) : `space-2, 4, 6, 8, 10, 12, 16, 20, 24, 32` sont tous multiples de 8, sauf `space-3 (12)` réservé aux champs de formulaire.
- Bénéfice : alignement visuel automatique entre une carte « bien », un formulaire de contact et un bandeau CTA, quelle que soit la page.

### 4.3 Grille 12 colonnes & conteneur

- **Conteneur** : largeur max **1200px**, centré, avec **gouttière (padding latéral) de 24px** (`space-6`).
- **12 colonnes**, gap inter-colonnes **24px** (`space-6`).
- Sur mobile, la gouttière reste à **16px** (`space-4`) pour maximiser la surface utile des cartes.
- Répartitions courantes :
  - Détail d'un bien : **galerie 8 col / panneau prix + CTA 4 col** (desktop), empilé en mobile.
  - À propos : **texte 7–8 col + média 4–5 col**.
  - Contact : **formulaire 7 col / carte de localisation 5 col**.

```css
/* Conteneur central 2C */
.container {
  width: 100%;
  max-width: 1200px;      /* conteneur max */
  margin-inline: auto;
  padding-inline: 16px;   /* space-4 : gouttière mobile */
}
@media (min-width: 768px) {          /* md */
  .container { padding-inline: 24px; } /* space-6 : gouttière desktop */
}

/* Grille 12 colonnes générique */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 24px;              /* space-6 */
}
```

### 4.4 Breakpoints (mobile-first)

On conçoit d'abord pour **360–390px** (smartphone majoritaire en Côte d'Ivoire), puis on enrichit vers le haut avec `min-width`.

| Breakpoint | min-width | Cible | Comportement clé |
|---|---|---|---|
| *(base)* | 0 | Petit mobile | 1 colonne, gouttière 16px, CTA pleine largeur |
| `sm` | 640px | Grand mobile / petit paysage | Cartes toujours 1 col, boutons plus larges |
| `md` | 768px | Tablette | Cartes biens **2 col**, gouttière 24px, barre de recherche en ligne |
| `lg` | 1024px | Laptop | Cartes biens **3 col**, layout détail bien 8/4 |
| `xl` | 1280px | Desktop | Conteneur atteint 1200px, marges de section 96px |
| `2xl` | 1440px+ | Grand écran | Conteneur reste **plafonné à 1200px**, plus de respiration latérale |

Approche : **`min-width` uniquement**, jamais de `max-width` en cascade. On part du plus simple (une colonne, empilé) et on ajoute des colonnes quand l'espace le permet.

### 4.5 Rythme vertical des sections

Le rythme vertical crée la sensation « premium abordable » : ni trop dense, ni vide.

| Contexte | Padding haut/bas **desktop** | Padding haut/bas **mobile** |
|---|---|---|
| Section standard (Nos services, Témoignages) | **96px** (`space-24`) | **56px** (entre `space-12`=48 et `space-16`=64) |
| Section dense enchaînée (deux blocs proches) | 80px (`space-20`) | 48px (`space-12`) |
| Hero d'accueil | 128px (`space-32`) | 64px (`space-16`) |
| Bandeau CTA WhatsApp / téléphone | 64px (`space-16`) | 40px (`space-10`) |

- Espace **titre de section → contenu** : `space-10` (40) desktop, `space-8` (32) mobile.
- Espace **titre → sous-titre (accroche)** : `space-3` (12) à `space-4` (16).

```css
.section        { padding-block: 56px; }              /* mobile ≈ space-14 */
@media (min-width: 1024px) {                          /* lg+ */
  .section      { padding-block: 96px; }              /* space-24 */
}
.section__head  { margin-bottom: 32px; }              /* space-8 mobile */
@media (min-width: 1024px) {
  .section__head { margin-bottom: 40px; }             /* space-10 */
}
```

### 4.6 Patrons de grille concrets

**Grille de cartes « bien » (1 / 2 / 3 colonnes)** — le patron central du site (Accueil « biens en vedette », page Nos Biens).

```html
<ul class="biens-grid">
  <li class="bien-card"><!-- photo, localisation, superficie, « à partir de X FCFA », « Voir le bien » --></li>
  <li class="bien-card">…</li>
  <li class="bien-card">…</li>
</ul>
```

```css
.biens-grid {
  display: grid;
  gap: 24px;                                   /* space-6 */
  grid-template-columns: 1fr;                  /* mobile : 1 colonne */
}
@media (min-width: 768px) {                    /* md : 2 colonnes */
  .biens-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {                   /* lg : 3 colonnes */
  .biens-grid { grid-template-columns: repeat(3, 1fr); }
}
/* Variante fluide anti-carte-orpheline pour un grand catalogue */
.biens-grid--auto {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```

**Grille de cartes service (2 / 4 colonnes)** — « Terrains sécurisés », « Briques à crédit », « Accompagnement construction », « Masterclass ».

```css
.services-grid {
  display: grid;
  gap: 24px;                                   /* space-6 */
  grid-template-columns: repeat(2, 1fr);       /* mobile & tablette : 2 col */
}
@media (min-width: 1024px) {                   /* lg : 4 col */
  .services-grid { grid-template-columns: repeat(4, 1fr); }
}
```

**Footer 4 colonnes → empilé** — À propos 2C · Nos Biens · Contact/Adresse · Confiance (badges ACD/titre foncier + réseaux).

```css
.footer-grid {
  display: grid;
  gap: 32px;                                   /* space-8 entre blocs empilés */
  grid-template-columns: 1fr;                  /* mobile : empilé */
}
@media (min-width: 640px) {                    /* sm : 2 col */
  .footer-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {                   /* lg : 4 col */
  .footer-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
}
```

### 4.7 Largeurs de contenu (mesure de lecture)

- **Texte courant lisible** (À propos, article, blocs juridiques ACD/titre foncier) : largeur max **≈ 680px** (soit ~65–75 caractères par ligne). Au-delà, l'œil se fatigue et la crédibilité baisse.
- **Titres de section + accroche** : peuvent aller jusqu'à ~760px pour un H2 + baseline « De locataire à propriétaire, sans se ruiner. ».
- **Descriptif dans une carte « bien »** : rester sur 1–2 lignes, jamais de pavé.

```css
.prose      { max-width: 680px; }              /* texte lisible */
.prose--wide{ max-width: 760px; }              /* titre + accroche */
```

### 4.8 Densité & zones tactiles

Cible : un utilisateur au smartphone, souvent en 4G, qui veut **appeler** ou **écrire sur WhatsApp** en un geste.

- **Zone tactile minimale : 44 × 44 px** pour tout élément interactif (bouton « Voir le bien », CTA WhatsApp/téléphone, puce de filtre, pagination, croix de modale).
- Hauteur recommandée des **boutons primaires** : 48px (`space-12` de haut visuel) ; secondaires : 44px minimum.
- **Espace entre deux cibles tactiles** : au moins `space-2` (8px) pour éviter les clics ratés entre « Réserver » et « Appeler ».
- **Champs de formulaire** (contact bien, contact général) : hauteur 44–48px, padding interne `space-3` (12) vertical / `space-4` (16) horizontal.
- **Densité des cartes** : padding `space-6` (24) desktop ; on peut descendre à `space-4`/`space-5` (16–20) en mobile pour tenir une carte complète au-dessus de la ligne de flottaison.

```css
.touch-target { min-width: 44px; min-height: 44px; }
.btn          { min-height: 44px; padding-inline: 20px; } /* space-5 */
.btn--lg      { min-height: 48px; }
.field        { min-height: 44px; padding: 12px 16px; }   /* space-3 / space-4 */
```

### 4.9 À faire / À éviter

**✅ À faire**
- Composer **tous** les espacements avec les tokens `space-*` (multiples de 4/8).
- Garder la **gouttière 24px** et le **conteneur 1200px** identiques sur toutes les pages.
- Cartes « bien » : **1 col (mobile) → 2 col (md 768) → 3 col (lg 1024)**, gap 24px.
- Limiter le texte de lecture à **~680px** pour la crédibilité juridique et commerciale.
- Respecter **44px minimum** sur chaque CTA WhatsApp / téléphone / « Voir le bien ».
- Aérer les sections : **96px desktop / 56px mobile**.

**❌ À éviter**
- Des valeurs d'espacement hors échelle (17px, 30px, 50px…).
- Élargir le conteneur au-delà de **1200px** sur grand écran (le contenu se dilue).
- Étaler un paragraphe sur toute la largeur (>680px) — lignes illisibles.
- Coller deux cartes ou deux boutons sans gap (`< 8px`) — clics ratés au doigt.
- Faire passer les cartes « bien » à 4 colonnes : les photos deviennent trop petites, les prix FCFA illisibles.
- Réduire les CTA sous 44px « pour gagner de la place » — on perd des appels.

---

## 5. Style visuel : rayons, ombres, iconographie, imagerie

Cette section fixe le « fini » de l'interface 2C : des angles cohérents, une élévation discrète mais crédible, une iconographie sobre et institutionnelle, et une photographie ancrée dans le réel ivoirien (terrains, chantiers, briques, clés). L'objectif esthétique : **premium abordable** — jamais tape-à-l'œil, toujours rassurant.

---

### 5.1 Rayons — tokens `radius-*`

Les rayons donnent le caractère « moderne et humain » de la marque sans arrondir excessivement (ce qui ferait « ludique » et affaiblirait la crédibilité institutionnelle). Règle d'or : **les surfaces qui contiennent (cartes, images) sont plus arrondies que les éléments qu'elles contiennent (boutons, champs, badges)**, sauf pour les badges/pastilles de statut qui sont en `pill`.

| Token | Valeur | Où l'appliquer sur le site 2C |
|---|---|---|
| `radius-sm` | 6 px | Petits éléments internes : puces de tag « Achat / Location », coins d'inputs imbriqués, chips de filtre compacts, coins d'une carte de crédit/échéancier |
| `radius-md` | 10 px | **Boutons** (variante rectangulaire), **champs de formulaire** (Type, Ville, Budget, contact bien), selects, textarea, encadrés d'alerte sémantique |
| `radius-lg` | 16 px | **Cartes « bien »**, cartes service, cartes témoignage, **images** (hero, vignettes de bien), bandeaux CTA, conteneur de la carte de localisation |
| `radius-xl` | 24 px | Grands blocs éditoriaux, section hero à fond plein, modale de galerie photo, panneau latéral de filtres (drawer mobile) |
| `radius-2xl` | 32 px | Réservé aux très grandes surfaces décoratives (bloc « masterclass », visuel d'ouverture À propos). À utiliser avec parcimonie |
| `radius-pill` | 999 px | **Badges de statut** (Disponible / Réservé / Vendu), **badge de confiance** « Site approuvé », **CTA WhatsApp** et boutons ronds, pastille « à partir de… », avatars témoignages |

```css
:root {
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-pill: 999px;
}

/* Exemples 2C */
.card-bien      { border-radius: var(--radius-lg); }
.card-bien img  { border-radius: var(--radius-lg) var(--radius-lg) 0 0; } /* coins hauts uniquement si l'image coiffe la carte */
.btn            { border-radius: var(--radius-md); }
.btn--whatsapp  { border-radius: var(--radius-pill); }
.field, .select { border-radius: var(--radius-md); }
.badge-statut   { border-radius: var(--radius-pill); }
.badge-confiance{ border-radius: var(--radius-pill); }
```

> **Règle de cohérence des images en carte** : une image qui touche le bord supérieur de la carte hérite des `radius-lg` **uniquement en haut** (`16px 16px 0 0`). Une image détachée (avec padding autour) prend `radius-lg` sur les 4 coins.

---

### 5.2 Bordures — `hairline` vs élévation

Deux traits seulement, pour éviter le bruit visuel.

| Token | Valeur | Usage |
|---|---|---|
| `border-hairline` | 1 px `neutral-200` `#dbe1e8` | Séparateurs par défaut : contour des cartes sur fond blanc, lignes de séparation du footer, bordure des champs au repos, filets entre lignes de tableau/échéancier |
| `border-strong` | 1,5 px | Emphase : champ **au focus** (couleur `primary-600` `#08699b`), carte sélectionnée dans les filtres, onglet actif, contour d'un bien « à la une » |

```css
--border-hairline: 1px solid #dbe1e8; /* neutral-200 */
--border-strong:   1.5px solid #08699b; /* primary-600, ex. focus */

.field:focus-visible {
  border: var(--border-strong);
  box-shadow: 0 0 0 3px #d3e7f3; /* primary-100, anneau de focus */
  outline: none;
}
```

**Quand `border` plutôt qu'`ombre` ?**

| Situation | Choix | Pourquoi |
|---|---|---|
| Élément **posé sur fond blanc** qui doit rester plat (formulaire, tableau, footer) | `border-hairline` | Délimite sans « décoller » ni suggérer de cliquabilité |
| Élément **interactif qui doit sembler saisissable** (carte « bien », carte service) | `ombre` (`sm` au repos) | L'élévation signale l'affordance et la profondeur |
| **Champ de formulaire** | `border` (jamais d'ombre au repos) | Convention d'accessibilité et de lisibilité des saisies |
| **Carte sur fond coloré / photo** (ex. carte flottante sur le hero) | `ombre` (`md`/`lg`) | La bordure disparaît sur fond sombre ; l'ombre porte |
| **Superposition** (dropdown de filtre, modale) | `ombre` (`lg`/`xl`) | Hiérarchise les couches (z) |

> **Ne jamais cumuler** bordure forte **et** grosse ombre sur le même élément au repos : choisir l'un OU l'autre. On peut en revanche combiner `hairline` + `sm` sur une carte au repos, puis passer à `md` **sans bordure renforcée** au survol.

---

### 5.3 Ombres / Élévation — 5 niveaux

Palette d'ombres reprise **exactement** des fondations (teinte `rgba(16,34,46,…)` = `ink` désaturé, pour rester dans la famille ardoise bleutée et éviter les ombres grises « sales »).

| Niveau | Valeur | Usage 2C |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(16,34,46,.06)` | Micro-relief : badge de confiance posé, champ légèrement surélevé, input group, pastille de prix |
| `shadow-sm` | `0 2px 6px rgba(16,34,46,.08)` | **Carte « bien » au repos**, carte service au repos, carte témoignage, barre de recherche flottante |
| `shadow-md` | `0 6px 16px rgba(16,34,46,.10)` | **Carte « bien » au survol** (hover/focus), bandeau CTA détaché, header collant après scroll |
| `shadow-lg` | `0 12px 28px rgba(16,34,46,.12)` | **Dropdown de filtres** (Type / Ville / Budget), menu de navigation déroulant, popover d'aide, carte de bien flottant au-dessus du hero |
| `shadow-xl` | `0 24px 48px rgba(16,34,46,.16)` | **Modale** (galerie photo d'un bien, formulaire de contact en overlay, confirmation d'envoi), drawer de filtres plein écran mobile |

```css
:root {
  --shadow-xs: 0 1px 2px rgba(16,34,46,.06);
  --shadow-sm: 0 2px 6px rgba(16,34,46,.08);
  --shadow-md: 0 6px 16px rgba(16,34,46,.10);
  --shadow-lg: 0 12px 28px rgba(16,34,46,.12);
  --shadow-xl: 0 24px 48px rgba(16,34,46,.16);
}

.card-bien {
  box-shadow: var(--shadow-sm);
  transition: box-shadow 200ms cubic-bezier(.2,.8,.2,1),
              transform  200ms cubic-bezier(.2,.8,.2,1);
}
.card-bien:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px); /* léger, ~2px max */
}
.dropdown-filtre { box-shadow: var(--shadow-lg); }
.modal           { box-shadow: var(--shadow-xl); }

@media (prefers-reduced-motion: reduce) {
  .card-bien { transition: none; }
  .card-bien:hover { transform: none; }
}
```

> **Principe** : une seule marche d'élévation par interaction (`sm → md` au survol d'une carte). L'écart de niveau code la hiérarchie z ; on ne « saute » pas de `sm` à `xl`.

---

### 5.4 Iconographie

**Style recommandé** : jeu d'icônes **linéaire (outline)**, trait **1,5–2 px**, **coins et terminaisons arrondis** (`stroke-linecap="round"`, `stroke-linejoin="round"`), grille de dessin homogène. Cela répond au ton « sérieux mais humain » : plus chaleureux qu'un trait dur, plus institutionnel qu'un style rempli/coloré.

**Bibliothèque** : **Lucide** (recommandé, MIT, très complète et régulière) ou **Phosphor** (variante « regular »/« bold »). Choisir **une seule** famille et ne jamais mélanger. Pour WhatsApp, utiliser l'icône officielle de marque (glyphe WhatsApp), pas une bulle générique.

**Tailles** (alignées sur la grille 4px) :

| Taille | Usage |
|---|---|
| 16 px | Inline dans le texte, `Body-sm`, tags/chips, métadonnées de carte (localisation + superficie) |
| 20 px | Boutons, champs de formulaire (icône préfixe), items de menu, puces de liste « avantages » |
| 24 px | Icônes de section, cartes service, navigation principale, CTA proéminents, marqueur de carte |

**Couleur** :
- Par défaut, l'icône **hérite de la couleur du texte** (`currentColor`) — le plus souvent `ink` `#10222e` ou `neutral-600` `#526170`.
- **Primaire** `#08699b` pour les icônes d'action et de confiance (document validé, sécurité).
- **Or réservé aux accents** : n'utiliser l'or que sur **aplat** ou en **pictogramme décoratif**, jamais comme fine icône or sur blanc (`accent-500` échoue en contraste, 2,20:1). Si une icône doit être « or » sur fond clair, employer `accent-700` `#a76700` (4,58:1, AA) ; idéalement, réserver l'or aux icônes posées **dans** une pastille dorée avec pictogramme foncé.
- **Sémantique** pour les statuts : `success` `#1a8f5c`, `warning` `#cf8500`, `error` `#d1362f`.

**Icônes clés du site 2C** (noms Lucide indicatifs) :

| Rôle métier | Icône (Lucide) | Taille type | Couleur |
|---|---|---|---|
| Localisation / ville | `map-pin` | 16–20 | `currentColor` / `primary-600` |
| Superficie / m² | `scan` ou `ruler` (ou `maximize-2`) | 16 | `neutral-600` |
| Document / légal validé (ACD, titre foncier) | `file-check` / `badge-check` / `shield-check` | 20–24 | `primary-600` |
| Badge de confiance « Site approuvé » | `shield-check` | 20 | `primary-600` (ou pictogramme foncé sur pastille or) |
| WhatsApp (« Parler à un conseiller ») | glyphe officiel WhatsApp | 20–24 | blanc sur bouton vert de marque |
| Téléphone | `phone` / `phone-call` | 20 | `currentColor` |
| Brique / construction | `brick-wall` / `hard-hat` / `building-2` | 24 | `accent-700` (accent) ou `neutral-700` |
| Accompagnement chantier | `hammer` / `hard-hat` | 24 | `neutral-700` |
| Calendrier de paiement / échéancier (1/3, 12 mois) | `calendar-clock` / `calendar-check` | 20 | `primary-600` |
| Filtres (Achat/Location, Type, Ville, Budget) | `sliders-horizontal` | 20 | `currentColor` |
| Recherche | `search` | 20 | `neutral-600` |
| Statut du bien | `circle` (pastille pleine) dans le badge | 8–10 | selon statut (voir ci-dessous) |
| Prix / valeur (FCFA) | `tag` / `banknote` | 16–20 | `neutral-600` |
| Masterclass immobilière | `graduation-cap` / `presentation` | 24 | `primary-600` |
| Navigation / actions | `chevron-right`, `arrow-right`, `x`, `menu` | 20–24 | `currentColor` |

**Pastilles de statut** (badge `pill`, texte `Body-sm` 14, `Overline` possible) :

| Statut | Point | Texte | Fond |
|---|---|---|---|
| Disponible | `success` `#1a8f5c` | `success` `#1a8f5c` | `#e6f5ee` |
| Réservé | `warning` `#cf8500` | `warning` `#cf8500` | `#fff4d6` |
| Vendu | `neutral-500` `#6b7c8d` | `neutral-700` `#3d4a57` | `neutral-100` `#eceff3` |

---

### 5.5 Imagerie / Photographie immobilière

La photo est le principal levier de confiance : elle doit **prouver le réel** (terrains bornés, chantiers en cours, briques, remises de clés) et non « décorer ».

**Direction artistique**
- Sujets 2C : **terrains sécurisés** (bornage, panneau « site approuvé », plan large montrant le lotissement), **chantiers** (fondations, murs en briques, ouvriers casqués), **briques** (gros plans texture, palettes livrées), **clés / remise de clés** (moment humain acheteur-conseiller), **familles/clients** ivoiriens réels et souriants, **plans larges** de parcelles et perspectives de rue.
- **Lumière naturelle**, chaude (heure dorée / plein jour dégagé), couleurs terre + verdure + ciel — cohérentes avec l'or de marque. Éviter les rendus 3D froids ou les stocks corporate génériques.
- Cadrage : horizon droit, profondeur, présence humaine crédible. Registre « documentaire premium » : net, propre, mais **authentiquement local**.

**Ratios (verrouillés)**

| Usage | Ratio | Notes |
|---|---|---|
| **Hero** / bandeau d'ouverture | **16:9** | Point de focus décalé pour laisser respirer le titre `Display` et le CTA |
| **Cartes « bien »** (vignette principale) | **4:3** | Uniformise la grille de « Nos Biens » quelle que soit la source |
| **Miniatures** (galerie du détail, avatars témoignages, thumbnails) | **1:1** | Bande de vignettes sous la photo principale du bien |

```css
.media-hero  { aspect-ratio: 16 / 9;  border-radius: var(--radius-lg); object-fit: cover; }
.media-card  { aspect-ratio: 4 / 3;   border-radius: var(--radius-lg) var(--radius-lg) 0 0; object-fit: cover; }
.media-thumb { aspect-ratio: 1 / 1;   border-radius: var(--radius-md); object-fit: cover; }
img { max-width: 100%; height: auto; display: block; }
```

**Traitement**
- **Coins** : toute image en `radius-lg` (16 px) — ou coins hauts seulement quand elle coiffe une carte.
- **Overlay dégradé bleu** pour garantir la lisibilité du texte superposé (titres hero, nom du bien sur vignette). Dégradé descendant, transparent en haut → bleu profond en bas, teinte marque (`primary-900` `#0c3a54`). Texte en blanc `#ffffff` par-dessus la zone dense (contraste blanc/`primary-600` = 5,99:1, encore renforcé par l'assombrissement).

```css
.media-overlay { position: relative; }
.media-overlay::after {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    rgba(12,58,84,0) 0%,        /* primary-900, transparent en haut */
    rgba(12,58,84,.35) 55%,
    rgba(12,58,84,.78) 100%     /* dense en bas, sous le texte */
  );
}
.media-overlay > .caption { position: relative; z-index: 1; color: #ffffff; }
```

**Qualité, poids et optimisation**
- Formats modernes : **WebP/AVIF** (fallback JPEG), qualité ~80.
- Poids cibles : **hero ≤ 200–250 Ko**, **vignette de carte ≤ 80–120 Ko**, thumbnail ≤ 30 Ko.
- Servir des tailles responsives (`srcset` / `sizes`) alignées sur les breakpoints (`640 · 768 · 1024 · 1280 · 1440`) ; conteneur max 1200.
- `loading="lazy"` hors du premier écran, `loading="eager"` + `fetchpriority="high"` pour le hero.
- Toujours renseigner un `alt` descriptif et localisé (« Terrain borné de 500 m² à Bingerville, documentation ACD »), et réserver l'espace (`aspect-ratio`) pour éviter le décalage de mise en page (CLS).

**Badges superposés sur photo** (statut, « à partir de X FCFA », « Documentation légale »)
- Position : **coin haut-gauche = statut** (Disponible/Réservé/Vendu) ; **coin haut-droit = badge de confiance** ; prix en bas, dans la zone assombrie de l'overlay.
- Marge de sécurité : **12 px** (`space-3`) du bord de l'image.
- Toujours poser le badge sur **fond plein** (pastille `pill` opaque, pas de texte or/blanc directement sur photo claire) ; ombre `xs`/`sm` pour le détacher.
- Un bien **Vendu / Réservé** : ajouter un léger voile `rgba(16,34,46,.35)` sur toute l'image pour le signaler visuellement sans masquer le contenu.

---

### 5.6 Carte de localisation (map)

- **Style de carte** épuré et clair, cohérent avec la palette : fond neutre clair (proche `neutral-50` `#f6f8fa`), routes en blanc/`neutral-200`, eau en `primary-50` `#eef6fb`, faible saturation — la carte ne doit pas concurrencer les photos ni les CTA.
- **Conteneur** : `radius-lg` (16 px), `border-hairline`, ombre `sm`. Hauteur type 320–400 px, pleine largeur de la colonne de contenu sur mobile.
- **Marqueur de marque** : pin `map-pin` (24 px) en **`primary-600` `#08699b`** avec pastille centrale blanche ; pour un bien « à la une », variante **accentuée** avec halo/point `accent-500` `#ed9f00` (aplat, pas de fin trait or). Le marqueur actif est légèrement agrandi (échelle 1,1) et porte une ombre `md`.
- **Zone approximative** (respect de la confidentialité avant prise de contact) : cercle de rayon indicatif en `primary-600` à faible opacité (`fill rgba(8,105,155,.12)`, `stroke #08699b` 1,5 px) plutôt qu'une adresse exacte.
- **Contrôles** (zoom, plein écran) : boutons `radius-md`, fond blanc, icône `currentColor`, ombre `xs`. Respecter `prefers-reduced-motion` pour les animations de recentrage (durée `base` 200 ms, easing `cubic-bezier(.2,.8,.2,1)`).
- Toujours accompagner la carte d'un rappel textuel (quartier, ville, points de repère) pour les cas où la carte ne charge pas.

---

### 5.7 À faire / À éviter

**✅ À faire**
- Utiliser de **vraies photos ivoiriennes** : terrains bornés, chantiers 2C, briques, remises de clés, clients locaux.
- Garder **une seule famille d'icônes** (Lucide ou Phosphor), trait 1,5–2 px, coins arrondis, tailles 16/20/24.
- Réserver **l'or aux accents et aux aplats** ; pour du texte ou une icône « or » sur blanc, passer à `accent-700` `#a76700`.
- Respecter la hiérarchie d'élévation : `sm` au repos → `md` au survol pour les cartes ; `lg` pour les dropdowns ; `xl` pour les modales.
- Poser les **badges sur pastille opaque** avec marge de 12 px et ombre légère ; réserver l'espace image (`aspect-ratio`) pour éviter le CLS.
- Appliquer l'**overlay dégradé bleu** dès qu'un texte blanc est posé sur photo.
- Optimiser chaque image (WebP/AVIF, `srcset`, `lazy`, `alt` localisé).

**❌ À éviter**
- Les **banques d'images génériques déconnectées de la Côte d'Ivoire** (villas américaines, buildings occidentaux, familles stock hors contexte).
- **Fine icône ou texte or `accent-500` sur blanc** (contraste 2,20:1 — échec WCAG).
- **Mélanger deux styles d'icônes** (outline + filled) ou deux bibliothèques.
- **Empiler bordure forte + grosse ombre** sur un même élément au repos, ou faire « sauter » l'élévation de `sm` à `xl`.
- Des **coins trop arrondis** (`2xl` partout) qui rendraient l'interface enfantine et affaibliraient la crédibilité institutionnelle.
- Des **ombres grises/dures** hors des tokens `xs→xl` (rester dans la teinte `rgba(16,34,46,…)`).
- **Texte directement sur photo** sans overlay ni fond de pastille.
- Afficher **l'adresse exacte** d'un bien sur la carte avant prise de contact (préférer une zone approximative).
- Des **animations lourdes** au survol des cartes : se limiter à `translateY(-2px)` + montée d'ombre, et couper le mouvement sous `prefers-reduced-motion`.

---

## 6. Composants — éléments de base

Cette section spécifie les briques atomiques du design system 2C. Tous les composants reposent sur les tokens verrouillés (couleurs, typo, espacement, rayons, ombres, motion). **Règle d'or contraste :** l'or `accent-500 #ed9f00` ne porte JAMAIS de texte blanc (2,20:1 → échec) — texte foncé `ink #10222e` uniquement (9,56:1 → AAA).

### 6.0 Tokens communs (rappel utile aux composants)

```css
:root {
  /* Focus visible — anneau standard sur toutes les cibles interactives */
  --focus-ring: 0 0 0 2px #ffffff, 0 0 0 4px #08699b; /* liseré blanc + primary-600 */
  --focus-ring-onlight: 0 0 0 3px #a7cfe7;            /* primary-200, sur fonds clairs */

  /* Motion */
  --dur-fast: 120ms; --dur-base: 200ms;
  --ease: cubic-bezier(.2,.8,.2,1);

  --hair: 1px solid #dbe1e8;   /* hairline neutral-200 */
  --hair-strong: 1.5px solid;  /* bordure forte */
  --radius-md: 10px; --radius-lg: 16px; --radius-pill: 999px;
}
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 1ms !important; animation-duration: 1ms !important; }
}
```

---

### 6.1 Boutons

**Anatomie :** `[ icône optionnelle (gauche) · libellé · icône optionnelle (droite) ]`, gouttière icône/texte = `8px (space-2)`. Le libellé est en **Inter 600**. Rayon `md 10px` par défaut ; `pill 999px` autorisé pour les CTA flottants (WhatsApp, retour en haut). Un seul bouton **Primaire** ou **Accent** par zone de décision.

#### Tailles

| Taille | Hauteur | Padding V | Padding H | Typo (Inter) | Icône | Usage 2C |
|---|---|---|---|---|---|---|
| **sm** | 36px | 8px (space-2) | 14px | Body-sm 14/22 · 600 | 16px | filtres, actions de carte, tableaux |
| **md** | 44px | 12px (space-3) | 20px (space-5) | Body 16/26 · 600 | 18px | défaut formulaires, « Voir le bien » |
| **lg** | 52px | 16px (space-4) | 28px | Body-lg 18/28 · 600 | 20px | CTA héros, bandeaux, « Parler à un conseiller » |

> **Pleine largeur mobile** (< 640px) : `width:100%`, hauteur conservée. Les CTA de conversion (WhatsApp, téléphone, « Réserver ce terrain ») passent en pleine largeur et restent au minimum en taille **md** (cible tactile ≥ 44px).

#### Variantes — fonds, textes, états

| Variante | Fond repos | Texte | Bordure | Survol | Actif | Contraste texte |
|---|---|---|---|---|---|---|
| **Primaire** | `#08699b` (primary-600) | `#ffffff` | — | `#075884` (700) | `#0a4869` (800) | 5,99:1 → **AA** |
| **Accent / CTA** | `#ed9f00` (accent-500) | `#10222e` (ink) | — | `#cf8500` (600) | `#a76700` (700) | 9,56:1 → **AAA** |
| **Secondaire** | transparent | `#08699b` | 1.5px `#08699b` | fond `#eef6fb` (50) | fond `#d3e7f3` (100) | 5,99:1 → **AA** |
| **Ghost / Tertiaire** | transparent | `#08699b` | — | fond `#eef6fb` (50) | fond `#d3e7f3` (100) | 5,99:1 → **AA** |
| **WhatsApp** | `#25D366` | `#10222e` + logo blanc | — | `filter:brightness(.95)` | `filter:brightness(.90)` | voir note ♦ |
| **Danger** | `#d1362f` (error) | `#ffffff` | — | `filter:brightness(.93)` | `filter:brightness(.88)` | réservé actions destructrices |

♦ **WhatsApp :** le blanc sur `#25D366` échoue au contraste texte. Le **libellé** (« Parler à un conseiller ») s'écrit donc en `ink #10222e` ; le **pictogramme WhatsApp officiel** reste blanc — c'est un logotype, exempté des règles de contraste WCAG (1.4.3/1.4.11). Ne jamais mettre un libellé blanc plein texte sur ce vert.

#### États (toutes variantes)

| État | Traitement | Détail token |
|---|---|---|
| **Repos** | fond/texte de base | transition `--dur-fast` `--ease` |
| **Survol** | assombrissement 1 cran (voir table) ou fond `primary-50` | `box-shadow` optionnel `sm` sur les pleins |
| **Focus (clavier)** | anneau visible | `box-shadow: var(--focus-ring)` — jamais `outline:none` seul |
| **Actif (pressé)** | assombrissement 2 crans | translation optionnelle `0` (pas de scale > respecter reduced-motion) |
| **Désactivé** | fond `#dbe1e8` (neutral-200), texte `#6b7c8d` (neutral-500) | `cursor:not-allowed`, `pointer-events:none`, `aria-disabled="true"` — variantes contour : `opacity:.5` |
| **Chargement** | spinner remplace l'icône gauche, **largeur figée** | `aria-busy="true"`, libellé conservé (« Envoi… »), clic neutralisé |

```css
.btn { /* base */
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  font-family:"Inter",ui-sans-serif,system-ui,sans-serif; font-weight:600;
  border-radius:var(--radius-md); cursor:pointer; white-space:nowrap;
  transition: background-color var(--dur-fast) var(--ease),
              filter var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease);
}
.btn:focus-visible { outline:none; box-shadow:var(--focus-ring); }

.btn--md { height:44px; padding:12px 20px; font-size:16px; line-height:26px; }

.btn--primary   { background:#08699b; color:#fff; border:0; }
.btn--primary:hover  { background:#075884; }
.btn--primary:active { background:#0a4869; }

.btn--accent    { background:#ed9f00; color:#10222e; border:0; } /* JAMAIS color:#fff */
.btn--accent:hover   { background:#cf8500; }
.btn--accent:active  { background:#a76700; }

.btn--secondary { background:transparent; color:#08699b; border:1.5px solid #08699b; }
.btn--secondary:hover { background:#eef6fb; }

.btn--ghost     { background:transparent; color:#08699b; border:0; }
.btn--ghost:hover { background:#eef6fb; }

.btn--whatsapp  { background:#25D366; color:#10222e; border:0; border-radius:999px; }
.btn--whatsapp:hover { filter:brightness(.95); }

.btn:disabled, .btn[aria-disabled="true"] {
  background:#dbe1e8; color:#6b7c8d; border-color:#dbe1e8;
  cursor:not-allowed; pointer-events:none; filter:none;
}
.btn--full { width:100%; } /* mobile */
```

```html
<button class="btn btn--md btn--accent">Réserver ce terrain</button>
<a href="https://wa.me/2250700000000" class="btn btn--md btn--whatsapp">
  <svg aria-hidden="true" width="18" height="18"><!-- logo WhatsApp blanc --></svg>
  Parler à un conseiller
</a>
<button class="btn btn--md btn--primary" aria-busy="true" disabled>
  <span class="spinner" aria-hidden="true"></span> Envoi…
</button>
```

**✅ À faire**
- Un seul verbe d'action clair : « Voir le bien », « Réserver », « Être rappelé ».
- Accent/CTA `#ed9f00` toujours avec texte `#10222e`.
- Cible tactile ≥ 44px, pleine largeur sur mobile pour les CTA de conversion.

**❌ À éviter**
- Texte blanc sur or `#ed9f00` (échec 2,20:1).
- Deux boutons pleins concurrents (primaire + accent) côte à côte dans la même zone.
- Supprimer l'anneau de focus sans le remplacer.

**♿ Accessibilité :** `<button>`/`<a>` natifs ; focus visible obligatoire (`--focus-ring`) ; état chargement annoncé via `aria-busy` et libellé texte, pas seulement un spinner ; bouton icône seul → `aria-label` explicite (ex. `aria-label="Appeler le conseiller"`).

---

### 6.2 Liens

**Anatomie :** texte inline `primary-600 #08699b`, hérite de la taille du contexte (Inter 400/500). Souligné **au survol et au focus** (pas au repos dans les blocs de contenu dense, pour éviter le bruit visuel ; souligné permanent dans les paragraphes de corps de texte long).

| État | Couleur | Décoration | Note |
|---|---|---|---|
| Repos | `#08699b` | selon contexte | 5,99:1 → **AA** |
| Survol | `#075884` (700) | `text-decoration:underline` (épaisseur 1.5px, offset 2px) | — |
| Focus | `#08699b` | anneau `--focus-ring-onlight` + souligné | clavier |
| Visité | `#075884` (700) | — | facultatif |
| Désactivé | `#6b7c8d` (neutral-500) | aucune | `aria-disabled` |

```css
.link { color:#08699b; text-decoration:none; text-underline-offset:2px;
        transition:color var(--dur-fast) var(--ease); }
.link:hover { color:#075884; text-decoration:underline; text-decoration-thickness:1.5px; }
.link:focus-visible { outline:none; box-shadow:var(--focus-ring-onlight); border-radius:4px; }
```

**♿ Accessibilité :** libellés explicites, jamais « cliquez ici » ; un lien qui ouvre un nouvel onglet le signale (`aria-label="… (nouvel onglet)"`). Le survol seul ne suffit pas : le focus clavier montre le même souligné.

---

### 6.3 Badges / Étiquettes

Forme **pill** (`radius 999px`), non interactifs (statut informatif). Deux familles : **confiance** et **statut de bien**. Toujours pastille/icône + texte (jamais la couleur seule → daltonisme).

#### 6.3.1 Badges de confiance (« Site approuvé », « Documentation légale »)

Icône check à gauche, texte Inter **500**. Deux styles au choix selon le fond :

| Badge | Style « institutionnel » | Style « validé » |
|---|---|---|
| Fond | `#eef6fb` (primary-50) | `#e6f5ee` (success bg) |
| Texte | `#075884` (primary-700) | `#1a8f5c` (success) |
| Icône | bouclier / document `#08699b` | check `#1a8f5c` |
| Emploi 2C | « Documentation légale ACD/Titre foncier » | « Site approuvé », « Terrain sécurisé » |

| Taille | Hauteur | Padding H | Typo | Icône |
|---|---|---|---|---|
| sm | 22px | 8px (space-2) | Caption 13/18 · 500 | 14px |
| md | 28px | 12px (space-3) | Body-sm 14/22 · 500 | 16px |

#### 6.3.2 Statuts de bien (Disponible / Réservé / Vendu)

Pastille pleine `8px` + libellé. Style **overline** (12/16, MAJUSCULES, +0.08em) pour lecture rapide sur les cartes.

| Statut | Fond | Texte | Pastille | Contraste texte | Sémantique |
|---|---|---|---|---|---|
| **Disponible** | `#e6f5ee` (success bg) | `#1a8f5c` (success) | `#1a8f5c` | AA | terrain/brique à la vente |
| **Réservé** | `#fff4d6` (warning bg) | `#a76700` (accent-700) | `#cf8500` (warning) | 4,58:1 → **AA** | acompte versé, en cours |
| **Vendu** | `#eceff3` (neutral-100) | `#526170` (neutral-600) | `#94a3b3` (neutral-400) | 6,35:1 → **AA** | atténué, non cliquable |

> Le statut **Vendu** désature aussi la photo de la carte (`filter:grayscale(.4) opacity(.9)`) et désactive le bouton « Voir le bien ».

```html
<span class="badge badge--trust-inst">
  <svg aria-hidden="true" width="16" height="16"><!-- doc --></svg>
  Documentation légale
</span>

<span class="status status--reserve">
  <span class="status__dot" aria-hidden="true"></span> Réservé
</span>
```

```css
.badge { display:inline-flex; align-items:center; gap:6px; height:28px;
  padding:0 12px; border-radius:999px; font:500 14px/22px "Inter",sans-serif; }
.badge--trust-inst { background:#eef6fb; color:#075884; }
.badge--trust-ok   { background:#e6f5ee; color:#1a8f5c; }

.status { display:inline-flex; align-items:center; gap:6px; height:24px; padding:0 10px;
  border-radius:999px; font:600 12px/16px "Inter",sans-serif;
  text-transform:uppercase; letter-spacing:.08em; }
.status__dot { width:8px; height:8px; border-radius:999px; }
.status--dispo   { background:#e6f5ee; color:#1a8f5c; }
.status--dispo   .status__dot { background:#1a8f5c; }
.status--reserve { background:#fff4d6; color:#a76700; }
.status--reserve .status__dot { background:#cf8500; }
.status--vendu   { background:#eceff3; color:#526170; }
.status--vendu   .status__dot { background:#94a3b3; }
```

**✅ À faire :** pastille/icône + texte ; « Réservé » en `#a76700` (nuance or lisible sur blanc/clair). **❌ À éviter :** or `#ed9f00` en texte de badge sur fond clair ; distinguer les statuts par la seule couleur.

**♿ Accessibilité :** le statut est du texte réel (lu par lecteur d'écran), pas une pastille seule ; sur la carte, l'info est aussi dans le nom accessible du lien (ex. `aria-label="Terrain 300 m² Bingerville — Réservé"`).

---

### 6.4 Chips / Tags de filtre

Interactif et **sélectionnable** (rôle bouton-bascule). Forme pill, hauteur 32–36px. Sert aux filtres rapides : *Achat / Location*, *Terrain / Villa / Appartement*, villes, tranches de budget.

| État | Fond | Texte | Bordure | Note |
|---|---|---|---|---|
| Repos | `#ffffff` | `#3d4a57` (neutral-700) | 1px `#dbe1e8` | non sélectionné |
| Survol | `#f6f8fa` (neutral-50) | `#29333d` (neutral-800) | 1px `#c0cad4` (neutral-300) | — |
| **Actif / sélectionné** | `#08699b` (primary-600) | `#ffffff` | 1px `#08699b` | 5,99:1 → AA ; check optionnel |
| Actif (variante douce) | `#eef6fb` (primary-50) | `#075884` (primary-700) | 1px `#6fb0d6` (primary-300) | pour listes de filtres denses |
| Focus | + `--focus-ring-onlight` | — | — | clavier |
| Désactivé | `#f6f8fa` | `#6b7c8d` | 1px `#dbe1e8` | `aria-disabled` |
| Amovible | ajoute `×` à droite (cible ≥ 24px) | — | — | `aria-label="Retirer …"` |

```css
.chip { display:inline-flex; align-items:center; gap:6px; height:34px; padding:0 14px;
  border-radius:999px; background:#fff; color:#3d4a57; border:1px solid #dbe1e8;
  font:500 14px/22px "Inter",sans-serif; cursor:pointer;
  transition:all var(--dur-fast) var(--ease); }
.chip:hover { background:#f6f8fa; border-color:#c0cad4; }
.chip[aria-pressed="true"] { background:#08699b; color:#fff; border-color:#08699b; }
.chip:focus-visible { outline:none; box-shadow:var(--focus-ring-onlight); }
```

```html
<button class="chip" aria-pressed="true">Terrain</button>
<button class="chip" aria-pressed="false">Bingerville</button>
<button class="chip" aria-pressed="false">≤ 5 000 000 FCFA</button>
```

**♿ Accessibilité :** état porté par `aria-pressed` (bascule) ou `role="checkbox"`+`aria-checked` pour un groupe multi-sélection ; l'état sélectionné n'est pas signalé par la seule couleur (le contraste fond/texte change nettement + coche possible).

---

### 6.5 Champs de formulaire

**Anatomie (vertical) :** `Label` → `Champ` → `Texte d'aide` (ou message d'erreur). Utilisés dans « Contact d'un bien », « Contact général », barre de recherche. Hauteur **44–48px**, rayon `md 10px`, bordure `hairline 1px #dbe1e8`.

| Élément | Token / valeur |
|---|---|
| Label | Body-sm 14/22 · Inter **500** · `#10222e` (ink) · marge bas 6px |
| Astérisque requis | `#d1362f` (error), `aria-hidden`, + `aria-required` sur le champ |
| Champ (input/select) | hauteur 48px · padding 12px 14px · Body 16/26 · texte `#10222e` · fond `#ffffff` · bordure 1px `#dbe1e8` · rayon 10px |
| Placeholder | `#6b7c8d` (neutral-500) — jamais porteur d'info essentielle |
| Texte d'aide | Caption 13/18 · `#526170` (neutral-600) · marge haut 6px |
| Textarea | idem, `min-height:120px`, `resize:vertical` |
| Icône select (chevron) | `#526170`, à droite, 20px |

#### États

| État | Bordure | Fond | Détail |
|---|---|---|---|
| Repos | 1px `#dbe1e8` | `#ffffff` | — |
| Survol | 1px `#c0cad4` (neutral-300) | `#ffffff` | — |
| **Focus** | 1.5px `#08699b` (primary-600) | `#ffffff` | + anneau `--focus-ring-onlight` |
| **Erreur** | 1.5px `#d1362f` (error) | `#fbeceb` (error bg) léger | message en `#d1362f`, `aria-invalid="true"` |
| Succès (facultatif) | 1.5px `#1a8f5c` (success) | `#ffffff` | check `#1a8f5c` |
| Désactivé | 1px `#dbe1e8` | `#f6f8fa` (neutral-50) | texte `#6b7c8d`, `cursor:not-allowed` |

```css
.field-label { display:block; margin-bottom:6px; font:500 14px/22px "Inter",sans-serif; color:#10222e; }
.field-label .req { color:#d1362f; }
.field {
  width:100%; height:48px; padding:12px 14px; border-radius:10px;
  border:1px solid #dbe1e8; background:#fff; color:#10222e;
  font:400 16px/26px "Inter",sans-serif;
  transition:border-color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease);
}
.field::placeholder { color:#6b7c8d; }
.field:hover { border-color:#c0cad4; }
.field:focus-visible { outline:none; border:1.5px solid #08699b; box-shadow:var(--focus-ring-onlight); }
.field[aria-invalid="true"] { border:1.5px solid #d1362f; background:#fbeceb; }
.field:disabled { background:#f6f8fa; color:#6b7c8d; cursor:not-allowed; }
.field-hint  { margin-top:6px; font:400 13px/18px "Inter",sans-serif; color:#526170; }
.field-error { margin-top:6px; font:500 13px/18px "Inter",sans-serif; color:#d1362f; }
textarea.field { height:auto; min-height:120px; resize:vertical; }
select.field { appearance:none; padding-right:40px;
  background-image:url("data:image/svg+xml,…chevron #526170…");
  background-repeat:no-repeat; background-position:right 14px center; }
```

```html
<label class="field-label" for="ville">Ville <span class="req" aria-hidden="true">*</span></label>
<select id="ville" class="field" aria-required="true">
  <option value="">Sélectionnez une ville</option>
  <option>Abidjan</option><option>Bingerville</option><option>Grand-Bassam</option>
</select>

<label class="field-label" for="budget">Budget (FCFA)</label>
<input id="budget" class="field" inputmode="numeric"
       aria-describedby="budget-hint" placeholder="Ex. 5 000 000">
<p class="field-hint" id="budget-hint">Montant indicatif. Paiement possible en 12 mensualités.</p>

<input id="tel" class="field" type="tel" aria-invalid="true" aria-describedby="tel-err">
<p class="field-error" id="tel-err">Numéro invalide — format attendu : +225 XX XX XX XX XX.</p>
```

**✅ À faire :** label visible et associé (`for`/`id`) ; prix/budget en Inter, format FCFA avec séparateurs de milliers ; `inputmode="numeric"` pour les montants ; message d'erreur explicite et actionnable. **❌ À éviter :** placeholder en guise de label ; erreur signalée par la seule bordure rouge ; hauteur < 44px (cible tactile).

**♿ Accessibilité :** chaque champ a un label programmatiquement lié ; aide et erreur reliées par `aria-describedby` ; erreur portée par `aria-invalid` + texte + icône (pas la couleur seule) ; focus visible sur tous les champs, y compris `<select>`.

---

### 6.6 Barre de recherche de biens

Recherche transversale **Type + Ville + Budget + bouton Rechercher**. Posée sur une surface blanche surélevée (`ombre md 0 6px 16px rgba(16,34,46,.10)`), rayon `lg 16px`, souvent en chevauchement du héros.

**Layout desktop (≥ 1024px) :** rangée unique, champs alignés, séparateurs `hairline` optionnels, bouton **Accent/CTA** (`#ed9f00` / texte `#10222e`) à droite en taille **md/lg**.
**Layout mobile (< 640px) :** empilé, chaque champ pleine largeur, bouton **pleine largeur** en dernier.

| Zone | Composant | Contenu 2C |
|---|---|---|
| Champ 1 | `select.field` | **Type** : Terrain, Villa, Appartement, Brique à crédit |
| Champ 2 | `select.field` | **Ville** : Abidjan, Bingerville, Grand-Bassam… |
| Champ 3 | `select.field` | **Budget** : ≤ 2M, 2–5M, 5–10M, > 10M FCFA |
| Action | `.btn--accent` (icône loupe) | **Rechercher** |

| Token | Valeur |
|---|---|
| Conteneur | fond `#ffffff` · rayon `16px` · ombre `md` · padding `16px (space-4)` · bordure `hairline` |
| Gouttière entre champs | `12px (space-3)` desktop |
| Hauteur des champs | `48px` (alignée sur §6.5) |
| Bouton | Accent, hauteur `48px`, `padding 12px 20px`, icône loupe 18px |
| Séparateur vertical (option) | 1px `#dbe1e8`, hauteur 24px |

```html
<form class="searchbar" role="search" aria-label="Rechercher un bien">
  <div class="searchbar__row">
    <div class="searchbar__cell">
      <label class="field-label" for="s-type">Type</label>
      <select id="s-type" class="field">
        <option value="">Tous les types</option>
        <option>Terrain</option><option>Villa</option>
        <option>Appartement</option><option>Brique à crédit</option>
      </select>
    </div>
    <div class="searchbar__cell">
      <label class="field-label" for="s-ville">Ville</label>
      <select id="s-ville" class="field"><option value="">Toutes les villes</option>…</select>
    </div>
    <div class="searchbar__cell">
      <label class="field-label" for="s-budget">Budget (FCFA)</label>
      <select id="s-budget" class="field"><option value="">Tous budgets</option>…</select>
    </div>
    <button class="btn btn--md btn--accent searchbar__submit" type="submit">
      <svg aria-hidden="true" width="18" height="18"><!-- loupe --></svg> Rechercher
    </button>
  </div>
</form>
```

```css
.searchbar { background:#fff; border:1px solid #dbe1e8; border-radius:16px;
  box-shadow:0 6px 16px rgba(16,34,46,.10); padding:16px; }
.searchbar__row { display:grid; grid-template-columns:1fr 1fr 1fr auto; gap:12px; align-items:end; }
.searchbar__submit { height:48px; align-self:end; }
@media (max-width:640px){
  .searchbar__row { grid-template-columns:1fr; }
  .searchbar__submit { width:100%; }
}
```

**✅ À faire :** `role="search"` sur le `<form>` ; labels visibles au-dessus (ou masqués mais présents) ; bouton en Accent pour marquer l'action principale ; sur mobile, bouton pleine largeur en fin de pile. **❌ À éviter :** placeholder seul comme label ; bouton en or avec texte blanc ; champs < 44px de haut ; barre qui déborde horizontalement (utiliser la grille responsive).

**♿ Accessibilité :** repère de recherche annoncé (`role="search"` + `aria-label`) ; chaque `<select>` labellisé ; ordre de tabulation logique Type → Ville → Budget → Rechercher ; le bouton submit reste actionnable au clavier (Entrée) depuis n'importe quel champ.

---

## 7. Composants — blocs & patterns de page

> **Convention de lecture.** Chaque composant est décrit par : **anatomie** (structure et contenu), **tokens** (couleur / espacement / rayon / ombre), **responsive** (comportement par breakpoint) et **accessibilité** (a11y). Tous les hex, tokens, ratios de contraste et durées sont repris **à l'identique** des fondations. Rappel des références verrouillées les plus utilisées ici :
>
> - Primaire : `primary-600 #08699b` · `primary-700 #075884` · `primary-50 #eef6fb`
> - Accent : `accent-500 #ed9f00` · `accent-700 #a76700` (texte or sur blanc) · `accent-50 #fff8e6`
> - Texte : `ink #10222e` (AAA, 16,3:1) · `neutral-600 #526170` (secondaire, 6,35:1) · blanc `#ffffff`
> - Bordures : hairline `1px neutral-200 #dbe1e8` · forte `1.5px`
> - Rayons : carte `lg 16` · bouton `md 10` ou `pill 999`
> - Ombres : `sm 0 2px 6px rgba(16,34,46,.08)` · `md 0 6px 16px rgba(16,34,46,.10)`
> - Motion : `base 200ms` · easing `cubic-bezier(.2,.8,.2,1)` · respecter `prefers-reduced-motion`

---

### 7.1 Carte bien — *composant vedette*

La carte bien est l'unité de conversion du site. Elle doit inspirer confiance (badge légal), donner l'information décisive (localisation, superficie, prix « à partir de ») et pousser vers le détail.

#### Anatomie

```
┌─────────────────────────────────────────┐
│  [IMAGE 4:3]                             │  ← media (ratio 4:3, object-fit: cover)
│   ◤ Badge « Site approuvé »   ● Statut ◢ │  ← overlays : badge confiance (haut-gauche) + pastille statut (haut-droite)
├─────────────────────────────────────────┤
│  📍 Bingerville, Abidjan                 │  ← localisation (Body-sm, neutral-600)
│  Terrain viabilisé · 500 m²              │  ← type + superficie (Body-sm)
│                                          │
│  À partir de                             │  ← label prix (Overline / Caption, neutral-600)
│  15 000 000 FCFA                         │  ← prix (H4/H3, ink, poids 600, Inter)
│                                          │
│  [  Voir le bien  → ]                    │  ← bouton (pleine largeur, primaire ou outline)
└─────────────────────────────────────────┘
```

| Élément | Contenu 2C | Rôle typo | Token couleur |
|---|---|---|---|
| Image | Photo du terrain / de la maquette, `alt` = « Terrain de 500 m² à Bingerville » | — | — |
| Badge confiance | « Site approuvé » ou « Documentation légale » (ACD / titre foncier) | Overline 12/16, MAJ, +0.08em | fond blanc 90% + texte `primary-700 #075884` |
| Pastille statut | Disponible / Réservé / Vendu | Caption 13/18, poids 600 | voir §7.1 statuts |
| Localisation | « 📍 Bingerville, Abidjan » | Body-sm 14/22 | `neutral-600 #526170` |
| Type + superficie | « Terrain viabilisé · 500 m² » | Body-sm 14/22 | `neutral-600 #526170` |
| Label prix | « À partir de » | Caption 13/18 | `neutral-600 #526170` |
| Prix | « 15 000 000 FCFA » | H4 20/28 (ou H3 24/32), poids 600, Inter | `ink #10222e` |
| CTA | « Voir le bien » | Body 16/26, poids 600 | bouton primaire, voir tokens |

#### Statuts de bien (pastille)

| Statut | Fond | Texte | Interaction carte |
|---|---|---|---|
| **Disponible** | success bg `#e6f5ee` | success `#1a8f5c` | carte cliquable, CTA actif |
| **Réservé** | warning bg `#fff4d6` | warning `#cf8500` | carte cliquable, CTA « Voir le bien » (mention « Réservé ») |
| **Vendu** | neutral-100 `#eceff3` | neutral-600 `#526170` | image en `opacity: .85`, CTA en `outline` désactivé ou « Voir le bien » informatif |

> ✅ Le badge « Site approuvé » se place en **haut à gauche**, la pastille statut en **haut à droite** : deux registres d'information qui ne se disputent jamais le même coin.

#### Tokens (structure de carte)

```css
.card-bien {
  background: #ffffff;
  border: 1px solid #dbe1e8;              /* hairline neutral-200 */
  border-radius: 16px;                     /* radius-lg */
  box-shadow: 0 2px 6px rgba(16,34,46,.08);/* shadow-sm (repos) */
  overflow: hidden;
  transition: box-shadow 200ms cubic-bezier(.2,.8,.2,1),
              transform 200ms cubic-bezier(.2,.8,.2,1);
}
.card-bien__media { aspect-ratio: 4 / 3; object-fit: cover; width: 100%; }
.card-bien__body  { padding: 20px; }        /* space-5 = 20px */
.card-bien__price { font-size: 20px; line-height: 28px; font-weight: 600; color: #10222e; }
.card-bien__label { font-size: 13px; line-height: 18px; color: #526170; }
.card-bien__loc   { font-size: 14px; line-height: 22px; color: #526170; }

/* Overlays */
.badge-approved {
  position: absolute; top: 12px; left: 12px;                 /* space-3 */
  background: rgba(255,255,255,.92);
  color: #075884;                                            /* primary-700 */
  font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
  padding: 4px 8px; border-radius: 999px;                    /* pill */
  box-shadow: 0 1px 2px rgba(16,34,46,.06);                  /* shadow-xs */
}
.status-pill { position: absolute; top: 12px; right: 12px;
  padding: 4px 10px; border-radius: 999px; font-size: 13px; font-weight: 600; }
```

#### États repos / survol

| État | Ombre | Transform | Autres |
|---|---|---|---|
| Repos | `sm 0 2px 6px rgba(16,34,46,.08)` | — | — |
| Survol | `md 0 6px 16px rgba(16,34,46,.10)` | `translateY(-4px)` | léger « lift », image `scale(1.02)` optionnel |
| Focus (clavier) | conserver l'ombre + **anneau** `2px primary-600 #08699b` + offset 2px | — | anneau sur la carte entière |
| Actif (`:active`) | retour `sm` | `translateY(0)` | — |

```css
.card-bien:hover  { box-shadow: 0 6px 16px rgba(16,34,46,.10); transform: translateY(-4px); }
.card-bien:focus-within { outline: 2px solid #08699b; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .card-bien { transition: none; }
  .card-bien:hover { transform: none; }
}
```

#### Responsive (grille 1 / 2 / 3)

| Breakpoint | Colonnes | Gouttière |
|---|---|---|
| < 640 (mobile) | **1** | 16px (space-4) |
| ≥ 768 (md) | **2** | 24px (space-6) |
| ≥ 1024 (lg) | **3** | 24px (space-6) |

```css
.grid-biens { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 768px)  { .grid-biens { grid-template-columns: repeat(2,1fr); gap: 24px; } }
@media (min-width: 1024px) { .grid-biens { grid-template-columns: repeat(3,1fr); gap: 24px; } }
```

#### Accessibilité

- **Zone cliquable entière** : envelopper le titre/prix dans un lien couvrant la carte (`::after` overlay) pour une cible tactile ≥ 44×44px, tout en gardant le libellé explicite « Voir le bien » lisible par lecteur d'écran.
- **`alt` descriptif** : jamais « photo », toujours « Terrain de 500 m² à Bingerville, documentation ACD ».
- **Statut non porté par la seule couleur** : le mot « Disponible / Réservé / Vendu » est écrit dans la pastille (pas de simple point coloré).
- Le badge « Site approuvé » a un `aria-label` explicite : « Site approuvé, documentation légale vérifiée ».
- Contraste prix `ink #10222e` sur blanc = **16,3:1 (AAA)** ; localisation `neutral-600` = **6,35:1 (AA)**.

✅ **À faire** : un seul CTA par carte · prix toujours préfixé « À partir de » · superficie en m² · image 4:3 systématique.
❌ **À éviter** : deux boutons concurrents · prix or `accent-500` en texte (échoue le contraste, 2,20:1) · pastille statut par couleur seule · image sans ratio fixe (casse la grille).

---

### 7.2 Carte service

Présente un pilier de l'offre 2C : *Terrains sécurisés*, *Briques à crédit*, *Accompagnement construction*, *Masterclass immobilière*.

#### Anatomie

```
┌────────────────────────┐
│  ◍  (icône 40×40)       │  ← icône dans pastille primary-50
│                         │
│  Briques à crédit       │  ← titre H4 20/28, DM Sans 500, ink
│  Payez 1/3 au départ,   │  ← description Body 16/26, neutral-600
│  le reste sur 12 mois.  │
└────────────────────────┘
```

#### Tokens

| Élément | Token |
|---|---|
| Fond carte | blanc `#ffffff`, bordure hairline `1px #dbe1e8` |
| Rayon | `lg 16` |
| Ombre repos / survol | `xs 0 1px 2px rgba(16,34,46,.06)` → `sm 0 2px 6px rgba(16,34,46,.08)` |
| Padding | `24px` (space-6) |
| Pastille icône | 48×48, fond `primary-50 #eef6fb`, icône `primary-600 #08699b`, rayon `md 10` |
| Titre | H4 20/28, DM Sans 500, `ink #10222e` |
| Description | Body 16/26, Inter 400, `neutral-600 #526170` |
| Gap icône→titre→texte | `16px` puis `8px` (space-4, space-2) |

> Variante d'accent : pour la carte « masterclass » (offre premium), la pastille icône peut passer en fond `accent-50 #fff8e6` avec icône `accent-700 #a76700` (texte/icône or valide sur clair).

#### Responsive (grille 2 / 4)

| Breakpoint | Colonnes |
|---|---|
| < 768 | **2** (gap 16px) |
| ≥ 1024 | **4** (gap 24px) |

#### Accessibilité

- Icônes **décoratives** → `aria-hidden="true"` ; le sens est porté par le titre texte.
- Hauteurs de cartes **égalisées** (`align-items: stretch`) pour éviter un désalignement des titres.
- Icône jamais seule pour signifier le service : toujours doublée du libellé.

---

### 7.3 Carte témoignage

Preuve sociale : un client 2C devenu propriétaire.

#### Anatomie

```
┌──────────────────────────────────┐
│  ★★★★★                            │  ← étoiles (optionnelles)
│  « Grâce à 2C, je suis passé de   │  ← citation Body-lg 18/28, ink
│    locataire à propriétaire à     │
│    Yamoussoukro. »                │
│                                   │
│  (photo)  Awa Koné                │  ← nom Body 16/26 poids 600
│           Cliente · Yamoussoukro  │  ← rôle + ville Body-sm, neutral-600
└──────────────────────────────────┘
```

#### Tokens

| Élément | Token |
|---|---|
| Fond | blanc `#ffffff` ou `neutral-50 #f6f8fa` (alternance de section) |
| Rayon / ombre | `lg 16` / `sm 0 2px 6px rgba(16,34,46,.08)` |
| Padding | `24px` (space-6) |
| Citation | Body-lg 18/28, Inter 400, `ink #10222e` |
| Avatar | 48×48, `border-radius: 999px` (pill), bordure hairline `1px #dbe1e8` |
| Nom | Body 16/26, poids 600, `ink #10222e` |
| Ville / rôle | Body-sm 14/22, `neutral-600 #526170` |
| Étoiles pleines | `accent-500 #ed9f00` (aplat décoratif, pas du texte) |
| Étoiles vides | `neutral-300 #c0cad4` |

> ✅ L'or `accent-500 #ed9f00` est ici parfaitement à sa place : **aplat décoratif** (étoiles), pas du texte — donc le contrat de contraste texte ne s'applique pas.

#### Responsive

- Mobile : 1 colonne, citations empilées.
- ≥ 768 : 2 colonnes ; ≥ 1024 : 3 colonnes **ou** carrousel horizontal 1,2 carte visible avec défilement.

#### Accessibilité

- La note en étoiles est doublée d'un texte alternatif : `aria-label="Note : 5 sur 5"`.
- Avatar `alt` = nom de la personne (ou `alt=""` si nom déjà en texte adjacent, pour éviter la redite).
- Citation dans un `<blockquote>`, attribution dans `<figcaption>`.

---

### 7.4 Carte valeur / engagement

Les 4 engagements de marque : **Transparence · Sécurité · Accessibilité · Proximité**. Registre plus « institutionnel » que la carte service.

#### Anatomie & mapping couleur

```
┌───────────────────────┐
│  ▢ icône               │
│  Sécurité             │  ← titre H4, DM Sans 500
│  Terrains documentés   │  ← Body, neutral-600
│  ACD / titre foncier.  │
└───────────────────────┘
```

| Engagement | Angle 2C | Pastille icône (fond / icône) |
|---|---|---|
| **Transparence** | Prix affichés « à partir de », aucun frais caché | `primary-50 #eef6fb` / `primary-600 #08699b` |
| **Sécurité** | Documentation légale ACD / titre foncier | `primary-50 #eef6fb` / `primary-700 #075884` |
| **Accessibilité** | 1/3 au départ, paiement jusqu'à 12 mois | `accent-50 #fff8e6` / `accent-700 #a76700` |
| **Proximité** | Conseiller WhatsApp, accompagnement humain | `primary-50 #eef6fb` / `primary-600 #08699b` |

#### Tokens

- Fond : peut s'afficher sur un **bandeau `primary-50 #eef6fb`** de section, cartes en blanc `#ffffff`.
- Rayon `lg 16` · padding `24px` (space-6) · ombre `xs` (repos), pas de lift (composant informatif, non cliquable).
- Titre H4 20/28 `ink #10222e` · texte Body 16/26 `neutral-600 #526170`.

#### Responsive (grille 2 / 4)

Identique à la carte service : **2** colonnes < 768, **4** colonnes ≥ 1024. Sur mobile, envisager une bande de 2×2.

#### Accessibilité

- Bloc non interactif : pas de rôle `button`/`link`, pas d'effet de survol trompeur.
- Icône `aria-hidden` ; le contenu textuel porte l'engagement.
- L'or `accent-700 #a76700` sur blanc = **4,58:1 (AA)** : utilisable si l'icône est fine (traité comme quasi-texte), sinon `accent-500` accepté car pictogramme = élément graphique.

---

### 7.5 En-tête / Navigation

#### Anatomie

```
┌───────────────────────────────────────────────────────────────┐
│  [Logo 2C]     Accueil  Nos Biens  À propos  Contact   [Nous contacter] │
└───────────────────────────────────────────────────────────────┘
   logo (gauche)   liens (centre/gauche)              CTA primaire (droite)
```

| Élément | Contenu | Token |
|---|---|---|
| Logo | 2C + baseline optionnelle | hauteur ~32–40px |
| Liens | Accueil · Nos Biens · À propos · Contact | Body 16/26, poids 500, `neutral-700 #3d4a57` |
| Lien actif | page courante | `primary-600 #08699b`, poids 600, soulignement 2px `accent-500 #ed9f00` |
| CTA | « Nous contacter » | bouton primaire `primary-600`, texte blanc, rayon `md 10` |
| Barre | fond blanc, hairline bas `1px #dbe1e8` | hauteur 64–72px |

#### Comportement sticky

```css
.header {
  position: sticky; top: 0; z-index: 50;
  background: #ffffff;
  border-bottom: 1px solid #dbe1e8;
  transition: box-shadow 200ms cubic-bezier(.2,.8,.2,1);
}
.header--scrolled { box-shadow: 0 2px 6px rgba(16,34,46,.08); } /* shadow-sm au scroll */
```

- Au repos (haut de page) : header transparent-sur-blanc, simple hairline.
- Après défilement (> 8px) : ombre `sm` pour détacher le header du contenu.

#### État de lien actif / survol

| État | Style |
|---|---|
| Repos | `neutral-700 #3d4a57`, poids 500 |
| Survol | `primary-600 #08699b` + soulignement 2px `accent-500` (transition `fast 120ms`) |
| Actif (page courante) | `primary-600 #08699b`, poids 600, soulignement 2px `accent-500`, `aria-current="page"` |
| Focus clavier | anneau `2px primary-600`, offset 2px |

#### Menu mobile (drawer / hamburger)

- Sous **768px** : liens masqués, bouton **hamburger** (44×44px min) à droite.
- Ouverture → **drawer** plein écran (ou latéral droit) : fond blanc, liens empilés (Body-lg 18/28, `space-4` d'interligne), CTA « Nous contacter » pleine largeur en bas, + accès rapide **WhatsApp**.
- Overlay `rgba(16,34,46,.48)` derrière le drawer.
- Animation : slide-in `slow 320ms`, easing standard ; croix de fermeture en haut à droite.

```css
.drawer { transform: translateX(100%); transition: transform 320ms cubic-bezier(.2,.8,.2,1); }
.drawer[data-open="true"] { transform: translateX(0); }
@media (prefers-reduced-motion: reduce){ .drawer{ transition: none; } }
```

#### Accessibilité

- Hamburger : `aria-label="Ouvrir le menu"` / `aria-expanded` mis à jour, `aria-controls` pointant le drawer.
- **Focus trap** dans le drawer ouvert ; `Échap` ferme ; focus rendu au bouton à la fermeture.
- `aria-current="page"` sur le lien actif (l'état ne repose pas que sur la couleur : poids 600 + soulignement).
- Le CTA header est un `<a>`/`<button>` avec libellé explicite, cible ≥ 44×44px.
- Contraste liens `neutral-700 #3d4a57` sur blanc largement AA ; actif `primary-600` = 5,99:1 (AA).

---

### 7.6 Hero d'accueil

Première impression : la promesse « De locataire à propriétaire, sans se ruiner. »

#### Anatomie

```
┌──────────────────────────────────────────────────────────┐
│  (image de fond : terrain/famille + overlay dégradé)      │
│                                                            │
│   De locataire à propriétaire,        [ Voir nos biens ]   │  ← Display + CTA primaire
│   sans se ruiner.                     [ 💬 Parler à un     │  ← WhatsApp (accent)
│                                          conseiller ]      │
│   Terrains sécurisés, briques à                            │  ← sous-titre Body-lg
│   crédit, dès 1/3 au départ.                               │
└──────────────────────────────────────────────────────────┘
```

| Élément | Contenu | Token typo | Couleur |
|---|---|---|---|
| Titre | « De locataire à propriétaire, sans se ruiner. » | Display 48/56 (mobile 36/44), DM Sans 700, `-0.02em` | blanc `#ffffff` |
| Sous-titre | « Terrains sécurisés documentés ACD, briques à crédit… » | Body-lg 18/28 | blanc 90% |
| CTA primaire | « Voir nos biens » | bouton, Body poids 600 | fond `accent-500 #ed9f00`, **texte `ink #10222e`** |
| CTA WhatsApp | « Parler à un conseiller » | bouton | contour blanc 1.5px, texte blanc, icône WhatsApp |

#### Image / overlay

Pour garantir la lisibilité du texte blanc sur photo, appliquer un **overlay dégradé bleu** :

```css
.hero { position: relative; min-height: 560px; }
.hero__media { position: absolute; inset: 0; object-fit: cover; }
.hero__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg,
              rgba(12,58,84,.55) 0%,       /* primary-900 #0c3a54 @55% */
              rgba(7,37,54,.78) 100%);     /* primary-950 #072536 @78% */
}
.hero__content { position: relative; z-index: 1; }
```

> **Contraste** : le texte blanc doit se lire sur la zone la plus foncée de l'overlay. Sur `primary-900 #0c3a54` opaque, le blanc dépasse 5,99:1 (référence `#08699b`/blanc, encore plus sombre ici) → AA garanti. Ne jamais poser le titre blanc sur une zone claire de la photo sans overlay.

#### CTA — choix de couleur

| CTA | Fond | Texte | Pourquoi |
|---|---|---|---|
| Primaire « Voir nos biens » | `accent-500 #ed9f00` | `ink #10222e` | texte foncé sur or = **9,56:1 (AAA)**, chaleur/opportunité |
| Alternative primaire | `primary-600 #08699b` | blanc | si l'on préfère le registre institutionnel (blanc/#08699b = 5,99:1) |
| WhatsApp | contour blanc 1.5px transparent | blanc | secondaire, ne concurrence pas le CTA principal |

> ❌ **Ne jamais** écrire un CTA « or » avec **texte blanc** (`accent-500`/blanc = 2,20:1, échec). L'or porte du texte **foncé**.

#### Responsive (mobile)

- Titre Display passe à **36/44** ; sous-titre Body-lg conservé.
- Padding vertical réduit (`space-16 64px` → `space-10 40px`).
- Les 2 CTA passent **en pile pleine largeur** (`flex-direction: column`, gap `space-3 12px`), CTA primaire en premier.
- Image : cadrage vertical, overlay renforcé (opacité +).

#### Accessibilité

- Titre en **un seul `<h1>`** par page.
- Ordre DOM : titre → sous-titre → CTA (l'ordre visuel = ordre de lecture).
- CTA WhatsApp : `aria-label="Parler à un conseiller sur WhatsApp"` ; l'icône est décorative.
- Respect `prefers-reduced-motion` si le hero comporte une animation d'entrée (fondu `base 200ms` max, désactivable).

---

### 7.7 Bandeau CTA (avant footer)

Dernière relance avant le pied de page : « Prêt à devenir propriétaire ? »

#### Anatomie

```
┌──────────────────────────────────────────────────────────┐
│   Prêt à devenir propriétaire ?                            │  ← titre H2, blanc
│   Nos conseillers vous accompagnent, étape par étape.      │  ← texte Body-lg, blanc 90%
│                                    [ Parler à un conseiller ]│  ← bouton accent
└──────────────────────────────────────────────────────────┘
```

#### Tokens

| Élément | Token |
|---|---|
| Fond | **aplat `primary-600 #08699b`** ou dégradé `primary-700 #075884 → primary-600 #08699b` |
| Rayon | `xl 24` si bandeau « carte » encadré ; pleine largeur = 0 |
| Padding | `space-16 64px` vertical (mobile `space-10 40px`) |
| Titre | H2 32/40 (mobile 26/34), DM Sans 700, blanc `#ffffff` |
| Texte | Body-lg 18/28, blanc 90% |
| Bouton | fond `accent-500 #ed9f00`, texte `ink #10222e`, rayon `md 10` ou `pill`, ombre `md` |
| Ombre bandeau | si carte flottante : `lg 0 12px 28px rgba(16,34,46,.12)` |

```css
.cta-band {
  background: linear-gradient(135deg, #075884 0%, #08699b 100%); /* primary-700 → 600 */
  color: #ffffff;
  padding: 64px 24px;                 /* space-16 / gouttière */
}
.cta-band__btn { background:#ed9f00; color:#10222e; border-radius:10px;
  box-shadow: 0 6px 16px rgba(16,34,46,.10); font-weight:600; }
```

#### Responsive

- Desktop : titre + texte à gauche, bouton à droite (`justify-content: space-between`, `align-items: center`).
- Mobile : pile centrée, bouton pleine largeur en bas.

#### Accessibilité

- Texte blanc sur `primary-600 #08699b` = **5,99:1 (AA)** ✅.
- Bouton or/`ink` = **9,56:1 (AAA)** ✅.
- Un seul CTA, libellé actionnable (« Parler à un conseiller », pas « Cliquez ici »).

---

### 7.8 Footer 4 colonnes

#### Anatomie

```
┌───────────────┬───────────────┬───────────────┬───────────────┐
│  [Logo 2C]    │  Navigation   │  Coordonnées  │  Suivez-nous  │
│  De locataire │  Accueil      │  📞 +225 ...   │  [FB][IG][in] │
│  à propriétaire│ Nos Biens    │  💬 WhatsApp   │               │
│  sans se ruiner│ À propos     │  ✉ email      │               │
│               │  Contact      │  📍 Abidjan    │               │
├───────────────┴───────────────┴───────────────┴───────────────┤
│  © 2026 Ivoire Challenge Corporation · Mentions légales · Politique de confidentialité │
└────────────────────────────────────────────────────────────────┘
```

| Colonne | Contenu 2C |
|---|---|
| 1 — Marque | Logo + baseline « De locataire à propriétaire, sans se ruiner. » |
| 2 — Navigation | Accueil · Nos Biens · À propos · Contact |
| 3 — Coordonnées | Téléphone (CTA), WhatsApp (« Parler à un conseiller »), email, adresse |
| 4 — Réseaux | Facebook · Instagram · LinkedIn (icônes) |

#### Tokens

| Élément | Token |
|---|---|
| Fond footer | `primary-950 #072536` (institutionnel, sombre) |
| Titres de colonne | Overline 12/16 MAJ +0.08em, `neutral-300 #c0cad4` |
| Liens | Body-sm 14/22, `neutral-200 #dbe1e8` ; survol → blanc `#ffffff` |
| Baseline | Body-sm, `neutral-300 #c0cad4` |
| Séparateur | hairline `1px` sur `primary-900 #0c3a54` |
| Barre de bas | fond `primary-950`, texte Caption 13/18 `neutral-400 #94a3b3` |
| Padding | `space-16 64px` haut/bas, gouttière `24px` |

> Sur fond sombre `primary-950 #072536`, le blanc et `neutral-200 #dbe1e8` offrent un contraste fort (> 12:1). Éviter `neutral-500 #6b7c8d` pour du texte lisible ; réservé aux mentions très secondaires de la barre de bas (à surveiller, limite).

#### Responsive

- ≥ 1024 : **4 colonnes**.
- 768–1023 : **2 colonnes** (marque+nav / coordonnées+réseaux).
- < 768 : **1 colonne** empilée ; barre de bas centrée, liens mentions sur 2 lignes.

#### Accessibilité

- Footer dans `<footer role="contentinfo">`.
- Icônes réseaux : lien avec `aria-label="Facebook Ivoire Challenge Corporation"`, icône `aria-hidden`.
- Liens « Mentions légales » et « Politique de confidentialité » = **vrais liens texte** (obligation RGPD/mentions), jamais des icônes seules.
- Téléphone en `tel:` et WhatsApp en `https://wa.me/...` avec libellés explicites.

---

### 7.9 Utilitaires de page — pagination, fil d'Ariane, état vide, modale, toast

#### 7.9.1 Pagination (9–12 biens / page)

**Anatomie** : `‹ Précédent  1 2 [3] 4 … 8  Suivant ›`

| Élément | Token |
|---|---|
| Bouton page | 40×40 (space-10), rayon `md 10`, Body 16/26 `neutral-700 #3d4a57` |
| Page active | fond `primary-600 #08699b`, texte blanc (5,99:1), poids 600 |
| Survol page | fond `primary-50 #eef6fb`, texte `primary-700 #075884` |
| Préc./Suiv. désactivé | texte `neutral-400 #94a3b3`, `cursor: not-allowed` |
| Espacement | gap `8px` (space-2) entre items |

- **Responsive** : sous 640px, réduire à `‹ Préc.  Page 3 / 8  Suiv. ›` (pas la liste complète des numéros).
- **A11y** : `<nav aria-label="Pagination">` ; page active `aria-current="page"` ; boutons désactivés `aria-disabled="true"`. État actif non porté par la seule couleur (poids 600 + fond plein).

#### 7.9.2 Fil d'Ariane

**Anatomie** : `Accueil › Nos Biens › Terrain 500 m² à Bingerville`

| Élément | Token |
|---|---|
| Liens parents | Body-sm 14/22, `neutral-600 #526170` ; survol `primary-600` |
| Page courante | Body-sm, `ink #10222e`, non cliquable |
| Séparateur `›` | `neutral-400 #94a3b3`, `aria-hidden` |
| Marge | `space-4 16px` sous le fil, avant le H1 |

- **A11y** : `<nav aria-label="Fil d'Ariane">` + liste ordonnée ; dernier item `aria-current="page"`. Séparateurs purement décoratifs.
- **Responsive** : sous 640px, tronquer les items intermédiaires (`Accueil › … › page courante`).

#### 7.9.3 État vide (« Aucun bien ne correspond… »)

**Anatomie**

```
        ◍  (illustration / icône)
   Aucun bien ne correspond à votre recherche
   Élargissez vos critères (ville, budget) ou
   contactez un conseiller : nous avons d'autres
   biens à vous proposer.
        [ Réinitialiser les filtres ]  [ 💬 Parler à un conseiller ]
```

| Élément | Token |
|---|---|
| Conteneur | centré, `padding: 64px 24px` (space-16), fond `neutral-50 #f6f8fa`, rayon `lg 16` |
| Icône | `neutral-400 #94a3b3`, 48–64px, `aria-hidden` |
| Titre | H3 24/32, DM Sans 500, `ink #10222e` |
| Texte | Body 16/26, `neutral-600 #526170` |
| CTA 1 | outline `primary-600` : « Réinitialiser les filtres » |
| CTA 2 | primaire ou accent : « Parler à un conseiller » (WhatsApp) |

- **A11y** : annoncer via `role="status"` / `aria-live="polite"` que la recherche n'a rien retourné, pour les lecteurs d'écran. Toujours proposer une **sortie** (réinitialiser + contact) — cohérent avec l'accompagnement humain 2C.

#### 7.9.4 Modale

Usages 2C : formulaire « Contacter à propos de ce bien », galerie photo, confirmation d'envoi.

| Élément | Token |
|---|---|
| Overlay | `rgba(16,34,46,.48)` (ink @48%) |
| Panneau | fond blanc `#ffffff`, rayon `xl 24`, ombre `xl 0 24px 48px rgba(16,34,46,.16)` |
| Padding | `space-8 32px` (mobile `space-6 24px`) |
| Titre | H3 24/32, `ink #10222e` |
| Bouton fermer | 44×44, icône `neutral-600 #526170`, coin haut-droit |
| Largeur max | 560px (formulaire) ; centré, marges `space-6 24px` sur mobile |
| Animation | entrée `slow 320ms` : overlay fondu + panneau `translateY(8px)→0` |

```css
.modal { border-radius:24px; box-shadow:0 24px 48px rgba(16,34,46,.16); background:#fff; }
.modal-overlay { background: rgba(16,34,46,.48); }
@media (prefers-reduced-motion: reduce){ .modal{ animation:none; } }
```

- **Responsive** : sous 640px, la modale peut passer en **feuille plein écran** (bottom-sheet) avec le CTA en bas.
- **A11y** : `role="dialog"` + `aria-modal="true"` + `aria-labelledby` (titre) ; **focus trap** ; ouverture → focus sur le titre/premier champ ; `Échap` ferme ; focus rendu au déclencheur ; scroll du fond bloqué.

#### 7.9.5 Toast / Alerte (success / error / info)

Retour après action : envoi de formulaire, erreur réseau, information.

| Type | Fond | Texte / icône | Usage 2C |
|---|---|---|---|
| **Success** | bg `#e6f5ee` | `success #1a8f5c` | « Votre demande a bien été envoyée, un conseiller vous rappelle. » |
| **Error** | bg `#fbeceb` | `error #d1362f` | « Une erreur est survenue, réessayez ou contactez-nous sur WhatsApp. » |
| **Info** | bg `#eef6fb` | `info #08699b` | « Ce bien est réservé ; d'autres terrains similaires sont disponibles. » |
| **Warning** (optionnel) | bg `#fff4d6` | `warning #cf8500` | « Ce bien passe bientôt en statut Réservé. » |

| Élément | Token |
|---|---|
| Rayon | `md 10` |
| Ombre | `md 0 6px 16px rgba(16,34,46,.10)` (toast flottant) |
| Padding | `space-3 12px` × `space-4 16px` |
| Bordure gauche | `4px` de la couleur sémantique (accent d'état) |
| Texte | Body-sm 14/22 ; titre optionnel Body 16/26 poids 600 |
| Position (toast) | haut-droit ou bas-centre, empilement `gap 8px` |
| Durée d'apparition | entrée/sortie `base 200ms`, easing standard |

```css
.toast--success { background:#e6f5ee; color:#1a8f5c; border-left:4px solid #1a8f5c; border-radius:10px; }
.toast--error   { background:#fbeceb; color:#d1362f; border-left:4px solid #d1362f; border-radius:10px; }
.toast--info    { background:#eef6fb; color:#08699b; border-left:4px solid #08699b; border-radius:10px; }
```

- **A11y** :
  - Succès / info → `role="status"` `aria-live="polite"` ; erreur → `role="alert"` `aria-live="assertive"`.
  - **Type non porté par la seule couleur** : chaque toast a une **icône** (✓, ✕, ⓘ) + un libellé texte explicite.
  - Auto-dismiss uniquement pour succès/info (≥ 5 s, mis en pause au survol/focus) ; **jamais** d'auto-dismiss pour une erreur bloquante → bouton fermer `44×44` obligatoire.
  - Respecter `prefers-reduced-motion` (apparition sans glissement).

---

#### Récapitulatif — tokens transverses de la section

| Besoin | Token à utiliser |
|---|---|
| Fond de carte | blanc `#ffffff` (+ hairline `1px #dbe1e8`) |
| Rayon carte | `lg 16` · bouton `md 10` / `pill 999` · modale `xl 24` |
| Ombre repos → survol (carte) | `sm 0 2px 6px rgba(16,34,46,.08)` → `md 0 6px 16px rgba(16,34,46,.10)` |
| Texte principal | `ink #10222e` (AAA, 16,3:1) |
| Texte secondaire | `neutral-600 #526170` (AA, 6,35:1) |
| CTA institutionnel | `primary-600 #08699b` + texte blanc (5,99:1) |
| CTA chaleur / accent | `accent-500 #ed9f00` + texte `ink #10222e` (AAA, 9,56:1) |
| Texte or sur blanc | **uniquement** `accent-700 #a76700` (AA, 4,58:1) |
| Focus clavier | anneau `2px primary-600 #08699b`, offset 2px |
| Motion | `base 200ms` / easing `cubic-bezier(.2,.8,.2,1)` / `prefers-reduced-motion` |

✅ **Règle d'or transverse** : l'or 2C porte du texte **foncé** (fonds, aplats, badges, boutons), jamais du texte or/blanc en petit corps.
❌ **Interdit transverse** : couleur seule pour signifier un statut/état · CTA multiples concurrents · `accent-500` en texte sur blanc · cible tactile < 44×44px.

---

## 8. Motion, accessibilité, contenu & gouvernance

Cette section verrouille les règles transversales appliquées à toutes les pages du site 2C (Accueil, Nos Biens, Détail d'un bien, À propos, Contact) et à tous les composants (cartes bien, badges de confiance, filtres, CTA WhatsApp/téléphone, formulaires, bandeaux). Tout le contenu est en français.

---

### 8.1 — MOTION

Le mouvement chez 2C sert la **confiance** : il guide l'œil, confirme une action, ne divertit jamais. Sur un site immobilier où l'utilisateur engage des sommes importantes, une animation trop appuyée décrédibilise. Principe directeur : **sobre, court, fonctionnel.**

#### Tokens de durée & easing

| Token | Valeur | Usage type |
|---|---|---|
| `motion-fast` | **120 ms** | Micro-retours : survol bouton, changement d'état d'un lien, focus, bascule d'icône. |
| `motion-base` | **200 ms** | Transitions standard : survol carte bien, ouverture menu, apparition tooltip, changement de filtre. |
| `motion-slow` | **320 ms** | Éléments plus lourds : ouverture modale/drawer, apparition au scroll, transition de galerie photo. |
| `easing-standard` | **`cubic-bezier(.2,.8,.2,1)`** | Easing par défaut de toutes les transitions et animations. |

```css
:root {
  --motion-fast: 120ms;
  --motion-base: 200ms;
  --motion-slow: 320ms;
  --easing-standard: cubic-bezier(.2, .8, .2, 1);
}
```

#### Où animer (et comment)

| Élément | Propriétés animées | Durée / easing |
|---|---|---|
| **Survol carte "bien"** | `transform: translateY(-4px)` + passage ombre `sm` → `md` | `--motion-base` · `--easing-standard` |
| **Bouton (CTA WhatsApp, "Voir le bien")** | `background-color`, `box-shadow` | `--motion-fast` |
| **Apparition au scroll** (sections, cartes service/témoignage) | `opacity 0→1` + `translateY(12px→0)`, décalage max 60 ms entre items | `--motion-slow` |
| **Ouverture menu mobile / drawer filtres** | `transform: translateX()` + fond assombri (overlay `opacity`) | `--motion-slow` |
| **Ouverture modale** (contact bien, zoom photo) | `opacity` overlay + `scale(.98→1)` du panneau | `--motion-slow` |
| **Toast / notification** ("Message envoyé") | `translateY(8px→0)` + `opacity`, auto-dismiss doux | `--motion-base` |
| **Changement de statut / filtre actif** | `background-color` du chip/badge | `--motion-fast` |

**✅ À faire**
- Animer `opacity`, `transform` (translate/scale) et `box-shadow` — propriétés performantes (GPU).
- Garder une seule animation perceptible à la fois par zone d'écran.
- Décaler légèrement (stagger ≤ 60 ms) l'apparition d'une grille de cartes, sans dépasser ~300 ms cumulés.

**❌ À éviter**
- Animer `width`, `height`, `top/left`, `margin` (reflow, saccades).
- Effets de rebond, rotations, parallaxe marquée, carrousels auto-défilants sur les photos de biens.
- Durées > 320 ms ou animations qui bloquent l'interaction (ex. clic impossible pendant l'ouverture d'une modale).

#### Respect de `prefers-reduced-motion`

Obligatoire. Les utilisateurs ayant activé la réduction de mouvement voient les états finaux **sans transition de déplacement** (les changements de couleur/opacité courts restent acceptables).

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Pour les apparitions au scroll pilotées en JS, tester la préférence avant d'animer :

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) {
  // appliquer l'animation d'apparition
} else {
  // afficher directement l'état final (opacity:1, translateY:0)
}
```

---

### 8.2 — ACCESSIBILITÉ (WCAG 2.1 niveau AA)

Cible de conformité : **WCAG 2.1 AA** sur l'ensemble du site.

#### Contrastes — règles verrouillées (ratios déjà calculés, ne pas recalculer)

| Combinaison | Ratio | Verdict | Usage autorisé |
|---|---|---|---|
| `#10222e` (ink) sur blanc | **16,3:1** | AAA | Texte principal, titres. |
| `#08699b` (primary-600) sur blanc | **5,99:1** | AA texte normal | Liens, titres bleus, texte primaire. |
| Blanc sur `#08699b` | **5,99:1** | AA texte normal | Boutons primaires, bandeaux CTA bleus. |
| `#526170` (neutral-600) sur blanc | **6,35:1** | AA | Texte secondaire (localisation, superficie). |
| `#6b7c8d` (neutral-500) sur blanc | **4,29:1** | Limite | Réserver au **texte large ou désactivé** — jamais du corps de texte. |
| `#a76700` (accent-700) sur blanc | **4,58:1** | AA texte normal | **LA nuance d'or pour du TEXTE or sur blanc** (prix accentué, label "À partir de", liens or). |
| `#ed9f00` (accent-500) sur blanc | **2,20:1** | ❌ ÉCHEC texte | **Interdit en texte sur blanc.** Réservé aux aplats/fonds et éléments décoratifs. |
| `#10222e` (ink) sur `#ed9f00` | **9,56:1** | AAA | Texte foncé sur aplat or (badges, boutons or, bandeaux). |

**✅ À faire**
- Or en **texte sur blanc** → utiliser **`#a76700` (accent-700)** exclusivement.
- Or en **aplat/fond** (badge "Opportunité", CTA secondaire) → texte **`#10222e` (ink)** dessus.

**❌ À éviter**
- `#ed9f00` en texte sur fond blanc (prix, titres, liens) — échec AA.
- Texte blanc sur aplat or — contraste insuffisant.
- Corps de texte en `#6b7c8d` (neutral-500).

#### Focus visible

Tout élément interactif (liens, boutons, champs, cartes cliquables, chips de filtre) affiche un **anneau de focus** net au clavier.

```css
:focus-visible {
  outline: 2px solid var(--primary-600, #08699b);
  outline-offset: 2px;
  border-radius: inherit;
}
```

- Anneau **primary-600 #08699b, 2px, offset 2px**.
- Ne jamais supprimer l'outline sans le remplacer (`outline: none` interdit seul).
- Sur fond bleu foncé (bandeau CTA), utiliser un anneau clair (blanc ou `primary-100 #d3e7f3`) pour rester visible.

#### Cibles tactiles & navigation clavier

- **Cibles tactiles ≥ 44 × 44 px** : boutons, liens du menu, CTA WhatsApp/téléphone, boutons de statut, chips de filtre, contrôles de galerie. Un lien texte court garde une zone cliquable augmentée par le padding.
- **Ordre de tabulation logique** : logo → navigation → contenu → filtres → cartes → footer. Le `tabindex` positif est interdit.
- **Tous les composants au clavier** : filtres (Achat/Location, Type, Ville, Budget) opérables sans souris ; modale de contact fermable via `Échap` et focus **piégé** dans la modale tant qu'elle est ouverte ; menu mobile navigable.
- **Skip link** "Aller au contenu" en tête de page, visible au focus.

#### Formulaires (contact bien, contact général)

**✅ À faire**
- **Label explicite** associé à chaque champ (`<label for>`), jamais le placeholder seul.
- Astérisque + mention « Champs obligatoires » ; erreurs annoncées en texte (`error #d1362f` sur bg `#fbeceb`) et reliées via `aria-describedby`.
- Champ téléphone en `type="tel"`, e-mail en `type="email"` (clavier adapté mobile).
- Bouton d'envoi décrivant l'action : « Envoyer ma demande », pas « Envoyer ».

```html
<label for="tel">Votre numéro de téléphone *</label>
<input id="tel" name="tel" type="tel" inputmode="tel"
       autocomplete="tel" aria-required="true"
       placeholder="Ex. : 07 00 00 00 00">
```

#### Images (biens) — texte alternatif

- Photo de bien → `alt` descriptif : **type + localisation** (`alt="Terrain viabilisé à Bingerville, quartier Adjin"`).
- Photo purement décorative → `alt=""` (ignorée par le lecteur d'écran).
- Ne jamais laisser le nom de fichier comme alt (`alt="IMG_2043.jpg"`).

#### Structure & sémantique

- **Un seul `<h1>` par page**, hiérarchie sans saut (H1 → H2 → H3). Sur *Détail d'un bien* : H1 = nom/localisation du bien.
- **`<html lang="fr">`** sur toutes les pages.
- **Liens explicites hors contexte** : « Voir le bien à Songon » plutôt que « Cliquez ici » / « En savoir plus » répété.
- **Taille de police minimale 14 px** (`Body-sm 14/22`) pour toute information lisible ; jamais en dessous, même pour les mentions.
- **Contraste des composants ≥ 3:1** : bordures de champ, séparateurs porteurs d'information, contour des chips actifs et des états de statut doivent atteindre 3:1 (la hairline `neutral-200 #dbe1e8` décorative ne compte pas comme frontière porteuse — renforcer à `neutral-300 #c0cad4` ou plus quand la bordure véhicule un état).
- **Statut jamais transmis par la seule couleur** : Disponible / Réservé / Vendu portent **libellé texte + couleur** (success `#1a8f5c`, warning `#cf8500`, neutral). Un daltonien doit distinguer les statuts.

---

### 8.3 — PATTERNS DE CONTENU & LOCALISATION (Côte d'Ivoire)

#### Prix en FCFA

Format unique sur tout le site :

| Cas | Format affiché |
|---|---|
| Prix « à partir de » (carte + détail) | **À partir de 12 000 000 FCFA** |
| Prix ferme | **25 000 000 FCFA** |
| Mensualité (brique à crédit) | **À partir de 150 000 FCFA / mois** |
| Apport initial (1/3 au départ) | **Apport : 1/3 du montant, soit 4 000 000 FCFA** |

**Règles**
- **Séparateur de milliers = espace insécable** (`&nbsp;` ou U+202F), jamais de virgule ni de point : `12 000 000 FCFA` — pas `12,000,000` ni `12.000.000`.
- Devise **« FCFA »** après le montant, précédée d'une espace : `12 000 000 FCFA` (accepté aussi : `F CFA` — choisir **une** forme et s'y tenir : **FCFA**).
- **« À partir de »** avec accents et sans majuscule interne, en `Inter` (données) ; le montant peut être accentué en `#a76700`.
- Pas de décimales (les prix immobiliers 2C sont en unités entières de FCFA).
- Alignement des prix à droite dans les tableaux comparatifs.

#### Frais de dossier — mention obligatoire

Les **frais de dossier de 150 000 FCFA non remboursables** doivent être **affichés clairement** partout où un prix ou un engagement est présenté (fiche bien, formulaire de réservation, bandeau CTA de conversion, page Contact).

**✅ À faire**
- Formulation type : **« Frais de dossier : 150 000 FCFA, non remboursables. »**
- Placer la mention **visible avant l'action d'engagement** (bouton « Réserver ce bien » / « Parler à un conseiller »), pas cachée en pied de page.
- Taille ≥ 14 px, couleur lisible (`neutral-600 #526170` minimum), jamais en `neutral-500` clair sur fond clair pour la « noyer ».

**❌ À éviter**
- Mention en tout petit, gris pâle, sous la ligne de flottaison.
- Omission sur la fiche de réservation.

#### Numéro de téléphone — recommandation forte : **un seul numéro**

**Recommandation de conception :** utiliser **un numéro de téléphone unique** sur tout le site (header, footer, fiches, contact). Un numéro unique renforce la confiance (institutionnel, pas « informel »), simplifie le suivi des appels et évite qu'un prospect tombe sur une ligne inactive.

- Format d'affichage lisible : **+225 07 00 00 00 00** (indicatif Côte d'Ivoire `+225`, groupes de 2 chiffres).
- Lien cliquable : `tel:+2250700000000` (sans espaces dans le `href`).
- Le même numéro alimente l'appel **et** le WhatsApp.

```html
<a href="tel:+2250700000000">+225 07 00 00 00 00</a>
```

#### Lien WhatsApp — « Parler à un conseiller »

Format `wa.me` avec **message pré-rempli** contextualisé au bien.

```html
<a href="https://wa.me/2250700000000?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20le%20terrain%20%C3%A0%20Bingerville%20(r%C3%A9f.%20BGV-014).%20Pouvez-vous%20me%20recontacter%20%3F"
   target="_blank" rel="noopener">
  Parler à un conseiller sur WhatsApp
</a>
```

- Numéro **sans `+` ni espaces** dans l'URL : `2250700000000`.
- Message pré-rempli **encodé URL** (`%20`, accents encodés) et **spécifique au bien** : inclure la **référence du bien** (ex. `réf. BGV-014`) pour que le conseiller identifie l'intérêt immédiatement.
- Toujours `rel="noopener"` sur les liens `target="_blank"`.

#### Adresse & localisation

- Format : **Quartier, Commune — Ville** (ex. **Adjin, Bingerville — Abidjan**). Ajouter le repère usuel si utile (« à 300 m du carrefour… »).
- Carte de localisation accompagnée d'un **texte d'adresse lisible** (ne pas dépendre uniquement de la carte, souvent inaccessible au lecteur d'écran).

#### Statuts juridiques (argument de confiance clé)

Toujours nommer explicitement le niveau de sécurisation du bien :

| Terme | Affichage recommandé |
|---|---|
| **ACD** | « Terrain avec **ACD** (Arrêté de Concession Définitive) » |
| **Titre foncier** | « Bien avec **Titre foncier** » |
| Badge de confiance | « **Documentation légale** » / « **Site approuvé** » |

- Utiliser le badge de confiance (aplat or `#ed9f00` + texte ink `#10222e`, ou primary) sur chaque fiche documentée.
- Ne pas laisser d'ambiguïté : un bien sans document affiché ne doit pas porter le badge.

#### Majuscules, accents, dates

- **Accents obligatoires y compris sur les majuscules** : « À propos », « À partir de », « RÉSERVÉ », « Côte d'Ivoire ».
- **Overline / labels en MAJUSCULES** (`+0.08em` d'interlettrage) : « NOS BIENS », « TÉMOIGNAGES ».
- **Dates au format français** : **17 juillet 2026** (jour + mois en lettres + année). Format court accepté : **17/07/2026** (jamais `07/17/2026`).
- Guillemets français **« … »** pour les citations/témoignages ; apostrophe typographique **'** dans « Côte d'Ivoire ».
- Espace insécable avant `: ; ! ?` et à l'intérieur des montants.

---

### 8.4 — GOUVERNANCE & HANDOFF

#### Nommage des tokens

Convention : `catégorie-échelle` / `catégorie-rôle`, en minuscules, séparateur tiret.

| Catégorie | Modèle | Exemples |
|---|---|---|
| Couleur (échelle) | `couleur-teinte` | `primary-600`, `accent-500`, `accent-700`, `neutral-200` |
| Couleur (rôle) | `role` | `ink`, `success`, `warning`, `error`, `info` |
| Espacement | `space-n` (base 4px) | `space-4` = 16px, `space-8` = 32px |
| Rayon | `radius-taille` | `radius-md` = 10, `radius-lg` = 16, `radius-pill` = 999 |
| Ombre | `shadow-taille` | `shadow-sm`, `shadow-md`, `shadow-lg` |
| Motion | `motion-vitesse` / `easing-role` | `motion-base`, `easing-standard` |
| Typo | `font-role` / `text-niveau` | `font-display` (DM Sans), `font-body` (Inter), `text-h2` |
| Breakpoint | `bp-taille` | `bp-md` = 768, `bp-lg` = 1024 |

**Règles de nommage**
- Ne jamais nommer un token par sa valeur perçue (`bleu-fonce`) mais par son rôle/échelle (`primary-800`).
- Les **rôles sémantiques** (`success`, `error`…) pointent vers une teinte de l'échelle — ne pas dupliquer les hex à la main.
- Un composant ne référence **jamais un hex en dur** : il consomme un token.

#### Comment étendre le système

1. **Vérifier avant de créer** : une teinte, un espacement, une ombre existants couvrent-ils déjà le besoin ? Rester dans l'échelle fournie.
2. **Nouvelle couleur** → l'ajouter comme échelle complète (50→950) et **calculer/valider les contrastes** (AA texte 4,5:1, composants 3:1) avant usage. Documenter le ratio comme dans le socle.
3. **Nouveau composant** → le composer à partir des tokens existants (couleur, espace, rayon, ombre, motion). Documenter : anatomie, états (repos/survol/focus/actif/désactivé), variantes, règles d'accessibilité.
4. **Nouveau token de valeur** (espacement, rayon) → respecter la base **4px** ; pas de valeurs hors grille (`space` multiples de 4).
5. **Versionner** : tout ajout/modification passe par une revue design + note de version. Pas de couleur ou de police hors palette/typo verrouillées (DM Sans titres, Inter corps).

#### Checklist de revue AVANT mise en ligne — 5 éléments clients obligatoires

Ces cinq éléments proviennent des informations à collecter auprès du client 2C. Aucune page ne part en production tant qu'ils ne sont pas confirmés et intégrés.

| # | Élément | Critère de validation |
|---|---|---|
| 1 | **Numéro de téléphone unique** | Un seul numéro, vérifié actif, identique partout (header, footer, fiches), utilisé pour `tel:` **et** `wa.me`. |
| 2 | **Témoignages réels** | Témoignages authentifiés (nom réel, accord de diffusion) — aucun texte fictif « placeholder ». |
| 3 | **Horaires** | Horaires d'ouverture réels affichés (Contact + footer), format cohérent, fuseau local. |
| 4 | **Statut juridique / RCCM en mentions légales** | Raison sociale, **RCCM**, statut de l'entreprise présents dans les mentions légales ; ACD/Titre foncier affichés par bien. |
| 5 | **Clause frais de dossier** | **« Frais de dossier : 150 000 FCFA, non remboursables »** visible et lisible sur fiches, réservation et bandeaux d'engagement. |

#### Checklist « Prêt à livrer une page »

**Contenu & marque**
- [ ] Toute la rédaction est en **français**, accents sur majuscules inclus.
- [ ] Titres/Display en **DM Sans** (500/700) ; corps/données/prix en **Inter** (400/500/600).
- [ ] Prix au format **`12 000 000 FCFA`** + **« À partir de »** le cas échéant.
- [ ] Mention **frais de dossier 150 000 FCFA non remboursables** présente là où il y a engagement.
- [ ] Badge de confiance / statut juridique (ACD, Titre foncier) affiché sur les biens documentés.
- [ ] Statuts **Disponible / Réservé / Vendu** en texte + couleur (jamais couleur seule).

**Accessibilité**
- [ ] Aucun texte or `#ed9f00` sur blanc ; texte or = **`#a76700`** ; texte sur aplat or = **`#10222e`**.
- [ ] `:focus-visible` = anneau **primary-600 2px, offset 2px** sur tout élément interactif.
- [ ] Cibles tactiles **≥ 44px** (CTA WhatsApp, téléphone, filtres, boutons).
- [ ] `<html lang="fr">`, **un seul H1**, hiérarchie de titres sans saut.
- [ ] Chaque champ a un **label explicite** ; erreurs en texte + `aria`.
- [ ] Toutes les photos de biens ont un **alt descriptif** (type + localisation) ; décoratif = `alt=""`.
- [ ] Liens explicites hors contexte ; texte info **≥ 14px** ; bordures porteuses **≥ 3:1**.
- [ ] Navigation clavier complète ; modale fermable `Échap` + focus piégé ; skip link présent.

**Motion & technique**
- [ ] Transitions limitées à `opacity`/`transform`/`box-shadow`, durées `120/200/320 ms`, easing `cubic-bezier(.2,.8,.2,1)`.
- [ ] Bloc **`prefers-reduced-motion`** présent et testé.
- [ ] Liens `tel:` et `wa.me` fonctionnels ; message WhatsApp **pré-rempli et encodé** avec réf. du bien.
- [ ] `rel="noopener"` sur les liens `target="_blank"`.
- [ ] Responsive validé aux breakpoints **640 / 768 / 1024 / 1280 / 1440**, conteneur max **1200px**, gouttière **24px**.
- [ ] Aucun hex en dur : composants branchés sur les **tokens**.
- [ ] Contrôle final sur mobile réel + lecteur d'écran (VoiceOver/TalkBack) sur au moins Accueil, Nos Biens et Détail d'un bien.

---

## 9. Design tokens — export développeur (CSS & JSON)

Cette section rassemble **la source de vérité machine** du design system : tous les tokens verrouillés dans les sections précédentes, prêts à coller. Les valeurs ici font foi ; ne les recalculez pas et ne les arrondissez pas.

### 9.1 Variables CSS (`:root`)

```css
:root {
  /* ---------- COULEURS : Primaire (Bleu 2C) ---------- */
  --color-primary-50:  #eef6fb;
  --color-primary-100: #d3e7f3;
  --color-primary-200: #a7cfe7;
  --color-primary-300: #6fb0d6;
  --color-primary-400: #3a8ec1;
  --color-primary-500: #167aad;
  --color-primary-600: #08699b; /* base marque */
  --color-primary-700: #075884;
  --color-primary-800: #0a4869;
  --color-primary-900: #0c3a54;
  --color-primary-950: #072536;

  /* ---------- COULEURS : Accent (Or 2C) ---------- */
  --color-accent-50:  #fff8e6;
  --color-accent-100: #fdecbf;
  --color-accent-200: #fadd8a;
  --color-accent-300: #f6c94d;
  --color-accent-400: #f2b31f;
  --color-accent-500: #ed9f00; /* base marque — APLATS/DÉCO uniquement */
  --color-accent-600: #cf8500;
  --color-accent-700: #a76700; /* nuance TEXTE or sur blanc (AA 4,58:1) */
  --color-accent-800: #855100;
  --color-accent-900: #6e4300;
  --color-accent-950: #3f2500;

  /* ---------- COULEURS : Neutres (ardoise bleutée) ---------- */
  --color-white:       #ffffff;
  --color-neutral-50:  #f6f8fa;
  --color-neutral-100: #eceff3;
  --color-neutral-200: #dbe1e8;
  --color-neutral-300: #c0cad4;
  --color-neutral-400: #94a3b3;
  --color-neutral-500: #6b7c8d;
  --color-neutral-600: #526170;
  --color-neutral-700: #3d4a57;
  --color-neutral-800: #29333d;
  --color-neutral-900: #182028;
  --color-neutral-950: #0e141a;
  --color-ink:         #10222e; /* texte principal */

  /* ---------- COULEURS : Sémantiques ---------- */
  --color-success:    #1a8f5c;  --color-success-bg: #e6f5ee;
  --color-warning:    #cf8500;  --color-warning-bg: #fff4d6;
  --color-error:      #d1362f;  --color-error-bg:   #fbeceb;
  --color-info:       #08699b;  --color-info-bg:    #eef6fb;

  /* ---------- ALIAS SÉMANTIQUES D'APPLICATION ---------- */
  --surface:          #ffffff;  /* fond de page / carte        */
  --surface-alt:      #f6f8fa;  /* section alternée            */
  --surface-sunken:   #eceff3;  /* champ, zone en creux        */
  --border:           #dbe1e8;  /* filet 1px                   */
  --border-strong:    #c0cad4;  /* séparateur marqué           */
  --text:             #10222e;  /* corps (16,3:1)              */
  --text-muted:       #526170;  /* secondaire (6,35:1)         */
  --text-subtle:      #6b7c8d;  /* large/désactivé (4,29:1)    */
  --text-on-primary:  #ffffff;  /* sur bleu 600 (5,99:1)       */
  --text-on-accent:   #10222e;  /* sur or 500 (9,56:1)         */
  --link:             #08699b;
  --link-hover:       #075884;
  --accent-text:      #a76700;  /* texte or sur blanc          */
  --focus-ring:       #08699b;

  /* ---------- TYPOGRAPHIE ---------- */
  --font-heading: "DM Sans", ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-body:    "Inter", ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  --text-display: 3rem;      --lh-display: 3.5rem;   /* 48/56 */
  --text-h1:      2.5rem;    --lh-h1:      3rem;     /* 40/48 */
  --text-h2:      2rem;      --lh-h2:      2.5rem;   /* 32/40 */
  --text-h3:      1.5rem;    --lh-h3:      2rem;     /* 24/32 */
  --text-h4:      1.25rem;   --lh-h4:      1.75rem;  /* 20/28 */
  --text-body-lg: 1.125rem;  --lh-body-lg: 1.75rem;  /* 18/28 */
  --text-body:    1rem;      --lh-body:    1.625rem; /* 16/26 */
  --text-body-sm: 0.875rem;  --lh-body-sm: 1.375rem; /* 14/22 */
  --text-caption: 0.8125rem; --lh-caption: 1.125rem; /* 13/18 */
  --text-overline:0.75rem;   --lh-overline:1rem;     /* 12/16 */

  --weight-regular: 400;   /* Inter */
  --weight-medium:  500;   /* Inter / DM Sans */
  --weight-semibold:600;   /* Inter */
  --weight-bold:    700;   /* DM Sans */
  --tracking-tight: -0.02em; /* titres */
  --tracking-normal: 0;
  --tracking-wide:  0.08em;  /* overline */

  /* ---------- ESPACEMENT (base 4px) ---------- */
  --space-0: 0;      --space-0-5: 2px;  --space-1: 4px;   --space-2: 8px;
  --space-3: 12px;   --space-4: 16px;   --space-5: 20px;  --space-6: 24px;
  --space-8: 32px;   --space-10: 40px;  --space-12: 48px; --space-16: 64px;
  --space-20: 80px;  --space-24: 96px;  --space-32: 128px;

  /* ---------- RAYONS ---------- */
  --radius-sm: 6px;  --radius-md: 10px; --radius-lg: 16px;
  --radius-xl: 24px; --radius-2xl: 32px; --radius-pill: 999px;

  /* ---------- BORDURES ---------- */
  --border-hairline: 1px;  --border-strong-width: 1.5px;

  /* ---------- OMBRES (élévation) ---------- */
  --shadow-xs: 0 1px 2px rgba(16,34,46,.06);
  --shadow-sm: 0 2px 6px rgba(16,34,46,.08);
  --shadow-md: 0 6px 16px rgba(16,34,46,.10);
  --shadow-lg: 0 12px 28px rgba(16,34,46,.12);
  --shadow-xl: 0 24px 48px rgba(16,34,46,.16);

  /* ---------- MISE EN PAGE ---------- */
  --container-max: 1200px;
  --gutter: 24px;
  --grid-columns: 12;

  /* ---------- MOTION ---------- */
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-slow: 320ms;
  --ease-standard: cubic-bezier(.2,.8,.2,1);
}
```

> **Points de rupture (breakpoints).** Les variables CSS ne fonctionnent pas dans les requêtes `@media` ; conservez les valeurs en dur ou dans une map SCSS/JS : `sm 640px · md 768px · lg 1024px · xl 1280px · 2xl 1440px`. Approche **mobile-first** (`min-width`).

### 9.2 Tokens JSON (portable — Style Dictionary / Tailwind / JS)

```json
{
  "color": {
    "primary": { "50":"#eef6fb","100":"#d3e7f3","200":"#a7cfe7","300":"#6fb0d6","400":"#3a8ec1","500":"#167aad","600":"#08699b","700":"#075884","800":"#0a4869","900":"#0c3a54","950":"#072536" },
    "accent":  { "50":"#fff8e6","100":"#fdecbf","200":"#fadd8a","300":"#f6c94d","400":"#f2b31f","500":"#ed9f00","600":"#cf8500","700":"#a76700","800":"#855100","900":"#6e4300","950":"#3f2500" },
    "neutral": { "0":"#ffffff","50":"#f6f8fa","100":"#eceff3","200":"#dbe1e8","300":"#c0cad4","400":"#94a3b3","500":"#6b7c8d","600":"#526170","700":"#3d4a57","800":"#29333d","900":"#182028","950":"#0e141a" },
    "ink": "#10222e",
    "semantic": {
      "success":"#1a8f5c","successBg":"#e6f5ee",
      "warning":"#cf8500","warningBg":"#fff4d6",
      "error":"#d1362f","errorBg":"#fbeceb",
      "info":"#08699b","infoBg":"#eef6fb"
    }
  },
  "font": {
    "heading": "\"DM Sans\", ui-sans-serif, system-ui, sans-serif",
    "body": "\"Inter\", ui-sans-serif, system-ui, sans-serif"
  },
  "fontSize": {
    "display":["48px","56px"],"h1":["40px","48px"],"h2":["32px","40px"],"h3":["24px","32px"],
    "h4":["20px","28px"],"bodyLg":["18px","28px"],"body":["16px","26px"],"bodySm":["14px","22px"],
    "caption":["13px","18px"],"overline":["12px","16px"]
  },
  "space": { "0":"0","0.5":"2px","1":"4px","2":"8px","3":"12px","4":"16px","5":"20px","6":"24px","8":"32px","10":"40px","12":"48px","16":"64px","20":"80px","24":"96px","32":"128px" },
  "radius": { "sm":"6px","md":"10px","lg":"16px","xl":"24px","2xl":"32px","pill":"999px" },
  "shadow": {
    "xs":"0 1px 2px rgba(16,34,46,.06)","sm":"0 2px 6px rgba(16,34,46,.08)",
    "md":"0 6px 16px rgba(16,34,46,.10)","lg":"0 12px 28px rgba(16,34,46,.12)","xl":"0 24px 48px rgba(16,34,46,.16)"
  },
  "breakpoint": { "sm":"640px","md":"768px","lg":"1024px","xl":"1280px","2xl":"1440px" },
  "motion": { "fast":"120ms","base":"200ms","slow":"320ms","ease":"cubic-bezier(.2,.8,.2,1)" }
}
```

### 9.3 Récapitulatif des tokens sémantiques (le « quoi utiliser quand »)

| Token d'application | Valeur | Usage | Contraste vérifié |
|---|---|---|---|
| `--surface` | `#ffffff` | Fond de page et de carte | — |
| `--surface-alt` | `#f6f8fa` | Section alternée, respiration | — |
| `--surface-sunken` | `#eceff3` | Champ de formulaire au repos | — |
| `--border` | `#dbe1e8` | Filet 1px, séparation légère | ≥ 3:1 sur blanc |
| `--text` | `#10222e` | **Corps de texte, titres, prix** | 16,3:1 (AAA) |
| `--text-muted` | `#526170` | Texte secondaire, méta (m², ville) | 6,35:1 (AA) |
| `--text-subtle` | `#6b7c8d` | Texte large / désactivé **seulement** | 4,29:1 (limite) |
| `--text-on-primary` | `#ffffff` | Texte sur bouton/bandeau bleu | 5,99:1 (AA) |
| `--text-on-accent` | `#10222e` | Texte sur aplat or | 9,56:1 (AAA) |
| `--accent-text` | `#a76700` | **Texte or sur blanc** (seule nuance permise) | 4,58:1 (AA) |
| `--link` / `--link-hover` | `#08699b` / `#075884` | Liens | 5,99:1 (AA) |
| `--focus-ring` | `#08699b` | Anneau de focus (2px + offset 2px) | ≥ 3:1 |

> ⚠️ **Rappel non négociable :** `--color-accent-500 (#ed9f00)` = **2,20:1** sur blanc → **interdit pour du texte**. En texte or sur blanc, toujours `--accent-text (#a76700)`. Sur un aplat or, toujours texte `--color-ink`.

### 9.4 Mode sombre (optionnel, non prioritaire)

Le site vitrine vit en **mode clair** (blanc dominant = ADN de marque). Si un mode sombre est ajouté plus tard, ne pas assombrir « à la main » : remapper uniquement les **alias sémantiques**, en gardant les rampes intactes.

| Alias | Clair | Sombre (piste) |
|---|---|---|
| `--surface` | `#ffffff` | `#0e141a` (neutral-950) |
| `--surface-alt` | `#f6f8fa` | `#182028` (neutral-900) |
| `--text` | `#10222e` | `#f6f8fa` (neutral-50) |
| `--text-muted` | `#526170` | `#94a3b3` (neutral-400) |
| `--border` | `#dbe1e8` | `#29333d` (neutral-800) |
| Primaire (interactif) | `#08699b` | `#3a8ec1` (primary-400, contraste suffisant sur fond sombre) |
| Accent (texte) | `#a76700` | `#f6c94d` (accent-300) |

> Toute nouvelle paire de couleurs en mode sombre **doit être re-testée** à ≥ 4,5:1 (texte) avant adoption. Ne jamais poser `#08699b` en texte sur fond sombre sans vérifier.
