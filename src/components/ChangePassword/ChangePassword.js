import React, { useState } from "react";
import { setGlobal, useGlobal } from "reactn";

import Header from "components/shared/Header";
import { changePassword } from "services";
import InputValidate from "components/shared/InputValidate";
import validateUtil from "utils/validate.js";
import PrimaryButton from "components/shared/PrimaryButton";
import "./ChangePassword.css";

const ChangePassword = props => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isValidOldPassword, setIsValidOldPassword] = useState(true);
  const [isValidNewPassword, setIsValidNewPassword] = useState(true);
  const [isValidNewPasswordConfirm, setIsValidNewPasswordConfirm] = useState(true);
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

      changePassword(oldPassword, newPassword, accessToken).then(response => {
        clearTimeout(t);
        setIsChangePasswordRequest(false);
        if (response.code === "SUCCESS" || response.code === "UNAUTHORIZED") {
          setGlobal({
            isLoggedIn: false,
            accessToken: ""
          });
          localStorage.removeItem("access_token");
          props.history.push("/sign-in");
        }
      });
    }
  };

  const handleOldPasswordChange = e => {
    let oldPassword = e.target.value;
    setOldPassword(oldPassword);
    setIsValidOldPassword(oldPassword !== newPassword);
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
      <h1 className="change-password__title">Change Password</h1>
      <div className="change-password__container">
        <form className="change-password__form" onSubmit={handleSubmit}>
          <InputValidate
            placeholder={"Old Password"}
            type={"password"}
            onChange={handleOldPasswordChange}
            value={oldPassword}
            errorMessage={
              "Your new password must be different from the old password."
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
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
