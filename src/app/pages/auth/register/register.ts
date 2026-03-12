import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../models/user.model';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.html',
    styleUrl: './register.scss'
})
export class RegisterComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    nom = signal('');
    email = signal('');
    password = signal('');
    confirmPassword = signal('');
    role = signal<Role>('CONTRIBUTEUR');
    loading = signal(false);
    error = signal('');

    onSubmit() {
        if (!this.nom() || !this.email() || !this.password()) {
            this.error.set('Veuillez remplir tous les champs.');
            return;
        }

        if (this.password() !== this.confirmPassword()) {
            this.error.set('Les mots de passe ne correspondent pas.');
            return;
        }

        this.loading.set(true);
        this.error.set('');

        this.authService.register({
            nom: this.nom(),
            email: this.email(),
            motDePasse: this.password(),
            role: this.role()
        }).subscribe({
            next: (user) => {
                this.loading.set(false);
                this.redirectUser(user.role);
            },
            error: (err) => {
                this.loading.set(false);
                let msg = 'Erreur lors de l\'inscription. Veuillez réessayer.';
                if (err?.error?.erreur) {
                    msg = err.error.erreur;
                } else if (err?.error?.message) {
                    msg = err.error.message;
                } else if (err?.error?.errors && Array.isArray(err.error.errors)) {
                    msg = err.error.errors.join(', ');
                }
                this.error.set(msg);
            }
        });
    }

    private redirectUser(role: string) {
        switch (role) {
            case 'ADMIN':
                this.router.navigate(['/admin']);
                break;
            case 'PORTEUR_DE_PROJET':
                this.router.navigate(['/porteur/dashboard']);
                break;
            case 'CONTRIBUTEUR':
                this.router.navigate(['/contributeur/dashboard']);
                break;
            default:
                this.router.navigate(['/']);
        }
    }
}
