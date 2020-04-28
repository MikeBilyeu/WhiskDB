import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import cloneRecipeReducer from "./cloneRecipeReducer";
import errorReducer from "./errorReducer";
import recipeReducer from "./recipeReducer";
import savedRecipesReducer from "./savedRecipesReducer";
import browseRecipesReducer from "./browseRecipesReducer";
import alertReducer from "./alertReducer";

const appReducer = combineReducers({
  form: formReducer,
  cloneRecipe: cloneRecipeReducer,
  auth: authReducer,
  recipe: recipeReducer,
  savedRecipes: savedRecipesReducer,
  browseRecipes: browseRecipesReducer,
  alert: alertReducer,
  errors: errorReducer
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
