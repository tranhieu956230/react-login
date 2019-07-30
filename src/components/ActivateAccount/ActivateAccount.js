import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { activateAccount } from "services";

const ActivateAccount = props => {
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    activateAccount(props.match.params.code).then(response => {
      if (response.code === "SUCCESS") {
        setIsActivated(true);
      }
      props.history.push("/");
    });
  }, []);

  return (
    <Text data-test={"container"}>
      {isActivated
        ? "Your account is activated. Please log in"
        : "Your account is being activated"}
    </Text>
  );
};

const Text = styled.h1`
  font-size: 5rem;
  font-weight: 500;
  text-align: center;
  margin-top: 2rem;
  color: rgba(41, 41, 41, 0.82);
`;

export default ActivateAccount;
