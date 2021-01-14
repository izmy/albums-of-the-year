import { IconButton, TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import * as React from "react";
import { SpotifyAlbumSimplified, SpotifyArtist } from "../models/spotify.types";
import { Vote } from "../models/votes.types";
import { searchByType } from "../services/api/spotifyApi";
import { RankBullet } from "./RankBullet";
import { StyledTableCell, StyledTableRow } from "./StyledTable";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

interface VoteInputProps {
  vote: Vote;
  onSetVote: (vote: Vote) => void;
  onSwapVotes: (vote: Vote, type: string) => void;
}

export const VoteInput: React.FC<VoteInputProps> = React.memo(
  ({ vote, onSetVote, onSwapVotes }) => {
    const [artists, setArtists] = React.useState<SpotifyArtist[]>([]);
    const [albums, setAlbums] = React.useState<SpotifyAlbumSimplified[]>([]);

    const handleSearchArtist = async (
      event: React.ChangeEvent<{}>,
      newValue: string | null
    ) => {
      const newVote = { ...vote, artist: newValue };

      if (newValue !== null && newValue.length > 0 && event !== null) {
        searchByType(newValue, ["artist"]).then((result) =>
          setArtists(result.artists.items)
        );
      } else {
        setArtists([]);
      }

      onSetVote(newVote);
    };

    const handleSearchAlbum = (
      event: React.ChangeEvent<{}>,
      newValue: string | null
    ) => {
      const query = `${vote.artist} ${newValue}`;
      const newVote = { ...vote, album: newValue };

      if (query.length > 0 && event !== null) {
        searchByType(query, ["album"]).then((result) =>
          setAlbums(result.albums.items)
        );
      } else {
        setAlbums([]);
      }

      onSetVote(newVote);
    };

    return (
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">
          <RankBullet value={vote.rank} size={30} />
        </StyledTableCell>
        <StyledTableCell>
          <Autocomplete
            freeSolo
            options={artists}
            getOptionLabel={(option) => {
              if (option.name === undefined) {
                return (option as unknown) as string;
              }
              return option.name;
            }}
            style={{ width: 280 }}
            inputValue={vote.artist ?? ""}
            onInputChange={handleSearchArtist}
            renderInput={(params) => (
              <TextField {...params} label="Interpret" variant="outlined" />
            )}
            filterOptions={(options, params) => {
              const filtered = createFilterOptions<SpotifyArtist>()(
                options,
                params
              );

              if (params.inputValue !== "" && filtered.length <= 0) {
                filtered.push({
                  name: params.inputValue,
                } as SpotifyArtist);
              }

              return filtered;
            }}
          />
        </StyledTableCell>
        <StyledTableCell>
          <Autocomplete
            freeSolo
            options={albums}
            getOptionLabel={(option) => {
              if (option.name === undefined) {
                return (option as unknown) as string;
              }
              return option.name;
            }}
            inputValue={vote.album ?? ""}
            style={{ width: 280 }}
            onInputChange={handleSearchAlbum}
            renderInput={(params) => (
              <TextField {...params} label="Album" variant="outlined" />
            )}
            filterOptions={(options, params) => {
              const filtered = createFilterOptions<SpotifyAlbumSimplified>()(
                options,
                params
              );

              if (params.inputValue !== "" && filtered.length <= 0) {
                filtered.push({
                  name: params.inputValue,
                } as SpotifyAlbumSimplified);
              }

              return filtered;
            }}
          />
        </StyledTableCell>
        <StyledTableCell>
          <IconButton onClick={() => onSwapVotes(vote, "UP")}>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton onClick={() => onSwapVotes(vote, "DOWN")}>
            <ArrowDownwardIcon />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
    );
  }
);
