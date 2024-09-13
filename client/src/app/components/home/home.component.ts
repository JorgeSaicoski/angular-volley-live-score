import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatchesComponent } from '../matches/matches.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, MatchesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
