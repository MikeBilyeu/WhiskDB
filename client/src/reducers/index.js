import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import recipeReducer from "./recipeReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  recipe: recipeReducer,
  errors: errorReducer
});
