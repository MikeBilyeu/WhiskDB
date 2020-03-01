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
          src="https://res.cloudinary.com/mikebilyeuimg/image/upload/c_scale,e_blur:100,q_auto:low,w_300/v1580746441/Recipes/lukas-blazek-f-TWhXOrLiU-unsplash.jpg"
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
          src="https://res.cloudinary.com/mikebilyeuimg/image/upload/q_auto:good/v1580746441/Recipes/lukas-blazek-f-TWhXOrLiU-unsplash.jpg"
          style={{
            width: "1px",
            height: "1px",
            zIndex: "-5",
            position: "absolute"
          }}
        />
      </div>
      <div className="hero__container">
        <h1 className="hero__title">Zipiwisk</h1>
        <p className="hero__desc">
          The internet’s source of free recipes.
          <br /> Explore thousands of recipes from around the world!
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
