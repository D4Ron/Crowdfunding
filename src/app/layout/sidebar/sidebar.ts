import { Component, EventEmitter, Output } from '@angular/core'; // Ajout des imports nécessaires
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true, // Assurez-vous que standalone est présent
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  

  onLogout() {
    console.log('Tentative de déconnexion...');
    alert('Déconnexion en cours...');
  }
}