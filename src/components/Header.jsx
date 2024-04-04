import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((state)=>state.user.value);
  return (
      <div id="header">
        <div className="logo">
          {(user?.first_name || "") + " " + (user?.last_name || "")}
        </div>
        <nav>
          <Link to={"/search"}><FontAwesomeIcon icon={faSearch}/></Link>
          <Link to={"/profile"}>Profile</Link>
        </nav>
      </div>
  );
};

export default Header;