import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core";
import { MainLayout } from "./components/MainLayout";
import { Login } from "./routes/Login/Login";
import { Voting } from "./routes/Voting/Voting";
import { Change } from "./routes/Change/Change";
import { Results } from "./routes/Results/Results";
import { useState } from "react";
import { UserContext } from "./services/UserContext";

const theme = createMuiTheme({});

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = React.useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user !== null ? (
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
  const [token, setToken] = useState(false);
  const [user, setUser] = useState(null);

  const login = React.useCallback((user, token) => {
    setToken(token);
    setUser(user);
  }, []);

  React.useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parsedUserData = userData !== null ? JSON.parse(userData) : null;

    if (parsedUserData?.token) {
      login(parsedUserData.user, parsedUserData.token);
    }

    setLoading(false);
  }, [login]);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <UserContext.Provider value={{ user, setUser, token }}>
          {loading === true ? (
            <CircularProgress />
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
