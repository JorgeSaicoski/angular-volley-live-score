import { Match } from "./match";

export interface GetMatchesResponse {
    matches: Match[];
    totalCount: number;
  }