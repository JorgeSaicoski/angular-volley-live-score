import { Routes } from '@angular/router';
import { MatchesComponent } from './components/matches/matches.component';


export const routes: Routes = [
    {
      path: '',
      component: MatchesComponent
    },
    {
      path: '**',
      redirectTo: '/matches'
    }
  ];
