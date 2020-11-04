import * as React from "react";
import { Vote } from "./Voting";
import { VotingLine } from "./VotingLine";

interface VotingListProps {
  items: Vote[];
  onSetVotingList: (vote: Vote[]) => void;
}

export const VotingList: React.FC<VotingListProps> = ({
  items,
  onSetVotingList,
}) => {
  const handleVoteItem = (vote, index) => {
    const newVotingList = [...items];
    newVotingList[index] = vote;

    onSetVotingList(newVotingList);
  };

  return (
    <div>
      {items.map((vote, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          {console.log("vote", vote, index)}
          <span
            style={{
              background: "purple",
              color: "white",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {index + 1}.
          </span>{" "}
          <VotingLine
            vote={vote}
            onSetVote={(vote) => handleVoteItem(vote, index)}
          />
        </div>
      ))}
    </div>
  );
};
