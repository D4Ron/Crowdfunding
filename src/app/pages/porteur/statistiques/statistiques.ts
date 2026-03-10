import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-statistiques',
  standalone: true,
  templateUrl: './statistiques.html',
  styleUrls: ['./statistiques.scss']
})
export class Statistiques implements AfterViewInit {

  ngAfterViewInit() {
    this.renderLineChart();
    this.renderBarChart();
  }

  renderLineChart() {
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
        datasets: [{
          label: 'Collectes (F CFA)',
          data: [3500000, 2800000, 5000000, 7200000, 6000000, 9500000, 12000000],
          borderColor: '#C9A86A', // Or champagne officiel
          backgroundColor: 'rgba(201, 168, 106, 0.1)',
          fill: true,
          tension: 0.4 // Pour l'effet de courbe fluide
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }

  renderBarChart() {
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Agriculture', 'Technologie', 'Santé', 'Éducation', 'Artisanat'],
        datasets: [{
          data: [90, 75, 60, 45, 20],
          backgroundColor: '#0f172a', // Navy FoundTogo
          borderRadius: 5
        }]
      },
      options: {
        indexAxis: 'y', // Pour avoir les barres horizontales
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }
}