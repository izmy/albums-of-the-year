import * as React from "react";
import InputIcon from "@material-ui/icons/Input";
import { LoginButton, LoginItem, LoginTitle, StyledTextField } from "./Login";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <LoginTitle>Přihlášení</LoginTitle>
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
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<InputIcon />}
        >
          Přihlásit se
        </LoginButton>
      </LoginItem>
    </form>
  );
};
