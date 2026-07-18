import Seo from '@/components/Seo';
import LegalLayout, { LegalSection, ToFill } from '@/components/LegalLayout';

export default function MentionsLegales() {
  return (
    <>
      <Seo title="Mentions légales" description="Mentions légales du site Ivoire Challenge Corporation (2C)." />
      <LegalLayout eyebrow="Informations légales" title="Mentions légales">
        <p>
          Le présent site est édité par Ivoire Challenge Corporation (2C), agence immobilière et promoteur
          immobilier agréés en Côte d'Ivoire.
        </p>

        <LegalSection title="Éditeur du site">
          <p>Raison sociale : Ivoire Challenge Corporation (2C)</p>
          <p>Forme juridique : <ToFill>SARL / SA / autre</ToFill></p>
          <p>Siège social : <ToFill>adresse complète du siège à Abidjan</ToFill></p>
          <p>RCCM : <ToFill>numéro RCCM</ToFill> — Compte contribuable : <ToFill>NCC</ToFill></p>
          <p>Agrément agence immobilière : <ToFill>numéro / autorité</ToFill></p>
          <p>Agrément promoteur immobilier : <ToFill>numéro / autorité</ToFill></p>
          <p>Directeur de la publication : <ToFill>nom du responsable</ToFill></p>
          <p>Téléphone : 07 04 08 50 00 — Email : infos@ivoire2c.com</p>
        </LegalSection>

        <LegalSection title="Hébergement">
          <p>Le site est hébergé par <ToFill>nom et adresse de l'hébergeur (ex. Vercel, Netlify, OVH…)</ToFill>.</p>
        </LegalSection>

        <LegalSection title="Propriété intellectuelle">
          <p>
            L'ensemble des contenus du site (textes, logo, visuels, mise en page) est la propriété
            d'Ivoire Challenge Corporation (2C), sauf mention contraire. Toute reproduction ou
            réutilisation sans autorisation écrite préalable est interdite.
          </p>
        </LegalSection>

        <LegalSection title="Responsabilité">
          <p>
            Les informations sur les biens (prix, superficie, statut juridique, disponibilité) sont
            fournies à titre indicatif et peuvent évoluer. Elles ne constituent pas un engagement
            contractuel. Pour toute décision, un rendez-vous et une vérification des documents officiels
            sont recommandés.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Pour toute question relative au site ou à nos services :
            07 04 08 50 00 (téléphone / WhatsApp) ou infos@ivoire2c.com.
          </p>
        </LegalSection>

        <p className="text-sm text-muted-foreground/70">Dernière mise à jour : juillet 2026.</p>
      </LegalLayout>
    </>
  );
}
