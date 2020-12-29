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
import { Result } from "../../models/results.types";

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

interface ResultsListTableProps {
  results: Result[];
}

export const ResultsListTable: React.FC<ResultsListTableProps> = ({
  results,
}) => {
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
          {results.map((result, index) => (
            <StyledTableRow key={`${result.type}-${index}`}>
              <StyledTableCell scope="row">{index + 1}.</StyledTableCell>
              <StyledTableCell scope="row">{result.artist}</StyledTableCell>
              <StyledTableCell scope="row">{result.album}</StyledTableCell>
              <StyledTableCell scope="row">
                {result.ranks.length}
              </StyledTableCell>
              <StyledTableCell scope="row">{result.points}</StyledTableCell>
              <StyledTableCell scope="row">
                {result.writeByUser !== undefined ? result.writeByUser : "-"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
