import { Button } from "@material-ui/core";
import * as React from "react";
import { VotingLine } from "./VotingLine";
import { VotingList } from "./VotingList";

export interface Vote {
  id: number;
  artist: string | null;
  album: string | null;
  write: boolean;
}

export const Voting = () => {
  const [foreignAlbums, setForeignAlbums] = React.useState(
    new Array<Vote>(20)
      .fill({
        id: 0,
        artist: "",
        album: "",
        write: false,
      })
      .map((vote, i) => ({ ...vote, id: i + 1 }))
  );
  const [czechAlbums, setCzechAlbums] = React.useState(
    new Array<Vote>(15)
      .fill({
        id: 0,
        artist: "",
        album: "",
        write: false,
      })
      .map((vote, i) => ({ ...vote, id: i + 1 }))
  );

  const handleSubmit = () => {
    console.log({
      foreignAlbums,
      czechAlbums,
    });
  };

  const handleTest = (vote, index) => {
    const votingList = [...foreignAlbums];
    votingList[index] = vote;
    setForeignAlbums(votingList);
  };

  return (
    <div>
      <h2>Zahraniční desky</h2>
      {/* <VotingList items={foreignAlbums} onSetVotingList={handleTest} /> */}
      {foreignAlbums.map((vote) => (
        <VotingLine
          key={vote.id}
          vote={vote}
          index={vote.id}
          onSetVote={handleTest}
        />
      ))}

      {/* <h2>České desky</h2>
      <VotingList items={czechAlbums} onSetVotingList={handleTest} /> */}

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
