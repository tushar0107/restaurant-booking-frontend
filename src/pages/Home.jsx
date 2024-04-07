import React from "react";
import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";

const Home = () => {
  // const user = useSelector((state)=>state.user);
  const navigate = useNavigate();
  

  return (
    <>
      <div id="home-page">
      <button onClick={()=>navigate('/search')}>Search Restaurants</button>
      </div>
    </>
  );
};

export default Home;
