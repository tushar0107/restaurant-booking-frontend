import React from "react";
// import { useSelector } from "react-redux";
import '../../src/home.css';
import { Link } from "react-router-dom";

const Home = () => {
  // const user = useSelector((state)=>state.user);
  
  

  return (
    <>
      <main id="home-page">
        <section id="banner-section">
          <div id="banner-slider" className="slider auto-slider">
            <div className="slide">
              <Link to="/restaurant/668bb0a6fc89e2f9c2b02e14">
                <img
                  src="images/banner-img-1.jpeg"
                  alt=""
                  className="slider-img image"
                />
              </Link>
            </div>
            <div className="slide">
              <Link to="/restaurant/668bc552266fd9e9c0149f54">
                <img
                  src="images/banner-img-2.jpeg"
                  alt=""
                  className="slider-img image"
                />
              </Link>
            </div>
            <div className="slide">
              <Link to="/restaurant/668bc552266fd9e9c0149f53">
                <img
                  src="images/banner-img-3.jpeg"
                  alt=""
                  className="slider-img image"
                />
              </Link>
            </div>
          </div>
        </section>
        <section id="best-deals-container">
          <h3>Best Deals</h3>
          <div id="best-deals">
            <Link to="/restaurant/668bb174266fd9e9c0149f4b">
              <img src="images/best-deals-1.jpeg" alt="" />
            </Link>
            <Link to="/restaurant/668bb0a6fc89e2f9c2b02e14">
              <img src="images/best-deals-2.jpeg" alt="" />
            </Link>
            <Link to="/restaurant/668bb174266fd9e9c0149f4c">
              <img src="images/best-deals-3.jpeg" alt="" />
            </Link>
            <Link to="/restaurant/668bc552266fd9e9c0149f54">
              <img src="images/best-deals-4.jpeg" alt="" />            
            </Link>
          </div>
        </section>

        <section id="new-restaurants-container">
          <h3>Find new restaurants near you</h3>
          <div id="new-restaurants">
            <Link to="/restaurant/668bc552266fd9e9c0149f58">
              <video src="images/new-restaurant-2.mp4" autoPlay loop muted></video>
            </Link>
            <Link to="/restaurant/668bb174266fd9e9c0149f4f">
              <video src="images/new-restaurant-3.mp4" autoPlay loop muted></video>
            </Link>
          </div>
        </section>
        <section id="tasty-menu-container">
          <h3>Tasty Menus</h3>
          <div id="tasty-menu">
            <Link to="/restaurant/668bb174266fd9e9c0149f49">
              <img src="images/tasty-menu-1.jpeg" alt="" />
            </Link>
            <Link to="/restaurant/668bb174266fd9e9c0149f4a">
              <img src="images/tasty-menu-2.jpeg" alt="" />
            </Link>
            <Link to="/restaurant/668bb0a6fc89e2f9c2b02e14">
              <img src="images/tasty-menu-3.jpeg" alt="" />
            </Link>
            <Link to="/restaurant/668bc552266fd9e9c0149f52">
              <img src="images/tasty-menu-4.jpeg" alt="" />            
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
