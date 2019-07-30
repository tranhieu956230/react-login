import React from "react";

const Login = React.lazy(() => import("components/Login"));
const SignUp = React.lazy(() => import("components/SignUp"));
const ForgetPassword = React.lazy(() => import("components/ForgetPassword"));
const Home = React.lazy(() => import("components/Home"));
const ChangePassword = React.lazy(() => import("components/ChangePassword"));
const ActivateAccount = React.lazy(() => import("components/ActivateAccount"));

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
