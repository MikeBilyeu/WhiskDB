import React from "react";
import Button from "./Button";

const Recipe = props => {
  return (
    <div>
      <div>Stars</div>
      <div>num of votes</div>
      <h1>Title of Recipe</h1>
      <h4>-Author of Recipe</h4>
      <div>Time</div>
      <img src="" alt="Recipe image" />
      <Button text="Change Yeild" />
      <p>Servings</p>
      <h2>Ingredients</h2>
      <ul>
        <li>Ingredient</li>
        <li>Ingredient</li>
        <li>Ingredient</li>
        <li>Ingredient</li>
      </ul>
      <h2>Directions</h2>
      <ol>
        <li>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy.
          </p>
        </li>
        <li>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy.
          </p>
        </li>
        <li>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy.
          </p>
        </li>
      </ol>
      <h2>How was it?</h2>
      <div>Thumbs up</div>
      <div>Thumbs down</div>
    </div>
  );
};

export default Recipe;
