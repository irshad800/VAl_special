import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ProposalComponent } from './proposal/proposal.component';

export const routes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },
    { path: 'proposal', component: ProposalComponent },
    { path: '**', redirectTo: '' }
];
