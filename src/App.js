// https://reacttraining.com/react-router/web/example/basic
// https://reacttraining.com/react-router/web/example/auth-workflow

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./styles/App.css";
import { AuthContext } from "./context";
import { useAuth } from "./hooks";

import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
// import NitInputs from "./components/N2Inputs";
// import PhInput from "./components/PhInput";
// import NitChart from "./components/charts/NitChart";
// import PhChart from "./components/charts/PhChart";
// import dummyData from "./data";

const App = () => {

  const authState = useAuth()
  const [auth] = authState

  return (
    <AuthContext.Provider value={authState}>
      <Router>
        <Switch>
          <Protected path="/dashboard" isAuthed={auth}>
            <Dashboard />
          </Protected>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};
export default App;

const Protected = ({ children, isAuthed, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      isAuthed ? (
        children
      ) : (
        <Redirect to={{ pathname: "/home", state: { from: location } }} />
      )
    }
  />
);
