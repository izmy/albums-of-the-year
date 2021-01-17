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
  const [duplicates, setDuplicates] = React.useState<string[]>([]);

  React.useEffect(() => {
    const duplicatesObject = votes.reduce((acc, curr) => {
      acc[`${curr.artist} - ${curr.album}`] =
        ++acc[`${curr.artist} - ${curr.album}`] || 1;
      return acc;
    }, {});

    const duplicates = Object.entries(duplicatesObject)
      .filter((duplicate) => Number(duplicate[1]) > 1)
      .map((duplicate) => duplicate[0]);

    setDuplicates(duplicates);
  }, [votes]);

  return (
    <>
      <h2>{title}</h2>

      {duplicates.length > 0 ? (
        <p style={{ fontWeight: 700, color: "red" }}>
          Duplicity:{" "}
          {duplicates.map((duplicate, index) => (
            <span key={duplicate}>{(index ? ", " : "") + duplicate}</span>
          ))}
        </p>
      ) : null}

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
