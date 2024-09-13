import { Set } from "./set";

export interface Match {
    id: number;
    sets: Set[];
    isLive: boolean;
    win: boolean;
    matchDate: Date;
    adversary: string;
}
