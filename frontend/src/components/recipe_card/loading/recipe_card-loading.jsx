import React from "react";
import "../recipe_card.scss";

const Loading = () => {
  return (
    <li className="recipe-card-loading">
      <div className="recipe-card-loading__thumbnail"></div>
    </li>
  );
};

export default Loading;
