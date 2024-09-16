import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Match } from '@interfaces/match';
import { MatchesService } from '@service/matches.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export class MatchesComponent implements AfterViewInit{

  matches = signal<Match[]>([]);

  displayedColumns: string[] = ['date', 'adversary', 'result'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  dialog = inject(MatDialog)
  matchesService = inject(MatchesService)

  ngAfterViewInit(){
    this.loadMatches();
    this.dataSource.paginator = this.paginator
  }
  
  dataSource = new MatTableDataSource<Match>(this.matches())

  getResult(sets: { win: boolean }[]): string {
    const wins = sets.filter(set => set.win).length;
    const losses = sets.filter(set => !set.win).length;

    return wins > losses ? `win by ${wins}x${losses}` : `lose by ${losses}x${wins}`;
  }

  async loadMatches() {
    try {
      const matches = await this.matchesService.getMatches(0, 10); 
      this.matches.set(matches);
      this.dataSource.data = matches; 
    } catch (error) {
      console.error('Error loading matches', error);
    }
  }

  async openCreateMatch(){
    const newMatch$= this.dialog.open(CreateComponent).afterClosed();
    const newMatch = await firstValueFrom(newMatch$) as Partial<Match>

    if (newMatch.adversary && newMatch.matchDate){
      const newMatchDB = await this.matchesService.createMatch(newMatch)
      this.matches.update(matches => [...matches, newMatchDB as Match]); 
      this.dataSource.data = this.matches();  

    }

  }



}
