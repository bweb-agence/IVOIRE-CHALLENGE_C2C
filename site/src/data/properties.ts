export interface Property {
  id: string;
  nom: string;
  type: 'Terrain' | 'Maison';
  transaction: 'Achat' | 'Location';
  ville: string;
  quartier: string;
  superficie: number;
  prix: number;
  description: string;
  statut: 'Disponible' | 'Réservé' | 'Vendu';
  statutJuridique: string;
  distanceRepere: string;
  modalitesPaiement: string;
  siteApprouve: boolean;
  aLaUne: boolean;
  photos: string[];
}

export const properties: Property[] = [
  {
    id: '1',
    nom: 'Terrain résidentiel Azaguié',
    type: 'Terrain',
    transaction: 'Achat',
    ville: 'Azaguié',
    quartier: 'Centre',
    superficie: 500,
    prix: 3500000,
    description: "Ce terrain de 500 m², situé à Azaguié, à 35 min du CHU d'Angré, est idéal pour une construction résidentielle. Le site est approuvé, sécurisé et livré avec une documentation légale complète.",
    statut: 'Disponible',
    statutJuridique: 'ACD',
    distanceRepere: "À 35 min du CHU d'Angré",
    modalitesPaiement: 'Comptant ou échelonné sur 6 mois',
    siteApprouve: true,
    aLaUne: true,
    photos: ['/images/terrain-azaguie.webp'],
  },
  {
    id: '2',
    nom: 'Terrain Angré Star 12',
    type: 'Terrain',
    transaction: 'Achat',
    ville: 'Abidjan',
    quartier: 'Angré',
    superficie: 350,
    prix: 7500000,
    description: "Terrain de 350 m² dans le quartier prisé d'Angré, proche de toutes commodités. Documentation légale complète et site sécurisé.",
    statut: 'Disponible',
    statutJuridique: 'Titre foncier',
    distanceRepere: 'À 10 min de la Riviera Palmeraie',
    modalitesPaiement: 'Comptant ou échelonné sur 12 mois',
    siteApprouve: true,
    aLaUne: true,
    photos: ['/images/terrain-angre.webp'],
  },
  {
    id: '3',
    nom: 'Villa moderne Cocody',
    type: 'Maison',
    transaction: 'Achat',
    ville: 'Abidjan',
    quartier: 'Cocody',
    superficie: 200,
    prix: 45000000,
    description: "Belle villa moderne de 200 m² à Cocody, avec 4 chambres, 3 salles de bain, salon spacieux et jardin clôturé. Construction récente aux normes.",
    statut: 'Disponible',
    statutJuridique: 'Titre foncier',
    distanceRepere: 'À 15 min du Plateau',
    modalitesPaiement: 'Comptant',
    siteApprouve: true,
    aLaUne: true,
    photos: ['/images/villa-cocody.webp'],
  },
  {
    id: '4',
    nom: 'Terrain constructible Bingerville',
    type: 'Terrain',
    transaction: 'Achat',
    ville: 'Bingerville',
    quartier: 'Akouai-Santé',
    superficie: 600,
    prix: 4200000,
    description: "Terrain de 600 m² idéalement situé à Bingerville. Accès route bitumée, réseau électrique à proximité.",
    statut: 'Disponible',
    statutJuridique: 'ACD',
    distanceRepere: 'À 25 min du Carrefour de la Vie',
    modalitesPaiement: 'Comptant ou échelonné sur 6 mois',
    siteApprouve: true,
    aLaUne: false,
    photos: ['/images/terrain-bingerville.webp'],
  },
  {
    id: '5',
    nom: 'Maison en construction Yopougon',
    type: 'Maison',
    transaction: 'Achat',
    ville: 'Abidjan',
    quartier: 'Yopougon',
    superficie: 150,
    prix: 25000000,
    description: "Maison en cours de finition à Yopougon, 3 chambres, 2 salles de bain. Possibilité de personnaliser les finitions.",
    statut: 'Réservé',
    statutJuridique: 'Titre foncier',
    distanceRepere: 'À 20 min du CHU de Yopougon',
    modalitesPaiement: 'Comptant',
    siteApprouve: true,
    aLaUne: false,
    photos: ['/images/maison-yopougon.webp'],
  },
  {
    id: '6',
    nom: 'Terrain Grand Bassam',
    type: 'Terrain',
    transaction: 'Achat',
    ville: 'Grand-Bassam',
    quartier: 'Modeste',
    superficie: 800,
    prix: 5000000,
    description: "Grand terrain de 800 m² à Grand-Bassam, idéal pour un projet résidentiel ou un investissement locatif. Proche de la plage.",
    statut: 'Disponible',
    statutJuridique: 'ACD',
    distanceRepere: 'À 5 min de la plage',
    modalitesPaiement: 'Comptant ou échelonné sur 8 mois',
    siteApprouve: true,
    aLaUne: false,
    photos: ['/images/terrain-azaguie.webp'],
  },
];

export const villes = [...new Set(properties.map(p => p.ville))];

export function formatPrice(prix: number): string {
  return new Intl.NumberFormat('fr-FR').format(prix) + ' FCFA';
}
