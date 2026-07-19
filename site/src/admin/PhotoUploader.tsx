import { useRef, useState } from 'react';
import { Upload, X, Loader2, GripVertical, AlertCircle } from 'lucide-react';
import { supabase, mediaUrl } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

const MAX_MB = 8;

interface PhotoUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  /** Dossier dans le bucket, ex. "biens". */
  folder?: string;
  /** Limiter à une seule image (actualités, portraits d'équipe). */
  single?: boolean;
}

export default function PhotoUploader({ photos, onChange, folder = 'biens', single = false }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        setError('Seules les images sont acceptées.');
        continue;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`« ${file.name} » dépasse ${MAX_MB} Mo. Réduisez la photo puis réessayez.`);
        continue;
      }
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('medias').upload(path, file, {
        cacheControl: '31536000',
        upsert: false,
      });
      if (upErr) {
        setError("L'envoi a échoué. Vérifiez votre connexion et réessayez.");
        continue;
      }
      uploaded.push(mediaUrl(path));
    }

    setUploading(false);
    if (uploaded.length) onChange(single ? uploaded.slice(0, 1) : [...photos, ...uploaded]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const remove = (index: number) => onChange(photos.filter((_, i) => i !== index));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= photos.length) return;
    const next = [...photos];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {photos.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((src, i) => (
            <li key={src + i} className="group relative overflow-hidden rounded-xl border border-border bg-muted">
              <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />

              {i === 0 && !single && (
                <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                  Principale
                </span>
              )}

              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`Retirer la photo ${i + 1}`}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-error"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              {!single && photos.length > 1 && (
                <div className="absolute inset-x-2 bottom-2 flex justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label={`Déplacer la photo ${i + 1} vers la gauche`}
                    className="rounded bg-black/60 px-2 py-1 text-xs text-white disabled:opacity-30"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === photos.length - 1}
                    aria-label={`Déplacer la photo ${i + 1} vers la droite`}
                    className="rounded bg-black/60 px-2 py-1 text-xs text-white disabled:opacity-30"
                  >
                    →
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={!single}
        className="sr-only"
        onChange={e => handleFiles(e.target.files)}
      />

      <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading}>
        {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
        {single ? (photos.length ? "Remplacer l'image" : 'Ajouter une image') : 'Ajouter des photos'}
      </Button>

      {!single && photos.length > 1 && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <GripVertical className="h-3.5 w-3.5" />
          La première photo sert de vignette sur le site.
        </p>
      )}

      {error && (
        <p role="alert" className="flex items-start gap-2 text-sm text-error">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          {error}
        </p>
      )}
    </div>
  );
}
