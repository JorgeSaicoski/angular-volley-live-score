import { Match } from "./match";

export interface GetMatchesResponse {
    matches: Match[];
    count: number;
  }