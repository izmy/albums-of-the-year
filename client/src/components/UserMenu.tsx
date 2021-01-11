import React from "react";
import styled from "styled-components";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import { NavLink } from "react-router-dom";
import { isAdmin } from "../utils/users.utils";
import { Role } from "../models/user.types";

const UserMenuContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: -0.03rem;
  font-size: 0.9rem;

  @media (max-width: 990px) {
    position: relative;
    top: auto;
    right: auto;
    padding: 20px 0;
    background: linear-gradient(160deg, #00306f, #00558e);
  }
`;

const UserMenuBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 990px) {
    justify-content: center;
  }
`;

const UserMenuName = styled.span`
  display: flex;
  justify-content: flex-end;
`;

const IconPhoto = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  max-height: 35px;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:first-child {
    margin-top: 0;
  }

  @media (max-width: 990px) {
    justify-content: center;
  }

  &:hover {
    text-decoration: underline;
  }

  span {
    padding-left: 6px;
    font-size: 0.8rem;
  }
`;

const NavItemSettings = NavItem.withComponent(NavLink);

interface UserMenuProps {
  name: string;
  picture?: string;
  role: Role[];
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  name,
  picture,
  role,
  onLogout,
}) => (
  <UserMenuContainer>
    <UserMenuBox>
      <IconPhoto src={picture ?? "images/user.jpg"} alt={name} />
      <UserMenuName>{name}</UserMenuName>
    </UserMenuBox>
    <nav>
      {isAdmin(role) ? (
        <NavItemSettings exact to="/settings">
          <SettingsIcon fontSize={"small"} />
          <span>Nastavení</span>
        </NavItemSettings>
      ) : null}
      <NavItem onClick={onLogout}>
        <ExitToAppIcon fontSize={"small"} />
        <span>Odhlásit se</span>
      </NavItem>
    </nav>
  </UserMenuContainer>
);
