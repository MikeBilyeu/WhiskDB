import React from "react";

import { ReactComponent as Arrow } from "./arrow.svg";
import Rating from "./rating/Rating";

const RecipeDisplay = props => {
  const { title, likes, dislikes, total_time_mins } = props.recipe;
  let totalVotes = parseInt(likes) + parseInt(dislikes);
  let rating = totalVotes === 0 ? 5 : (likes / totalVotes) * 5;
  let hours =
    Math.floor(total_time_mins / 60) !== 0
      ? `${Math.floor(total_time_mins / 60)}h`
      : ``;
  let minutes = total_time_mins % 60 !== 0 ? `${total_time_mins % 60}m` : ``;

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

        <Rating rating={rating} totalVotes={totalVotes} />
        <div style={{ color: "#464646" }}>{` Time: ${hours} ${minutes}`}</div>
      </div>

      <Arrow style={{ width: "1rem", placeSelf: "center" }} />
    </li>
  );
};
//
export default RecipeDisplay;
