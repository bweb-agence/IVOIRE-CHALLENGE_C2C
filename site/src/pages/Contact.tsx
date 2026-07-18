import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Seo from '@/components/Seo';
import MapEmbed from '@/components/MapEmbed';

const HERO_IMG = '/images/hero-terrain.webp';

export default function Contact() {
  return (
    <div>
      <Seo
        title="Contact — parlons de votre projet immobilier"
        description="Contactez Ivoire Challenge Corporation (2C) à Abidjan : téléphone, WhatsApp au 07 04 08 50 00, email infos@ivoire2c.com. Ouvert du lundi au samedi."
      />
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={HERO_IMG} width={1632} height={912} className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-12 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Parlons de votre projet</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Info */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-6">Coordonnées</h2>
              <div className="space-y-5">
                <ContactItem icon={Phone} label="Téléphone" value="07 04 08 50 00" href="tel:+2250704085000" />
                <ContactItem icon={MessageCircle} label="WhatsApp" value="07 04 08 50 00" href="https://wa.me/2250704085000" external />
                <ContactItem icon={Mail} label="Email" value="infos@ivoire2c.com" href="mailto:infos@ivoire2c.com" />
                <ContactItem icon={MapPin} label="Adresse" value="Abidjan, Côte d'Ivoire" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-6 flex items-center gap-2">
                <Clock className="h-4 w-4" /> Horaires d'ouverture
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Lundi – Vendredi</span><span className="font-medium text-foreground">08h00 – 18h00</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Samedi</span><span className="font-medium text-foreground">09h00 – 14h00</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Dimanche</span><span className="text-muted-foreground">Fermé</span></div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <MapEmbed query="Abidjan, Côte d'Ivoire" className="h-64" />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-2">Envoyez-nous un message</h2>
            <p className="text-sm text-muted-foreground mb-6">Notre équipe vous répondra dans les plus brefs délais.</p>
            <ContactForm showTypeProjet showEmail />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value, href, external }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; external?: boolean }) {
  const content = (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="block hover:opacity-80 transition-opacity">{content}</a>;
  }
  return <div>{content}</div>;
}
