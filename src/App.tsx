import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core";
import { MainLayout } from "./components/MainLayout";
import { Login } from "./routes/Login/Login";
import { Voting } from "./routes/Voting/Voting";
import { Change } from "./routes/Change/Change";
import { Results } from "./routes/Results/Results";
import { useState } from "react";
import { UserContext } from "./services/UserContext";
import { authorize, getUser } from "./services/api/usersApi";
import { LoadingSpinner } from "./components/LoadingSpinner";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007dc5",
    },
  },
});

const PrivateRoute = ({ children, ...rest }) => {
  const { userData } = React.useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return userData !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = useState<any>(null);

  React.useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenResponse = await authorize(token);
      if (tokenResponse) {
        const loggedUser = await getUser();
        setUserData({
          token,
          user: {
            ...loggedUser,
            id: loggedUser._id,
          },
        });
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <UserContext.Provider value={{ userData, setUserData }}>
          {loading === true ? (
            <LoadingSpinner fullscreen={true} />
          ) : (
            <Router>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/change">
                  <MainLayout>
                    <Change />
                  </MainLayout>
                </Route>
                <PrivateRoute path="/results">
                  <MainLayout>
                    <Results />
                  </MainLayout>
                </PrivateRoute>
                <PrivateRoute path="/">
                  <MainLayout>
                    <Voting />
                  </MainLayout>
                </PrivateRoute>
              </Switch>
            </Router>
          )}
        </UserContext.Provider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
