import React, { useState } from "react";
import { setGlobal } from "reactn";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = props => {
  const [isSettingVisible, setIsSettingVisible] = useState(false);

  return (
    <div className="header__container">
      <button className="header__button" onClick={() => setIsSettingVisible(!isSettingVisible)}>
        Settings
      </button>
      <ul className={`header__drop-down ${isSettingVisible ? "header__drop-down--visible" : ""}`}>
        <li className="header__drop-down-item">
          <Link className="header__link" to={"/change-password"}>
            Change your password
          </Link>
        </li>
        <li
          className="header__drop-down-item"
          onClick={() => {
            setGlobal({
              isLoggedIn: false,
              accessToken: ""
            });
            localStorage.removeItem("access_token");
            props.history.push("/");
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Header;
