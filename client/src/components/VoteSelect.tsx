import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import * as React from "react";
import { NominatedAlbum } from "../models/nominatedAlbums.types";
import { Vote } from "../models/votes.types";
import { RankBullet } from "./RankBullet";
import { StyledTableCell, StyledTableRow } from "./StyledTable";

interface VoteSelectProps {
  vote: Vote;
  nominatedAlbums: NominatedAlbum[];
  onSetVote: (vote: Vote) => void;
}

export const VoteSelect: React.FC<VoteSelectProps> = React.memo(
  ({ vote, nominatedAlbums, onSetVote }) => {
    const handleSelectAlbum = async (
      _event: React.ChangeEvent<{}>,
      value: NominatedAlbum | null
    ) => {
      const newVote = value
        ? { ...vote, artist: value.artist, album: value.album }
        : { ...vote, artist: "", album: "" };
      onSetVote(newVote);
    };

    return (
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">
          <RankBullet value={vote.rank} size={30} />
        </StyledTableCell>
        <StyledTableCell>
          <Autocomplete
            options={nominatedAlbums}
            getOptionLabel={(option) => `${option.artist} - ${option.album}`}
            style={{ width: 600 }}
            value={
              nominatedAlbums.find(
                (nominatedAlbum) =>
                  nominatedAlbum.artist === vote.artist &&
                  nominatedAlbum.album === vote.album
              ) ?? null
            }
            onChange={handleSelectAlbum}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Interpret - Album"
                variant="outlined"
              />
            )}
          />
        </StyledTableCell>
      </StyledTableRow>
    );
  }
);
