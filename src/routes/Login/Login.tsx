import * as React from "react";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../../components/Logo";
import { loginUser } from "../../services/api/usersApi";
import { UserContext } from "../../services/UserContext";

export const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.div`
  padding: 3rem 0;
  text-align: center;
  max-width: 500px;
  width: 100%;
  border-radius: 5px;
  background-image: linear-gradient(160deg, #004eb5, #41acf3);
`;

export const StyledLogo = styled(Logo)`
  margin-bottom: 100px;
  display: none;
`;

export const Login: React.FC = () => {
  const { setUser } = React.useContext(UserContext);
  const { state } = useLocation<{ from: string }>();
  const history = useHistory();

  const handleLogin = async (userInfo: ReactFacebookLoginInfo) => {
    if (userInfo.email) {
      const loggedUser = await loginUser(userInfo);
      setUser(loggedUser.user);
      // localStorage.setItem(
      //   "userData",
      //   JSON.stringify({
      //     user: loggedUser.user,
      //     token: loggedUser.token,
      //   })
      // );
      history.push(state?.from || "/");
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo maxWidth={300} animation={false} />
        <FacebookLogin
          appId="3549360751845020"
          fields="name,email,picture"
          onClick={() => {}}
          callback={handleLogin}
          textButton={"Přihlásit se přes Facebook"}
          buttonStyle={{
            marginTop: "30px",
            background: "white",
            color: "#025dbf",
            borderRadius: "10px",
            border: "none",
          }}
        />
      </LoginBox>
    </LoginContainer>
  );
};
