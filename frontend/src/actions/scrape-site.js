//import axios from "axios";
//import { change } from "redux-form";

// export const scrapeSite = URL => async dispatch => {
//   dispatch({ type: GET_SCRAPE_URL_REQUEST });
//   try {
//     const { data: recipe } = await axios.get("/scrape-url", {
//       params: { URL }
//     });
//     dispatch(change("newRecipe", "image_url", recipe.image_url));
//     dispatch(change("newRecipe", "title", recipe.title));
//     dispatch(change("newRecipe", "servings", recipe.servings));
//     dispatch(change("newRecipe", "ingredients", recipe.ingredients));
//     dispatch(change("newRecipe", "time", recipe.time));
//     dispatch(change("newRecipe", "directions", recipe.directions));
//     dispatch(change("newRecipe", "keywords", recipe.keywords));
//   } catch (err) {
//     console.error(err);
//   }
// };
