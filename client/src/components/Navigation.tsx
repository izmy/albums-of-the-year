import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Role } from "../models/user.types";
import { isAdmin } from "../utils/users.utils";
import { ConstantsPhase } from "../models/constants.types";

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
  phase?: ConstantsPhase | null;
}

export const Navigation: React.FC<NavigationProps> = ({ role, phase }) => {
  return (
    <nav>
      <NavigationList>
        {isAdmin(role) || phase === "NOMINATION" ? (
          <Item>
            <StyledNavLink exact to="/nominate" activeClassName="active">
              Nominovat
            </StyledNavLink>
          </Item>
        ) : null}
        {isAdmin(role) ||
        phase === "NOMINATION" ||
        phase === "VOTING" ||
        phase === "RESULTS" ? (
          <Item>
            <StyledNavLink
              exact
              to="/nominated-albums"
              activeClassName="active"
            >
              Nominovaná alba
            </StyledNavLink>
          </Item>
        ) : null}
        {isAdmin(role) || phase === "VOTING" ? (
          <Item>
            <StyledNavLink exact to="/voting" activeClassName="active">
              Hlasovat
            </StyledNavLink>
          </Item>
        ) : null}
        {isAdmin(role) || phase === "RESULTS" ? (
          <Item>
            <StyledNavLink exact to="/results" activeClassName="active">
              Výsledky
            </StyledNavLink>
          </Item>
        ) : null}
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
