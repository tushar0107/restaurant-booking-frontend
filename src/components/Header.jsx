import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
      <div id="header">
        <div className="logo">
          <strong>Food Xplore</strong>
        </div>
        <nav>
          <Link to={"/search"}><FontAwesomeIcon icon={faSearch}/></Link>
          <Link to={"/profile"}><FontAwesomeIcon icon={faUser}/></Link>
        </nav>
      </div>
  );
};

export default Header;