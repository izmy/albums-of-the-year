import { Button, CircularProgress, TextField } from "@material-ui/core";
import * as React from "react";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../../components/Logo";
import {
  loginUser,
  loginUserFacebook,
  registerUser,
} from "../../services/api/usersApi";
import { UserContext } from "../../services/UserContext";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const RegisterLink = styled.div`
  margin-top: 20px;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`;

const Line = styled.hr`
  width: 70%;
  border: 0;
  margin: 30px auto;
  height: 2px;
  background: white;
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

export const Login: React.FC = () => {
  const { setUserData } = React.useContext(UserContext);
  const { state } = useLocation<{ from: string }>();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [registerForm, setRegisterForm] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleFacebookLogin = async (userInfo: ReactFacebookLoginInfo) => {
    if (userInfo.email) {
      setLoading(true);
      const loggedUser = await loginUserFacebook(userInfo);
      localStorage.setItem("auth-token", loggedUser.token);
      setUserData({
        token: loggedUser.token,
        user: { ...loggedUser.user, id: loggedUser.user.id },
      });
      history.push(state?.from || "/");
    }
    setLoading(false);
  };

  const handleLogin = async (email: string, password: string) => {
    if (email !== "" && password !== "") {
      setError("");
      setLoading(true);
      try {
        const loggedUser = await loginUser(email, password);
        localStorage.setItem("auth-token", loggedUser.token);
        setUserData({
          token: loggedUser.token,
          user: { ...loggedUser.user, id: loggedUser.user.id },
        });
        history.push(state?.from || "/");
      } catch (err) {
        setError(err.response.data.msg);
      }
    } else {
      setError("Vyplňte email a heslo.");
    }
    setLoading(false);
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    if (name !== "" && email !== "" && password !== "") {
      setError("");
      setLoading(true);
      try {
        const loggedUser = await registerUser(name, email, password);
        localStorage.setItem("auth-token", loggedUser.token);
        setUserData({
          token: loggedUser.token,
          user: { ...loggedUser.user, id: loggedUser.user.id },
        });
        history.push(state?.from || "/");
      } catch (err) {
        setError(err.response.data.msg);
      }
    } else {
      setError("Vyplňte jméno, email a heslo.");
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo maxWidth={300} animation={false} />
        {registerForm ? (
          <RegisterForm onRegister={handleRegister} />
        ) : (
          <>
            <FacebookLogin
              appId="3549360751845020"
              autoLoad={false}
              disableMobileRedirect={true}
              fields="name,email,picture"
              onClick={() => {}}
              callback={handleFacebookLogin}
              textButton={"Přihlásit se přes Facebook"}
              buttonStyle={{
                marginTop: "30px",
                background: "white",
                color: "#025dbf",
                borderRadius: "10px",
                border: "none",
              }}
            />
            <Line />
            <LoginForm onLogin={handleLogin} />
          </>
        )}
        {error !== "" ? <ErrorMessage>{error}</ErrorMessage> : null}
        {loading ? (
          <LoadingContainer>
            <CircularProgress color="secondary" />
          </LoadingContainer>
        ) : null}
      </LoginBox>
      <RegisterLink onClick={() => setRegisterForm((state) => !state)}>
        {registerForm
          ? "Máte účet? Přihlašte se."
          : "Nemáte účet? Vytvořte si účet."}
      </RegisterLink>
    </LoginContainer>
  );
};
