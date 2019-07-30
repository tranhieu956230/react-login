import React, { useEffect, useState } from "react";
import { useGlobal, setGlobal } from "reactn";

import Header from "components/shared/Header";
import { getUserInfo } from "services";
import "./Home.css";

const Home = props => {
  const [accessToken] = useGlobal("accessToken");
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUserInfo(accessToken).then(response => {
      if (response.code === "SUCCESS") {
        setUsername(response.result.username);
      } else if (response.code === "UNAUTHORIZED") {
        setGlobal({
          isLoggedIn: false,
          accessToken: ""
        });
        localStorage.removeItem("access_token");
        props.history.push("/");
      }
    });
  });

  return (
    <div data-test={"container"}>
      <Header history={props.history} />
      <h1 className="home__title">
        {username ? "Welcome " + username : "HomePage"}
      </h1>
    </div>
  );
};

export default Home;
