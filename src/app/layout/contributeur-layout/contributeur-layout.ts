import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contributeur-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
    template: `
    <div style="display:flex;height:100vh;overflow:hidden">
      <!-- Sidebar -->
      <aside style="width:240px;background:#0f172a;color:#e2e8f0;display:flex;flex-direction:column;padding:24px 16px;gap:8px;flex-shrink:0">
        <div style="font-size:20px;font-weight:800;color:#f8fafc;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:16px">
          FoundTogo
        </div>
        <span style="font-size:11px;letter-spacing:0.08em;color:#f59e0b;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.28);padding:4px 12px;border-radius:999px;width:fit-content;margin-bottom:12px">
          CONTRIBUTEUR
        </span>
        <a routerLink="/contributeur/dashboard" routerLinkActive="active-nav"
           style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;color:#94a3b8;text-decoration:none;font-size:14px;transition:all 0.15s">
          📊 Tableau de bord
        </a>
        <a routerLink="/campaigns" routerLinkActive="active-nav"
           style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;color:#94a3b8;text-decoration:none;font-size:14px">
          🚀 Explorer les campagnes
        </a>
        <a routerLink="/contributeur/contributions" routerLinkActive="active-nav"
           style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;color:#94a3b8;text-decoration:none;font-size:14px">
          💳 Mes contributions
        </a>
        <a routerLink="/contributeur/transactions" routerLinkActive="active-nav"
           style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;color:#94a3b8;text-decoration:none;font-size:14px">
          📋 Historique
        </a>
        <a routerLink="/contributeur/notifications" routerLinkActive="active-nav"
           style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;color:#94a3b8;text-decoration:none;font-size:14px">
          🔔 Notifications
        </a>
        <a routerLink="/contributeur/profile" routerLinkActive="active-nav"
           style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;color:#94a3b8;text-decoration:none;font-size:14px">
          👤 Profil
        </a>
        <div style="margin-top:auto;border-top:1px solid rgba(255,255,255,0.08);padding-top:16px">
          <button (click)="logout()"
            style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;color:#94a3b8;background:none;border:none;font-size:14px;cursor:pointer;width:100%">
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <main style="flex:1;overflow-y:auto;background:#f8fafc">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styles: [`
    :host { display: block; height: 100vh; }
    .active-nav { background: rgba(255,255,255,.07) !important; color: #f8fafc !important; outline: 1px solid rgba(245,158,11,.45); }
  `]
})
export class ContributeurLayout {
    constructor(private authService: AuthService, private router: Router) { }
    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
