import "./app.scss";
import * as React from "react";
import { Voting } from "../voting/Voting";
import styled from "styled-components";

const Header = styled.header`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const App = () => {
  return (
    <div className="App">
      <Header>Hlasování</Header>
      <Voting />
    </div>
  );
};

export default App;
