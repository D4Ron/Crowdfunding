import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../../../core/services/campaign.service';
import { CampaignResponse } from '../../../models/campaign.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit {
  private campaignService = inject(CampaignService);

  campaigns = signal<CampaignResponse[]>([]);
  loading = signal<boolean>(true);

  activeCount = computed(() => this.campaigns().length);
  
  totalCollected = computed(() => {
    return this.campaigns().reduce((sum, c) => sum + (c.montantCollecte || 0), 0);
  });

  totalContributors = computed(() => {
    return this.campaigns().reduce((sum, c) => sum + (c.nombreContributeurs || 0), 0);
  });

  featuredCampaign = computed(() => {
    const list = this.campaigns();
    return list.length > 0 ? list[0] : null;
  });

  ngOnInit() {
    // If the service actually returns `data` array in the response like in campaigns.ts:
    // "this.campaignService.getActiveCampaigns().subscribe({ next: (res: any) => { const mapped = res.data... } })"
    // However, the service definition: "getActiveCampaigns(): Observable<CampaignResponse[]>" returns it directly.
    this.campaignService.getActiveCampaigns().subscribe({
      next: (res: any) => {
        // Handle wrapper response if present
        const data = res.data || res;
        this.campaigns.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR').format(value);
  }
}
