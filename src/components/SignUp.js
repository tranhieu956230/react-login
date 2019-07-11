import React, { useState } from "react";
import { connect } from "react-redux";
import { loginSuccess } from "../actions";
import styled from "styled-components";
import FormHeader from "./FormHeader";
import { Link } from "react-router-dom";
import { signUp } from "../apis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "../history";

const SignUp = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

  const handleSubmit = event => {
    event.preventDefault();

    signUp(email, password, confirmPassword, name).then(response => {
      if (response.code === 200) {
        setName("");
        setPassword("");
        setPasswordConfirm("");
        setEmail("");
        toast.success("Account created successfully");
        setTimeout(() => {
          history.push("/sign-in");
        }, 2000);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setIsValidEmail(checkValidEmail(e.target.value));
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setIsValidPassword(checkValidPassword(e.target.value));
  };

  const handlePasswordConfirmChange = e => {
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
          <Input
            placeholder={"Name"}
            type={"text"}
            value={name}
            onChange={e => setName(e.target.value)}
            valid={true}
          />
          <Input
            placeholder={"Email"}
            type={"text"}
            value={email}
            onChange={handleEmailChange}
            valid={isValidEmail}
          />
          <Input
            placeholder={"Password"}
            type={"password"}
            value={password}
            onChange={handlePasswordChange}
            valid={isValidPassword}
          />
          <Input
            placeholder={"Confirm"}
            type={"password"}
            value={confirmPassword}
            onChange={handlePasswordConfirmChange}
            valid={isValidPasswordConfirm}
          />
          <Button>Sign Up</Button>
        </FormWrapper>
      </Main>
    </Container>
  );
};

const checkValidEmail = email => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const checkValidPassword = password => {
  let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
  return re.test(password);
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
    border: 1px solid ${props => (props.valid ? "#e1eae7" : "red")};
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
)(SignUp);
