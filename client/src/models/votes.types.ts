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

export type UserVotes = {
  user: string;
  showVote: boolean;
  votes: {
    type: ChartType;
    votes: Vote[];
  }[];
};
