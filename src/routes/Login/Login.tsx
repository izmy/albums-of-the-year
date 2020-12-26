import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../../components/Logo";
import { loginUser } from "../../services/api/usersApi";
import { UserContext } from "../../services/UserContext";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  padding: 3rem 0;
  text-align: center;
  max-width: 500px;
  width: 100%;
  border-radius: 5px;
  background-image: linear-gradient(160deg, #004eb5, #41acf3);
`;

const LoadingContainer = styled.div`
  margin-top: 3rem;
`;

export const Login: React.FC = () => {
  const { setUserData } = React.useContext(UserContext);
  const { state } = useLocation<{ from: string }>();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (userInfo: ReactFacebookLoginInfo) => {
    if (userInfo.email) {
      setLoading(true);
      const loggedUser = await loginUser(userInfo);
      localStorage.setItem("auth-token", loggedUser.token);
      setUserData({
        token: loggedUser.token,
        user: { ...loggedUser.user, id: loggedUser.user.id },
      });
      history.push(state?.from || "/");
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo maxWidth={300} animation={false} />
        <FacebookLogin
          appId="3549360751845020"
          autoLoad={false}
          disableMobileRedirect={true}
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
        {loading ? (
          <LoadingContainer>
            <CircularProgress color="secondary" />
          </LoadingContainer>
        ) : null}
      </LoginBox>
    </LoginContainer>
  );
};
