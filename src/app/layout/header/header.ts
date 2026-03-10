import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  userName = 'Amadou Diallo';
  userInitials = 'AD';
  notifCount = 2;

  nouvelleCompagne() {
    this.router.navigate(['/porteur/creer-campagne']);
  }

  toggleNotifications() {
    console.log('Notifications');
  }
}