import { useRef, useState } from 'react';
import { Upload, X, Loader2, AlertCircle, Link2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase, mediaUrl } from '@/lib/supabase';
import { analyserVideo, videoValide, LIBELLES_SOURCE } from '@/lib/video';
import { formatTaille } from '@/lib/compressImage';
import VideoPlayer from '@/components/VideoPlayer';

/** Au-delà, mieux vaut publier la vidéo sur YouTube/Facebook et coller le lien :
 *  un gros fichier servi tel quel pénalise les visiteurs en données mobiles. */
const MAX_MB = 50;

interface VideoInputProps {
  videos: string[];
  onChange: (videos: string[]) => void;
  folder?: string;
  /** Limiter à une seule vidéo (témoignages). */
  single?: boolean;
}

export default function VideoInput({ videos, onChange, folder = 'videos', single = false }: VideoInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [lien, setLien] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progression, setProgression] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ajouter = (url: string) => onChange(single ? [url] : [...videos, url]);

  const ajouterLien = () => {
    const url = lien.trim();
    if (!url) return;
    if (!videoValide(url)) {
      setError("Lien non reconnu. Collez une adresse YouTube, Vimeo ou Facebook, ou un lien direct vers un fichier .mp4.");
      return;
    }
    setError(null);
    ajouter(url);
    setLien('');
  };

  const televerser = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setError(null);

    if (!file.type.startsWith('video/')) {
      setError('Ce fichier n’est pas une vidéo.');
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(
        `Cette vidéo pèse ${formatTaille(file.size)}, au-delà de la limite de ${MAX_MB} Mo. ` +
          `Publiez-la sur YouTube ou Facebook et collez le lien : la lecture sera aussi plus fluide pour vos visiteurs.`
      );
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    setUploading(true);
    setProgression(`Envoi de ${formatTaille(file.size)}…`);

    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'mp4';
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('medias').upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
      contentType: file.type,
    });

    setUploading(false);
    setProgression(null);
    if (inputRef.current) inputRef.current.value = '';

    if (upErr) {
      setError("L'envoi a échoué. Vérifiez votre connexion et réessayez.");
      return;
    }
    ajouter(mediaUrl(path));
  };

  const retirer = (i: number) => onChange(videos.filter((_, index) => index !== i));

  return (
    <div className="space-y-4">
      {videos.length > 0 && (
        <ul className="space-y-3">
          {videos.map((url, i) => (
            <li key={url + i} className="rounded-xl border border-border bg-muted/40 p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  {LIBELLES_SOURCE[analyserVideo(url).type]}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => retirer(i)}
                  aria-label={`Retirer la vidéo ${i + 1}`}
                  className="text-muted-foreground hover:text-error"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <VideoPlayer url={url} titre={`Vidéo ${i + 1}`} />
              <p className="mt-2 truncate text-xs text-muted-foreground">{url}</p>
            </li>
          ))}
        </ul>
      )}

      {(!single || videos.length === 0) && (
        <>
          {/* Voie recommandée : le lien */}
          <div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={lien}
                  onChange={e => setLien(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      ajouterLien();
                    }
                  }}
                  placeholder="Coller un lien YouTube, Facebook ou Vimeo"
                  aria-label="Lien de la vidéo"
                  className="pl-9"
                />
              </div>
              <Button type="button" variant="outline" onClick={ajouterLien} disabled={!lien.trim()}>
                Ajouter
              </Button>
            </div>
            <p className="mt-1.5 flex items-start gap-1.5 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              Recommandé : la plateforme adapte la qualité au réseau du visiteur, sans consommer votre stockage.
            </p>
          </div>

          {/* Voie secondaire : le fichier */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">ou</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div>
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              className="sr-only"
              onChange={e => televerser(e.target.files)}
            />
            <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Téléverser une vidéo courte
            </Button>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Jusqu'à {MAX_MB} Mo — adapté aux vidéos reçues par WhatsApp, déjà compressées.
            </p>
            {progression && <p className="mt-1 text-xs text-muted-foreground">{progression}</p>}
          </div>
        </>
      )}

      {error && (
        <p role="alert" className="flex items-start gap-2 text-sm text-error">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
