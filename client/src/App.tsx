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
import { ResultsList } from "./routes/Results/ResultsList";
import { useState } from "react";
import { UserContext } from "./services/UserContext";
import { authorize, getUser } from "./services/api/usersApi";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { UserData } from "./models/user.types";
import { NotFound } from "./routes/NotFound/NotFound";
import { Nominate } from "./routes/Nominate/Nominate";
import { NominatedAlbumsList } from "./routes/NominatedAlbums/NominatedAlbums";
import { Settings } from "./routes/Settings/Settings";
import { isAdmin } from "./utils/users.utils";
import { getConstants } from "./services/api/constantsApi";
import { PrivacyPolicy } from "./routes/PrivacyPolicy/PrivacyPolicy";

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
        if (userData?.user !== undefined) {
          if (isAdmin(userData.user?.role)) {
            return children;
          }

          const NOMINATION_DISABLED = ["/voting", "/results", "/change"];
          const VOTING_DISABLED = ["/nominate", "/results", "/change"];
          const RESULTS_DISABLED = ["/nominate", "/voting", "/change"];

          if (
            (userData.phase === "NOMINATION" &&
              NOMINATION_DISABLED.includes(location.pathname)) ||
            (userData.phase === "VOTING" &&
              VOTING_DISABLED.includes(location.pathname)) ||
            (userData.phase === "RESULTS" &&
              RESULTS_DISABLED.includes(location.pathname))
          ) {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location },
                }}
              />
            );
          }

          return children;
        }
        return (
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
  const [userData, setUserData] = useState<UserData>({});

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
        const constants = await getConstants();

        setUserData({
          token,
          user: loggedUser,
          phase: constants.phase,
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
                <PrivateRoute path="/nominate">
                  <MainLayout>
                    <Nominate />
                  </MainLayout>
                </PrivateRoute>
                <PrivateRoute path="/nominated-albums">
                  <MainLayout>
                    <NominatedAlbumsList />
                  </MainLayout>
                </PrivateRoute>
                <PrivateRoute path="/voting">
                  <MainLayout>
                    <Voting />
                  </MainLayout>
                </PrivateRoute>
                <PrivateRoute path="/results">
                  <MainLayout>
                    <ResultsList />
                  </MainLayout>
                </PrivateRoute>
                <PrivateRoute path="/change">
                  <MainLayout>
                    <Change />
                  </MainLayout>
                </PrivateRoute>
                <PrivateRoute path="/settings">
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </PrivateRoute>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/privacy-policy">
                  <MainLayout>
                    <PrivacyPolicy />
                  </MainLayout>
                </Route>
                {userData.phase === "NOMINATION" ? (
                  <Redirect exact from="/" to="/nominate" />
                ) : userData.phase === "VOTING" ? (
                  <Redirect exact from="/" to="/voting" />
                ) : (
                  <Redirect exact from="/" to="/results" />
                )}
                <PrivateRoute path="/">
                  <MainLayout>
                    <NotFound />
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
