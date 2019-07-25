import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { resetPassword } from "services";
import FormHeader from "components/shared/FormHeader";
import InputValidate from "components/shared/InputValidate";
import validateUtil from "utils/validate.js";
import PrimaryButton from "components/shared/PrimaryButton";

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
    setIsValidEmail(validateUtil.isValidEmail(e.target.value));
  };

  return (
    <Container>
      <Main>
        <FormWrapper onSubmit={handleSubmit}>
          <FormHeader
            title={"Reset your password"}
            description={"Login using social networks"}
          />
          <InputValidate
            placeholder={"Email"}
            type={"text"}
            onChange={handleEmailChange}
            value={email}
            errorMessage={"Invalid email address"}
            valid={isValidEmail}
          />
          <PrimaryButton text={"Register"} isLoading={isForgetPassword} />
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

export default ForgetPassword;
