import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Action Creator
import { likeRecipe, dislikeRecipe } from "../../actions/recipeActions";

class Vote extends React.Component {
  render() {
    const { recipe_id, user_id } = this.props;
    return (
      <div>
        <h3>How was it?</h3>
        {this.props.voteClicked && user_id === null ? (
          <h1>You must {<Link to="/login">Login</Link>} to vote</h1>
        ) : null}
        <button
          onClick={() => {
            this.props.likeRecipe(recipe_id, user_id);
          }}
          style={{
            color: this.props.liked && user_id !== null ? "green" : "black"
          }}
        >
          Like
        </button>
        <button
          onClick={() => {
            this.props.dislikeRecipe(recipe_id, user_id);
          }}
          style={{
            color: this.props.disliked && user_id !== null ? "red" : "black"
          }}
        >
          Dislike
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  liked: state.recipe.liked,
  disliked: state.recipe.disliked,
  voteClicked: state.recipe.voteClicked
});

export default connect(
  mapStateToProps,
  { likeRecipe, dislikeRecipe }
)(Vote);
