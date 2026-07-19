import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { PropertyRow } from '@/lib/database.types';
import { properties as fallbackProperties, type Property } from '@/data/properties';

/** Identifiant lisible utilisé dans les URLs publiques. Doit produire le même
 *  résultat que le slug enregistré en base (cf. migration seed_properties). */
export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

/** Ligne de base de données → forme utilisée par les composants du site public. */
function fromRow(row: PropertyRow): Property {
  return {
    id: row.slug,
    nom: row.nom,
    type: row.type,
    transaction: row.transaction,
    ville: row.ville,
    quartier: row.quartier,
    superficie: row.superficie,
    prix: row.prix,
    description: row.description,
    statut: row.statut,
    statutJuridique: row.statut_juridique,
    distanceRepere: row.distance_repere,
    modalitesPaiement: row.modalites_paiement,
    siteApprouve: row.site_approuve,
    aLaUne: row.a_la_une,
    photos: row.photos ?? [],
  };
}

/** Données intégrées au code, servant de secours. Les identifiants sont alignés
 *  sur les slugs pour que les URLs restent les mêmes dans les deux modes. */
const fallback: Property[] = fallbackProperties.map(p => ({ ...p, id: slugify(p.nom) }));

interface State {
  properties: Property[];
  loading: boolean;
  /** 'base' quand les données viennent du CMS, 'secours' en repli. */
  source: 'base' | 'secours';
}

/** Charge les biens publiés. En cas d'absence de configuration ou d'erreur
 *  réseau, le site continue de fonctionner avec les données intégrées. */
export function useProperties(): State {
  const [state, setState] = useState<State>({
    properties: isSupabaseConfigured ? [] : fallback,
    loading: isSupabaseConfigured,
    source: 'secours',
  });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    supabase
      .from('properties')
      .select('*')
      .eq('publie', true)
      .order('ordre', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data) {
          setState({ properties: fallback, loading: false, source: 'secours' });
          return;
        }
        setState({
          properties: (data as PropertyRow[]).map(fromRow),
          loading: false,
          source: 'base',
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/** Retrouve un bien par son slug ; accepte aussi les anciens identifiants
 *  numériques pour ne pas casser les liens déjà partagés. */
export function findProperty(list: Property[], key: string | undefined): Property | undefined {
  if (!key) return undefined;
  const bySlug = list.find(p => p.id === key);
  if (bySlug) return bySlug;
  const index = Number(key);
  return Number.isInteger(index) && index >= 1 ? list[index - 1] : undefined;
}
