import React from "react";
import Login from "components/Login";
import SignUp from "components/SignUp";
import ForgetPassword from "components/ForgetPassword";
import Home from "components/Home";
import ChangePassword from "components/ChangePassword";
import ActivateAccount from "components/ActivateAccount";

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
  },
  {
    component: props => <ChangePassword {...props} />,
    isPrivate: true,
    path: "/change-password",
    exact: true
  },
  {
    component: props => <ActivateAccount {...props} />,
    isPrivate: false,
    path: "/verify-email/:code",
    exact: true
  },
  {
    component: props => <Home {...props} />,
    isPrivate: true,
    path: "/",
    exact: false
  }
];

export default routes;
