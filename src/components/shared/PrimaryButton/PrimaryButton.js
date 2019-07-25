import React from "react";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

const PrimaryButton = props => {
  return (
    <Button isLoading={props.isLoading}>
      <span>{props.text}</span>
      <Spinner animation="border" variant="light" size={"m"} />
    </Button>
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
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: ${props => (props.isLoading ? "initial" : "none")};
  }

  span {
    margin-right: ${props => (props.isLoading ? "10px" : "0px")};
  }

  &:hover {
    background-color: #3cc6a5;
  }
`;

export default PrimaryButton;
