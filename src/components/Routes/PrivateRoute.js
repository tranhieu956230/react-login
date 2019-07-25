import React from "react";
import { Redirect } from "react-router-dom";
import {useGlobal} from "reactn";

const PrivateRoute = props => {
  const [isLoggedIn] = useGlobal("isLoggedIn");

  if (isLoggedIn) return props.children;
  return <Redirect to={"/sign-in"} />;
};

export default PrivateRoute;