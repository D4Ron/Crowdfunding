import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignService } from '../../../core/services/campaign.service';

interface CampaignDisplay {
  id: number;
  category: string;
  title: string;
  description: string;
  collected: string;
  percent: number;
  goal: string;
  contributors: number;
  days: number;
}

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.scss'
})
export class CampaignsComponent implements OnInit {
  private campaignService = inject(CampaignService);

  activeFilter = signal('Tous');
  filters = ['Tous', 'Santé', 'Éducation', 'Innovation', 'Agriculture'];
  campaigns = signal<CampaignDisplay[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.campaignService.getActiveCampaigns().subscribe({
      next: (res: any) => {
        const rawData = res.data || res;
        const mapped = rawData.slice(0, 3).map((c: any) => ({
          id: c.id,
          category: c.categorie,
          title: c.titre,
          description: c.description && c.description.length > 100 ? c.description.substring(0, 100) + '...' : c.description || '',
          collected: new Intl.NumberFormat('fr-FR').format(c.montantCollecte || 0) + ' FCFA',
          percent: c.objectifCfa > 0 ? Math.round(((c.montantCollecte || 0) / c.objectifCfa) * 100) : 0,
          goal: new Intl.NumberFormat('fr-FR').format(c.objectifCfa || 0) + ' FCFA',
          contributors: c.nombreContributeurs || 0,
          days: this.calculateDaysRemaining(c.dateFin)
        }));
        this.campaigns.set(mapped);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  private calculateDaysRemaining(endDate: string | Date | number[]): number {
    if (!endDate) return 0;
    
    let dateFinObj: Date;
    if (Array.isArray(endDate)) {
      dateFinObj = new Date(endDate[0], endDate[1] - 1, endDate[2], endDate[3] || 0, endDate[4] || 0);
    } else {
      dateFinObj = new Date(endDate);
    }

    const diffMs = dateFinObj.getTime() - new Date().getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  }

  get filteredCampaigns(): CampaignDisplay[] {
    const list = this.campaigns();
    if (this.activeFilter() === 'Tous') return list;
    return list.filter(c =>
      c.category.toLowerCase().includes(this.activeFilter().toLowerCase())
    );
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }
}
