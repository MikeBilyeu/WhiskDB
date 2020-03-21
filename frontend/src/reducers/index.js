import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import recipeReducer from "./recipeReducer";
import savedRecipesReducer from "./savedRecipesReducer";
import browseRecipesReducer from "./browseRecipesReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  recipe: recipeReducer,
  savedRecipes: savedRecipesReducer,
  browseRecipes: browseRecipesReducer,
  errors: errorReducer
});
