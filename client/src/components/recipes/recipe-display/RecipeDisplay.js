import React from "react";

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
    <li>
      <div>{`${title}`}</div>
      <div>{`${rating} stars ${totalVotes} vote${
        totalVotes !== 1 ? "s" : ""
      }`}</div>
      <div>{` Time: ${hours} ${minutes}`}</div>
    </li>
  );
};
//
export default RecipeDisplay;
