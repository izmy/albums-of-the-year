import * as React from "react";
import styled from "styled-components";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
} from "@material-ui/core";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { UserList } from "../../models/user.types";
import { Vote } from "../../models/votes.types";
import { getAllUsers } from "../../services/api/usersApi";
import { getAllVotes, updateVote } from "../../services/api/votesApi";
import { ChangeItem } from "./ChangeItem";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";

const MAX_VOTES = 200;

const FilterTextField = styled(TextField)`
  width: 100%;
  max-width: 500px;
`;

export const Change: React.FC = () => {
  const [votes, setVotes] = React.useState<Vote[]>([]);
  const [filteredVotes, setFilteredVotes] = React.useState<Vote[]>([]);
  const [users, setUsers] = React.useState<UserList>({});
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const allUsers = await getAllUsers();
      const allUsersInObject = allUsers.data.reduce((acc, curr) => {
        acc[curr._id] = curr;

        return acc;
      }, {}) as UserList;

      setUsers(allUsersInObject);

      const allVotes = await getAllVotes();
      setVotes(
        allVotes.data.map((vote) => ({
          ...vote,
          searchText: `${vote.artist} ${vote.album} ${
            vote.userId ? allUsersInObject[vote.userId]?.name : ""
          }`.toLowerCase(),
        }))
      );
      setFilteredVotes(allVotes.data.slice(0, MAX_VOTES));

      setLoading(false);
    };

    fetchData();
  }, []);

  const filterVotes = React.useCallback(
    (filteredValue: string, sourceVotes: Vote[]) => {
      const filteredVotes = sourceVotes.filter((vote) => {
        return vote.searchText?.includes(filteredValue);
      });
      setFilteredVotes(filteredVotes.slice(0, MAX_VOTES));
    },
    []
  );

  const handleSaveVote = React.useCallback((vote: Vote) => {
    if (vote._id && window.confirm("Chcete uložit změny?")) {
      updateVote(vote._id, vote);
    }
  }, []);

  const handleChangeVotes = React.useCallback(
    (newVote: Vote) => {
      setVotes((prevVotes) => {
        const newVotes = prevVotes.map((vote) =>
          vote._id === newVote._id ? newVote : vote
        );
        filterVotes(filter, newVotes);
        return newVotes;
      });
    },
    [filter, filterVotes, setVotes]
  );

  const handleFilter = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const filterValue = event.target.value.toLowerCase();
      setFilter(filterValue);
      filterVotes(filterValue, votes);
    },
    [votes, filterVotes]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1>Upravit hlasování</h1>
      <FilterTextField
        label="Filtrovat"
        variant="outlined"
        value={filter}
        onChange={handleFilter}
      />

      <p style={{ marginBottom: "20px" }}>
        Zobrazeno {filteredVotes.length} z {votes.length} hlasů.
      </p>

      <TableContainer component={Paper}>
        <Table aria-label="Tabulka pro úpravu hlasů">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Kategorie</StyledTableCell>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Interpret</StyledTableCell>
              <StyledTableCell>Album</StyledTableCell>
              <StyledTableCell>Hlasující</StyledTableCell>
              <StyledTableCell align="center">Píše</StyledTableCell>
              <StyledTableCell>Akce</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filteredVotes.map((vote) => (
              <ChangeItem
                key={vote._id}
                users={users}
                vote={vote}
                onChangeVotes={handleChangeVotes}
                onSaveVote={handleSaveVote}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
