import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResultsComponent } from './pages/results/results.component';
import { StandingsComponent } from './pages/standings/standings.component';

export const routes: Routes = [//{path: '', component: AppComponent}, 
    {path: 'Dashboard', component: DashboardComponent},
    {path: 'Results', component: ResultsComponent},
    {path: 'Standings', component: StandingsComponent},
    {path: '**', redirectTo: ''}
];
