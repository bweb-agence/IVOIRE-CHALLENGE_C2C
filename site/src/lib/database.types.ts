/** Types du CMS — reflètent les tables créées par supabase/migrations/0001_cms_schema.sql. */

export type PropertyType = 'Terrain' | 'Maison';
export type PropertyTransaction = 'Achat' | 'Location';
export type PropertyStatut = 'Disponible' | 'Réservé' | 'Vendu';
export type RequestStatut = 'nouveau' | 'en_cours' | 'traite' | 'archive';

export interface PropertyRow {
  id: string;
  slug: string;
  nom: string;
  type: PropertyType;
  transaction: PropertyTransaction;
  ville: string;
  quartier: string;
  superficie: number;
  prix: number;
  description: string;
  statut: PropertyStatut;
  statut_juridique: string;
  distance_repere: string;
  modalites_paiement: string;
  site_approuve: boolean;
  a_la_une: boolean;
  photos: string[];
  videos: string[];
  publie: boolean;
  ordre: number;
  created_at: string;
  updated_at: string;
}

export interface AnnouncementRow {
  id: string;
  slug: string;
  titre: string;
  extrait: string;
  contenu: string;
  image: string | null;
  publie: boolean;
  date_publication: string;
  created_at: string;
  updated_at: string;
}

export interface TestimonialRow {
  id: string;
  nom: string;
  ville: string;
  citation: string;
  note: number;
  photo: string | null;
  photos: string[];
  video: string | null;
  publie: boolean;
  ordre: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMemberRow {
  id: string;
  nom: string;
  fonction: string;
  photo: string | null;
  initiales: string;
  publie: boolean;
  ordre: number;
  created_at: string;
  updated_at: string;
}

export interface ContactRequestRow {
  id: string;
  nom: string;
  telephone: string;
  email: string | null;
  type_projet: string | null;
  message: string;
  property_id: string | null;
  statut: RequestStatut;
  note_interne: string | null;
  created_at: string;
  updated_at: string;
}

/** Champs modifiables depuis l'admin (l'id et les horodatages sont gérés par la base). */
export type PropertyInput = Omit<PropertyRow, 'id' | 'created_at' | 'updated_at'>;
export type AnnouncementInput = Omit<AnnouncementRow, 'id' | 'created_at' | 'updated_at'>;
export type TestimonialInput = Omit<TestimonialRow, 'id' | 'created_at' | 'updated_at'>;
export type TeamMemberInput = Omit<TeamMemberRow, 'id' | 'created_at' | 'updated_at'>;
