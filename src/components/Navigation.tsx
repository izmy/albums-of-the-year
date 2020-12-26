import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { UserContext } from "../services/UserContext";

export const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
`;

export const Item = styled.li`
  list-style: none;
`;

export const StyledNavLink = styled(NavLink)`
  display: inline-block;
  margin: 1rem;
  padding: 1rem;
  color: white;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: -0.03rem;

  &:after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0.5rem;
    background: white;
    transition: width 0.3s ease-in-out 0s;
  }

  &.active,
  &:hover {
    &:after {
      width: calc(100% - 2rem);
    }
  }
`;

export const Navigation = () => {
  const { userData } = React.useContext(UserContext);

  return (
    <NavigationList>
      <Item>
        <StyledNavLink exact to="/" activeClassName="active">
          Hlasovat
        </StyledNavLink>
      </Item>
      {userData?.user?.role?.includes("ADMIN") ? (
        <Item>
          <StyledNavLink exact to="/change" activeClassName="active">
            Upravit hlasování
          </StyledNavLink>
        </Item>
      ) : null}
      <Item>
        <StyledNavLink exact to="/results" activeClassName="active">
          Zobrazit výsledky
        </StyledNavLink>
      </Item>
    </NavigationList>
  );
};
