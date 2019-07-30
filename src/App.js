import React, { useEffect, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { setGlobal } from "reactn";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "react-loading-screen";

import routes from "routes";
import route from "components/Routes";
import "./App.css";

const { PublicRoute, PrivateRoute } = route;

setGlobal({
  isLoggedIn: false,
  accessToken: ""
});

const App = props => {
  useEffect(() => {
    let accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setGlobal({
        isLoggedIn: true,
        accessToken
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Suspense
        fallback={
          <LoadingScreen
            loading={true}
            bgColor="#f1f1f1"
            spinnerColor="#9ee5f8"
            textColor="#676767"
          />
        }
      >
        <Switch>
          {routes.map((route, index) => (
            <Route
              exact={route.exact}
              path={route.path}
              key={index}
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
      </Suspense>
      <ToastContainer
        autoClose={3500}
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
    </React.Fragment>
  );
};

export default App;
