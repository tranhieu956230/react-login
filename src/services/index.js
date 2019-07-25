import axios from "axios";
import { toast } from "react-toastify";

const API_ENDPOINT = `${process.env.REACT_APP_DOMAIN_NAME}/api/v1`;

const request = axios.create({
  baseURL: API_ENDPOINT
});

export const login = async (account, password) => {
  return request({
    method: "POST",
    url: "/auth/login",
    data: {
      account,
      password
    }
  })
    .then(response => handleResponse(response.data))
    .catch(err => handleError(err.message));
};

export const signUp = async (email, password, confirmPassword, username) => {
  return request({
    method: "POST",
    url: "/user",
    data: {
      email,
      password,
      username,
      confirmPassword
    }
  })
    .then(response => handleResponse(response.data))
    .catch(err => handleError(err.message));
};

export const resetPassword = async account => {
  return request({
    method: "POST",
    url: "/auth/forget-password",
    data: {
      account
    }
  })
    .then(response => handleResponse(response.data))
    .catch(err => handleError(err.message));
};

export const changePassword = async (
  old_password,
  new_password,
  password_confirm,
  access_token
) => {
  return request({
    method: "PUT",
    url: "/user/password",
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    data: {
      old_password,
      new_password,
      password_confirm
    }
  })
    .then(response => handleResponse(response.data))
    .catch(err => handleError(err.message));
};

export const getUserInfo = async access_token => {
  return request({
    method: "GET",
    url: "/user",
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
    .then(response => handleResponse(response.data))
    .catch(err => handleError(err.message));
};

export const activateAccount = async code => {
  return request({
    method: "GET",
    url: `/auth/verify-email/${code}`
  })
    .then(response => handleResponse(response.data))
    .catch(err => handleError(err.message));
};

function handleResponse(response) {
  if (response.code === "SUCCESS") {
    if (response.message) toast.success(response.message);
  } else if (response.code === "UNAUTHORIZED") {
    toast.error(response.message);
  } else {
    toast.error(response.message);
  }
  return response;
}

function handleError(errMessage) {
  toast.error(errMessage);
  return {
    code: "NETWORK_ERROR"
  };
}
