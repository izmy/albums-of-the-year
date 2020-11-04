import { Button } from "@material-ui/core";
import * as React from "react";
import { VotingList } from "./VotingList";

export interface Vote {
  artist: string | null;
  album: string | null;
  write: boolean;
}

export const Voting = () => {
  const [foreignAlbums, setForeignAlbums] = React.useState(
    new Array<Vote>(20).fill({
      artist: "",
      album: "",
      write: false,
    })
  );
  const [czechAlbums, setCzechAlbums] = React.useState(
    new Array<Vote>(1).fill({
      artist: "",
      album: "",
      write: false,
    })
  );

  const handleSubmit = () => {
    console.log({
      foreignAlbums,
      czechAlbums,
    });
  };

  const handleTest = (votingList) => {
    setForeignAlbums(votingList);
  };

  return (
    <div>
      <h2>Zahraniční desky</h2>
      <VotingList items={foreignAlbums} onSetVotingList={handleTest} />

      <h2>České desky</h2>
      <VotingList
        items={czechAlbums}
        onSetVotingList={(votingList) => setCzechAlbums(votingList)}
      />

      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSubmit}
        // className={classes.button}
        // startIcon={<SaveIcon />}
      >
        Hlasovat
      </Button>
    </div>
  );
};
