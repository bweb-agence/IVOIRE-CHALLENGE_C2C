import { ShieldCheck, Eye, Wallet, Heart, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Seo from '@/components/Seo';
import { useTeam } from '@/lib/useContent';

const HERO_IMG = '/images/briques.webp';
const RITA_IMG = '/images/rita-djedje.jpg';

const bio =
  "Rita Bénédicte Djédjé est une entrepreneure ivoirienne reconnue pour son dynamisme, son sens du leadership et son engagement social. Présidente-directrice générale de Ivoire Challenge Corporation (I2C), elle s'impose dans le secteur immobilier avec une vision fondée sur l'excellence, la proximité et l'impact durable. Femme de caractère et de conviction, elle est également appréciée pour sa générosité, son franc-parler et son attachement aux valeurs humaines. À travers son parcours, Rita Djédjé incarne une nouvelle génération de femmes entrepreneures qui allient performance professionnelle et responsabilité sociale.";

const values = [
  { icon: Eye, title: 'Transparence', desc: 'Des conditions claires, sans frais cachés.' },
  { icon: ShieldCheck, title: 'Sécurité', desc: 'Des terrains vérifiés et une documentation légale complète.' },
  { icon: Wallet, title: 'Accessibilité', desc: 'Des solutions de paiement adaptées à chaque budget.' },
  { icon: Heart, title: 'Proximité', desc: 'Un accompagnement humain, du premier contact à la livraison.' },
];

export default function About() {
  const { items: team } = useTeam();

  return (
    <div>
      <Seo
        title="Qui sommes-nous — agence & promoteur immobilier agréés"
        description="Ivoire Challenge Corporation (2C), agence immobilière et promoteur agréés, accompagne les Ivoiriens dans l'achat de terrain, la construction et le financement des matériaux."
      />
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={HERO_IMG} width={1152} height={896} className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-12 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">À propos</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Qui sommes-nous</h1>
        </div>
      </section>

      <BioSection />

      {/* Presentation */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Notre mission</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            Rendre la propriété <span className="text-primary">accessible</span> à tous
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ivoire Challenge Corporation (2C) accompagne les Ivoiriens dans la réalisation de leur projet immobilier : achat de terrain, construction, financement des matériaux.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En tant qu'agence immobilière agréée et promoteur immobilier agréé, nous garantissons à nos clients des biens sécurisés et une documentation légale conforme.
          </p>
          <Button asChild className="mt-8 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 uppercase tracking-wider text-sm font-semibold">
            <Link to="/contact">Discutons de votre projet <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <CaracteristiquesSection />

      {/* Team */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Notre équipe</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">Une équipe à <span className="text-accent">votre écoute</span></h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {team.map(m => (
              <div key={m.nom} className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center hover:bg-white/10 transition-colors">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-accent/20 text-accent text-2xl font-bold">
                  {m.photo ? (
                    <img src={m.photo} alt="" width={160} height={160} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    m.initiales
                  )}
                </div>
                <h3 className="font-semibold text-primary-foreground">{m.nom}</h3>
                <p className="text-sm text-primary-foreground/75 mt-1">{m.fonction}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BioSection() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-20 md:py-28">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="relative z-0 rounded-3xl bg-primary p-10 md:p-14 lg:pr-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">La fondatrice</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground leading-tight mb-6">
            Rita Bénédicte <span className="text-accent">Djédjé</span>
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed mb-8">{bio}</p>
          <div className="flex flex-wrap items-center gap-6">
            <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 uppercase tracking-wider text-sm font-semibold">
              <Link to="/contact">Discutons de votre projet</Link>
            </Button>
            <a
              href="https://wa.me/2250704085000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/80 hover:text-accent transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Parler à un conseiller
            </a>
          </div>
        </div>
        <div className="relative z-10 w-full lg:w-[380px] mt-8 lg:mt-0 lg:-ml-20 flex-shrink-0">
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
            <img
              src={RITA_IMG}
              alt="Rita Bénédicte Djédjé, Présidente-Directrice Générale d'Ivoire Challenge Corporation"
              width={760}
              height={1013}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CaracteristiquesSection() {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Nos engagements</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Ce qui nous <span className="text-primary">caractérise</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Quatre principes qui guident chacun de nos projets, de l'achat du terrain à la remise des clés.
            </p>
            <Button asChild variant="outline" className="rounded-full w-fit">
              <Link to="/contact">Discutons de votre projet <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={cn(
                  'rounded-2xl p-6 transition-shadow hover:shadow-lg',
                  i === 0 ? 'bg-primary' : 'border border-border bg-card',
                )}
              >
                <div
                  className={cn(
                    'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
                    i === 0 ? 'bg-white/15' : 'bg-primary/10',
                  )}
                >
                  <v.icon className={cn('h-6 w-6', i === 0 ? 'text-accent' : 'text-primary')} />
                </div>
                <h3 className={cn('font-semibold mb-1', i === 0 ? 'text-primary-foreground' : 'text-foreground')}>{v.title}</h3>
                <p className={cn('text-sm leading-relaxed', i === 0 ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
