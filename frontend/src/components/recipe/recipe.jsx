import React, { useEffect } from "react";
import classNames from "classnames";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import Header from "./header";
import HeaderDesktop from "../header_desktop";
import RecipeDetails from "./RecipeDetails";
import Ingredients from "./ingredients";
import Directions from "./directions";
import More from "./more";
import Loading from "../loading";
import Edit from "./edit";
import { ReactComponent as SaveIcon } from "../../assets/images/heart.svg";
import { ReactComponent as Arrow } from "../../assets/images/arrowLeft.svg";
import { getRecipe, saveRecipe } from "../../actions/recipe";
import convertTime from "../../selectors/time-selector";
import "./recipe.scss";

const Recipe = props => {
  const recipe_id = props.match.params.recipe_id;
  const user_id = props.user_id;

  useEffect(() => {
    props.getRecipe(recipe_id, user_id);
  }, []);

  const {
    showMoreOpen,
    isFetching,
    editRecipe,
    saved,
    recipe: { image_url, directions, footnote, time, title, username }
  } = props.recipeData;

  let recipeImage =
    !isFetching && image_url.replace("upload/", "upload/q_auto:good,w_1500/");

  document.title = !title ? document.title : `${title} |  Zipiwisk`;

  const handleBackClick = () => {
    props.history.location.key
      ? props.history.goBack()
      : props.history.push("/");
  };

  if (isFetching) {
    return <Loading />;
  }

  if (editRecipe) {
    return <Edit />;
  }

  return (
    <div className="recipe">
      <MediaQuery maxDeviceWidth={649}>
        <Header
          recipe_id={recipe_id}
          user_id={user_id}
          handleBackClick={handleBackClick}
          isAuth={props.isAuth}
        />
        {showMoreOpen ? <More className="recipe-more" /> : null}
        <img
          className="recipe__img"
          href="recipe photo"
          alt=""
          src={recipeImage}
        />

        <div className="recipe__container">
          <RecipeDetails time={time} />
          <Ingredients />
          <Directions directions={directions} time={time} footnote={footnote} />
          <div className="recipe__created-by">
            Recipe by {username.toLowerCase()}
          </div>
        </div>
      </MediaQuery>

      <MediaQuery minDeviceWidth={650}>
        <HeaderDesktop isAuth={props.isAuth} user_img={props.user_img}>
          <div className="recipe__d-back-btn" onClick={handleBackClick}>
            <Arrow className="recipe__d-back-icon" />
            Go back
          </div>
          <More className="header-d-more" />
        </HeaderDesktop>
        <Ingredients />

        <div className="recipe__container">
          {props.isAuth ? (
            <div
              className={classNames("recipe__save-btn", {
                "recipe__save-btn--active": saved
              })}
              onClick={() => props.saveRecipe(recipe_id, user_id)}
            >
              <SaveIcon className="recipe__save-icon" />
              {saved ? "Saved" : "Save"}
            </div>
          ) : (
            <Link className="recipe__login-btn" to="/auth">
              Login to save
            </Link>
          )}

          <RecipeDetails time={time} />

          <Ingredients />

          <Directions directions={directions} time={time} footnote={footnote} />
          <img
            className="recipe__img"
            href="recipe photo"
            alt=""
            src={recipeImage}
          />
          <div className="recipe__created-by">
            Recipe by {username.toLowerCase()}
          </div>
        </div>
      </MediaQuery>
    </div>
  );
};

const mapStateToProps = state => ({
  recipeData: {
    ...state.recipe,
    recipe: { ...state.recipe.recipe, time: convertTime(state) }
  },
  user_id: state.auth.user.user_id,
  isAuth: state.auth.isAuthenticated,
  user_img: state.auth.user.image_url
});

export default withRouter(
  connect(
    mapStateToProps,
    { getRecipe, saveRecipe }
  )(Recipe)
);
