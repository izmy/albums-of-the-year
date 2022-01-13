import * as React from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../services/UserContext";
import { UserMenu } from "./UserMenu";

const StyledHeader = styled.header`
  background-image: linear-gradient(160deg, #004eb5, #41acf3);
  text-align: center;
  position: relative;
`;

const LogoContainer = styled.div`
  padding: 3rem 0 0;

  @media (max-width: 990px) {
    padding: 2rem 0 0;
  }
`;

export const Header = () => {
  const { userData, setUserData } = React.useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    setUserData({});
    localStorage.removeItem("auth-token");
    history.push("/login");
  };

  return (
    <StyledHeader>
      {userData?.user !== undefined ? (
        <UserMenu
          name={userData.user.name}
          picture={userData.user.picture}
          role={userData.user?.role ?? []}
          onLogout={handleLogout}
        />
      ) : null}
      <LogoContainer>
        <Link to="/">
          <Logo />
        </Link>
      </LogoContainer>
      {userData?.user !== undefined ? (
        <Navigation
          role={userData.user?.role ?? []}
          phase={userData.phase ?? null}
        />
      ) : null}
    </StyledHeader>
  );
};
