import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class Notifications {
  notifications = [
    {
      id: 1,
      type: 'success',
      icon: 'fa-solid fa-check-circle',
      title: 'Nouvelle contribution',
      message: 'Vous avez reçu 50 000 FCFA pour "Ferme Solaire de Ouagadougou".',
      date: 'Il y a 2 heures',
      isUnread: true
    },
    {
      id: 2,
      type: 'info',
      icon: 'fa-solid fa-info-circle',
      title: 'Campagne soumise',
      message: 'Votre campagne "Clinique Mobile du Sahel" est en cours d\'examen.',
      date: 'Hier à 11:15',
      isUnread: true
    },
    {
      id: 3,
      type: 'success',
      icon: 'fa-solid fa-check-circle',
      title: 'Objectif proche',
      message: '"Tech Hub Abidjan" a atteint 60% de son objectif !',
      date: 'Il y a 2 jours',
      isUnread: false
    },
    {
      id: 4,
      type: 'warning',
      icon: 'fa-solid fa-exclamation-triangle',
      title: 'Informations requises',
      message: 'Veuillez compléter votre profil pour recevoir vos fonds.',
      date: 'Il y a 1 semaine',
      isUnread: false
    }
  ];
}