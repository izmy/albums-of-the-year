import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import * as React from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Results } from "../../models/results.types";
import { getResults } from "../../services/api/resultsApi";
import { UserContext } from "../../services/UserContext";
import { ResultsListTable } from "./ResultsListTable";
import { ResultsStats } from "./ResultsStats";
import { ResultsVoters } from "./ResultsVoters";
import { getAllVotes } from "../../services/api/votesApi";
import { isAdmin } from "../../utils/users.utils";
import { Vote } from "../../models/votes.types";
import { getAllUsers } from "../../services/api/usersApi";
import { UserList } from "../../models/user.types";

export const ResultsList: React.FC = () => {
  const { userData } = React.useContext(UserContext);
  const [results, setResults] = React.useState<Results[]>([]);
  const [currentVotes, setCurrentVotes] = React.useState<Vote[]>([]);
  const [users, setUsers] = React.useState<UserList>({});
  const [submenu, setSubmenu] = React.useState("RESULTS");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      loadResults();
      if (userData?.user && isAdmin(userData?.user?.role)) {
        loadAllVotes();
        loadAllUsers();
      }
      setLoading(false);
    };

    fetchData();
  }, [userData?.user]);

  const loadResults = async () => {
    const results = await getResults();

    setResults(results.data);
  };

  const loadAllVotes = async () => {
    const allVotes = await getAllVotes();

    const currentVotes = allVotes.data.filter(
      (vote) => vote.type === "global-2024" || vote.type === "czech-2024"
    );

    setCurrentVotes(currentVotes);
  };

  const loadAllUsers = async () => {
    const allUsers = await getAllUsers();
    const allUsersInObject = allUsers.data.reduce((acc, curr) => {
      acc[curr._id] = curr;

      return acc;
    }, {}) as UserList;

    setUsers(allUsersInObject);
  };

  const handleChangeTable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmenu((event.target as HTMLInputElement).value);
  };

  const handleUpdateData = (newVote: Vote) => {
    loadResults();

    setCurrentVotes((currentVotes) =>
      currentVotes.map((vote) => (vote._id === newVote._id ? newVote : vote))
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Výsledky hlasování</h1>

      <FormControl>
        <RadioGroup
          row
          aria-label="submenu"
          name="submenu"
          value={submenu}
          onChange={handleChangeTable}
        >
          <FormControlLabel
            value="RESULTS"
            control={<Radio />}
            label="Seřazené výsledky"
          />
          <FormControlLabel
            value="STATS"
            control={<Radio />}
            label="Statistika hlasů"
          />
          <FormControlLabel
            value="VOTERS"
            control={<Radio />}
            label="Hlasující"
          />
        </RadioGroup>
      </FormControl>

      {submenu === "RESULTS" ? (
        true ? (
          <>
            <h2>Zahraniční alba</h2>
            <ResultsListTable
              results={
                results.filter((vote) => vote.type === "global-2024")[0]
                  ?.results ?? []
              }
              currentVotes={currentVotes}
              users={users}
              showWriteColumn={true}
              onUpdateData={handleUpdateData}
            />

            <h2>Česká alba</h2>
            <ResultsListTable
              results={
                results.filter((vote) => vote.type === "czech-2024")[0]
                  ?.results ?? []
              }
              currentVotes={currentVotes}
              users={users}
              showWriteColumn={true}
              onUpdateData={handleUpdateData}
            />
          </>
        ) : (
          <p>Výsledky zatím nejsou k dispozici.</p>
        )
      ) : null}

      {submenu === "STATS" ? <ResultsStats /> : null}
      {submenu === "VOTERS" ? <ResultsVoters user={userData?.user} /> : null}
    </div>
  );
};
