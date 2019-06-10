import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Action Creator
import { likeRecipe, dislikeRecipe } from "../../actions/voteActions";

const Vote = props => {
  const {
    recipe_id,
    user_id,
    voteClicked,
    likeRecipe,
    liked,
    dislikeRecipe,
    disliked
  } = props;
  return (
    <div>
      <h3>How was it?</h3>
      {voteClicked && user_id === null ? (
        <h1>You must {<Link to="/auth">Login</Link>} to vote</h1>
      ) : null}
      <button
        onClick={() => {
          likeRecipe(recipe_id, user_id);
        }}
        style={{
          color: liked && user_id !== null ? "green" : "black"
        }}
      >
        Like
      </button>
      <button
        onClick={() => {
          dislikeRecipe(recipe_id, user_id);
        }}
        style={{
          color: disliked && user_id !== null ? "red" : "black"
        }}
      >
        Dislike
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  liked: state.recipe.liked,
  disliked: state.recipe.disliked,
  voteClicked: state.recipe.voteClicked
});

export default connect(
  mapStateToProps,
  { likeRecipe, dislikeRecipe }
)(Vote);
