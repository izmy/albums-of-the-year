import * as React from "react";
import { VoteInput } from "../../components/VoteInput";
import { Vote } from "../../models/votes.types";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";

interface NominateListProps {
  heading: string;
  items: Vote[];
  onSetNominateList: (vote: Vote) => void;
  onSwapVotes: (vote: Vote, type: string) => void;
}

export const NominateList: React.FC<NominateListProps> = ({
  heading,
  items,
  onSetNominateList,
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
              <StyledTableCell>Interpret</StyledTableCell>
              <StyledTableCell>Album</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {items.map((vote) => (
              <VoteInput
                key={`${vote.type}-${vote.rank}`}
                vote={vote}
                onSetVote={onSetNominateList}
                onSwapVotes={onSwapVotes}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
