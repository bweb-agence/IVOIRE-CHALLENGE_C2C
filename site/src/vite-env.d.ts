/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Chemin de l'espace admin (sans l'URL réelle dans le dépôt public). Défaut : /admin. */
  readonly VITE_ADMIN_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
