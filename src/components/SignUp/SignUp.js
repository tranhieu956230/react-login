import React, { useState } from "react";

import FormHeader from "components/shared/FormHeader";
import { signUp } from "services";
import InputValidate from "components/shared/InputValidate";
import validateUtil from "utils/validate.js";
import PrimaryButton from "components/shared/PrimaryButton";
import Aside from "components/shared/Aside";
import "./SignUp.css";

const SignUp = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);
  const [isRegisterRequest, setIsRegisterRequest] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    let valid = true;

    if (!username || !isValidUsername) {
      setIsValidUsername(false);
      valid = false;
    }

    if (!password || !isValidPassword) {
      setIsValidPassword(false);
      valid = false;
    }

    if (!email || !isValidEmail) {
      setIsValidEmail(false);
      valid = false;
    }

    if (!confirmPassword || !isValidPasswordConfirm) {
      setIsValidPasswordConfirm(false);
      valid = false;
    }

    if (valid && !isRegisterRequest) {
      let t = setTimeout(() => {
        setIsRegisterRequest(true);
      }, 200);

      signUp(email, password, username).then(response => {
        clearTimeout(t);
        setIsRegisterRequest(false);
        if (response.code === "SUCCESS") {
          props.history.push("/sign-in");
        }
      });
    }
  };

  const handleUsernameChange = e => {
    let username = e.target.value;
    setUsername(username);
    setIsValidUsername(validateUtil.isValidUsername(username));
  };

  const handleEmailChange = e => {
    let email = e.target.value;
    setEmail(email);
    setIsValidEmail(validateUtil.isValidEmail(email));
  };

  const handlePasswordChange = e => {
    let password = e.target.value;
    setPassword(password);
    setIsValidPassword(validateUtil.isValidPassword(password));
    setIsValidPasswordConfirm(confirmPassword === password);
  };

  const handleConfirmPasswordChange = e => {
    let confirmPassword = e.target.value;
    setPasswordConfirm(confirmPassword);
    setIsValidPasswordConfirm(confirmPassword === password);
  };

  return (
    <div className="sign-up__container">
      <Aside
        title="One Of Us?"
        description="if you already have an account, just sign in. We've missed you!"
        to="/sign-in"
        button-text="Sign In"
      />
      <div className="sign-up__main">
        <form className="sign-up__form" onSubmit={handleSubmit}>
          <FormHeader title={"Create Free Account"} description={"Sign up using social networks"} />
          <InputValidate
            placeholder={"Username"}
            type={"text"}
            value={username}
            onChange={handleUsernameChange}
            errorMessage={
              "Account must has at least 1 letter, 1 number and at least 6 characters in length"
            }
            valid={isValidUsername}
          />
          <InputValidate
            placeholder={"Email"}
            type={"text"}
            value={email}
            onChange={handleEmailChange}
            errorMessage={"Invalid email address"}
            valid={isValidEmail}
          />
          <InputValidate
            placeholder={"Password"}
            type={"password"}
            value={password}
            onChange={handlePasswordChange}
            errorMessage={
              "Password must has 1 lowercase, 1 uppercase letter, 1 number and at least 8 characters in length"
            }
            valid={isValidPassword}
          />
          <InputValidate
            placeholder={"Confirm"}
            type={"password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            valid={isValidPasswordConfirm}
            errorMessage={"Password not match"}
          />
          <PrimaryButton isLoading={isRegisterRequest} text={"Sign Up"} />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
