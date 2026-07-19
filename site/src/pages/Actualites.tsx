import { Link } from 'react-router-dom';
import { Loader2, Megaphone, ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import { useAnnouncements, dateLongue } from '@/lib/useAnnouncements';
import { Button } from '@/components/ui/button';

export default function Actualites() {
  const { items, loading } = useAnnouncements();

  return (
    <div>
      <Seo
        title="Actualités — nouveaux lotissements et promotions"
        description="Les annonces d'Ivoire Challenge Corporation (2C) : nouveaux lotissements, promotions en cours et actualités de l'agence en Côte d'Ivoire."
      />

      <section className="bg-primary pt-32 pb-14">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Actualités</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Nos dernières annonces</h1>
          <p className="mt-3 max-w-lg text-primary-foreground/80">
            Nouveaux lotissements, promotions et informations de l'agence.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="sr-only">Chargement des actualités…</span>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <Megaphone className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
            <p className="font-medium text-foreground">Aucune actualité pour le moment.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Revenez bientôt, ou consultez nos biens disponibles.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <Link to="/biens">Voir nos biens</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(a => (
              <Link key={a.id} to={`/actualites/${a.slug}`} className="group block">
                <article className="h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {a.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={a.image}
                        alt=""
                        width={1152}
                        height={720}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {dateLongue(a.date_publication)}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-foreground">{a.titre}</h2>
                    {a.extrait && <p className="mt-2 text-sm text-muted-foreground">{a.extrait}</p>}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Lire la suite <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
