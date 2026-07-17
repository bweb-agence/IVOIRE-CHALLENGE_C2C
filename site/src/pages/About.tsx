import { ShieldCheck, Eye, Wallet, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://images.fillout.com/772872/qtlj8gyrrh/generated-images/vpHs7Tzoq6pkSKxTgu8cvr/img_HNefGSjDSpAFbKlF.jpg';

const values = [
  { icon: Eye, title: 'Transparence', desc: 'Des conditions claires, sans frais cachés.' },
  { icon: ShieldCheck, title: 'Sécurité', desc: 'Des terrains vérifiés et une documentation légale complète.' },
  { icon: Wallet, title: 'Accessibilité', desc: 'Des solutions de paiement adaptées à chaque budget.' },
  { icon: Heart, title: 'Proximité', desc: 'Un accompagnement humain, du premier contact à la livraison.' },
];

const team = [
  { nom: 'Directeur Général', fonction: 'Fondateur & PDG', initials: 'DG' },
  { nom: 'Responsable Commercial', fonction: 'Équipe commerciale', initials: 'RC' },
  { nom: 'Chef de Projet', fonction: 'Équipe terrain', initials: 'CP' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={HERO_IMG} className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-12 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">À propos</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Qui sommes-nous</h1>
        </div>
      </section>

      {/* Presentation */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
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
          <div className="grid grid-cols-2 gap-4">
            {values.map(v => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 text-accent text-2xl font-bold">
                  {m.initials}
                </div>
                <h3 className="font-semibold text-primary-foreground">{m.nom}</h3>
                <p className="text-sm text-primary-foreground/60 mt-1">{m.fonction}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
