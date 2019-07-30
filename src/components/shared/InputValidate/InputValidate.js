import React from "react";
import "./InputValidate.css";

const InputValidate = props => {
  return (
    <div className="input__container">
      <h4
        className={`input__text ${props.valid ? "input__text--invisible" : ""}`}
      >
        {props.errorMessage}
      </h4>
      <input
        className={`input__field ${props.valid ? "input__field--visible" : ""}`}
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default InputValidate;
