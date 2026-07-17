import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LOGO_URL = 'https://images.fillout.com/orgid-772872/flowpublicid-account/widgetid-branding-kit-wizard-logo/wzdRwGMZi7cDioy1wJAgd3/Capture-daeIcran-2026-07-17-aI-14.18.52.png';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Nos Biens', to: '/biens' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex-shrink-0">
          <img src={LOGO_URL} alt="Ivoire Challenge Corporation" className="h-10" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                location.pathname === l.to
                  ? scrolled ? 'text-primary' : 'text-white'
                  : scrolled ? 'text-muted-foreground' : 'text-white/70'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+2250704085000" className={`flex items-center gap-2 text-sm font-medium transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
            <Phone className="h-4 w-4" />
            07 04 08 50 00
          </a>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6">
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className={`h-6 w-6 ${scrolled ? 'text-foreground' : 'text-white'}`} /> : <Menu className={`h-6 w-6 ${scrolled ? 'text-foreground' : 'text-white'}`} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="lg:hidden bg-background border-t border-border px-4 pb-6 pt-2">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-semibold uppercase tracking-wider ${location.pathname === l.to ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" className="mt-3 w-full bg-accent text-accent-foreground rounded-full">
            <Link to="/contact" onClick={() => setOpen(false)}>Nous contacter</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
