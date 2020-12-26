import * as React from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { getResults } from "../../services/api/resultsApi";
import { ResultsTable } from "./ResultsTable";

export const Results: React.FC = () => {
  const [votes, setVotes] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const allVotes = await getResults();

      setVotes(allVotes.data);
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
      <ResultsTable
        rows={votes.filter((vote) => vote.type === "global")[0]?.results ?? []}
      />

      <h2>České desky</h2>
      <ResultsTable
        rows={votes.filter((vote) => vote.type === "czech")[0]?.results ?? []}
      />
    </div>
  );
};
