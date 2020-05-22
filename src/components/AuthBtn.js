import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { AuthContext } from "../context";

const AuthBtn = ({ authType, data }) => {
  const [auth, setAuth] = useContext(AuthContext);
  let history = useHistory();
  let location = useLocation();

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
      .then(({ token }) => {
        // do something with token, localStorage/State
        if (token) {
          setAuth(token);
          history.push("/dashboard");
        } else {
          
        }
      });
  };
  return (
    <button
      className="authBtn authBtn-card"
      disabled={isDisabled}
      onClick={submitCredentials}
    >
      {authType === "login" && "Login"}
      {authType === "newAct" && "Create Account"}
    </button>
  );
};

export default AuthBtn;
