import * as React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { UserList } from "../../models/user.types";
import { Vote } from "../../models/votes.types";
import SaveIcon from "@material-ui/icons/Save";
import CreateIcon from "@material-ui/icons/Create";

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

    return (
      <>
        <Grid container alignItems="center" justify="center" spacing={3}>
          <Grid xs={2} item>
            {vote.userId && users[vote.userId]?.name}
          </Grid>
          <Grid item>
            <TextField
              label="Interpret"
              variant="outlined"
              value={vote.artist}
              style={{ width: 300 }}
              onChange={(event) => handleChangeArtist(event.target.value, vote)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Album"
              variant="outlined"
              value={vote.album}
              style={{ width: 300 }}
              onChange={(event) => handleChangeAlbum(event.target.value, vote)}
            />
          </Grid>
          <Grid xs={1} item>
            {vote.write ? <CreateIcon /> : null}
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onSaveVote(vote)}
              startIcon={<SaveIcon />}
            >
              Uložit
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
);
