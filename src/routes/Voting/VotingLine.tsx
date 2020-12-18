import { Checkbox, FormControlLabel, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import * as React from "react";
import {
  SpotifyAlbumSimplified,
  SpotifyArtist,
} from "../../models/spotify.types";
import { Vote } from "../../models/votes.types";
import { searchByType } from "../../services/api/spotifyApi";
import styled from "styled-components";

const VotingLineRank = styled.span<{ size: number }>`
  background: #007dc5;
  color: white;
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface VotingLineProps {
  vote: Vote;
  onSetVote: (vote: Vote) => void;
}

export const VotingLine: React.FC<VotingLineProps> = React.memo(
  ({ vote, onSetVote }) => {
    const [artists, setArtists] = React.useState<SpotifyArtist[]>([]);
    const [albums, setAlbums] = React.useState<SpotifyAlbumSimplified[]>([]);

    const handleSearchArtist = (
      _event: React.ChangeEvent<{}>,
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

      onSetVote(newVote);
    };

    const handleSearchAlbum = (
      _event: React.ChangeEvent<{}>,
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

      onSetVote(newVote);
    };

    const handleWrite = () => {
      const newVote = { ...vote, write: !vote.write };
      onSetVote(newVote);
    };

    return (
      <Grid container alignItems="center" justify="center" spacing={3}>
        <Grid item>
          <VotingLineRank size={30}>{vote.rank}.</VotingLineRank>
        </Grid>
        <Grid item>
          <Autocomplete
            freeSolo
            options={artists}
            getOptionLabel={(option) => {
              if (option.name === undefined) {
                return (option as unknown) as string;
              }
              return option.name;
            }}
            style={{ width: 300 }}
            onInputChange={handleSearchArtist}
            renderInput={(params) => (
              <TextField {...params} label="Interpret" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={vote.write}
                onChange={handleWrite}
                onKeyPress={handleWrite}
                name="write"
              />
            }
            label="Chci psát"
          />
        </Grid>
      </Grid>
    );
  }
);
