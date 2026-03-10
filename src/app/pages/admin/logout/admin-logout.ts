import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-admin-logout',
    standalone: true,
    imports: [],
    template: `
    <div class="logout-page">
      <div class="logout-card">
        <div class="logout-icon">👋</div>
        <h2>Déconnexion</h2>
        <p>Voulez-vous vraiment vous déconnecter ?</p>
        <div class="logout-actions">
          <button class="btn btn-ghost" (click)="cancel()">Annuler</button>
          <button class="btn btn-danger" (click)="logout()">Confirmer</button>
        </div>
      </div>
    </div>`,
    styles: [`
    .logout-page { display:grid; place-items:center; min-height:60vh; }
    .logout-card { background:#fff; border:1px solid #e9ecef; border-radius:16px; padding:40px; text-align:center; max-width:380px; }
    .logout-icon { font-size:48px; margin-bottom:16px; }
    h2 { margin:0 0 8px; font-size:22px; color:#0f172a; }
    p { margin:0 0 24px; color:#64748b; }
    .logout-actions { display:flex; gap:12px; justify-content:center; }
    .btn { padding:10px 22px; border-radius:999px; border:none; cursor:pointer; font-size:15px; font-weight:600; transition:opacity .15s; }
    .btn:hover { opacity:.85; }
    .btn-ghost { background:#f1f5f9; color:#334155; }
    .btn-danger { background:#ef4444; color:#fff; }
  `]
})
export class AdminLogout {
    private authService = inject(AuthService);
    private router = inject(Router);

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    cancel(): void {
        this.router.navigate(['/admin']);
    }
}
