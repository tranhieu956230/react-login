import React, { useEffect, useState } from "react";
import { activateAccount } from "services";
import "./ActivateAccount.css";

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
    <h1 className="activate-account__title">
      {isActivated
        ? "Your account is activated. Please log in"
        : "We are activating your account"}
    </h1>
  );
};

export default ActivateAccount;
