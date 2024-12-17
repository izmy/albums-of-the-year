import { Button, CircularProgress, TextField } from "@material-ui/core";
import * as React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../../components/Logo";
import { loginUser } from "../../services/api/loginApi";
import { UserContext } from "../../services/UserContext";
import { LoginForm } from "./LoginForm";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;

  @media (max-height: 660px) {
    height: auto;
  }
`;

const LoginBox = styled.div`
  padding: 2.4rem 0 1.8rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  border-radius: 10px;
  background-image: linear-gradient(160deg, #004eb5, #41acf3);
`;

const LoadingContainer = styled.div`
  margin-top: 3rem;
`;

const ErrorMessage = styled.p`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 5px;
  color: white;
  background: #f94141;
  font-weight: 800;
`;

export const LoginTitle = styled.h2`
  color: white;
`;

export const LoginItem = styled.li`
  margin: 20px 0;
  list-style: none;
`;

export const LoginButton = styled(Button)`
  text-decoration: none;
  background: white;
  color: #025dbf;
  font-weight: 700;
  box-shadow: none;

  &:hover {
    background: white;
    box-shadow: none;
  }
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    overflow: hidden;
    border-radius: 5px;
    background: white;

    &::before,
    &::after {
      display: none;
    }
  }
`;

export const StyledNavLink = styled(NavLink)`
  margin-top: 10px;
  color: black;
`;

export const Login: React.FC = () => {
  const { userData, setUserData } = React.useContext(UserContext);
  const { state } = useLocation<{ from: string }>();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async (login: string, password: string) => {
    if (login !== "" && password !== "") {
      setError("");
      setLoading(true);
      try {
        const loggedUser = await loginUser(login, password);
        if (loggedUser.token === undefined || loggedUser.user === undefined)
          throw new Error("missing token and user data");

        localStorage.setItem("auth-token", loggedUser.token);
        setUserData({
          token: loggedUser.token,
          user: loggedUser.user,
        });
      } catch (err: any) {
        setError(err.response.data.msg);
      }
    } else {
      setError("Vyplňte login a heslo.");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (userData?.token !== undefined && userData?.user !== undefined) {
      history.push(state?.from || "/");
    }
  }, [userData, history, state]);

  return (
    <LoginContainer>
      <LoginBox>
        <Logo maxWidth={300} animation={false} />
        <LoginForm onLogin={handleLogin} />
        {error !== "" ? <ErrorMessage>{error}</ErrorMessage> : null}
        {loading ? (
          <LoadingContainer>
            <CircularProgress color="secondary" />
          </LoadingContainer>
        ) : null}
      </LoginBox>
    </LoginContainer>
  );
};
