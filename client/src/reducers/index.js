import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { ingredientNumReducer } from "./ingredientNumReducer";
export default combineReducers({
  form: formReducer,
  numOfIngredients: ingredientNumReducer
});
