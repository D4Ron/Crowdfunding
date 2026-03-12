import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full bg-slate-100 rounded-full overflow-hidden"
         [style.height.px]="height">
      <div class="bg-amber-500 h-full rounded-full transition-all duration-500"
           [style.width.%]="percentage">
      </div>
    </div>
  `
})
export class ProgressBar {
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() height: number = 8;

  get percentage(): number {
    if (!this.max || this.max <= 0) return 0;
    return Math.min(100, Math.round((this.value / this.max) * 100));
  }
}
