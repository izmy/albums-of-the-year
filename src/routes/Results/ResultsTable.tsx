import * as React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import styled from "styled-components";

export const StyledTableCell = styled(TableCell)`
  &.MuiTableCell-head {
    color: white;
    background: #2c94e2;
    font-weight: 700;
  }
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const ResultsTable = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Tabulka výsledků">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Interpret</StyledTableCell>
            <StyledTableCell>Album</StyledTableCell>
            <StyledTableCell>Hlasy</StyledTableCell>
            <StyledTableCell>Body</StyledTableCell>
            <StyledTableCell>Píše</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell scope="row">{index + 1}.</StyledTableCell>
              <StyledTableCell scope="row">{row.artist}</StyledTableCell>
              <StyledTableCell scope="row">{row.album}</StyledTableCell>
              <StyledTableCell scope="row">{row.ranks.length}</StyledTableCell>
              <StyledTableCell scope="row">{row.points}</StyledTableCell>
              <StyledTableCell scope="row">
                {row.writeByUser ? row.writeByUser : "-"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
