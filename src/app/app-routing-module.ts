import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Porteur Components
import { PorteurLayout } from './layout/porteur-layout/porteur-layout';
import { DashboardComponent as PorteurDashboard } from './pages/porteur/dashboard/dashboard';
import { MesCampagnesComponent } from './pages/porteur/mes-campagnes/mes-campagnes';
import { CreerCampagneComponent } from './pages/porteur/creer-campagne/creer-campagne';
import { Statistiques } from './pages/porteur/statistiques/statistiques';
import { Notifications as PorteurNotifications } from './pages/porteur/notifications/notifications';
import { Parametres } from './pages/porteur/parametres/parametres';

// Contributeur Features
import { DashboardComponent as ContributeurDashboard } from './features/contributeur/dashboard/dashboard';
import { TransactionHistory } from './features/contributeur/transaction-history/transaction-history';
import { CampaignListComponent } from './features/contributeur/campaign-list/campaign-list';
import { CampaignDetail } from './features/contributeur/campaign-detail/campaign-detail';
import { Notifications as ContributeurNotifications } from './features/contributeur/notifications/notifications';
import { Profile } from './features/contributeur/profile/profile';
import { ContributionsComponent } from './features/contributeur/contributions/contributions';

// Admin Components
import { AdminLayout } from './pages/admin/layout/admin-layout';
import { AdminOverview } from './pages/admin/overview/admin-overview';
import { AdminCampaigns } from './pages/admin/campaigns/admin-campaigns';
import { AdminUsers } from './pages/admin/users/admin-users';
import { AdminTransactions } from './pages/admin/transactions/admin-transactions';
import { AdminCommission } from './pages/admin/commission/admin-commission';
import { AdminStatistics } from './pages/admin/statistics/admin-statistics';
import { AdminNotifications } from './pages/admin/notifications/admin-notifications';
import { AdminSettings } from './pages/admin/settings/admin-settings';
import { AdminLogout } from './pages/admin/logout/admin-logout';

// Auth Components
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';

// Guards
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Auth Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin Routes
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', component: AdminOverview },
      { path: 'campagnes', component: AdminCampaigns },
      { path: 'utilisateurs', component: AdminUsers },
      { path: 'transactions', component: AdminTransactions },
      { path: 'commission', component: AdminCommission },
      { path: 'statistiques', component: AdminStatistics },
      { path: 'notifications', component: AdminNotifications },
      { path: 'parametres', component: AdminSettings },
      { path: 'deconnexion', component: AdminLogout },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  },

  // Porteur Routes
  {
    path: 'porteur',
    component: PorteurLayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: PorteurDashboard },
      { path: 'mes-campagnes', component: MesCampagnesComponent },
      { path: 'creer-campagne', component: CreerCampagneComponent },
      { path: 'statistiques', component: Statistiques },
      { path: 'notifications', component: PorteurNotifications },
      { path: 'parametres', component: Parametres },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Contributeur Routes
  {
    path: 'contributeur',
    children: [
      { path: 'dashboard', component: ContributeurDashboard },
      { path: 'transactions', component: TransactionHistory },
      { path: 'contributions', component: ContributionsComponent },
      { path: 'campaigns', component: CampaignListComponent },
      { path: 'campaigns/:id', component: CampaignDetail },
      { path: 'notifications', component: ContributeurNotifications },
      { path: 'profile', component: Profile },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Default Route
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
