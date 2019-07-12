import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { logout } from "../actions";

const Header = props => {
  return (
    <Wrapper>
      <AnimatedButton onClick={() => props.logout()}>Logout</AnimatedButton>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  background-image: linear-gradient(253deg, #3ba5b4 0, #38ba8a 100%);
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem;
`;

const AnimatedButton = styled.button`
  border-radius: 3rem;
  color: #1a1e1d;
  font-size: 1.5rem;
  box-shadow: 0 1.2rem 2.4rem rgba(34, 51, 49, 0.13);
  background: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  padding: 2rem;
  line-height: 0;

  &:hover {
    color: #3bb497;
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }
`;

export default connect(
  null,
  { logout }
)(Header);
