import React, { useState } from "react";

const AuthCard = ({ reff, cardType }) => {
  const [uname, unameSet] = useState('');
  const [pword, pwordSet] = useState('');
  const [pwordConf, pwordConfSet] = useState('')

  return (
    <div ref={reff} className="card auth">
      <h3>
        {cardType === "login"
          ? "Log In"
          : cardType === "newAct"
          ? "Create Acount"
          : ""}
      </h3>
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
          type="text"
          id="pword"
          onChange={(e) => pwordSet(e.target.value)}
          value={pword}
        />
      </label>
      {cardType === "newAct" && (
        <label htmlFor="pword">
          Confirm Password
          <input
            type="text"
            id="pword"
            onChange={(e) => pwordSet(e.target.value)}
            value={pword}
          />
        </label>
      )}
    </div>
  );
};

export default AuthCard;
