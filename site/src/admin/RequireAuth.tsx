import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { ADMIN_LOGIN } from './adminPath';

/** Bloque l'accès aux routes admin tant que l'utilisateur n'est pas connecté.
 *  Note : la vraie protection des données est assurée par les règles RLS côté
 *  Supabase — ce garde-fou n'est qu'un confort d'interface. */
export default function RequireAuth() {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="sr-only">Chargement…</span>
      </div>
    );
  }

  if (!session) {
    return <Navigate to={ADMIN_LOGIN} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
