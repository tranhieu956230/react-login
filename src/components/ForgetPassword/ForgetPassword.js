import React, { useState } from "react";

import { resetPassword } from "services";
import FormHeader from "components/shared/FormHeader";
import InputValidate from "components/shared/InputValidate";
import PrimaryButton from "components/shared/PrimaryButton";
import Aside from "components/shared/Aside";
import "./ForgetPassword.css";

const ForgetPassword = props => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isForgetPassword, setIsForgetPasswordRequest] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    let valid = true;

    if (!email || !isValidEmail) {
      valid = false;
      setIsValidEmail(false);
    }
    if (valid && !isForgetPassword) {
      let t = setTimeout(() => {
        setIsForgetPasswordRequest(true);
      }, 200);
      resetPassword(email).then(response => {
        clearTimeout(t);
        setIsForgetPasswordRequest(false);
        if (response.code === "SUCCESS") {
          setEmail("");
          props.history.push("/sign-in");
        }
      });
    }
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setIsValidEmail(e.target.value !== "");
  };

  return (
    <div className="forget-password__container">
      <div className="forget-password__main">
        <form className="forget-password__form" onSubmit={handleSubmit}>
          <FormHeader
            title={"Reset your password"}
            description={"Login using social networks"}
          />
          <InputValidate
            placeholder={"Username or email"}
            type={"text"}
            onChange={handleEmailChange}
            value={email}
            errorMessage={"Field cannot be empty"}
            valid={isValidEmail}
          />
          <PrimaryButton text={"Submit"} isLoading={isForgetPassword} />
        </form>
      </div>

      <Aside
        title="New Here?"
        description="Sign up and discover a great amount of new opportunities"
        to="/sign-up"
        button-text="Sign Up"
      />
    </div>
  );
};

export default ForgetPassword;
