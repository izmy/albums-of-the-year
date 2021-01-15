import * as React from "react";
import { Vote } from "../../models/votes.types";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";
import { VoteSelect } from "../../components/VoteSelect";
import { Result } from "../../models/results.types";

interface VotingListProps {
  heading: string;
  items: Vote[];
  nominatedAlbumsResults: Result[];
  onSetVotingList: (vote: Vote) => void;
  onSwapVotes: (vote: Vote, type: string) => void;
}

export const VotingList: React.FC<VotingListProps> = ({
  heading,
  items,
  nominatedAlbumsResults,
  onSetVotingList,
  onSwapVotes,
}) => {
  return (
    <div>
      <h2>{heading}</h2>
      <TableContainer
        component={Paper}
        style={{ maxWidth: "780px", margin: "auto" }}
      >
        <Table aria-label="Hlasovací tabulka">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Interpret - Album</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {items.map((vote) => (
              <VoteSelect
                key={`${vote.type}-${vote.rank}`}
                vote={vote}
                nominatedAlbumsResults={nominatedAlbumsResults}
                onSetVote={onSetVotingList}
                onSwapVotes={onSwapVotes}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
