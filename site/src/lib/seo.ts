/** Domaine de production — sert de base aux URL canoniques et Open Graph. */
export const SITE_URL = 'https://ivoire2c.com';
export const SITE_NAME = 'Ivoire Challenge Corporation (2C)';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const DEFAULT_DESCRIPTION =
  "Terrains documentés (ACD / titre foncier), briques à crédit et accompagnement construction en Côte d'Ivoire. De locataire à propriétaire, sans se ruiner.";

/** Fiche entreprise réutilisable en JSON-LD (RealEstateAgent). */
export const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: SITE_NAME,
  alternateName: 'Ivoire Challenge Corporation',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: OG_IMAGE,
  description: DEFAULT_DESCRIPTION,
  telephone: '+2250704085000',
  email: 'infos@ivoire2c.com',
  areaServed: 'Abidjan, Côte d’Ivoire',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Abidjan',
    addressCountry: 'CI',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
};
