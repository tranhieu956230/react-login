import React from "react";
import "./Aside.css";
import { Link } from "react-router-dom";

const Aside = props => {
  return (
    <div className="aside__container">
      <h1 className="aside__title">{props.title}</h1>
      <div className="aside__text-wrapper">
        <h3 className="aside__description">{props.description}</h3>
      </div>
      <Link to={props.to}>
        <button className="aside__button">{props["button-text"]}</button>
      </Link>
    </div>
  );
};

export default Aside;
