import React from "react";
import "../recipe_display.scss";

const Loading = () => {
  return (
    <li className="recipe-card loading">
      <div className="thumbnail"></div>
      <div className="title"></div>
      <div className="recipe-meta"></div>
    </li>
  );
};

export default Loading;
