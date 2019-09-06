import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as SaveIcon } from "./SaveIcon.svg";

import Rating from "./rating/Rating";

import "./rd-styles.css";

import { saveRecipe } from "../../../actions/recipeActions";

class RecipeDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: 0
    };
  }

  componentDidMount() {
    this.setState({ saved: this.props.recipe.saved });
  }

  formatMinsToHours = totalMinutes => {
    const hours =
      Math.floor(totalMinutes / 60) !== 0
        ? `${Math.floor(totalMinutes / 60)}hr`
        : ``;
    const minutes = totalMinutes % 60 !== 0 ? `${totalMinutes % 60}min` : ``;
    return `${hours} ${minutes}`;
  };

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { saved: !prevState.saved };
    });
    if (this.props.user_id) {
      this.props.saveRecipe(this.props.recipe.recipe_id, this.props.user_id);
    }
  };
  render() {
    const {
      title,
      votes,
      rating,
      username,
      recipe_id,
      total_time_mins
    } = this.props.recipe;
    return (
      <li>
        <Link className="recipe-card" to={`/recipe/${recipe_id}`}>
          <h3 className="recipe-username">{username}</h3>
          {this.state.saved && this.props.user_id == null ? (
            <Link className="login-to-save" to="/auth">
              Login
            </Link>
          ) : (
            <SaveIcon
              onClick={e => {
                this.handleClick(e);
              }}
              className="SaveIcon"
              style={{
                fill:
                  this.state.saved && this.props.user_id != null
                    ? "#0172C4"
                    : ""
              }}
            />
          )}

          <img
            className="thumbnail"
            src="https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            alt=""
          />

          <div className="title">{title}</div>
          <div className="rating-time">
            <Rating className="rating" rating={rating} votes={votes} />
            <div>•</div>
            {this.formatMinsToHours(total_time_mins)}
          </div>
        </Link>
      </li>
    );
  }
}
const mapStateToProps = state => {
  return { user_id: state.auth.user.user_id };
};
export default connect(
  mapStateToProps,
  { saveRecipe }
)(RecipeDisplay);
