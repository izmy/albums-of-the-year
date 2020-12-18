import { Container } from "@material-ui/core";
import * as React from "react";
import { Header } from "./Header";

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};
