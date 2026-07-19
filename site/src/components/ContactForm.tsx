import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { MessageCircle, Mail, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const AGENCE_EMAIL = 'infos@ivoire2c.com';
const AGENCE_WHATSAPP = '2250704085000';

interface ContactFormProps {
  defaultMessage?: string;
  showTypeProjet?: boolean;
  showEmail?: boolean;
  /** Bien concerné, pour rattacher la demande dans l'administration. */
  propertySlug?: string;
}

export default function ContactForm({ defaultMessage = '', showTypeProjet = false, showEmail = false, propertySlug }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: '',
    telephone: '',
    email: '',
    typeProjet: '',
    message: defaultMessage,
  });

  // Champs obligatoires communs aux deux canaux.
  const isValid = () => {
    if (!form.nom.trim() || !form.telephone.trim()) {
      toast.error('Veuillez renseigner au moins votre nom et votre téléphone.');
      return false;
    }
    return true;
  };

  // Corps du message partagé par WhatsApp et l'email.
  const buildBody = () =>
    [
      'Bonjour, je vous contacte depuis le site Ivoire Challenge Corporation.',
      `Nom : ${form.nom.trim()}`,
      `Téléphone : ${form.telephone.trim()}`,
      form.email.trim() && `Email : ${form.email.trim()}`,
      form.typeProjet && `Type de projet : ${form.typeProjet}`,
      form.message.trim() && `Message : ${form.message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');

  const resetForm = () => setForm({ nom: '', telephone: '', email: '', typeProjet: '', message: '' });

  /** Conserve une trace de la demande côté administration. Volontairement
   *  silencieux en cas d'échec : le visiteur ne doit jamais être bloqué,
   *  son message part de toute façon par WhatsApp ou email. */
  const enregistrerDemande = async () => {
    if (!isSupabaseConfigured) return;
    try {
      let property_id: string | null = null;
      if (propertySlug) {
        const { data } = await supabase.from('properties').select('id').eq('slug', propertySlug).maybeSingle();
        property_id = data?.id ?? null;
      }
      await supabase.from('contact_requests').insert({
        nom: form.nom.trim(),
        telephone: form.telephone.trim(),
        email: form.email.trim() || null,
        type_projet: form.typeProjet || null,
        message: form.message.trim(),
        property_id,
      });
    } catch {
      // ignoré volontairement
    }
  };

  // Canal principal : WhatsApp (là où l'agence répond le plus vite).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    setLoading(true);
    void enregistrerDemande();
    window.open(`https://wa.me/${AGENCE_WHATSAPP}?text=${encodeURIComponent(buildBody())}`, '_blank', 'noopener,noreferrer');
    setLoading(false);
    toast.success('Votre message est prêt dans WhatsApp — appuyez sur Envoyer pour nous le transmettre.');
    resetForm();
  };

  // Canal secondaire : email pré-rempli dans l'application de messagerie du visiteur.
  const handleEmail = () => {
    if (!isValid()) return;
    void enregistrerDemande();
    const sujet = form.typeProjet ? `Demande — ${form.typeProjet}` : 'Demande depuis le site';
    window.location.href = `mailto:${AGENCE_EMAIL}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(buildBody())}`;
    toast.success('Votre logiciel de messagerie va s\'ouvrir avec le message pré-rempli.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nom">Nom *</Label>
        <Input id="nom" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} placeholder="Votre nom complet" required />
      </div>
      <div>
        <Label htmlFor="telephone">Téléphone *</Label>
        <Input id="telephone" type="tel" value={form.telephone} onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))} placeholder="07 XX XX XX XX" required />
      </div>
      {showEmail && (
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@exemple.com" />
        </div>
      )}
      {showTypeProjet && (
        <div>
          <Label htmlFor="typeProjet">Type de projet</Label>
          <Select value={form.typeProjet} onValueChange={v => setForm(f => ({ ...f, typeProjet: v }))}>
            <SelectTrigger id="typeProjet" aria-label="Type de projet"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="terrain">Terrain</SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="briques">Briques</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Votre message..." rows={4} />
      </div>
      <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <MessageCircle className="h-4 w-4 mr-2" />}
        Envoyer via WhatsApp
      </Button>
      <Button type="button" variant="outline" className="w-full" onClick={handleEmail}>
        <Mail className="h-4 w-4 mr-2" /> Envoyer par email
      </Button>
      <p className="text-xs text-muted-foreground text-center">Réponse la plus rapide via WhatsApp.</p>
    </form>
  );
}
