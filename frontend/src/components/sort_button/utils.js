export const abbreviateSortBy = sortBy => {
  // return shorter text for disply under the sortIcon button
  switch (sortBy) {
    case "Date Saved":
      return "Saved";
    case "Top Rated":
      return "Rated";
    case "Time":
      return "Time";
    case "Newest":
      return "New";
    default:
      return sortBy;
  }
};
