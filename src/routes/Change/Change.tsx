import { TextField } from "@material-ui/core";
import * as React from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { UserList } from "../../models/user.types";
import { Vote } from "../../models/votes.types";
import { getAllUsers } from "../../services/api/usersApi";
import { getAllVotes, updateVote } from "../../services/api/votesApi";
import { ChangeList } from "./ChangeList";

export const Change: React.FC = () => {
  const [votes, setVotes] = React.useState<Vote[]>([]);
  const [users, setUsers] = React.useState<UserList>({});
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const allVotes = await getAllVotes();
      setVotes(allVotes.data);

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

  const handleSaveVote = (vote: Vote) => {
    if (vote._id && window.confirm("Chcete uložit změny?")) {
      updateVote(vote._id, vote);
    }
  };

  const handleChangeVotes = React.useCallback((newVote: Vote) => {
    setVotes((prevVotes) => {
      return prevVotes.map((vote) =>
        vote._id === newVote._id ? newVote : vote
      );
    });
  }, []);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    setFilter(filterValue.toLowerCase());
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredVotes = votes.filter((vote) => {
    const value = `${vote.artist} ${vote.album}`.toLowerCase();
    return value.includes(filter);
  });

  return (
    <div>
      <h1>Upravit hlasování</h1>
      <TextField
        label="Filtrovat"
        variant="outlined"
        value={filter}
        style={{ width: "50%", marginBottom: "50px" }}
        onChange={handleFilter}
      />

      <ChangeList
        users={users}
        votes={filteredVotes}
        onChangeVotes={handleChangeVotes}
        onSaveVote={handleSaveVote}
      />
    </div>
  );
};
