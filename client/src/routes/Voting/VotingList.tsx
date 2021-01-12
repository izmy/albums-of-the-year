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
import { NominatedAlbum } from "../../models/nominatedAlbums.types";

interface VotingListProps {
  heading: string;
  items: Vote[];
  nominatedAlbums: NominatedAlbum[];
  onSetVotingList: (vote: Vote) => void;
}

export const VotingList: React.FC<VotingListProps> = ({
  heading,
  items,
  nominatedAlbums,
  onSetVotingList,
}) => {
  return (
    <div>
      <h2>{heading}</h2>
      <TableContainer
        component={Paper}
        style={{ maxWidth: "700px", margin: "auto" }}
      >
        <Table aria-label="Hlasovací tabulka">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Interpret - Album</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {items.map((vote) => (
              <VoteSelect
                key={`${vote.type}-${vote.rank}`}
                vote={vote}
                nominatedAlbums={nominatedAlbums}
                onSetVote={onSetVotingList}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
