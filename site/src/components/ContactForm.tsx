import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
  defaultMessage?: string;
  showTypeProjet?: boolean;
  showEmail?: boolean;
}

export default function ContactForm({ defaultMessage = '', showTypeProjet = false, showEmail = false }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: '',
    telephone: '',
    email: '',
    typeProjet: '',
    message: defaultMessage,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.telephone.trim()) {
      toast.error('Veuillez remplir les champs obligatoires.');
      return;
    }
    setLoading(true);

    // Transmission via WhatsApp : le message arrive directement sur le numéro de l'agence.
    const lignes = [
      'Bonjour, je vous contacte depuis le site Ivoire Challenge Corporation.',
      `Nom : ${form.nom.trim()}`,
      `Téléphone : ${form.telephone.trim()}`,
      form.email.trim() && `Email : ${form.email.trim()}`,
      form.typeProjet && `Type de projet : ${form.typeProjet}`,
      form.message.trim() && `Message : ${form.message.trim()}`,
    ].filter(Boolean);

    window.open(`https://wa.me/2250704085000?text=${encodeURIComponent(lignes.join('\n'))}`, '_blank', 'noopener,noreferrer');

    setLoading(false);
    toast.success('Votre message est prêt dans WhatsApp — appuyez sur Envoyer pour nous le transmettre.');
    setForm({ nom: '', telephone: '', email: '', typeProjet: '', message: '' });
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
          <Label>Type de projet</Label>
          <Select value={form.typeProjet} onValueChange={v => setForm(f => ({ ...f, typeProjet: v }))}>
            <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
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
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
        Envoyer ma demande
      </Button>
    </form>
  );
}
