import * as React from "react";
import styled from "styled-components";

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
`;

export const Change: React.FC = () => {
  return (
    <div>
      <Title>Upravit hlasování</Title>
    </div>
  );
};
