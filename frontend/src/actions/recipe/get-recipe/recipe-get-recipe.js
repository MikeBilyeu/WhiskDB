import axios from "axios";
import { GET_RECIPE_REQUEST, GET_RECIPE, GET_ERRORS } from "../../types";

const getRecipe = (recipe_id, user_id) => dispatch => {
  dispatch({ type: GET_RECIPE_REQUEST });
  axios
    .get("/recipes/recipe", { params: { recipe_id, user_id } })
    .then(res => {
      dispatch({ type: GET_RECIPE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export default getRecipe;
