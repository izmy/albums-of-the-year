export type NominatedAlbum = {
  artist: string;
  album: string;
  countOfVoters: number;
};

export type NominatedAlbums = {
  type: string;
  results: NominatedAlbum[];
};
