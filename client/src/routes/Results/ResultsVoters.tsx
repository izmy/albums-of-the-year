import React from "react";
import styled from "styled-components";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { getUsersVotes } from "../../services/api/resultsApi";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { ResultsVotersTable } from "./ResultsVotersTable";
import { User } from "../../models/user.types";

const DisableButton = styled(Button)`
  text-decoration: none;
  background: #f75252;
  color: white;
  margin-bottom: 40px;

  &:hover {
    background: #cc0000;
    box-shadow: none;
  }
`;

const EnableButton = styled(Button)`
  text-decoration: none;
  background: #1bab1b;
  color: white;
  margin-bottom: 40px;

  &:hover {
    background: #0d920d;
    box-shadow: none;
  }
`;

interface ResultsVotersProps {
  user?: User;
}

export const ResultsVoters: React.FC<ResultsVotersProps> = ({ user }) => {
  const [userList, setUserList] = React.useState<string[]>([]);
  const [selectedUser, setSelectedUser] = React.useState("");
  const [usersVotes, setUsersVotes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const usersVotes = await getUsersVotes();
      setUsersVotes(usersVotes.data);

      const userList = usersVotes.data.map((user) => user.user);
      setUserList(userList);

      setLoading(false);
    };
    fetchData();
  }, []);

  const handleEnableShowVotes = () => {};

  const handleChangeUser = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedUser(event.target.value as string);
  };

  return (
    <>
      <h2>Hlasující</h2>

      {loading ? <LoadingSpinner /> : null}

      {user && userList.includes(user.name) ? (
        <DisableButton
          variant="contained"
          color="default"
          size="large"
          onClick={handleEnableShowVotes}
          startIcon={<CloseIcon />}
        >
          Zakázat zobrazení mých hlasů ostatním
        </DisableButton>
      ) : (
        <EnableButton
          variant="contained"
          color="default"
          size="large"
          onClick={handleEnableShowVotes}
          startIcon={<CheckIcon />}
        >
          Povolit zobrazení mých hlasů ostatním
        </EnableButton>
      )}

      <div
        style={{ maxWidth: "300px", textAlign: "left", margin: "0 auto 40px" }}
      >
        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Uživatel</InputLabel>
          <Select
            value={selectedUser}
            onChange={handleChangeUser}
            label="Uživatel"
          >
            <MenuItem value="">--</MenuItem>
            {userList.map((user) => (
              <MenuItem key={user} value={user}>
                {user}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <ResultsVotersTable
        title={"Nominace - Zahraniční alba"}
        votes={
          usersVotes
            ?.find((usersVotes) => usersVotes.user === selectedUser)
            ?.votes.find((votes) => votes.type === "nomination-global-2020")
            ?.votes ?? []
        }
      />

      <ResultsVotersTable
        title={"Finále - Zahraniční alba"}
        votes={
          usersVotes
            ?.find((usersVotes) => usersVotes.user === selectedUser)
            ?.votes.find((votes) => votes.type === "global-2020")?.votes ?? []
        }
      />

      <ResultsVotersTable
        title={"Nominace - Česká alba"}
        votes={
          usersVotes
            ?.find((usersVotes) => usersVotes.user === selectedUser)
            ?.votes.find((votes) => votes.type === "nomination-czech-2020")
            ?.votes ?? []
        }
      />

      <ResultsVotersTable
        title={"Finále - Česká alba"}
        votes={
          usersVotes
            ?.find((usersVotes) => usersVotes.user === selectedUser)
            ?.votes.find((votes) => votes.type === "czech-2020")?.votes ?? []
        }
      />
    </>
  );
};
