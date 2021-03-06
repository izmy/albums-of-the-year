import { ChartType } from "./charts.types";

export type Vote = {
  _id?: string;
  rank: number;
  artist: string | null;
  album: string | null;
  write: boolean;
  type?: ChartType;
  userId?: string;
  searchText?: string;
};
