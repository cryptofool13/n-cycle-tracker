import React, { useState, useRef } from "react";

import {useOnClickOutside} from '../../hooks'
import AuthCard from "../AuthCard";

const Home = () => {
  const [showLogin, showLoginSet] = useState(false);
  const [showNewAct, showNewActSet] = useState(false);

  const loginRef = useRef()
  const newActRef = useRef()

  useOnClickOutside(loginRef, () => showLoginSet(false))
  useOnClickOutside(newActRef, () => showNewActSet(false))
  return (
    <header className="home">
      <h1 className="home-header">NITRO-GRAPH</h1>
      {showLogin && <AuthCard reff={loginRef} cardType='login' />}
      {showNewAct && <AuthCard reff={newActRef} cardType='newAct' />}
      <div className="authBtns-home">
        <button
          onClick={() => showLoginSet(!showLogin)}
          className="authBtn-home"
        >
          LOG IN
        </button>
        <button onClick={() => showNewActSet(!showNewAct)} className="authBtn-home">CREATE ACCOUNT</button>
      </div>
    </header>
  );
};

export default Home;
