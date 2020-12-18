import * as React from "react";
import { Button, TextField } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import styled from "styled-components";
import { Redirect, useLocation } from "react-router-dom";

export const LoginItem = styled.li`
  margin: 20px 0;
  list-style: none;
`;

export const LoginButton = styled(Button)`
  text-decoration: none;
`;

export const StyledTextField = styled(TextField)`
  input {
    background: white;
  }
`;

export const LoginForm: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  const { state } = useLocation<{ from: string }>();

  const handleLogin = () => {};

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <>
      <LoginItem>
        <StyledTextField
          label="Email"
          variant="filled"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </LoginItem>
      <LoginItem>
        <StyledTextField
          label="Heslo"
          type="password"
          variant="filled"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </LoginItem>
      <LoginItem>
        <LoginButton
          variant="contained"
          color="primary"
          startIcon={<InputIcon />}
          onClick={handleLogin}
        >
          Přihlásit se
        </LoginButton>
      </LoginItem>
    </>
  );
};
