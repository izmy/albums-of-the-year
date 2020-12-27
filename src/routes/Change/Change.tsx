import * as React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { UserList } from "../../models/user.types";
import { Vote } from "../../models/votes.types";
import { getAllUsers } from "../../services/api/usersApi";
import { getAllVotes, updateVote } from "../../services/api/votesApi";
import { ChangeItem } from "./ChangeItem";

const FilterTextField = styled(TextField)`
  width: 100%;
  max-width: 500px;
  margin-bottom: 50px;
`;

export const Change: React.FC = () => {
  const [votes, setVotes] = React.useState<Vote[]>([]);
  const [filteredVotes, setFilteredVotes] = React.useState<Vote[]>([]);
  const [users, setUsers] = React.useState<UserList>({});
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const allVotes = await getAllVotes();
      setVotes(allVotes.data);
      setFilteredVotes(allVotes.data);

      const allUsers = await getAllUsers();
      const allUsersInObject = allUsers.data.reduce((acc, curr) => {
        acc[curr._id] = curr;

        return acc;
      }, {}) as UserList;

      setUsers(allUsersInObject);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filterVotes = React.useCallback(
    (filteredValue: string, sourceVotes: Vote[]) => {
      const filteredVotes = sourceVotes.filter((vote) => {
        const value = `${vote.artist} ${vote.album}`.toLowerCase();
        return value.includes(filteredValue);
      });
      setFilteredVotes(filteredVotes);
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

      {filteredVotes.map((vote) => (
        <ChangeItem
          key={vote._id}
          users={users}
          vote={vote}
          onChangeVotes={handleChangeVotes}
          onSaveVote={handleSaveVote}
        />
      ))}
    </>
  );
};
