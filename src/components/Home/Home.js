import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobal, setGlobal } from "reactn";

import Header from "components/shared/Header";
import { getUserInfo } from "services";

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
    <div>
      <Header history={props.history} />
      <Text>{username ? "Welcome " + username : "HomePage"}</Text>
    </div>
  );
};

const Text = styled.h1`
  font-size: 5rem;
  font-weight: 500;
  text-align: center;
  margin-top: 2rem;
  color: rgba(41, 41, 41, 0.82);
`;

export default Home;
