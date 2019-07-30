import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { setGlobal } from "reactn";

import { login } from "services";
import FormHeader from "components/shared/FormHeader";
import InputValidate from "components/shared/InputValidate";
import PrimaryButton from "components/shared/PrimaryButton";

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
    <Container data-test={"container"}>
      <Main>
        <FormWrapper onSubmit={handleSubmit}>
          <FormHeader
            title={"Login to Your Account"}
            description={"Login using social networks"}
          />
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

          <TextPrimary>
            <StyledLink to={"/forget-password"}>
              Forget your password?
            </StyledLink>
          </TextPrimary>

          <PrimaryButton isLoading={isLoginRequest} text={"Sign in"} />
        </FormWrapper>
      </Main>
      <Aside>
        <Title>New Here?</Title>
        <TextWrapper>
          <Description>
            Sign up and discover a great amount of new opportunities
          </Description>
        </TextWrapper>
        <Link to={"/sign-up"}>
          <AnimatedButton>Sign Up</AnimatedButton>
        </Link>
      </Aside>
    </Container>
  );
};

const StyledLink = styled(Link)`
  &:link,
  &:visited {
    color: currentColor;
    text-decoration: none;
  }
`;

const TextPrimary = styled.h3`
  font-size: 1.5rem;
  color: #38ba8a;
  justify-self: start;
  margin-left: 1rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #3ba5b4;
  }
`;

const FormWrapper = styled.form`
  max-width: 55rem;
  display: grid;
  justify-items: center;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Aside = styled.aside`
  flex-basis: 30%;
  background-image: linear-gradient(253deg, #3ba5b4 0, #38ba8a 100%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  max-width: 35rem;
  text-align: center;
`;

const AnimatedButton = styled.button`
  height: 5.4rem;
  min-width: 22rem;
  border-radius: 3rem;
  color: #1a1e1d;
  font-size: 1.5rem;
  box-shadow: 0 1.2rem 2.4rem rgba(34, 51, 49, 0.13);
  background: white;
  width: 40%;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #3bb497;
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: 3.8rem;
  line-height: 4.8rem;
  margin-bottom: 3.2rem;
`;

const Description = styled.p`
  font-size: 2.5rem;
  line-height: 3.6rem;
  margin-bottom: 3.2rem;
`;

const Main = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;
