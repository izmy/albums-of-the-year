import React from "react";
import styled from "styled-components";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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

const Logout = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

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

interface UserMenuProps {
  name: string;
  picture?: string;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  name,
  picture,
  onLogout,
}) => (
  <UserMenuContainer>
    <UserMenuBox>
      <IconPhoto src={picture ?? "images/user.jpg"} alt={name} />
      <UserMenuName>{name}</UserMenuName>
    </UserMenuBox>
    <Logout onClick={onLogout}>
      <ExitToAppIcon fontSize={"small"} />
      <span>Odhlásit se</span>
    </Logout>
  </UserMenuContainer>
);
