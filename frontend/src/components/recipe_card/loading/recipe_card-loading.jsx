import React from "react";
import "../recipe_card.scss";

const Loading = () => {
  return (
    <li className="recipe-card-loading">
      <div className="recipe-card-loading__thumbnail"></div>
      <div className="recipe-card-loading__title"></div>
      <div className="recipe-card-loading__meta"></div>
    </li>
  );
};

export default Loading;
