import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "services";
import { loginSuccess } from "actions";
import styled from "styled-components";
import FormHeader from "./FormHeader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    login(username, password).then(response => {
      if (response.code === 200) {
        setUsername("");
        setPassword("");
        localStorage.setItem("access_token", response.access_token);
        props.loginSuccess(response.access_token);
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
          <Input
            placeholder={"Email"}
            type={"text"}
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <Input
            placeholder={"Password"}
            type={"password"}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
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

const Input = styled.input`
  width: 100%;
  height: 4.8rem;
  background: #eef5f3;
  border: none;
  font-size: 1.4rem;
  border-radius: 2rem;
  color: #88908e;
  padding: 0 1.6rem;
  transition: background 0.3s;
  margin-bottom: 2rem;

  &::-webkit-input-placeholder {
    font-weight: 700;
    color: rgba(136, 144, 142, 0.8);
  }

  &:focus {
    outline: none;
    background: white;
    border: 1px solid #e1eae7;
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { loginSuccess }
)(Login);
