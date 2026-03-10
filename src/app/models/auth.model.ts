import { Role } from './user.model';

export interface RegisterRequest {
  nom: string;
  email: string;
  motDePasse: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  nom: string;
  role: Role;
}
