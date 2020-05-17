import React, { useState } from "react";

import AuthBtn from "./AuthBtn";

const AuthCard = ({ authRef, cardType }) => {
  const [uname, unameSet] = useState("");
  const [pword, pwordSet] = useState("");
  const [pwordConf, pwordConfSet] = useState("");

  const passwordsMatch = () => pword === pwordConf;

  const credentials = {
    name: uname,
    password: pword,
    passwordsMatch: passwordsMatch(),
  };

  return (
    <div ref={authRef} className="card auth">
      <h3>
        {cardType === "login"
          ? "Log In"
          : cardType === "newAct"
          ? "Create Acount"
          : ""}
      </h3>
      <div className="cardContent">
        <div className="authInputs">
          <label htmlFor="uname">
            Username
            <input
              type="text"
              id="uname"
              onChange={(e) => unameSet(e.target.value)}
              value={uname}
            />
          </label>
          <label htmlFor="pword">
            Password
            <input
              type="password"
              id="pword"
              onChange={(e) => pwordSet(e.target.value)}
              value={pword}
            />
          </label>
          {cardType === "newAct" && (
            <label htmlFor="pwordConf">
              Confirm Password
              <input
                type="password"
                id="pwordConf"
                onChange={(e) => pwordConfSet(e.target.value)}
                value={pwordConf}
              />
            </label>
          )}
        </div>
        <AuthBtn authType={cardType} data={credentials} />
      </div>
    </div>
  );
};

export default AuthCard;
