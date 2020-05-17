import React from "react";

const AuthBtn = ({ authType, data }) => {
  const path =
    authType === "login" ? "/login" : authType === "newAct" ? "/signup" : "";

  let isDisabled = false;
  if (!data.passwordsMatch && authType === "newAct") {
    isDisabled = true;
  }
  const submitCredentials = () => {
    if (isDisabled) return;
    // fetch request to auth server
    fetch(`http://localhost:8080${path}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((token) => {
        // do something with token, localStorage/State
        console.log(token);
      });
  };
  return (
    <button className="authBtn authBtn-card" disabled={isDisabled} onClick={submitCredentials}>
      {authType === "login" && "Login"}
      {authType === "newAct" && "Create Account"}
    </button>
  );
};

export default AuthBtn;
