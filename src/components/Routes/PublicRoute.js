import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const PublicRoute = props => {
  if (props.isLoggedIn) return <Redirect to={"/"} />;
  return props.children;
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(PublicRoute);
