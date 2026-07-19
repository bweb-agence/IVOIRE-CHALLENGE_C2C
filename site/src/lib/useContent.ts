import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { TestimonialRow, TeamMemberRow } from '@/lib/database.types';

/** Charge une table de contenu publié, avec repli sur les données intégrées
 *  au site tant que rien n'a été saisi dans l'administration. */
function usePublished<T>(table: 'testimonials' | 'team_members', secours: T[]): { items: T[]; loading: boolean } {
  const [items, setItems] = useState<T[]>(isSupabaseConfigured ? [] : secours);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let annule = false;

    supabase
      .from(table)
      .select('*')
      .eq('publie', true)
      .order('ordre')
      .then(({ data, error }) => {
        if (annule) return;
        setLoading(false);
        // Rien de publié (ou erreur) : on garde le contenu livré avec le site
        // plutôt que d'afficher une section vide.
        setItems(error || !data || data.length === 0 ? secours : (data as T[]));
      });

    return () => {
      annule = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return { items, loading };
}

export interface Temoignage {
  nom: string;
  ville: string;
  citation: string;
  note: number;
}

export interface Membre {
  nom: string;
  fonction: string;
  initiales: string;
  photo: string | null;
}

/** Avis provisoires livrés avec le site, remplacés dès qu'un vrai témoignage est publié. */
const TEMOIGNAGES_SECOURS: Temoignage[] = [
  { nom: 'Kouamé A.', ville: 'Abidjan', note: 5, citation: "Grâce à 2C, j'ai acheté mon terrain à Azaguié en toute sérénité. La documentation était complète et l'accompagnement irréprochable." },
  { nom: 'Fatou D.', ville: 'Bingerville', note: 5, citation: "Le programme briques à crédit m'a permis de commencer ma construction sans attendre d'avoir tout le budget. Merci à l'équipe !" },
  { nom: 'Jean-Marc K.', ville: 'Cocody', note: 5, citation: "Professionnels, transparents et toujours disponibles. Je recommande Ivoire Challenge Corporation à tous ceux qui veulent investir dans l'immobilier." },
];

const EQUIPE_SECOURS: Membre[] = [
  { nom: 'Directeur Général', fonction: 'Fondateur & PDG', initiales: 'DG', photo: null },
  { nom: 'Responsable Commercial', fonction: 'Équipe commerciale', initiales: 'RC', photo: null },
  { nom: 'Chef de Projet', fonction: 'Équipe terrain', initiales: 'CP', photo: null },
];

export function useTestimonials(): { items: Temoignage[]; loading: boolean } {
  const { items, loading } = usePublished<TestimonialRow | Temoignage>('testimonials', TEMOIGNAGES_SECOURS);
  return {
    items: items.map(t => ({ nom: t.nom, ville: t.ville, citation: t.citation, note: t.note })),
    loading,
  };
}

/** Initiales calculées quand elles ne sont pas saisies (ex. « Awa Traoré » → « AT »). */
function initialesDe(nom: string): string {
  return nom
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(m => m[0]?.toUpperCase() ?? '')
    .join('');
}

export function useTeam(): { items: Membre[]; loading: boolean } {
  const { items, loading } = usePublished<TeamMemberRow | Membre>('team_members', EQUIPE_SECOURS);
  return {
    items: items.map(m => ({
      nom: m.nom,
      fonction: m.fonction,
      photo: m.photo ?? null,
      initiales: ('initiales' in m && m.initiales) || initialesDe(m.nom),
    })),
    loading,
  };
}
