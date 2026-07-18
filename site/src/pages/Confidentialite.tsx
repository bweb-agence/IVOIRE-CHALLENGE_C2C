import Seo from '@/components/Seo';
import LegalLayout, { LegalSection } from '@/components/LegalLayout';

export default function Confidentialite() {
  return (
    <>
      <Seo
        title="Politique de confidentialité"
        description="Comment Ivoire Challenge Corporation (2C) collecte et utilise vos données personnelles."
      />
      <LegalLayout eyebrow="Protection des données" title="Politique de confidentialité">
        <p>
          Ivoire Challenge Corporation (2C) attache une grande importance à la protection de vos données
          personnelles. Cette politique explique quelles données nous collectons et comment nous les
          utilisons.
        </p>

        <LegalSection title="Données collectées">
          <p>
            Lorsque vous remplissez un formulaire de contact ou nous écrivez via WhatsApp, nous recueillons
            uniquement les informations que vous nous transmettez : nom, numéro de téléphone, adresse email
            (facultative), type de projet et message.
          </p>
        </LegalSection>

        <LegalSection title="Utilisation des données">
          <p>Vos données servent exclusivement à :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>répondre à votre demande d'information sur un bien ou un service ;</li>
            <li>vous recontacter dans le cadre de votre projet immobilier ;</li>
            <li>assurer le suivi de la relation commerciale.</li>
          </ul>
          <p>Nous ne vendons ni ne louons vos données à des tiers.</p>
        </LegalSection>

        <LegalSection title="Messagerie WhatsApp">
          <p>
            Le formulaire de contact peut ouvrir une conversation WhatsApp pour transmettre votre demande.
            L'usage de WhatsApp est alors soumis à la politique de confidentialité de WhatsApp / Meta.
          </p>
        </LegalSection>

        <LegalSection title="Conservation">
          <p>
            Vos données sont conservées le temps nécessaire au traitement de votre demande et à la relation
            commerciale, puis supprimées ou archivées conformément à la réglementation applicable.
          </p>
        </LegalSection>

        <LegalSection title="Vos droits">
          <p>
            Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour
            l'exercer, contactez-nous au 07 04 08 50 00 ou à infos@ivoire2c.com.
          </p>
        </LegalSection>

        <p className="text-sm text-muted-foreground/70">Dernière mise à jour : juillet 2026.</p>
      </LegalLayout>
    </>
  );
}
