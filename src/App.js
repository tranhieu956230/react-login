import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import { setGlobal, useGlobal } from "reactn";

import routes from "routes";
import route from "components/Routes";

const { PublicRoute, PrivateRoute } = route;

setGlobal({
  isLoggedIn: false,
  accessToken: ""
});

const App = props => {
  const [global, setGlobal] = useGlobal();

  useEffect(() => {
    let accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setGlobal({
        isLoggedIn: true,
        accessToken
      });
    }
  });

  return (
    <div>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          {routes.map(route => (
            <Route
              exact={route.exact}
              path={route.path}
              render={props => {
                if (route.isPrivate) {
                  return <PrivateRoute>{route.component(props)}</PrivateRoute>;
                } else {
                  return <PublicRoute>{route.component(props)}</PublicRoute>;
                }
              }}
            />
          ))}
        </Switch>
      </BrowserRouter>
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
          lineHeight: 2
        }}
      />
    </div>
  );
};

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
    src: url(/src/assets/fonts/GothaProReg.woff) format('woff');
  }
  
  @font-face {
    font-family: "primary-medium";
    src: url(/src/assets/fonts/GothaProMed.woff) format('woff');
  }
  
  @font-face {
    font-family: "primary-light";
    src: url(/src/assets/fonts/GothaProLig.woff) format('woff');
  }
  
  @font-face {
    font-family: "primary-bold";
    src: url(/src/assets/fonts/GothaProBol.woff) format('woff');
  }
  
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    font-family: primary, sans-serif;
  }
`;

export default App;
