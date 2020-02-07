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
      <div className="hero__img-credit">
        {"Photo by "}
        <a
          className="hero__img-src"
          href="https://unsplash.com/@goumbik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from Lukas Blazek"
        >
          Lukas Blazek
        </a>
        {" on "}
        <a
          className="hero__img-src"
          href="https://unsplash.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from Unsplash"
        >
          Unsplash
        </a>
      </div>
    </div>
  );
};

export default Hero;
