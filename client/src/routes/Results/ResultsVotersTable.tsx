import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";

interface ResultsVotersTableProps {
  title: string;
  votes: any;
}

export const ResultsVotersTable: React.FC<ResultsVotersTableProps> = ({
  title,
  votes,
}) => {
  return (
    <>
      <h2>{title}</h2>
      <TableContainer component={Paper}>
        <Table aria-label="Tabulka hlasů">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Interpret</StyledTableCell>
              <StyledTableCell>Album</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {votes.length > 0 ? (
              votes.map((vote) => (
                <StyledTableRow
                  key={`${vote.rank}-${vote.artist}-${vote.album}`}
                >
                  <StyledTableCell scope="row">{vote.rank}</StyledTableCell>
                  <StyledTableCell scope="row">{vote.artist}</StyledTableCell>
                  <StyledTableCell scope="row">{vote.album}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell scope="row" colSpan={3} align="center">
                  Žádný hlas
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
