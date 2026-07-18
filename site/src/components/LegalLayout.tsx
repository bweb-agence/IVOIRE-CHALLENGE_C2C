import type { ReactNode } from 'react';

/** Gabarit commun aux pages légales : hero sobre + contenu en colonne lisible. */
export default function LegalLayout({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div>
      <section className="bg-primary pt-32 pb-14">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">{eyebrow}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">{title}</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-prose mx-auto space-y-8 text-[15px] leading-relaxed text-muted-foreground">
          {children}
        </div>
      </section>
    </div>
  );
}

/** Titre de section légale. */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
}

/** Marqueur visible pour les informations que l'entreprise doit fournir. */
export function ToFill({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-warning-bg px-1.5 py-0.5 font-medium text-warning">
      [À compléter : {children}]
    </mark>
  );
}
