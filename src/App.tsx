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
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <UserContext.Provider value={{ user, setUser }}>
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
        </UserContext.Provider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
