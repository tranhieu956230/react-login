import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./PrimaryButton.css";

const PrimaryButton = props => {
  return (
    <button
      className={`primary-button ${
        props.isLoading ? "primary-button--loading" : ""
      }`}
    >
      <span>{props.text}</span>
      <Spinner animation="border" variant="light" size={"m"} />
    </button>
  );
};

export default PrimaryButton;
