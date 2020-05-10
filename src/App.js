// https://reacttraining.com/react-router/web/example/basic
// https://reacttraining.com/react-router/web/example/auth-workflow

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/App.css";
// import { useLocalStorage } from "./hooks";
import Home from "./components/pages/Home";
// import NitInputs from "./components/N2Inputs";
// import PhInput from "./components/PhInput";
// import NitChart from "./components/charts/NitChart";
// import PhChart from "./components/charts/PhChart";
// import dummyData from "./data";

const App = () => {
  // const [nCycle, setNCycle] = useLocalStorage("n-cycle-data", []);
  // const [ph, setPh] = useLocalStorage("ph-data", []);
  const [auth, authSet] = useState('')
  

  return (
    <>
      {/* <NitInputs storage={[nCycle, setNCycle]} />
      <NitChart data={nCycle} />
      <PhInput storage={[ph, setPh]} />
      <PhChart data={ph} /> */}
      {/* Nav bar/LogIN-Logout */}
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/dashboard">{/* dashboard page, requireAuth */}</Route>
        </Switch>
      </Router>
    </>
  );
};
export default App;
