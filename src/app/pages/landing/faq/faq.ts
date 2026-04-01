import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss'
})
export class Faq {
  openId = signal<number | null>(1);

  items: FaqItem[] = [
    {
      id: 1,
      question: 'Comment contribuer à une campagne ?',
      answer: "Parcourez les campagnes disponibles, sélectionnez celle qui vous intéresse et suivez les étapes pour apporter votre contribution de manière simple et sécurisée."
    },
    {
      id: 2,
      question: 'Comment créer une campagne ?',
      answer: "Inscrivez-vous sur LEVANA, accédez à votre espace porteur de projet et remplissez le formulaire de création de campagne. Notre équipe valide votre dossier sous 48h."
    },
    {
      id: 3,
      question: 'Qui peut lancer un projet ?',
      answer: "Toute personne physique ou morale résidant en Afrique de l'Ouest peut soumettre un projet. Le projet doit être à impact positif et respecter nos conditions d'utilisation."
    },
    {
      id: 4,
      question: "Comment suivre l'évolution du financement ?",
      answer: "Chaque campagne dispose d'un tableau de bord public accessible à tous. Vous pouvez suivre en temps réel les montants collectés, le nombre de contributeurs et les mises à jour du porteur de projet."
    },
    {
      id: 5,
      question: "Comment fonctionne l'accès aux espaces utilisateurs ?",
      answer: "Après inscription, chaque utilisateur accède à un espace personnalisé selon son rôle : contributeur, porteur de projet ou administrateur. Chaque espace offre des fonctionnalités dédiées."
    }
  ];

  toggle(id: number) {
    this.openId.set(this.openId() === id ? null : id);
  }
}
