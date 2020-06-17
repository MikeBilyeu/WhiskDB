import { createSelector } from "reselect";

const timeSelector = state => state.recipe.recipe.total_time;

const convertTime = total_time_mins => {
  const hours = Math.floor(parseInt(total_time_mins) / 60) || "";
  const minutes = parseInt(total_time_mins) % 60 || "";
  return { hours, minutes };
};

export default createSelector(
  timeSelector,
  convertTime
);
