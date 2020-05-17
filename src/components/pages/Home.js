import React, { useState, useRef, useContext } from "react";

import { useOnClickOutside } from "../../hooks";
import AuthCard from "../AuthCard";

import { AuthContext } from "../../context";

const Home = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [showLogin, showLoginSet] = useState(false);
  const [showNewAct, showNewActSet] = useState(false);

  const loginRef = useRef();
  const newActRef = useRef();

  useOnClickOutside(loginRef, () => showLoginSet(false));
  useOnClickOutside(newActRef, () => showNewActSet(false));
  return (
    <header className="home">
      <h1 className="home-header">NITRO-GRAPH</h1>
      {showLogin && <AuthCard authRef={loginRef} cardType="login" />}
      {showNewAct && <AuthCard authRef={newActRef} cardType="newAct" />}
      <div className="authBtns-home">
        <button
          onClick={() => showLoginSet(!showLogin)}
          className="authBtn authBtn-home"
        >
          LOG IN
        </button>
        <button
          onClick={() => showNewActSet(!showNewAct)}
          className="authBtn authBtn-home"
        >
          CREATE ACCOUNT
        </button>
      </div>
    </header>
  );
};

export default Home;
