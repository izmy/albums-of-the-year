import * as React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../services/UserContext";

const StyledHeader = styled.header`
  background-image: linear-gradient(160deg, #004eb5, #41acf3);
  text-align: center;
  position: relative;
`;

const UserMenu = styled.div`
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

const LogoContainer = styled.div`
  padding: 3rem 0 0;

  @media (max-width: 990px) {
    padding: 2rem 0 0;
  }
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

export const Header = () => {
  const { userData, setUserData } = React.useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("auth-token");
    history.push("/login");
  };

  return (
    <StyledHeader>
      <UserMenu>
        <UserMenuBox>
          <IconPhoto
            src={userData?.user?.picture ?? "images/user.jpg"}
            alt={userData?.user?.name}
          />
          <UserMenuName>{userData?.user?.name}</UserMenuName>
        </UserMenuBox>
        <Logout onClick={handleLogout}>
          <ExitToAppIcon fontSize={"small"} />
          <span>Odhlásit se</span>
        </Logout>
      </UserMenu>
      <LogoContainer>
        <Link to="/">
          <Logo />
        </Link>
      </LogoContainer>
      <Navigation />
    </StyledHeader>
  );
};
