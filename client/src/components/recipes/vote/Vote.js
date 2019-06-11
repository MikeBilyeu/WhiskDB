import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as Like } from "./like.svg";
// Action Creator
import { likeRecipe, dislikeRecipe } from "../../../actions/voteActions";

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
    <div className="vote">
      <h2>How was it?</h2>
      {voteClicked && user_id === null ? (
        <h3>
          You must{" "}
          {
            <Link to="/auth" style={{ color: "#0172c4" }}>
              Login
            </Link>
          }{" "}
          to vote
        </h3>
      ) : null}
      <div className="vote-options">
        <div
          className="vote-btn like"
          style={{
            backgroundColor: liked && user_id !== null ? "#0172c4" : "#E2E2E2"
          }}
          onClick={() => {
            likeRecipe(recipe_id, user_id);
          }}
        >
          <Like />
        </div>
        <div
          className="vote-btn dislike"
          style={{
            backgroundColor:
              disliked && user_id !== null ? "#E34F4F" : "#E2E2E2"
          }}
          onClick={() => {
            dislikeRecipe(recipe_id, user_id);
          }}
        >
          <Like style={{ transform: "rotate(180deg)", marginTop: ".2rem" }} />
        </div>
      </div>
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
