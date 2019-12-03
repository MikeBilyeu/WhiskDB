import { createSelector } from "reselect";

const savedRecipesSelector = state => state.savedRecipes.recipes;
const sortBySelector = state => state.savedRecipes.sortBy;

const sortRecipes = (sortBy, savedRecipes) => {
  switch (sortBy) {
    case "time":
      return [...savedRecipes].sort((a, b) => {
        return a.total_time_mins - b.total_time_mins;
      });
    case "a-z":
      return [...savedRecipes].sort((a, b) => {
        return a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1;
      });

    case "top rated":
      return [...savedRecipes].sort((a, b) => {
        return b.rating - a.rating === 0
          ? b.votes - a.votes
          : b.rating - a.rating;
      });
    case "date saved":
      return [...savedRecipes].sort((a, b) => {
        return new Date(b.saved_date) - new Date(a.saved_date);
      });

    default:
      break;
  }
};

export default createSelector(
  sortBySelector,
  savedRecipesSelector,
  sortRecipes
);
