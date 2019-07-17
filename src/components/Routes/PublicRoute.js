import React from "react";
import { Redirect } from "react-router-dom";
import { useGlobal } from "reactn";

const PublicRoute = props => {
  const [global, setGlobal] = useGlobal();

  if (global.isLoggedIn) return <Redirect to={"/"} />;
  return props.children;
};

export default PublicRoute;
