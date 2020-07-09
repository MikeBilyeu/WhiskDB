import React, { useState } from "react";
import classNames from "classnames";
import SearchBar from "../../search_bar";
import Logo from "../../../assets/images/ZipiWhisk-Logo.png";
import "./home-hero.scss";

const Hero = () => {
  const [smallImgLoaded, setSmallImgLoaded] = useState(false);
  const [bigImgLoaded, setBigImgLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

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
          src="https://res.cloudinary.com/mikebilyeuimg/image/upload/c_scale,q_auto:low,w_100/v1594146289/Recipes/joanna-kosinska-Prfs32wh-o4-unsplash.jpg"
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
          src="https://res.cloudinary.com/mikebilyeuimg/image/upload/v1594146289/Recipes/joanna-kosinska-Prfs32wh-o4-unsplash.jpg"
          style={{
            width: "1px",
            height: "1px",
            zIndex: "-5",
            position: "absolute"
          }}
        />
      </div>
      <div
        className={classNames("hero__container", {
          "hero__container--loaded": logoLoaded
        })}
      >
        <img
          onLoad={() => setLogoLoaded(true)}
          className="hero__title"
          src={Logo}
          alt="zipiwhisk logo"
        />
        <p className="hero__desc">
          The internet’s source of free recipes.
          <br />
          Explore thousands of recipes from around the world!
        </p>
        <SearchBar />
      </div>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
        style={{
          position: "absolute",
          bottom: "-5rem",
          right: "-15rem",
          transform: "scale(0.25)"
        }}
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="7XSWP2CQPZBEA" />
        <input
          type="image"
          src="https://res.cloudinary.com/mikebilyeuimg/image/upload/v1594251139/paypal-donate-button.png"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </div>
  );
};

export default Hero;
