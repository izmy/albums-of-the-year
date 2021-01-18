import * as React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  Paper,
  Tooltip,
} from "@material-ui/core";
import { Result } from "../../models/results.types";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";
import { median } from "../../utils/medial.utils";

interface ResultsListTableProps {
  results: Result[];
  showWriteColumn: boolean;
}

export const ResultsListTable: React.FC<ResultsListTableProps> = ({
  results,
  showWriteColumn,
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
            <StyledTableCell>
              <Tooltip
                title='"Prostřední hodnota" pořadí ze všech hlasů.'
                placement="top"
              >
                <div>Medián</div>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell>Body</StyledTableCell>
            {showWriteColumn ? <StyledTableCell>Píše</StyledTableCell> : null}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {results.map((result, index) => (
            <StyledTableRow key={`${result.type}-${index}`}>
              <StyledTableCell scope="row">{index + 1}.</StyledTableCell>
              <StyledTableCell scope="row">{result.artist}</StyledTableCell>
              <StyledTableCell scope="row">{result.album}</StyledTableCell>
              <StyledTableCell scope="row">
                {result.countOfVoters}
              </StyledTableCell>
              <StyledTableCell scope="row">
                {median(result.ranks)}
              </StyledTableCell>
              <StyledTableCell scope="row">{result.points}</StyledTableCell>
              {showWriteColumn ? (
                <StyledTableCell scope="row">
                  {result.writeByUser !== undefined ? result.writeByUser : "-"}
                </StyledTableCell>
              ) : null}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
