import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';

const LOGO = '/images/logo.png';

export default function Login() {
  const { session, loading, signIn } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;
  if (session) {
    const from = (location.state as { from?: string } | null)?.from ?? '/admin';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (error) setError(error);
  };

  return (
    <div className="min-h-dvh bg-muted/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <img src={LOGO} alt="Ivoire Challenge Corporation" width={176} height={165} className="mx-auto h-14 w-auto" />
          <h1 className="mt-5 text-xl font-bold text-foreground">Espace administration</h1>
          <p className="mt-1 text-sm text-muted-foreground">Réservé à l'équipe Ivoire Challenge Corporation.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          {!isSupabaseConfigured && (
            <p className="flex items-start gap-2 rounded-lg bg-warning-bg p-3 text-xs text-warning">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              Le CMS n'est pas encore configuré (variables Supabase manquantes). La connexion échouera.
            </p>
          )}

          <div>
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="vous@ivoire2c.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p role="alert" className="flex items-start gap-2 rounded-lg bg-error-bg p-3 text-sm text-error">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
            Se connecter
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Les comptes sont créés par un administrateur — il n'y a pas d'inscription libre.
          </p>
        </form>
      </div>
    </div>
  );
}
