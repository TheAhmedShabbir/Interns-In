import React from "react";

export function AccountNotVerified(props) {
  return (
    <div className="main-verify">
      <div className="main-verify__inner">
        <img src="./verify.svg" alt="nothing found" height={"400"} />
        <div className={"main-verify__inner-text"}>
          We appreciate your time.
          <br></br>
          Your account was created successfully. In order to use your account
          please first verify your email. Thanks :)
        </div>
      </div>
    </div>
  );
}
