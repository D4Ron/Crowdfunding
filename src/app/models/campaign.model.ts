export type CampaignStatus =
  | 'BROUILLON'
  | 'EN_ATTENTE_VALIDATION'
  | 'ACTIVE'
  | 'FINANCEE'
  | 'EXPIREE'
  | 'REJETEE';

export interface CampaignRequest {
  titre: string;
  description: string;
  categorie: string;
  imageUrl?: string;
  objectifCfa: number;
  dateDebut: string;
  dateFin: string;
}

export interface CampaignResponse {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  imageUrl?: string;
  objectifCfa: number;
  montantCollecte: number;
  dateDebut: string;
  dateFin: string;
  statut: CampaignStatus;
  porteurNom: string;
  porteurId: number;
  nombreContributeurs: number;
  pourcentageAtteint: number;
  joursRestants: number;
  createdAt: string;
}
