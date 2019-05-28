import React from "react";

import { ReactComponent as Arrow } from "./arrow.svg";
import Rating from "./rating/Rating";

const RecipeDisplay = props => {
  const { title, total_time_mins: time, votes, rating } = props.recipe;
  const hours = Math.floor(time / 60) !== 0 ? `${Math.floor(time / 60)}h` : ``;
  const minutes = time % 60 !== 0 ? `${time % 60}m` : ``;

  return (
    <li
      style={{
        borderBottom: "solid .1rem #BFBFBF",
        padding: ".5rem",
        margin: ".5rem 0",
        display: "grid",
        gridTemplateColumns: "1fr 4fr .5fr",
        gridGap: ".5rem"
      }}
    >
      <img
        src="https://via.placeholder.com/300"
        height="80rem"
        style={{
          borderRadius: "50%",
          border: "solid #0172C4",
          padding: ".2rem"
        }}
      />
      <div
        style={{
          display: "grid",
          alignItems: "center"
        }}
      >
        <div
          style={{
            color: "#0172C4",
            fontSize: "1.4rem"
          }}
        >{`${title}`}</div>

        <Rating rating={rating} votes={votes} />
        <div style={{ color: "#464646" }}>{` Time: ${hours} ${minutes}`}</div>
      </div>

      <Arrow style={{ width: "1rem", placeSelf: "center" }} />
    </li>
  );
};
//
export default RecipeDisplay;
