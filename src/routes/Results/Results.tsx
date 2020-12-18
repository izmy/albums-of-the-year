import * as React from "react";
import styled from "styled-components";
import { getAllVotes } from "../../services/api/votesApi";

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
`;

export const Results: React.FC = () => {
  const [votes, setVotes] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const allVotes = await getAllVotes();

      setVotes(allVotes.data);
    };

    fetchData();
  }, []);

  console.log(votes);

  return (
    <div>
      <Title>Výsledky hlasování</Title>

      <ul>
        {/* {votes.map((item) => (
          <li key={item.album}>
            {item.artist} - {item.album}
          </li>
        ))} */}
      </ul>
    </div>
  );
};
