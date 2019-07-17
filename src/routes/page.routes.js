import React from "react";
import Home from "components/Home";
import ChangePassword from "components/ChangePassword";

let routes = [
  {
    component: props => <ChangePassword {...props}/>,
    isPrivate: true,
    path: "/change-password",
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
