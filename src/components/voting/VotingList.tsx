import * as React from "react";
import { Vote } from "./Voting";
import { VotingLine } from "./VotingLine";

interface VotingListProps {
  items: Vote[];
  onSetVotingList: (vote: Vote, index: number) => void;
}

export const VotingList: React.FC<VotingListProps> = ({
  items,
  onSetVotingList,
}) => {
  return (
    <div>
      {items.map((vote, index) => (
        <div
          key={vote.id}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
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
          <VotingLine vote={vote} index={vote.id} onSetVote={onSetVotingList} />
        </div>
      ))}
    </div>
  );
};
