import React from "react";

const AuthBtn = ({ authType, data, isDisabled  }) => {

  const path =
    authType === "login" ? "/login" : authType === "newAct" ? "/signup" : "";

  const submitCredentials = () => {
    if(!data.passwordsMatch && authType === 'newAct') {
      console.log('passowrds dont match')
      return
    }
    // fetch request to auth server
    fetch( `http://localhost:8080${path}`,{method: "POST", body: JSON.stringify(data) })
      .then((res) => res.json())
      .then((token) => {
        console.log(token);
      });
  };
  return (
    <button disabled={isDisabled} onClick={submitCredentials}>
      {authType === "login" && "Login"}
      {authType === "newAct" && "Create Account"}
    </button>
  );
};

export default AuthBtn;
