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

export const ResultsList: React.FC = () => {
  const { userData } = React.useContext(UserContext);
  const [results, setResults] = React.useState<Results[]>([]);
  const [submenu, setSubmenu] = React.useState("RESULTS");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const results = await getResults();

      setResults(results.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChangeTable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmenu((event.target as HTMLInputElement).value);
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
                results.filter((vote) => vote.type === "global-2023")[0]
                  ?.results ?? []
              }
              showWriteColumn={true}
            />

            <h2>Česká alba</h2>
            <ResultsListTable
              results={
                results.filter((vote) => vote.type === "czech-2023")[0]
                  ?.results ?? []
              }
              showWriteColumn={true}
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
