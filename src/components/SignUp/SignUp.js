import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormHeader from "components/shared/FormHeader";
import { signUp } from "services";
import InputValidate from "components/shared/InputValidate";

const SignUp = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

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

    if (valid) {
      signUp(email, password, confirmPassword, username).then(response => {
        if (response.code === 200) {
          toast.success("Account created successfully");
          props.history.push("/sign-in");
        } else {
          toast.error(response.message);
        }
      });
    }
  };

  const handleUsernameChange = e => {
    let regex = /^(?=.*\w)(?=.*\d)[\w\d]{6,}$/g;
    setUsername(e.target.value);
    setIsValidUsername(regex.test(e.target.value));
  };

  const handleEmailChange = e => {
    let regex = /\w+@\w+\.\w+/g;
    setEmail(e.target.value);
    setIsValidEmail(regex.test(e.target.value));
  };

  const handlePasswordChange = e => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\d]{8,}$/g;
    setPassword(e.target.value);
    setIsValidPassword(regex.test(e.target.value));
  };

  const handleConfirmPasswordChange = e => {
    setPasswordConfirm(e.target.value);
    setIsValidPasswordConfirm(e.target.value === password);
  };

  return (
    <Container>
      <Aside>
        <Title>One Of Us?</Title>
        <TextWrapper>
          <Description>
            If you already have an account, just sign in. We've missed you!
          </Description>
        </TextWrapper>
        <Link to={"/sign-in"}>
          <AnimatedButton>Sign In</AnimatedButton>
        </Link>
      </Aside>
      <Main>
        <FormWrapper onSubmit={handleSubmit}>
          <FormHeader
            title={"Create Free Account"}
            description={"Sign up using social networks"}
          />
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
          <Button>Sign Up</Button>
        </FormWrapper>
      </Main>
    </Container>
  );
};

const Button = styled.button`
  background-color: #28b498;
  border-radius: 3rem;
  outline: none;
  border: none;
  cursor: pointer;
  color: white;
  line-height: 1.6;
  transition: all 0.3s;
  width: 20rem;
  height: 5rem;
  font-size: 1.4rem;
  font-weight: 600;

  &:hover {
    background-color: #3cc6a5;
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

export default SignUp;
