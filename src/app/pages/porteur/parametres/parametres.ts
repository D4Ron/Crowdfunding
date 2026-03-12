import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametres.html',
  styleUrl: './parametres.scss'
})
export class Parametres implements OnInit {
  nom = signal('');
  email = signal('');
  telephone = signal('');
  initials = signal('');
  saving = signal(false);
  saveSuccess = signal(false);

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const defaultNom = this.authService.getNom() ?? '';
    this.nom.set(defaultNom);
    this.email.set(this.authService.getEmail() ?? '');
    this.initials.set(
      defaultNom.split(' ').map(w => w[0] || '').join('').toUpperCase().slice(0, 2)
    );
    this.userService.getMe().subscribe({
      next: (u) => this.telephone.set(u.telephone ?? ''),
      error: () => {}
    });
  }

  save(): void {
    this.saving.set(true);
    this.userService.updateMe({
      nom: this.nom(),
      telephone: this.telephone()
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.saveSuccess.set(true);
        localStorage.setItem('nom', this.nom());
        setTimeout(() => this.saveSuccess.set(false), 3000);
      },
      error: () => this.saving.set(false)
    });
  }
}

