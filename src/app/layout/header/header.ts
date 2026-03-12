import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {

  private router = inject(Router);
  private userService = inject(UserService);

  userName = 'Inconnu';
  userInitials = '??';
  notifCount = 0;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userName = user.nom;
        this.userInitials = user.nom.substring(0, 2).toUpperCase();
      }
    });
  }

  nouvelleCompagne() {
    this.router.navigate(['/porteur/creer-campagne']);
  }

  toggleNotifications() {
    console.log('Notifications');
  }
}