import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  standalone: true,
  imports: [CommonModule]
})
export class Profile implements OnInit {
  user: User = {
    id: 1,
    nom: 'Amara Diallo',
    email: 'amara.diallo@email.com',
    role: 'CONTRIBUTEUR',
    telephone: '+228 90 00 00 00',
    avatar: 'assets/img/avatar.jpg',
    actif: true,
    banni: false,
    createdAt: new Date().toISOString()
  };

  badges = [
    { nom: 'Premier Don', icone: '🌱', date: 'Jan 2024' },
    { nom: 'Philanthrope', icone: '💎', date: 'Fév 2024' },
    { nom: 'Soutien Local', icone: '🇹🇬', date: 'Mars 2024' }
  ];

  constructor() { }

  ngOnInit(): void { }
}