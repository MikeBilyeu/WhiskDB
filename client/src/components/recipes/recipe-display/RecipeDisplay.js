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
        borderBottom: "solid .1rem #F2F2F2",
        padding: ".5rem .5rem .5rem 0",
        margin: "0",
        display: "grid",
        placeItems: "center",
        gridTemplateColumns: "4.5rem minmax(11rem,4fr) .2fr",
        gridGap: ".1rem",
        color: "#313131"
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        height="70rem"
        width="70rem"
        style={{
          borderRadius: "50%"
        }}
      />
      <div
        style={{
          display: "grid",
          alignItems: "center",
          gridTemplateRows: "1fr 1.1rem 1.1rem",
          gridGap: ".3rem",
          justifySelf: "start",
          paddingLeft: ".3rem"
        }}
      >
        <div
          style={{
            fontSize: "1.2rem",
            letterSpacing: "-.5px",
            lineHeight: "1.4rem"
          }}
        >{`${title}`}</div>

        <Rating rating={rating} votes={votes} />
        <div style={{ fontSize: ".9rem" }}>{`Time: ${hours} ${minutes}`}</div>
      </div>

      <Arrow style={{ width: ".6rem", placeSelf: "center" }} />
    </li>
  );
};
//
export default RecipeDisplay;
