import { LOGIN_SUCCESS, LOGOUT } from "./types";

export const loginSuccess = accessToken => {
  return {
    type: LOGIN_SUCCESS,
    payload: accessToken
  };
};

export const logout = () => {
  localStorage.removeItem("access_token");
  return {
    type: LOGOUT
  };
};

export const notification = (title, message, type) => {
  return {

  }
}