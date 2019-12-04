import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as SaveIcon } from "../../assets/images/saveIcon.svg";
import Rating from "../recipe/rating";
import "./recipe-display.scss";
import { saveRecipe } from "../../actions/recipeActions";

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
      num_reviews,
      rating,
      recipe_id,
      total_time_mins,
      image_url
    } = this.props.recipe;
    return (
      <li>
        <Link className="recipe-card" to={`/recipe/${recipe_id}`}>
          <img className="thumbnail" src={image_url} alt="" />
          <div className="title">{title}</div>
          <div className="rating-time">
            <Rating className="rating" rating={rating} votes={num_reviews} />
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
