import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((state)=>state.user);
  return (
      <div id="header">
        <div className="logo">
          {(user.value?.first_name || "") + " " + (user.value?.last_name || "")}
        </div>
        <nav>
          <Link to={"/search"}>Search</Link>
          <Link to={"/profile"}>Profile</Link>
        </nav>
      </div>
  );
};

export default Header;