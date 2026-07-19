import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { AnnouncementRow } from '@/lib/database.types';

/** Actualités publiées dont la date est atteinte. Liste vide tant que rien
 *  n'est publié — la rubrique disparaît alors du site, plutôt que d'afficher
 *  une page vide. */
export function useAnnouncements(): { items: AnnouncementRow[]; loading: boolean } {
  const [items, setItems] = useState<AnnouncementRow[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let annule = false;

    supabase
      .from('announcements')
      .select('*')
      .eq('publie', true)
      .lte('date_publication', new Date().toISOString())
      .order('date_publication', { ascending: false })
      .then(({ data, error }) => {
        if (annule) return;
        setLoading(false);
        setItems(error || !data ? [] : (data as AnnouncementRow[]));
      });

    return () => {
      annule = true;
    };
  }, []);

  return { items, loading };
}

export const dateLongue = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
