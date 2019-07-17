import React, { useState } from "react";
import styled from "styled-components";
import { useGlobal } from "reactn";

import { Link } from "react-router-dom";

const Header = props => {
  const [global, setGlobal] = useGlobal();
  const [isSettingVisible, setIsSettingVisible] = useState(false);

  return (
    <Wrapper>
      <AnimatedButton onClick={() => setIsSettingVisible(!isSettingVisible)}>
        Settings
      </AnimatedButton>
      <DropDown visible={isSettingVisible}>
        <DropDownItem>
          <StyledLink to={"/change-password"}>Change your password</StyledLink>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            setGlobal({
              isLoggedIn: false,
              accessToken: ""
            });
            localStorage.removeItem("access_token");
            props.history.push("/");
          }}
        >
          Logout
        </DropDownItem>
      </DropDown>
    </Wrapper>
  );
};

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: currentColor;
`;

const DropDown = styled.ul`
  position: absolute;
  top: 7%;
  background-color: white;
  list-style-type: none;
  border-radius: 0.2rem;
  box-shadow: 0.5rem 1rem 3rem 0 rgba(158, 158, 158, 0.35);
  color: rgba(59, 59, 59, 0.2);
  font-size: 1.4rem;
  font-weight: 600;
  width: max-content;
  display: ${props => (props.visible ? "block" : "none")};
`;

const DropDownItem = styled.li`
  padding: 1.5rem 2rem;
  color: rgba(0,0,0,0.9);
  cursor: pointer;
  transition: all 0.3s;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(205, 205, 205, 0.23);
  }

  &:hover {
    background-color: rgba(216, 224, 222, 0.55);
    color: #3cc6a5;
  }
`;

const Wrapper = styled.aside`
  background-image: linear-gradient(253deg, #3ba5b4 0, #38ba8a 100%);
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem;
`;

const AnimatedButton = styled.button`
  position: relative;
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

export default Header;
