import React from "react";

export function AccountVerify(props) {
  return(
      <div className="main-verify">
        <div className="main-verify__inner">
          <img src="./verify.svg" alt="nothing found" height={"400"}/>
          <div className={"main-verify__inner-text"}>
            We appreciate your time.
            <br></br>
            We have created your account. For using interns-in services please first verify your email. Thanks :)
          </div>
        </div>
      </div>
  )
}
