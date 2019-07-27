import React, { useState } from "react";
import styled from "styled-components";
import { setGlobal, useGlobal } from "reactn";

import Header from "components/shared/Header";
import { changePassword } from "services";
import InputValidate from "components/shared/InputValidate";
import validateUtil from "utils/validate.js";
import PrimaryButton from "components/shared/PrimaryButton";

const ChangePassword = props => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isValidOldPassword, setIsValidOldPassword] = useState(true);
  const [isValidNewPassword, setIsValidNewPassword] = useState(true);
  const [isValidNewPasswordConfirm, setIsValidNewPasswordConfirm] = useState(
    true
  );
  const [isChangePasswordRequest, setIsChangePasswordRequest] = useState(false);
  const [accessToken] = useGlobal("accessToken");

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

    if (valid && !isChangePasswordRequest) {
      let t = setTimeout(() => {
        setIsChangePasswordRequest(true);
      }, 200);

      changePassword(
        oldPassword,
        newPassword,
        newPasswordConfirm,
        accessToken
      ).then(response => {
        clearTimeout(t);
        setIsChangePasswordRequest(false);
        if (response.code in ["SUCCESS", "UNAUTHORIZED"]) {
          setGlobal({
            isLoggedIn: false,
            access_token: ""
          });
          localStorage.removeItem("access_token");
          props.history.push("/");
        }
      });
    }
  };

  const handleOldPasswordChange = e => {
    let oldPassword = e.target.value;
    setOldPassword(oldPassword);
    setIsValidOldPassword(validateUtil.isValidPassword(oldPassword));
  };

  const handleNewPasswordChange = e => {
    let newPassword = e.target.value;
    setNewPassword(newPassword);
    setIsValidNewPassword(validateUtil.isValidPassword(newPassword));
    setIsValidNewPasswordConfirm(newPassword === newPasswordConfirm);
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
            type={"password"}
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
          <PrimaryButton isLoading={isChangePasswordRequest} text={"Submit"} />
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
