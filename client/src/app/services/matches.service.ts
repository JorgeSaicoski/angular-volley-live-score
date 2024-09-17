import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { GetMatchesResponse } from '@interfaces/getMatchesResponse';
import { Match } from '@interfaces/match';
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient){}


  env = environment

  async createMatch(match: Partial<Match>) : Promise<Match> {
    if (match.matchDate instanceof Date) {
      match.matchDate = match.matchDate.toISOString(); 
    }

    const match$ = this.http.post<Match>(`${this.env.apiRoot}matches`, match)

    return firstValueFrom(match$);
  }

  async getMatches(pageIndex:number, pageSize:number): Promise<GetMatchesResponse>{
    const response$ = this.http.get<GetMatchesResponse>(`${this.env.apiRoot}matches?page=${pageIndex}&size=${pageSize}`)
    const response = await firstValueFrom(response$) 
    console.log(response)
 
    response.matches.forEach(match =>{
      match.matchDate = new Date(match.matchDate)
    })
       
    return response
  }
  async getMatchesById(matchId:string): Promise<Match> {
    const match$ = this.http.get<Match>(`${this.env.apiRoot}matches/${matchId}`);
    return firstValueFrom(match$)
  }
  async saveMatch(matchId:string, changes: Partial<Match>) : Promise<Match> {
    const match$ = this.http.put<Match>(`${this.env.apiRoot}matches/${matchId}`, changes)
    return firstValueFrom(match$);
  }
}
