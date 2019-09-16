import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import recipeReducer from "./recipeReducer";
import savedRecipesReducer from "./savedRecipesReducer";
import myRecipesRecuder from "./myRecipesReducer";
import browseRecipesReducer from "./browseRecipesReducer";
import userReducer from "./userReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  userData: userReducer,
  recipe: recipeReducer,
  savedRecipes: savedRecipesReducer,
  myRecipes: myRecipesRecuder,
  browseRecipes: browseRecipesReducer,
  errors: errorReducer
});
