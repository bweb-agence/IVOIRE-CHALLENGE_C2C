import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, MessageCircle } from 'lucide-react';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { useAnnouncements, dateLongue } from '@/lib/useAnnouncements';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

export default function ActualiteDetail() {
  const { slug } = useParams();
  const { items, loading } = useAnnouncements();
  const actu = items.find(a => a.slug === slug);

  if (loading) {
    return (
      <div className="pt-32 flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="sr-only">Chargement…</span>
      </div>
    );
  }

  if (!actu) {
    return (
      <div className="pt-32 container mx-auto px-4 py-16 text-center">
        <Seo title="Actualité introuvable" />
        <h1 className="mb-4 text-2xl font-bold text-foreground">Cette actualité n'existe pas</h1>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/actualites">
            <ArrowLeft className="mr-2 h-4 w-4" /> Toutes les actualités
          </Link>
        </Button>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: actu.titre,
    description: actu.extrait,
    datePublished: actu.date_publication,
    dateModified: actu.updated_at,
    image: actu.image ? [actu.image] : undefined,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };

  return (
    <div>
      <Seo
        title={actu.titre}
        description={actu.extrait || actu.contenu.slice(0, 160)}
        image={actu.image ?? undefined}
        type="article"
        jsonLd={jsonLd}
      />

      <section className="bg-primary pt-32 pb-14">
        <div className="container mx-auto px-4 lg:px-8">
          <Button asChild variant="ghost" size="sm" className="-ml-2 mb-4 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground">
            <Link to="/actualites">
              <ArrowLeft className="mr-2 h-4 w-4" /> Toutes les actualités
            </Link>
          </Button>
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
            {dateLongue(actu.date_publication)}
          </p>
          <h1 className="max-w-3xl text-3xl md:text-4xl font-bold text-primary-foreground">{actu.titre}</h1>
        </div>
      </section>

      <article className="container mx-auto px-4 lg:px-8 py-14">
        <div className="mx-auto max-w-prose">
          {actu.image && (
            <img
              src={actu.image}
              alt=""
              width={1152}
              height={720}
              className="mb-10 w-full rounded-2xl object-cover"
            />
          )}

          {actu.extrait && <p className="mb-6 text-lg leading-relaxed text-foreground">{actu.extrait}</p>}

          {actu.contenu && (
            <div className="whitespace-pre-line text-[15px] leading-relaxed text-muted-foreground">{actu.contenu}</div>
          )}

          <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-center">
            <p className="font-semibold text-foreground">Cette annonce vous intéresse ?</p>
            <p className="mt-1 text-sm text-muted-foreground">Nos conseillers répondent à vos questions.</p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a]">
                <a href="https://wa.me/2250704085000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Nous écrire sur WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
