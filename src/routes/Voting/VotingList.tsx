import * as React from "react";
import { VotingListItem } from "./VotingListItem";
import { Vote } from "../../models/votes.types";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../Results/ResultsListTable";

interface VotingListProps {
  heading: string;
  items: Vote[];
  onSetVotingList: (vote: Vote) => void;
}

export const VotingList: React.FC<VotingListProps> = ({
  heading,
  items,
  onSetVotingList,
}) => {
  return (
    <div>
      <h2>{heading}</h2>
      <TableContainer
        component={Paper}
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <Table aria-label="Hlasovací tabulka">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Interpret</StyledTableCell>
              <StyledTableCell>Album</StyledTableCell>
              <StyledTableCell align="center">Chci psát</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {items.map((vote) => (
              <VotingListItem
                key={`${vote.type}-${vote.rank}`}
                vote={vote}
                onSetVote={onSetVotingList}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
