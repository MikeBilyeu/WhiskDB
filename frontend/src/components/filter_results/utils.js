const filterBy = {
  categoryOptions: [
    "All Categories",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Appetizer",
    "Dessert",
    "Beverage",
    "Side"
  ],
  dietOptions: ["None", "Vegetarian", "Vegan"],
  sortOptions: ["Top Rated", "Time", "Newest"]
};

export const filterOptions = buttonToggled => {
  let options = filterBy.categoryOptions;
  let type = null;

  switch (buttonToggled) {
    case "Category":
      options = filterBy.categoryOptions;
      type = "category";
      break;
    case "Diet":
      options = filterBy.dietOptions;
      type = "diet";
      break;
    case "Sort":
      options = filterBy.sortOptions;
      type = "sort";
      break;
    default:
      break;
  }
  return { options, type };
};
