import * as React from "react";
import { TextField, Button, Checkbox } from "@material-ui/core";
import { UserList } from "../../models/user.types";
import { Vote } from "../../models/votes.types";
import SaveIcon from "@material-ui/icons/Save";
import { RankBullet } from "../../components/RankBullet";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";

interface ChangeItemProps {
  users: UserList;
  vote: Vote;
  onChangeVotes: (vote: Vote) => void;
  onSaveVote: (vote: Vote) => void;
}

export const ChangeItem: React.FC<ChangeItemProps> = React.memo(
  ({ users, vote, onChangeVotes, onSaveVote }) => {
    const handleChangeArtist = (newValue: string, vote: Vote) => {
      onChangeVotes({ ...vote, artist: newValue });
    };

    const handleChangeAlbum = (newValue: string, vote: Vote) => {
      onChangeVotes({ ...vote, album: newValue });
    };

    const handleChangeWrite = (vote: Vote) => {
      onChangeVotes({ ...vote, write: !vote.write });
    };

    return (
      <StyledTableRow>
        <StyledTableCell>{vote.type}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <RankBullet value={vote.rank} size={30} />
        </StyledTableCell>
        <StyledTableCell>
          <TextField
            label="Interpret"
            variant="outlined"
            value={vote.artist}
            style={{ width: 300 }}
            onChange={(event) => handleChangeArtist(event.target.value, vote)}
          />
        </StyledTableCell>
        <StyledTableCell>
          <TextField
            label="Album"
            variant="outlined"
            value={vote.album}
            style={{ width: 300 }}
            onChange={(event) => handleChangeAlbum(event.target.value, vote)}
          />
        </StyledTableCell>
        <StyledTableCell>
          {vote.userId && users[vote.userId]?.name}
        </StyledTableCell>
        <StyledTableCell>
          <Checkbox
            checked={vote.write}
            onChange={(event) => handleChangeWrite(vote)}
            onKeyPress={(event) => handleChangeWrite(vote)}
            name="wantWrite"
          />
        </StyledTableCell>
        <StyledTableCell>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onSaveVote(vote)}
            startIcon={<SaveIcon />}
          >
            Uložit
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    );
  }
);
