import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import renderTime from "../../utils/time";
import { ReactComponent as SaveIcon } from "../../assets/images/saveIcon.svg";
import clock from "../../assets/images/time.png";
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

  convertTime = total_time_mins => {
    const hours = Math.floor(parseInt(total_time_mins) / 60) || "";
    const minutes = parseInt(total_time_mins) % 60 || "";
    return renderTime({ hours, minutes });
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

  convertSaves = num => {
    return num > 1000000
      ? parseFloat((num / 1000000).toFixed(1)) + "m"
      : num > 1000
      ? parseFloat((num / 1000).toFixed(1)) + "k"
      : num;
  };

  render() {
    const {
      title,
      num_reviews,
      rating,
      recipe_id,
      total_time_mins,
      image_url,
      num_saves
    } = this.props.recipe;
    return (
      <li>
        <Link className="recipe-card" to={`/recipe/${recipe_id}`}>
          <img className="thumbnail" src={image_url} alt="" />
          <div className="title">{title}</div>
          <div className="recipe-meta">
            <Rating
              className="rating results-view"
              rating={rating}
              votes={num_reviews}
            />
            <div className="time">
              <img src={clock} alt="" />
              {this.convertTime(total_time_mins)}
            </div>

            <div className="saves">
              <SaveIcon style={{ width: ".9rem", fill: "#E2E2E2" }} />
              {this.convertSaves(num_saves)}
            </div>
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
