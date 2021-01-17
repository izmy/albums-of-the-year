import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";
import { getUsersVotesCount } from "../../services/api/resultsApi";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const ResultsStats: React.FC = () => {
  const [usersVotesCount, setUsersVotesCount] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const usersVotesCount = await getUsersVotesCount();
      setUsersVotesCount(usersVotesCount.data);

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h2>Seznam hlasujících</h2>
      <TableContainer component={Paper}>
        <Table aria-label="Tabulka hlasů">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell colSpan={2}>Zahraniční</StyledTableCell>
              <StyledTableCell colSpan={2}>České</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Jméno</StyledTableCell>
              <StyledTableCell>Nominace</StyledTableCell>
              <StyledTableCell>Finále</StyledTableCell>
              <StyledTableCell>Nominace</StyledTableCell>
              <StyledTableCell>Finále</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {usersVotesCount.map((u) => (
              <StyledTableRow key={u.user}>
                <StyledTableCell scope="row">{u.user}</StyledTableCell>
                <StyledTableCell scope="row">
                  {u.votes.find(
                    (vote) => vote.type === "nomination-global-2020"
                  )?.count ?? 0}
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {u.votes.find((vote) => vote.type === "global-2020")?.count ??
                    0}
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {u.votes.find((vote) => vote.type === "nomination-czech-2020")
                    ?.count ?? 0}
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {u.votes.find((vote) => vote.type === "czech-2020")?.count ??
                    0}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow style={{ background: "#cae8ff" }}>
              <StyledTableCell>
                <strong>Celkem: {usersVotesCount.length}</strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>
                  {usersVotesCount.reduce((acc, curr) => {
                    const count =
                      curr.votes?.find(
                        (v) => v.type === "nomination-global-2020"
                      )?.count ?? 0;
                    return acc + count;
                  }, 0)}
                </strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>
                  {usersVotesCount.reduce((acc, curr) => {
                    const count =
                      curr.votes?.find((v) => v.type === "global-2020")
                        ?.count ?? 0;
                    return acc + count;
                  }, 0)}
                </strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>
                  {usersVotesCount.reduce((acc, curr) => {
                    const count =
                      curr.votes?.find(
                        (v) => v.type === "nomination-czech-2020"
                      )?.count ?? 0;
                    return acc + count;
                  }, 0)}
                </strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>
                  {usersVotesCount.reduce((acc, curr) => {
                    const count =
                      curr.votes?.find((v) => v.type === "czech-2020")?.count ??
                      0;
                    return acc + count;
                  }, 0)}
                </strong>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
