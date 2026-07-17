# AUDIT DU PROJET — Site Vitrine Ivoire Challenge Corporation (2C)

> **Date :** 17 juillet 2026
> **Périmètre :** arborescence, contenus et préparation du dossier projet (hors code — aucun code de site n'existe encore)

---

## 1. Résumé exécutif

Le projet dispose d'une **excellente matière de fond** : le copywriting, le plan du site et le design system sont complets et **cohérents entre eux**. En revanche, **l'organisation des fichiers présente plusieurs défauts** : un dossier vide, des fautes de nommage, des fichiers parasites, et un dossier de polices très surdimensionné (96 % du poids total).

| | |
|---|---|
| **Verdict** | Prêt pour la **conception**, pas encore pour le **build** |
| **Note de préparation** | **6,5 / 10** |
| **Poids total** | ~25 Mo — dont **24 Mo (96 %) pour `POLICES`** |
| **Bloquant principal** | Éléments de contenu manquants (numéro unique, témoignages, mentions légales) déjà identifiés dans le copywriting |

**Points forts** — Copywriting rédigé (227 lignes), design system livré (2 630 lignes + style guide visuel), plan du site clair, polices sources présentes, premières images disponibles.
**Points faibles** — Dossier `MOONBOARD` vide, nommage incohérent et fautif, `.DS_Store` traînants, `POLICES` non optimisé, pas de dépôt git, assets clés manquants (logo, favicon, photos définitives).

---

## 2. Inventaire

| Dossier | Contenu | Poids | État |
|---|---|---|---|
| `COPY WRITTING` | 1 document (227 l.) | 8 Ko | ⚠️ Nom fautif (« WRITTING ») |
| `DESIGN SYSTEME` | `DESIGN-SYSTEM.md` (2 603 l.) + `README.md` | 160 Ko | ⚠️ Accent manquant + `.DS_Store` |
| `IMAGES` | 6 fichiers (5 photos + 1 capture) | 704 Ko | ⚠️ Noms non descriptifs, espaces/accents |
| `MOONBOARD` | **vide** | 0 o | 🔴 Vide + faute (« MOODBOARD ») |
| `PLAN DU SITE` | 1 document (86 l.) | 4 Ko | ✅ OK (espaces dans le nom) |
| `POLICES` | Inter + DM Sans complets (130+ fichiers) | **24 Mo** | 🔴 Surdimensionné + `.DS_Store` |
| `STYLE GUIDE` | `styleguide.html` (autonome) | 224 Ko | ✅ OK |

---

## 3. Constats par dossier

### `COPY WRITTING` — ✅ contenu / ⚠️ forme
- Copywriting complet et bien structuré (menu, accueil, biens, à propos, contact, footer, notes).
- **Faute de frappe** : « WRITTING » → devrait être **COPYWRITING** (un mot, un seul « T »).

### `DESIGN SYSTEME` — ✅ contenu / ⚠️ forme
- Contient la référence écrite (`design-system.md`) + `README.md` : solide.
- **Accent manquant** : « SYSTEME » → **SYSTÈME**.
- Contient un `.DS_Store` parasite.

### `IMAGES` — ⚠️ à nettoyer
- 5 photos aux **noms de hash Facebook** (`712196632_..._n.jpg`) : illisibles, non exploitables tels quels.
- 1 capture d'écran au nom contenant **espaces et accents** (`Capture d'écran … .png`) — problématique pour le web.
- **Points d'attention** : vérifier les **droits d'usage** des photos ; prévoir des visuels **haute définition** de biens réels ; optimiser (WebP) avant mise en ligne.

### `MOONBOARD` — 🔴 vide
- Aucun fichier. Un moodboard est pourtant un **intrant clé** (références visuelles, ambiances, inspirations) avant maquettage.
- **Faute** : « MOONBOARD » → **MOODBOARD**.

### `PLAN DU SITE` — ✅
- Structure claire et alignée sur le copywriting et le design system. Rien à signaler sur le fond.

### `POLICES` — 🔴 surdimensionné
- Familles **complètes** Inter + DM Sans : **126 fichiers `.ttf` statiques** + fontes variables + licences = **24 Mo**.
- Le site n'a besoin que de **quelques graisses en `.woff2`** : Inter 400/500/600/700 et DM Sans 500/700 ≈ **120–150 Ko au total**.
- Recommandation : conserver les sources ici, mais **produire un sous-dossier `WEB/` avec uniquement les `.woff2` utiles** pour l'intégration.

### `STYLE GUIDE` — ✅
- `styleguide.html` autonome (polices embarquées, fonctionne hors ligne). Parfait.

---

## 4. Problèmes transverses

1. **Nommage incohérent et fautif.**
   Fautes (`WRITTING`, `MOONBOARD`, `SYSTEME`), casses mélangées (kebab-case, snake_case, hash), et **espaces dans les noms de dossiers** — risqué pour les URL, les scripts et git.
2. **Fichiers parasites.**
   3 × `.DS_Store` (macOS). À supprimer et à ignorer via un `.gitignore`.
3. **Poids non maîtrisé.**
   `POLICES` pèse 96 % du projet. À alléger pour l'intégration.
4. **Pas de dépôt git initialisé** — alors que l'objectif est de pousser sur GitHub.
5. **Aucune maquette / wireframe / code** encore — cohérent avec la phase actuelle, mais à planifier.

---

## 5. Ce qui manque pour passer au build

| Élément | Priorité | Note |
|---|---|---|
| Logo 2C (SVG) + favicon | 🔴 Haute | Absent — indispensable au header et à l'onglet |
| Photos de biens définitives (droits OK) | 🔴 Haute | Les 5 actuelles semblent issues de Facebook |
| Moodboard | 🟠 Moyenne | Dossier vide |
| **Numéro de contact unique** | 🔴 Haute | Déjà signalé : 3 numéros différents circulent |
| **Témoignages clients réels** | 🟠 Moyenne | Aucun collecté |
| **Mentions légales / RCCM / agréments** | 🔴 Haute | Point sensible identifié à l'audit Facebook |
| **Clause frais de dossier (150 000 FCFA)** | 🔴 Haute | À afficher clairement dans le parcours |
| Horaires d'ouverture | 🟠 Moyenne | À préciser |
| Wireframes / maquettes | 🟠 Moyenne | Étape suivante logique |

---

## 6. Recommandations priorisées

**P1 — Hygiène immédiate (5 min)**
- Supprimer les 3 `.DS_Store` et ajouter un `.gitignore` (`.DS_Store`, `node_modules/`, etc.).
- Renommer/vider `MOONBOARD` → `MOODBOARD` (et y déposer les références).
- Corriger les noms fautifs (`WRITTING`, `SYSTEME`).
- `git init` + premier commit.

**P2 — Optimisation des assets**
- Alléger `POLICES` : ne garder pour le web que les `.woff2` utiles (voir §3).
- Renommer les images en noms **web-safe** (sans espace ni accent) et les optimiser (WebP).

**P3 — Compléter les intrants**
- Réunir logo, favicon, photos définitives, infos légales et de contact (§5), puis passer aux wireframes.

---

## 7. Convention de nommage recommandée

Pour un projet destiné au web et à git, la règle la plus sûre est : **pas d'espaces, pas d'accents, une seule casse.**

| Actuel | Recommandé (web/git) |
|---|---|
| `COPY WRITTING/` | `COPYWRITING/` |
| `DESIGN SYSTEME/` | `DESIGN-SYSTEM/` |
| `MOONBOARD/` | `MOODBOARD/` |
| `PLAN DU SITE/` | `PLAN-DU-SITE/` |
| `STYLE GUIDE/` | `STYLE-GUIDE/` |
| `Capture d'écran … .png` | `CAPTURE-ECRAN-2026-07-17.png` |

> Les fichiers documentaires en MAJUSCULES (`README.md`, `AUDIT.md`, `DESIGN-SYSTEM.md`) sont une convention lisible et répandue. Garder les **extensions en minuscules** (`.md`, `.html`, `.png`) pour la compatibilité des outils.

---

*Audit généré le 17 juillet 2026. Voir §6 pour le plan d'action.*
