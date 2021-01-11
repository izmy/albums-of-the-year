import * as React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  Paper,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";
import { NominatedAlbum } from "../../models/nominatedAlbums.types";

interface NominatedAlbumsTableProps {
  results: NominatedAlbum[];
}

export const NominatedAlbumsListTable: React.FC<NominatedAlbumsTableProps> = ({
  results,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Tabulka nominovaných alb">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Interpret</StyledTableCell>
            <StyledTableCell>Album</StyledTableCell>
            <StyledTableCell>Počet nominací</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {results.map((result, index) => (
            <StyledTableRow key={`${result.artist}-${result.album}-${index}`}>
              <StyledTableCell scope="row">{result.artist}</StyledTableCell>
              <StyledTableCell scope="row">{result.album}</StyledTableCell>
              <StyledTableCell scope="row">
                {result.countOfVoters}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
