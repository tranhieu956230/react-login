import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useGlobal } from "reactn";

import Header from "components/shared/Header";
import { changePassword } from "services";
import InputValidate from "components/shared/InputValidate";

const ChangePassword = props => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isValidOldPassword, setIsValidOldPassword] = useState(true);
  const [isValidNewPassword, setIsValidNewPassword] = useState(true);
  const [isValidNewPasswordConfirm, setIsValidNewPasswordConfirm] = useState(
    true
  );
  const [global, setGlobal] = useGlobal();

  const handleSubmit = e => {
    e.preventDefault();
    let valid = true;

    if (!newPasswordConfirm || !isValidNewPasswordConfirm) {
      valid = false;
      setIsValidNewPasswordConfirm(false);
    }

    if (!newPassword || !isValidNewPassword) {
      valid = false;
      setIsValidNewPassword(false);
    }

    if (!oldPassword || !isValidOldPassword) {
      valid = false;
      setIsValidOldPassword(false);
    }

    if (valid) {
      changePassword(oldPassword, newPassword).then(response => {
        if (response.code === 200) {
          setGlobal({
            isLoggedIn: false,
            access_token: ""
          });
          localStorage.removeItem("access_token");
          props.history.push("/");
          toast.success("Your password has been changed. Please log in again.");
        } else {
          toast.error(response.message);
        }
      });
    }
  };

  const isValidPassword = password => {
    let regex = /^(?=.*\w)(?=.*\d)[\w\d]{6,}$/g;
    return regex.test(password);
  };

  const handleOldPasswordChange = e => {
    setOldPassword(e.target.value);
    setIsValidOldPassword(isValidPassword(e.target.value));
  };

  const handleNewPasswordChange = e => {
    setNewPassword(e.target.value);
    setIsValidNewPassword(isValidPassword(e.target.value));
  };

  const handleNewPasswordConfirmChange = e => {
    setNewPasswordConfirm(e.target.value);
    setIsValidNewPasswordConfirm(newPassword === e.target.value);
  };

  return (
    <div>
      <Header history={props.history} />
      <Text>Change Password</Text>
      <Main>
        <FormWrapper onSubmit={handleSubmit}>
          <InputValidate
            placeholder={"Old Password"}
            type={"text"}
            onChange={handleOldPasswordChange}
            value={oldPassword}
            errorMessage={
              "Password must has 1 lowercase, 1 uppercase letter, 1 number and at least 8 characters in length"
            }
            valid={isValidOldPassword}
          />
          <InputValidate
            placeholder={"New Password"}
            type={"password"}
            onChange={handleNewPasswordChange}
            value={newPassword}
            errorMessage={
              "Password must has 1 lowercase, 1 uppercase letter, 1 number and at least 8 characters in length"
            }
            valid={isValidNewPassword}
          />
          <InputValidate
            placeholder={"Confirm new password"}
            type={"password"}
            onChange={handleNewPasswordConfirmChange}
            value={newPasswordConfirm}
            errorMessage={"Password not match"}
            valid={isValidNewPasswordConfirm}
          />
          <Button>Submit</Button>
        </FormWrapper>
      </Main>
    </div>
  );
};

const Text = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
  margin-top: 2rem;
  color: rgba(41, 41, 41, 0.82);
  margin-bottom: 2rem;
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
  width: 15rem;
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
  width: 60rem;
`;

const Main = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ChangePassword;
