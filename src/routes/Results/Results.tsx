import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import styled from "styled-components";
import { getAllVotes } from "../../services/api/votesApi";
import { ResultsTable } from "./ResultsTable";

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
`;

export const Results: React.FC = () => {
  const [votes, setVotes] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const allVotes = await getAllVotes();

      setVotes(allVotes.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title>Výsledky hlasování</Title>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Title>Zahraniční desky</Title>
          <ResultsTable
            rows={
              votes.filter((vote) => vote.type === "global")[0]?.results ?? []
            }
          />

          <Title>České desky</Title>
          <ResultsTable
            rows={
              votes.filter((vote) => vote.type === "czech")[0]?.results ?? []
            }
          />
        </>
      )}
    </div>
  );
};
