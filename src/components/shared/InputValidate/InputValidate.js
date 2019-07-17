import styled from "styled-components";
import React from "react";

const InputValidate = props => {
  return (
    <InputWrapper>
      <Text valid={props.valid}>{props.errorMessage}</Text>
      <Input
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        valid={props.valid}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 100%;
`;

const Text = styled.h4`
  color: #ff1028;
  margin: 1rem;
  font-size: 1.2rem;
  font-weight: 400;
  display: ${props => props.valid ? "none" : "initial"}
`;

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
  margin-top: ${props => props.valid ? "0" : ".5rem"};

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

export default InputValidate;
