import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** Le site doit rester consultable même si le CMS n'est pas encore configuré :
 *  dans ce cas on retombe sur les biens intégrés au code (voir data/properties.ts). */
export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.info(
    '[CMS] Supabase non configuré — le site utilise les données de secours. ' +
      'Renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local'
  );
}

export const supabase = createClient(
  url ?? 'https://placeholder.supabase.co',
  anonKey ?? 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

/** URL publique d'un fichier du bucket `medias`. */
export function mediaUrl(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('/')) return path;
  return supabase.storage.from('medias').getPublicUrl(path).data.publicUrl;
}
