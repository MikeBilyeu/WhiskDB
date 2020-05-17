import React, { useState, useEffect } from "react";
import classNames from "classnames";
import SearchBar from "../../search_bar";
import "./home-hero.scss";

const Hero = () => {
  const [smallImgLoaded, setSmallImgLoaded] = useState(false);
  const [bigImgLoaded, setBigImgLoaded] = useState(false);
  useEffect(() => {
    // check if the images are loaded
  }, []);

  return (
    <div className="hero">
      <div
        className={classNames("hero-img", {
          "hero-img--loaded-small": smallImgLoaded,
          "hero-img--loaded-big": bigImgLoaded
        })}
      >
        <img
          onLoad={() => setSmallImgLoaded(true)}
          alt=""
          src="https://res.cloudinary.com/mikebilyeuimg/image/upload/c_scale,e_blur:50,q_auto:low,w_15/v1580746441/Recipes/lukas-blazek-f-TWhXOrLiU-unsplash.jpg"
          style={{
            width: "1px",
            height: "1px",
            zIndex: "-5",
            position: "absolute"
          }}
        />

        <img
          onLoad={() => setBigImgLoaded(true)}
          alt=""
          src="https://res.cloudinary.com/mikebilyeuimg/image/upload/c_scale,h_2500,q_auto:good/v1580746441/Recipes/lukas-blazek-f-TWhXOrLiU-unsplash.jpg"
          style={{
            width: "1px",
            height: "1px",
            zIndex: "-5",
            position: "absolute"
          }}
        />
      </div>
      <div className="hero__container">
        <h1 className="hero__title">ZipiWhisk</h1>
        <p className="hero__desc">
          The internet’s source of free recipes.
          <br /> Explore thousands of recipes from around the world!
        </p>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
