import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import Seo from '@/components/Seo';

export default function NotFound() {
  return (
    <section className="bg-primary min-h-[70vh] flex items-center">
      <Seo title="Page introuvable (404)" />
      <div className="container mx-auto px-4 lg:px-8 py-32 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">Erreur 404</p>
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
          Cette page n'existe pas
        </h1>
        <p className="mt-6 text-primary-foreground/80 max-w-md mx-auto">
          L'adresse est peut-être erronée, ou la page a été déplacée. Retrouvez nos biens disponibles ou revenez à l'accueil.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 uppercase tracking-wider text-sm font-semibold">
            <Link to="/biens"><Search className="mr-2 h-4 w-4" /> Voir nos biens</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground rounded-full px-8 uppercase tracking-wider text-sm">
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
