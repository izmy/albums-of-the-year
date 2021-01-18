import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Role } from "../models/user.types";
import { isAdmin } from "../utils/users.utils";

export const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
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

  @media (max-width: 800px) {
    margin: 1rem 0;
  }

  @media (max-width: 650px) {
    margin: 0.2rem 1rem;
  }
`;

interface NavigationProps {
  role: Role[];
}

export const Navigation: React.FC<NavigationProps> = ({ role }) => {
  return (
    <nav>
      <NavigationList>
        {isAdmin(role) ? (
          <Item>
            <StyledNavLink exact to="/nominate" activeClassName="active">
              Nominovat
            </StyledNavLink>
          </Item>
        ) : null}
        <Item>
          <StyledNavLink exact to="/nominated-albums" activeClassName="active">
            Nominovaná alba
          </StyledNavLink>
        </Item>
        {isAdmin(role) ? (
          <Item>
            <StyledNavLink exact to="/voting" activeClassName="active">
              Hlasovat
            </StyledNavLink>
          </Item>
        ) : null}
        <Item>
          <StyledNavLink exact to="/results" activeClassName="active">
            Výsledky
          </StyledNavLink>
        </Item>
        {isAdmin(role) ? (
          <Item>
            <StyledNavLink exact to="/change" activeClassName="active">
              Upravit hlasování
            </StyledNavLink>
          </Item>
        ) : null}
      </NavigationList>
    </nav>
  );
};
