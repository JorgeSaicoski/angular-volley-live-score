import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

  async createMatch(course: Partial<Match>) : Promise<Match> {
    const match$ = this.http.post<Match>(`${this.env.apiRoot}/matches`, course)
    return firstValueFrom(match$);
  }

  async getMatches(pageIndex:number, pageSize:number): Promise<Match[]>{
    const matches$ = this.http.get<GetMatchesResponse>(`${this.env.apiRoot}/matches?page=${pageIndex}&size=${pageSize}`)
    const response = await firstValueFrom(matches$)
    return response.matches
  }
  async getMatchesById(matchId:string): Promise<Match> {
    const match$ = this.http.get<Match>(`${this.env.apiRoot}/matches/${matchId}`);
    return firstValueFrom(match$)
  }
  async saveMatch(matchId:string, changes: Partial<Match>) : Promise<Match> {
    const match$ = this.http.put<Match>(`${this.env.apiRoot}/matches/${matchId}`, changes)
    return firstValueFrom(match$);
  }
}
