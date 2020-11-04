import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import * as React from "react";
import {
  SpotifyAlbumSimplified,
  SpotifyArtist,
} from "../../models/spotify.types";
import { searchByType } from "../api/spotifyApi";
import { Vote } from "./Voting";

interface VotingLineProps {
  vote: Vote;
  index: number;
  onSetVote: (vote: Vote, index: number) => void;
}

export const VotingLine: React.FC<VotingLineProps> = ({
  vote,
  index,
  onSetVote,
}) => {
  const [artists, setArtists] = React.useState<SpotifyArtist[]>([]);
  const [albums, setAlbums] = React.useState<SpotifyAlbumSimplified[]>([]);

  const handleSearchArtist = (
    event: React.ChangeEvent<{}>,
    newValue: string | null
  ) => {
    const newVote = { ...vote, artist: newValue };

    if (newValue !== null && newValue.length > 0) {
      searchByType(newValue, ["artist"]).then((result) =>
        setArtists(result.artists.items)
      );
    } else {
      setArtists([]);
    }

    onSetVote(newVote, index);
  };

  const handleSearchAlbum = (
    event: React.ChangeEvent<{}>,
    newValue: string | null
  ) => {
    const query = `${vote.artist} ${newValue}`;
    const newVote = { ...vote, album: newValue };

    if (query.length > 0) {
      searchByType(query, ["album"]).then((result) =>
        setAlbums(result.albums.items)
      );
    } else {
      setAlbums([]);
    }

    onSetVote(newVote, index);
  };

  const handleWrite = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVote = { ...vote, write: event.target.checked };
    onSetVote(newVote, index);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <Autocomplete
          freeSolo
          options={artists}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          onInputChange={handleSearchArtist}
          renderInput={(params) => (
            <TextField {...params} label="Interpret" variant="outlined" />
          )}
        />
      </div>
      <div>
        <Autocomplete
          freeSolo
          options={albums}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          onInputChange={handleSearchAlbum}
          renderInput={(params) => (
            <TextField {...params} label="Album" variant="outlined" />
          )}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={vote.write}
              onChange={handleWrite}
              name="write"
            />
          }
          label="Chci psát"
        />
      </div>
    </div>
  );
};
