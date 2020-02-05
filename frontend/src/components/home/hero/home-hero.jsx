import React from "react";
import SearchBar from "../../search_bar";
import "./home-hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <div>
        <h1>Zipiwisk</h1>
        <p>
          The internet’s source of free recipes.
          <br /> Powered by cooks around the world!
        </p>
        <SearchBar className="hero-searchBar" />
      </div>
    </div>
  );
};

export default Hero;
