// https://reacttraining.com/react-router/web/example/basic
// https://reacttraining.com/react-router/web/example/auth-workflow

import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./styles/App.css";
import { AuthContext } from "./context";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
// import NitInputs from "./components/N2Inputs";
// import PhInput from "./components/PhInput";
// import NitChart from "./components/charts/NitChart";
// import PhChart from "./components/charts/PhChart";
// import dummyData from "./data";

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

const App = () => {
  const authState = useState("");
  // const [nCycle, setNCycle] = useLocalStorage("n-cycle-data", []);
  // const [ph, setPh] = useLocalStorage("ph-data", []);
  const [auth] = authState
  console.log(auth)
  return (
    <AuthContext.Provider value={authState}>
      {/* <NitInputs storage={[nCycle, setNCycle]} />
      <NitChart data={nCycle} />
      <PhInput storage={[ph, setPh]} />
      <PhChart data={ph} /> */}
      {/* Nav bar/LogIN-Logout */}
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
