import React from "react";

import facebookImg from "assets/facebook.svg";
import googleImg from "assets/google.svg";
import linkedinImg from "assets/linkedin.svg";
import lineImg from "assets/login_line.svg";
import "./FormHeader.css";

const FormHeader = props => {
  return (
    <div className="form-header__container">
      <h1 className="form-header__title">{props.title}</h1>
      <h3 className="form-header__description">{props.description}</h3>
      <div className="form-header__icon-group">
        <div className="form-header__icon" style={{ backgroundImage: `url(${facebookImg})` }} />
        <div className="form-header__icon" style={{ backgroundImage: `url(${googleImg})` }} />
        <div className="form-header__icon" style={{ backgroundImage: `url(${linkedinImg})` }} />
      </div>
      <div className="form-header__line-wrapper">
        <img className="form-header__line" src={lineImg} alt="line" />
        <span className="form-header__small-text">or</span>
        <img className="form-header__line" src={lineImg} alt="line" />
      </div>
    </div>
  );
};

export default FormHeader;
