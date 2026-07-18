import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const LOGO_BLANC = '/images/logo-blanc.png';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Big brand watermark */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="text-[12rem] md:text-[20rem] font-black tracking-tighter whitespace-nowrap">2C</span>
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1 */}
            <div>
              <img src={LOGO_BLANC} alt="Ivoire Challenge Corporation" width={176} height={165} loading="lazy" className="h-12 w-auto mb-5" />
              <p className="text-sm text-primary-foreground/75 leading-relaxed">
                Ivoire Challenge Corporation — De locataire à propriétaire, sans se ruiner.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-5">Navigation</h4>
              <nav className="flex flex-col gap-3">
                <Link to="/" className="text-sm text-primary-foreground/75 hover:text-accent transition-colors">Accueil</Link>
                <Link to="/biens" className="text-sm text-primary-foreground/75 hover:text-accent transition-colors">Nos Biens</Link>
                <Link to="/a-propos" className="text-sm text-primary-foreground/75 hover:text-accent transition-colors">À propos</Link>
                <Link to="/contact" className="text-sm text-primary-foreground/75 hover:text-accent transition-colors">Contact</Link>
              </nav>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-5">Coordonnées</h4>
              <div className="flex flex-col gap-3">
                <a href="tel:+2250704085000" className="flex items-center gap-3 text-sm text-primary-foreground/75 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0" /> 07 04 08 50 00
                </a>
                <a href="https://wa.me/2250704085000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-primary-foreground/75 hover:text-accent transition-colors">
                  <MessageCircle className="h-4 w-4 flex-shrink-0" /> WhatsApp
                </a>
                <a href="mailto:infos@ivoire2c.com" className="flex items-center gap-3 text-sm text-primary-foreground/75 hover:text-accent transition-colors">
                  <Mail className="h-4 w-4 flex-shrink-0" /> infos@ivoire2c.com
                </a>
                <span className="flex items-center gap-3 text-sm text-primary-foreground/75">
                  <MapPin className="h-4 w-4 flex-shrink-0" /> Abidjan, Côte d'Ivoire
                </span>
              </div>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-5">Réseaux sociaux</h4>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-primary-foreground/75 hover:text-accent transition-colors">Facebook</a>
                <a href="#" className="text-sm text-primary-foreground/75 hover:text-accent transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/70">© {new Date().getFullYear()} Ivoire Challenge Corporation. Tous droits réservés.</p>
          <div className="flex gap-6 text-xs text-primary-foreground/60">
            <Link to="/mentions-legales" className="hover:text-accent transition-colors">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-accent transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
