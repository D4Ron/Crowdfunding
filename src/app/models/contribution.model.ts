export type ContributionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface ContributionRequest {
  montant: number;
  telephone: string;
  methodePaiement: 'moov_tg' | 'togocel';
}
export interface ContributionResponse {
  id: number;
  montant: number;
  commission: number;
  montantNet: number;
  telephone: string;
  referenceTransaction: string;
  statut: ContributionStatus;
  campaignId: number;
  campaignTitre: string;
  contributeurNom: string;
  createdAt: string;
}
