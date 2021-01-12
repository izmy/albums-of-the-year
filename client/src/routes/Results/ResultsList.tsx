import * as React from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Results } from "../../models/results.types";
import { getResults } from "../../services/api/resultsApi";
import { ResultsListTable } from "./ResultsListTable";

export const ResultsList: React.FC = () => {
  const [results, setResults] = React.useState<Results[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const results = await getResults();

      setResults(results.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Výsledky hlasování</h1>

      <h2>Zahraniční desky</h2>
      <ResultsListTable
        results={
          results.filter((vote) => vote.type === "global-2020")[0]?.results ??
          []
        }
      />

      <h2>České desky</h2>
      <ResultsListTable
        results={
          results.filter((vote) => vote.type === "czech-2020")[0]?.results ?? []
        }
      />
    </div>
  );
};
