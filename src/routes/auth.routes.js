import React from "react";
import Login from "components/Login";
import SignUp from "components/SignUp";
import ForgetPassword from "components/ForgetPassword";

let routes = [
  {
    component: props => <Login {...props} />,
    isPrivate: false,
    path: "/sign-in",
    exact: true
  },
  {
    component: props => <SignUp {...props} />,
    isPrivate: false,
    path: "/sign-up",
    exact: true
  },
  {
    component: props => <ForgetPassword {...props} />,
    isPrivate: false,
    path: "/forget-password",
    exact: true
  }
];

export default routes;
