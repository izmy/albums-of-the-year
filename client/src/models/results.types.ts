export type Result = {
  artist: string;
  album: string;
  points: number;
  ranks: number[];
  countOfVoters: number;
  type: string;
  writeByUser?: string;
};

export type Results = {
  type: string;
  results: Result[];
};
