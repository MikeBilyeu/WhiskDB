import React from "react";

import { ReactComponent as Arrow } from "./arrow.svg";

const RecipeDisplay = props => {
  const { title, likes, dislikes, total_time_mins } = props.recipe;
  let totalVotes = likes + dislikes;
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
        margin: "1rem 0",
        display: "grid",
        gridTemplateColumns: "1fr 4fr 1fr",
        gridGap: "1rem"
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
        <div>{`${rating} stars ${totalVotes} vote${
          totalVotes !== 1 ? "s" : ""
        }`}</div>
        <div style={{ color: "#464646" }}>{` Time: ${hours} ${minutes}`}</div>
      </div>

      <Arrow style={{ width: "2.5rem", placeSelf: "center" }} />
    </li>
  );
};
//
export default RecipeDisplay;
