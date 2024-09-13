import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Match } from '@interfaces/match';



@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export class MatchesComponent {
  displayedColumns: string[] = ['date', 'adversary', 'result']
  matches: Match[] = [
    {
      id: 1,
      sets: [{ 
          id: 1, matchId: 1,
          scoreTeamA: 15,
          scoreTeamB: 13,
          win: true
        },
        { 
          id: 2, matchId: 1,
          scoreTeamA: 15,
          scoreTeamB: 11,
          win: true
        },
      ],
      isLive: false,
      win: true,
      matchDate: new Date(),
      adversary: "CDB",
    }

  ]
  getResults(sets: { win: boolean }[]): string {
    const wins = sets.filter(set => set.win).length;
    const losses = sets.filter(set => !set.win).length;

    return wins > losses ? `win by ${wins}x${losses}` : `lose by ${losses}x${wins}`;
  }

}
