import React from "react";
import SearchBar from "../../search_bar";
import "./home-hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__container">
        <h1 className="hero__title">Zipiwisk</h1>
        <p className="hero__desc">
          The internet’s source of free recipes.
          <br /> Powered by cooks around the world!
        </p>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
