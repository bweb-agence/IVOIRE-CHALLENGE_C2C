# Base de données du CMS — projet `ivoire2c-site`

Projet Supabase **dédié au site vitrine**, volontairement séparé du projet `ivoire2c`
(« Le Hub ») qui contient les données sensibles : pièces KYC, versements, souscripteurs.

Raison de cette séparation : la clé publique du site est embarquée dans le JavaScript
envoyé à chaque visiteur. L'isoler garantit qu'aucune erreur de configuration côté
vitrine ne peut exposer les données clients du Hub.

- Référence du projet : `zqmaxmpwvjdurjhmgfdr`
- URL : `https://zqmaxmpwvjdurjhmgfdr.supabase.co`
- Région : `eu-west-1`

## Migrations appliquées

Elles sont enregistrées dans le projet Supabase (table `supabase_migrations.schema_migrations`)
et consultables via le tableau de bord ou `list_migrations`.

| Version | Nom | Objet |
|---|---|---|
| 20260719014331 | `cms_schema` | Tables `properties`, `announcements`, `testimonials`, `team_members`, `contact_requests` + RLS de base |
| 20260719014410 | `seed_properties` | Reprise des 6 biens historiquement codés en dur |
| 20260719014437 | `cms_storage_medias` | Bucket public `medias` |
| 20260719014520 | `restreindre_listage_bucket_medias` | Empêche le listage public des fichiers |
| 20260719014632 | `acces_admin_par_liste_explicite` | Table `admins` + fonction `is_admin()` ; les policies d'écriture n'accordent plus rien au simple fait d'être connecté |
| 20260719014710 | `durcissement_is_admin_et_formulaire` | `is_admin()` retiré au rôle `anon` ; contraintes anti-spam sur le formulaire |

## Modèle de sécurité

**Lecture publique** — uniquement les lignes `publie = true`. Les demandes de contact
et la liste des admins ne sont jamais lisibles publiquement.

**Écriture** — réservée aux comptes présents dans la table `public.admins`.
Être authentifié ne suffit pas : c'est ce qui protège le site même si l'inscription
publique venait à être laissée ouverte.

**Formulaire de contact** — le public peut insérer une demande (sinon le site ne
recevrait rien), mais ne peut ni la relire, ni la modifier, ni se pré-attribuer un
statut de traitement. Une contrainte refuse les enregistrements vides.

### Ajouter un administrateur

1. Tableau de bord Supabase → **Authentication → Users → Add user** (créer le compte
   avec un mot de passe, cocher « Auto Confirm User »).
2. Puis, dans **SQL Editor** :

```sql
insert into public.admins (user_id, email)
select id, email from auth.users where email = 'personne@ivoire2c.com'
on conflict (user_id) do nothing;
```

3. Retirer un accès :

```sql
delete from public.admins where email = 'personne@ivoire2c.com';
```

### Avertissement résiduel du linter

`is_admin()` est signalée comme exécutable par les utilisateurs connectés. C'est
**voulu** : les policies RLS s'appuient dessus et sont évaluées avec le rôle de
l'appelant. La fonction ne révèle que si l'appelant lui-même est administrateur.

## Vérifications de sécurité effectuées

Testé avec la clé publique, en anonyme :

- création d'un bien → refusée (violation RLS)
- lecture des demandes de contact → vide, alors qu'une ligne existait
- lecture de la table `admins` → vide
- appel de `is_admin()` → permission refusée
- envoi d'une demande via le formulaire → accepté (HTTP 201)
- envoi d'une demande vide ou avec statut interne forcé → refusé
