import { LOGIN_SUCCESS, LOGOUT } from "../actions/types";

const initialState = {
  isLoggedIn: false,
  accessToken: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        accessToken: action.payload
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
        accessToken: ""
      };
    default:
      return state;
  }
};
