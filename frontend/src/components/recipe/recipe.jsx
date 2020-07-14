import React, { useEffect } from "react";
import classNames from "classnames";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import NoMatch from "../no_match";
import Header from "./header";
import HeaderDesktop from "../header_desktop";
import RecipeDetails from "./RecipeDetails";
import Ingredients from "./ingredients";
import Instructions from "./instructions";
import More from "./more";
import Loading from "../loading";
import Edit from "./edit";
import { ReactComponent as Arrow } from "../../assets/images/arrowLeft.svg";
import { getRecipe, saveRecipe, unsaveRecipe } from "../../actions/recipe";
import convertTime from "../../selectors/time-selector";
import "./recipe.scss";

const Recipe = props => {
  const recipe_id = props.match.params.recipe_id;
  const user_id = props.user_id;

  useEffect(() => {
    props.getRecipe(recipe_id, user_id);
  }, []);

  const {
    noMatch,
    showMoreOpen,
    isFetching,
    editRecipe,
    recipe: {
      image_url,
      instructions,
      footnote,
      total_time,
      title,
      author,
      saved
    }
  } = props.recipeData;

  let recipeImage =
    !isFetching &&
    image_url.replace("upload/", "upload/c_scale,h_1500,q_auto:good/");

  document.title = !title ? document.title : `${title} |  ZipiWhisk`;

  const handleBackClick = () => {
    if (props.location.key && !props.location.state) {
      props.history.goBack();
    } else {
      props.history.push("/");
    }
  };

  const handleSaveClick = () => {
    if (saved) {
      props.unsaveRecipe(recipe_id, user_id);
    } else {
      props.saveRecipe(recipe_id, user_id);
    }
  };

  if (noMatch) {
    return <NoMatch />;
  }
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
          author={author}
          handleSaveClick={handleSaveClick}
        />
        {showMoreOpen ? <More className="recipe-more" /> : null}
        <img
          className="recipe__img"
          href="recipe photo"
          alt=""
          src={recipeImage}
        />
        <div className="recipe__img-fade"></div>

        <div
          className="recipe__container"
          style={{ position: "relative", top: "calc(100vh - 11rem)" }}
        >
          <RecipeDetails time={total_time} />
          <Ingredients />
          <Instructions instructions={instructions} footnote={footnote} />
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
          {props.isAuth && !author ? (
            <div
              className={classNames("recipe__save-btn", {
                "recipe__save-btn--active": saved
              })}
              onClick={handleSaveClick}
            >
              {saved ? "Unsave" : "Save"}
            </div>
          ) : !props.isAuth ? (
            <Link
              className="recipe__login-btn"
              to={{
                pathname: "/auth",
                state: { from: props.location.pathname }
              }}
            >
              Login to save
            </Link>
          ) : null}

          <RecipeDetails time={total_time} />

          <img
            className="recipe__img"
            href="recipe photo"
            alt=""
            src={recipeImage}
          />

          <Ingredients />

          <Instructions
            instructions={instructions}
            time={total_time}
            footnote={footnote}
          />
        </div>
      </MediaQuery>
    </div>
  );
};

const mapStateToProps = state => ({
  recipeData: {
    ...state.recipe,
    recipe: { ...state.recipe.recipe, total_time: convertTime(state) }
  },
  user_id: state.auth.user.user_id,
  isAuth: state.auth.isAuthenticated,
  user_img: state.auth.user.image_url
});

export default withRouter(
  connect(
    mapStateToProps,
    { getRecipe, saveRecipe, unsaveRecipe }
  )(Recipe)
);
