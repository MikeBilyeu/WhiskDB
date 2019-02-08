import React from "react";
import Button from "./Button";

class Recipe extends React.Component {
  state = {
    title: "Authenic Tacos",
    votes: 115,
    author: "Mike Bilyeu",
    time: "35m",
    imageURL:
      "https://images.unsplash.com/photo-1545092844-0c99aa3b6cab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
    servings: 3,
    ingredients: ["1 Cup Flour", "1 tbs Water"],
    directions: [
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy.",
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy.",
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy."
    ]
  };

  renderIngredients = ingredients => {
    return ingredients.map(ingredient => {
      return <li key={ingredient}>{ingredient}</li>;
    });
  };

  renderDirections = directions => {
    return directions.map((step, i) => {
      return (
        <li key={i}>
          <p>{step}</p>
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <i className="star icon" />
        <i className="star icon" />
        <i className="star icon" />
        <i className="star icon" />
        <i className="star outline icon" />
        <div>{this.state.votes} votes</div>
        <h1>{this.state.title}</h1>
        <h4>-{this.state.author}</h4>
        <div>Time: {this.state.time}</div>
        <img
          className="ui medium bordered image big"
          src={this.state.imageURL}
        />
        <Button text="Change Yeild" linkTo="/recipe" />
        <p>Servings: {this.state.servings}</p>
        <div className="ui section divider" />
        <h2>Ingredients</h2>
        <ul>{this.renderIngredients(this.state.ingredients)}</ul>
        <div className="ui section divider" />
        <h2>Directions</h2>
        <ol>{this.renderDirections(this.state.directions)}</ol>
        <div className="ui section divider" />
        <h2>How was it?</h2>
        <i className="thumbs up icon big" />
        <i className="thumbs down icon big" />
      </div>
    );
  }
}

export default Recipe;
