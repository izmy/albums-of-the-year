import { Container } from "@material-ui/core";
import * as React from "react";
import { Header } from "./Header";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  text-align: center;
  margin-bottom: 60px;
`;

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <StyledContainer maxWidth="lg">{children}</StyledContainer>
    </>
  );
};
