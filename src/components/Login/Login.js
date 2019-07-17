import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useGlobal } from "reactn";

import { login } from "services";
import FormHeader from "components/shared/FormHeader";
import InputValidate from "components/shared/InputValidate";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [global, setGlobal] = useGlobal();

  const handleSubmit = event => {
    event.preventDefault();
    login(username, password).then(response => {
      if (response.code === 200) {
        setUsername("");
        setPassword("");
        localStorage.setItem("access_token", response.access_token);
        setGlobal({
          accessToken: response.access_token,
          isLoggedIn: true
        });
        props.history.push("/");
        toast.success("Welcome back!");
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <Container>
      <Main>
        <FormWrapper onSubmit={handleSubmit}>
          <FormHeader
            title={"Login to Your Account"}
            description={"Login using social networks"}
          />
          <InputValidate
            placeholder={"Email"}
            type={"text"}
            onChange={e => setUsername(e.target.value)}
            value={username}
            valid={true}
          />
          <InputValidate
            placeholder={"Password"}
            type={"password"}
            onChange={e => setPassword(e.target.value)}
            valid={true}
            value={password}
          />

          <TextPrimary>
            <StyledLink to={"/forget-password"}>
              Forget your password?
            </StyledLink>
          </TextPrimary>

          <Button>Sign In</Button>
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

export default Login;