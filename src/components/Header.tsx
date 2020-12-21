import * as React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../services/UserContext";

export const StyledHeader = styled.header`
  background-image: linear-gradient(160deg, #004eb5, #41acf3);
  padding: 3rem 0 0;
  text-align: center;
  position: relative;
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: -0.03rem;
  font-size: 0.9rem;
`;

export const UserMenuName = styled.span`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6px;
`;

export const Logout = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  span {
    padding-left: 6px;
    font-size: 0.8rem;
  }
`;

export const Header = () => {
  const { user, setUser } = React.useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
  };

  console.log(user);

  return (
    <StyledHeader>
      <Link to="/">
        <Logo />
      </Link>
      <UserMenu>
        <UserMenuName>{user?.name}</UserMenuName>
        <Logout onClick={handleLogout}>
          <ExitToAppIcon fontSize={"small"} />
          <span>Odhlásit se</span>
        </Logout>
      </UserMenu>
      <Navigation />
    </StyledHeader>
  );
};
