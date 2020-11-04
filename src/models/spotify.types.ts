export type SpotifySearchType =
  | "album"
  | "artist"
  | "playlist"
  | "track"
  | "show"
  | "episode";

export type SpotifyImageObject = {
  url: string;
  height: number;
  width: number;
};

export type SpotifyPagingObject<T> = {
  items: T[];
  href: string;
  next: string | null;
  previous: string | null;
  limit: number;
  offset: number;
  total: number;
};

export type SpotifyArtist = {
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type SpotifyArtistSimplified = Pick<
  SpotifyArtist,
  "href" | "id" | "name" | "type" | "uri"
>;

export type SpotifyAlbumType = "album" | "single" | "compilation";
export type SpotifyReleaseDatePrecision = "year" | "month" | "day";

export type SpotifyAlbum = {
  album_type: SpotifyAlbumType;
  artists: SpotifyArtistSimplified[];
  available_markets: string[];
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImageObject[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: SpotifyReleaseDatePrecision;
  type: string;
  uri: string;
};

export type SpotifyAlbumSimplified = Pick<
  SpotifyAlbum,
  | "album_type"
  | "artists"
  | "available_markets"
  | "href"
  | "id"
  | "images"
  | "name"
  | "release_date"
  | "release_date_precision"
  | "type"
  | "uri"
>;

export type SpotifySearch = {
  artists: SpotifyPagingObject<SpotifyArtist>;
  albums: SpotifyPagingObject<SpotifyAlbumSimplified>;
};
