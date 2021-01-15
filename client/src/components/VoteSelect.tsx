import { IconButton, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import * as React from "react";
import { Vote } from "../models/votes.types";
import { RankBullet } from "./RankBullet";
import { StyledTableCell, StyledTableRow } from "./StyledTable";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Result } from "../models/results.types";

interface VoteSelectProps {
  vote: Vote;
  nominatedAlbumsResults: Result[];
  onSetVote: (vote: Vote) => void;
  onSwapVotes: (vote: Vote, type: string) => void;
}

export const VoteSelect: React.FC<VoteSelectProps> = React.memo(
  ({ vote, nominatedAlbumsResults, onSetVote, onSwapVotes }) => {
    const handleSelectAlbum = async (
      _event: React.ChangeEvent<{}>,
      value: Result | null
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
            options={nominatedAlbumsResults}
            getOptionLabel={(option) => `${option.artist} - ${option.album}`}
            style={{ width: 600 }}
            value={
              nominatedAlbumsResults.find(
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
