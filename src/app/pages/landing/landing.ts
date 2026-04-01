import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Navbar } from './navbar/navbar';
import { Hero } from './hero/hero';
import { CampaignsComponent } from './campaigns/campaigns';
import { HowItWorks } from './how-it-works/how-it-works';
import { TrustFeatures } from './trust-features/trust-features';
import { ForProjects } from './for-projects/for-projects';
import { Faq } from './faq/faq';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Hero,
    CampaignsComponent,
    HowItWorks,
    TrustFeatures,
    ForProjects,
    Faq,
    Footer
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class LandingPage {
}
