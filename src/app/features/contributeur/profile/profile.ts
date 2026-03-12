import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Profile implements OnInit {
  user: any = null;
  nom = '';
  email = '';
  telephone = '';
  initials = '';

  badges = [
    { nom: 'Premier Don', icone: '🌱', date: 'Jan 2024' },
    { nom: 'Philanthrope', icone: '💎', date: 'Fév 2024' },
    { nom: 'Soutien Local', icone: '🇹🇬', date: 'Mars 2024' }
  ];

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.nom   = this.authService.getNom() ?? '';
    this.email = this.authService.getEmail() ?? '';
    this.initials = this.nom.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    this.userService.getMe().subscribe({
      next: (u) => { this.user = u; this.telephone = u.telephone ?? ''; },
      error: () => {}
    });
  }

  save(): void {
    this.userService.updateMe({ nom: this.nom, telephone: this.telephone }).subscribe({
      next: (res) => {
        alert('Profil mis à jour avec succès');
        localStorage.setItem('nom', this.nom);
      },
      error: () => {
        alert('Erreur lors de la mise à jour du profil');
      }
    });
  }
}