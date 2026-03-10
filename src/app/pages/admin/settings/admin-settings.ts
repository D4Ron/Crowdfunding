import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDashboardStore } from '../../../core/admin-dashboard.store';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-admin-settings',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-settings.html',
    styleUrl: './admin-settings.scss'
})
export class AdminSettings implements OnInit {
    private store = inject(AdminDashboardStore);
    private authService = inject(AuthService);

    readonly settings = computed(() => this.store.settings());
    readonly nom = this.authService.getNom() ?? '—';
    readonly email = this.authService.getEmail() ?? '—';
    readonly initials = this.nom.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    readonly password = signal('');
    readonly confirm = signal('');
    readonly passwordError = signal('');

    ngOnInit(): void { this.store.loadAll(); }

    onToggleEmail(evt: Event): void {
        const checked = (evt.target as HTMLInputElement | null)?.checked ?? false;
        this.store.setSettingsPref({ emailNotifications: checked });
    }

    onTogglePush(evt: Event): void {
        const checked = (evt.target as HTMLInputElement | null)?.checked ?? false;
        this.store.setSettingsPref({ pushNotifications: checked });
    }

    onSavePassword(): void {
        if (this.password() !== this.confirm()) {
            this.passwordError.set('Les mots de passe ne correspondent pas.');
            return;
        }
        this.passwordError.set('');
        // TODO: call auth service password change endpoint
        alert('Fonctionnalité de changement de mot de passe à connecter au backend.');
    }
}
