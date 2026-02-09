import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ProposalComponent } from './proposal/proposal.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'proposal', component: ProposalComponent },
    { path: 'admin', component: DashboardComponent },
    { path: '**', redirectTo: '' }
];
