import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state)=>state.user);

  return (
    <>
      <h3>home page {user.first_name}</h3>
    </>
  );
};

export default Home;
