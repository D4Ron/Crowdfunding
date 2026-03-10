export type Role = 'ADMIN' | 'PORTEUR_DE_PROJET' | 'CONTRIBUTEUR';

export interface User {
  id: number;
  nom: string;
  email: string;
  role: Role;
  actif: boolean;
  banni: boolean;
  createdAt: string;
  telephone?: string;
  avatar?: string;
}
