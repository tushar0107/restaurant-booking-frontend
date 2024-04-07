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
          <strong>{(user?.first_name || "Book My Table") + " " + (user?.last_name || "")}</strong>
        </div>
        <nav>
          <Link to={"/search"}><FontAwesomeIcon icon={faSearch}/></Link>
          <Link to={"/profile"}>Profile</Link>
        </nav>
      </div>
  );
};

export default Header;