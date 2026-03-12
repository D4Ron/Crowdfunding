import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CampaignService } from '../../../core/services/campaign.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistiques.html',
  styleUrls: ['./statistiques.scss']
})
export class Statistiques implements OnInit, AfterViewInit {
  dashboardData: any = null;
  campaigns: any[] = [];
  ready = false;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaignService.getDashboard().subscribe({
      next: (data) => { this.dashboardData = data; this.ready = true; },
      error: () => { this.ready = true; } // fallback: show empty charts
    });
    this.campaignService.getMyCampaigns().subscribe({
      next: (list) => { this.campaigns = list; },
      error: () => {}
    });
  }

  ngAfterViewInit(): void {}

  // Call renderCharts() from template after data is ready using @if(ready)
  renderCharts(): boolean {
    setTimeout(() => {
      this.renderLineChart();
      this.renderBarChart();
    }, 0);
    return true;
  }

  renderLineChart(): void {
    const existing = Chart.getChart('lineChart');
    if (existing) existing.destroy();
    const daily = this.dashboardData?.dailyCollections ?? {};
    const labels = Object.keys(daily).sort();
    const values = labels.map(k => Number(daily[k]));
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: labels.length ? labels : ['Aucune donnee'],
        datasets: [{
          label: 'Collectes (FCFA)',
          data: values.length ? values : [0],
          borderColor: '#C9A86A',
          backgroundColor: 'rgba(201,168,106,0.1)',
          fill: true, tension: 0.4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { display: false } } }
    });
  }

  renderBarChart(): void {
    const existing = Chart.getChart('barChart');
    if (existing) existing.destroy();
    const statusLabels = ['ACTIVE', 'BROUILLON', 'EN_ATTENTE_VALIDATION', 'FINANCEE', 'EXPIREE', 'REJETEE'];
    const friendlyLabels = ['Actives', 'Brouillons', 'En attente', 'Financees', 'Expirees', 'Rejetees'];
    const counts = statusLabels.map(s => this.campaigns.filter(c => c.statut === s).length);
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: friendlyLabels,
        datasets: [{ data: counts, backgroundColor: '#0f172a', borderRadius: 5 }]
      },
      options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { display: false } } }
    });
  }
}