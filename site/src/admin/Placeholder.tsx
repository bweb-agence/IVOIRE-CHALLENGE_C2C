import { Hammer } from 'lucide-react';
import PageHeader from './PageHeader';

/** Sections dont l'interface sera construite une fois la base en service. */
export default function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <PageHeader title={title} />
      <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
        <Hammer className="mx-auto mb-4 h-9 w-9 text-muted-foreground" />
        <p className="font-medium text-foreground">Section en cours de construction</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
