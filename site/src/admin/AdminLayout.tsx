import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Building2, Megaphone, Quote, Users, Inbox, LogOut, Menu, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from './AuthContext';
import { ADMIN_BASE } from './adminPath';

const LOGO = '/images/logo.png';

const navItems = [
  { to: ADMIN_BASE, end: true, label: 'Biens', icon: Building2 },
  { to: `${ADMIN_BASE}/actualites`, label: 'Actualités', icon: Megaphone },
  { to: `${ADMIN_BASE}/temoignages`, label: 'Témoignages', icon: Quote },
  { to: `${ADMIN_BASE}/equipe`, label: 'Équipe', icon: Users },
  { to: `${ADMIN_BASE}/demandes`, label: 'Demandes', icon: Inbox },
];

export default function AdminLayout() {
  const { session, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`
          }
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-dvh bg-muted/30">
      {/* Barre supérieure mobile */}
      <header className="lg:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4">
        <Link to={ADMIN_BASE} className="flex items-center gap-2">
          <img src={LOGO} alt="" width={176} height={165} className="h-8 w-auto" />
          <span className="text-sm font-semibold">Administration</span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          className="p-2"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {menuOpen && (
        <div className="lg:hidden border-b border-border bg-background p-4">
          {nav}
          <UserBlock email={session?.user.email} onSignOut={signOut} className="mt-4 border-t border-border pt-4" />
        </div>
      )}

      <div className="flex">
        {/* Barre latérale desktop */}
        <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-border bg-background p-5">
          <Link to={ADMIN_BASE} className="flex items-center gap-3 px-1">
            <img src={LOGO} alt="Ivoire Challenge Corporation" width={176} height={165} className="h-10 w-auto" />
            <span className="text-sm font-bold leading-tight">
              Administration
              <span className="block text-xs font-normal text-muted-foreground">Ivoire Challenge 2C</span>
            </span>
          </Link>

          <div className="mt-8 flex-1">{nav}</div>

          <UserBlock email={session?.user.email} onSignOut={signOut} className="border-t border-border pt-4" />
        </aside>

        <main className="flex-1 lg:pl-64">
          <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8 lg:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function UserBlock({
  email,
  onSignOut,
  className = '',
}: {
  email?: string;
  onSignOut: () => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="px-1 text-xs text-muted-foreground">Connecté en tant que</p>
      <p className="px-1 text-sm font-medium text-foreground break-all">{email}</p>
      <div className="mt-3 flex flex-col gap-2">
        <Button asChild variant="outline" size="sm" className="justify-start">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Voir le site
          </a>
        </Button>
        <Button variant="ghost" size="sm" onClick={onSignOut} className="justify-start text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" /> Se déconnecter
        </Button>
      </div>
    </div>
  );
}
