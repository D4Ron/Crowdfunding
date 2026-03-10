import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col justify-between">
      <div class="text-sm font-medium text-slate-500 mb-4">{{ title }}</div>
      <div>
        <div class="text-2xl font-bold text-slate-800">{{ value }}</div>
        <div class="text-sm mt-1" [ngClass]="trendClass">{{ subtitle }}</div>
      </div>
    </div>
  `
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() subtitle = '';
  @Input() trendClass = 'text-slate-400';
}