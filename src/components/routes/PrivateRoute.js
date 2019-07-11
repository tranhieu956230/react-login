import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateRoute = props => {
  if (props.isLoggedIn) return props.children;
  return <Redirect to={"/sign-in"} />;
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(PrivateRoute);
