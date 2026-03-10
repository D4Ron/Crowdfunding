import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    email = signal('');
    password = signal('');
    loading = signal(false);
    error = signal('');

    onSubmit() {
        if (!this.email() || !this.password()) {
            this.error.set('Veuillez remplir tous les champs.');
            return;
        }

        this.loading.set(true);
        this.error.set('');

        this.authService.login({
            email: this.email(),
            motDePasse: this.password()
        }).subscribe({
            next: (user) => {
                this.loading.set(false);
                this.redirectUser(user.role);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set('Email ou mot de passe incorrect.');
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
