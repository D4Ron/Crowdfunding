import { Component, signal, computed } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  status: 'active' | 'brouillon' | 'soumise' | 'terminee';
  statusLabel: string;
  collected: string;
  goal: string;
  progress: number;
  contributors: number;
  daysLeft: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {

  filters = ['Toutes', 'Actives', 'Brouillons', 'Soumises', 'Terminées'];
  activeFilter = signal('Toutes');

  campaigns: Campaign[] = [
    {
      id: 1,
      title: 'Ferme Solaire de Ouagadougou',
      description: 'Installation de panneaux solaires pour alimenter 500 foyers dans la région de Ouagadougou.',
      imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=180&fit=crop',
      category: 'Énergie',
      status: 'active',
      statusLabel: 'Active',
      collected: '8 750 000',
      goal: '15 000 000',
      progress: 58,
      contributors: 142,
      daysLeft: 0
    },
    {
      id: 2,
      title: 'École Numérique de Dakar',
      description: 'Équipement informatique et formation pour une école primaire à Dakar.',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=180&fit=crop',
      category: 'Éducation',
      status: 'terminee',
      statusLabel: 'Terminée',
      collected: '5 000 000',
      goal: '5 000 000',
      progress: 100,
      contributors: 89,
      daysLeft: 0
    },
    {
      id: 3,
      title: 'Clinique Mobile du Sahel',
      description: 'Une clinique mobile pour offrir des soins de santé dans les zones reculées.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=180&fit=crop',
      category: 'Santé',
      status: 'soumise',
      statusLabel: 'En attente',
      collected: '1 250 000',
      goal: '25 000 000',
      progress: 5,
      contributors: 34,
      daysLeft: 0
    }
  ];

  filteredCampaigns = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'Toutes') return this.campaigns;
    if (filter === 'Actives') return this.campaigns.filter(c => c.status === 'active');
    if (filter === 'Brouillons') return this.campaigns.filter(c => c.status === 'brouillon');
    if (filter === 'Soumises') return this.campaigns.filter(c => c.status === 'soumise');
    if (filter === 'Terminées') return this.campaigns.filter(c => c.status === 'terminee');
    return this.campaigns;
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }
}