import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { createGlobalStyle } from "styled-components";
import history from "../history";
import { loginSuccess } from "../actions";
import { connect } from "react-redux";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { ToastContainer, Bounce } from "react-toastify";

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  
  @font-face {
    font-family: "primary";
    src: url(/src/fonts/GothaProReg.woff) format('woff');
  }
  
  @font-face {
    font-family: "primary-medium";
    src: url(/src/fonts/GothaProMed.woff) format('woff');
  }
  
  @font-face {
    font-family: "primary-light";
    src: url(/src/fonts/GothaProLig.woff) format('woff');
  }
  
  @font-face {
    font-family: "primary-bold";
    src: url(/src/fonts/GothaProBol.woff) format('woff');
  }
  
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    font-family: primary, sans-serif;
  }
`;

const App = props => {
  useEffect(() => {
    let accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      props.loginSuccess(accessToken);
    }
  });

  return (
    <div>
      <Router history={history}>
        <GlobalStyle />
        <Switch>
          <Route
            exact
            path="/sign-in"
            render={props => (
              <PublicRoute>
                <Login {...props} />
              </PublicRoute>
            )}
          />
          <Route
            exact
            path="/sign-up"
            render={props => (
              <PublicRoute>
                <SignUp {...props} />
              </PublicRoute>
            )}
          />
          <Route
            path="/"
            render={props => (
              <PrivateRoute>
                <Home {...props} />
              </PrivateRoute>
            )}
          />
        </Switch>
      </Router>
      <ToastContainer
        autoClose={2000}
        draggable={true}
        pauseOnFocusLoss={false}
        transition={Bounce}
        draggablePercenter={80}
        pauseOnHover={false}
        style={{
            fontSize: "1.6rem",
            fontWeight: 500,
            lineHeight: 2,
        }}
      />
    </div>
  );
};

export default connect(
  null,
  { loginSuccess }
)(App);
