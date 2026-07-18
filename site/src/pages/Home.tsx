import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Search, ShieldCheck, CreditCard, Factory, Users, GraduationCap, Star, ArrowRight, CheckCircle2, Landmark, MapPin, ArrowUpRight } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import Seo from '@/components/Seo';
import { properties, villes } from '@/data/properties';
import { motion } from 'framer-motion';

const HERO_IMG = '/images/hero-terrain.webp';
const BRICKS_IMG = '/images/briques.webp';

export default function Home() {
  return (
    <>
      <Seo title="Ivoire Challenge Corporation (2C) — De locataire à propriétaire, sans se ruiner" />
      <HeroSection />
      <SearchBar />
      <FeaturedProperties />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col">
      <img src={HERO_IMG} width={1632} height={912} fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" alt="Terrain en Côte d'Ivoire" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      <div className="relative flex-1 flex flex-col justify-end px-4 md:px-12 pb-0 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pb-12 md:pb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">Agence & promoteur immobilier agréés</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
            De locataire à<br />
            propriétaire, <span className="text-accent">sans se ruiner.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
            Terrains sécurisés, briques à crédit, accompagnement complet — à chaque étape de votre projet immobilier en Côte d'Ivoire.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 text-sm uppercase tracking-wider font-semibold">
              <Link to="/biens"><ArrowUpRight className="mr-2 h-4 w-4" /> Voir nos biens</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white rounded-full px-8 text-sm uppercase tracking-wider">
              <a href="https://wa.me/2250704085000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Parler à un conseiller
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Stats bar at bottom */}
      <div className="relative bg-primary/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: 500, suffix: '+', label: 'Terrains vendus' },
              { value: 98, suffix: '%', label: 'Clients satisfaits' },
              { value: 8000, suffix: '', label: 'Briques produites / jour' },
              { value: 12, suffix: ' mois', label: 'Paiement échelonné' },
            ].map((stat, i) => (
              <div key={i} className="py-6 md:py-8 px-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[11px] uppercase tracking-wider text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchBar() {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [ville, setVille] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (ville) params.set('ville', ville);
    if (budget) params.set('budget', budget);
    navigate(`/biens?${params.toString()}`);
  };

  return (
    <section className="container mx-auto px-4 lg:px-8 -mt-1 relative z-10 mb-20">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">Trouvez votre bien en quelques clics</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Type de bien" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Terrain">Terrain</SelectItem>
              <SelectItem value="Maison">Maison</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ville} onValueChange={setVille}>
            <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Ville" /></SelectTrigger>
            <SelectContent>
              {villes.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input type="number" placeholder="Budget max (FCFA)" value={budget} onChange={e => setBudget(e.target.value)} className="h-12 rounded-xl" />
          <Button onClick={handleSearch} className="h-12 rounded-xl bg-primary text-primary-foreground"><Search className="mr-2 h-4 w-4" /> Rechercher</Button>
        </div>
      </div>
    </section>
  );
}

function FeaturedProperties() {
  const featured = properties.filter(p => p.aLaUne).slice(0, 3);
  return (
    <section className="container mx-auto px-4 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Nos opportunités</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Une sélection de biens <span className="text-primary">vérifiés</span>
          </h2>
        </div>
        <Button asChild variant="outline" className="rounded-full w-fit">
          <Link to="/biens">Voir tous nos biens <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map(p => <PropertyCard key={p.id} property={p} />)}
      </div>
    </section>
  );
}

const services = [
  { icon: Landmark, title: 'Vente de terrains', desc: 'Des terrains sécurisés, avec documentation légale complète, à Abidjan et dans le Grand Abidjan.' },
  { icon: Factory, title: 'Briques à crédit', desc: "Construisez maintenant, payez progressivement. Fabrication industrielle locale, jusqu'à 8 000 briques produites par jour." },
  { icon: Users, title: 'Accompagnement construction', desc: "De l'achat du terrain à la livraison des matériaux, une équipe vous suit à chaque étape." },
  { icon: GraduationCap, title: 'Conseil & masterclass', desc: "Des formations pour apprendre à construire sa maison en Côte d'Ivoire sans se ruiner." },
];

function ServicesSection() {
  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Nos services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground leading-tight max-w-2xl">
            Un accompagnement à <span className="text-accent">chaque étape</span>
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(s => (
            <div key={s.title} className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:bg-white/10 hover:border-accent/30">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20">
                <s.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-semibold text-primary-foreground mb-3 text-lg">{s.title}</h3>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  { icon: ShieldCheck, text: 'Agence et promoteur immobilier agréés — un cadre légal sécurisé' },
  { icon: CheckCircle2, text: 'Terrains approuvés et documentés — aucune surprise sur la légalité' },
  { icon: CreditCard, text: 'Paiement progressif — 1/3 au départ, le reste sur 12 mois' },
  { icon: Factory, text: 'Production industrielle locale — 8 000 briques/jour, sans rupture' },
  { icon: Users, text: 'Accompagnement personnalisé — du premier contact à la remise des clés' },
];

function WhyUsSection() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-20 md:py-28">
      <div className="grid gap-16 lg:grid-cols-2 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Pourquoi nous</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
            Pourquoi choisir <span className="text-primary">Ivoire Challenge Corporation</span>
          </h2>
          <ul className="space-y-5">
            {reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <r.icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed pt-2">{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img src={BRICKS_IMG} alt="Briques industrielles" width={1152} height={896} loading="lazy" className="w-full h-full object-cover aspect-[4/3]" />
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { nom: 'Kouamé A.', ville: 'Abidjan', citation: "Grâce à 2C, j'ai acheté mon terrain à Azaguié en toute sérénité. La documentation était complète et l'accompagnement irréprochable." },
  { nom: 'Fatou D.', ville: 'Bingerville', citation: "Le programme briques à crédit m'a permis de commencer ma construction sans attendre d'avoir tout le budget. Merci à l'équipe !" },
  { nom: 'Jean-Marc K.', ville: 'Cocody', citation: "Professionnels, transparents et toujours disponibles. Je recommande Ivoire Challenge Corporation à tous ceux qui veulent investir dans l'immobilier." },
];

function TestimonialsSection() {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Témoignages</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ils ont construit <span className="text-primary">avec nous</span></h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-8 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.citation}"</p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t.nom.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.nom}</p>
                  <p className="text-xs text-muted-foreground">{t.ville}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 50%)' }} />
      <div className="relative container mx-auto px-4 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">Prêt à vous lancer ?</p>
        <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground max-w-3xl mx-auto leading-tight">
          Démarrez votre projet immobilier en toute <span className="text-accent">confiance</span>
        </h2>
        <p className="mt-6 text-primary-foreground/80 max-w-xl mx-auto">
          Nos conseillers sont disponibles pour étudier votre projet et vous proposer la meilleure solution.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 uppercase tracking-wider text-sm font-semibold">
            <Link to="/contact">Contactez-nous maintenant</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground rounded-full px-8 uppercase tracking-wider text-sm">
            <a href="https://wa.me/2250704085000" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
