import React, { useState } from "react";
import { setGlobal } from "reactn";
import { Link } from "react-router-dom";

import { login } from "services";
import FormHeader from "components/shared/FormHeader";
import InputValidate from "components/shared/InputValidate";
import PrimaryButton from "components/shared/PrimaryButton";
import Aside from "components/shared/Aside";
import "./Login.css";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isLoginRequest, setIsLoginRequest] = useState(false);

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

    if (!isLoginRequest && valid) {
      let t = setTimeout(() => {
        setIsLoginRequest(true);
      }, 200);

      login(username, password).then(response => {
        clearTimeout(t);
        setIsLoginRequest(false);

        if (response.code === "SUCCESS") {
          setUsername("");
          setPassword("");
          let result = response.result;
          localStorage.setItem("access_token", result.access_token);
          setGlobal({
            accessToken: result.access_token,
            isLoggedIn: true
          });
          props.history.push("/");
        }
      });
    }
  };

  const handleUsernameChange = e => {
    let value = e.target.value;
    setUsername(value);
    setIsValidUsername(value !== "");
  };

  const handlePasswordChange = e => {
    let value = e.target.value;
    setPassword(value);
    setIsValidPassword(value !== "");
  };

  return (
    <div className="login__container">
      <div className="login__main">
        <form className="login__form" onSubmit={handleSubmit}>
          <FormHeader title={"Login to Your Account"} description={"Login using social networks"} />
          <InputValidate
            placeholder={"Username or email"}
            type={"text"}
            onChange={handleUsernameChange}
            value={username}
            errorMessage={"Field cannot be empty"}
            valid={isValidUsername}
          />
          <InputValidate
            placeholder={"Password"}
            type={"password"}
            onChange={handlePasswordChange}
            valid={isValidPassword}
            errorMessage={"Field cannot be empty"}
            value={password}
          />

          <h3 className="login__secondary-text">
            <Link className="login__link" to={"/forget-password"}>
              Forget your password?
            </Link>
          </h3>

          <PrimaryButton isLoading={isLoginRequest} text={"Sign in"} />
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

export default Login;
