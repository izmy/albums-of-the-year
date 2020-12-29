import * as React from "react";
import InputIcon from "@material-ui/icons/Input";
import { LoginButton, LoginItem, LoginTitle, StyledTextField } from "./Login";

interface RegisterFormProps {
  onRegister: (name: string, email: string, password: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onRegister(name, email, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <LoginTitle>Registrace</LoginTitle>
      <LoginItem>
        <StyledTextField
          label="Jméno"
          variant="filled"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </LoginItem>
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
          Registrovat se
        </LoginButton>
      </LoginItem>
    </form>
  );
};
