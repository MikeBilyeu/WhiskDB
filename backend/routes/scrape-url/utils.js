const cheerio = require("cheerio");

const querySelector = {
  image_url: [
    ".hero-photo__wrap img" // allrecipes.com
  ],
  title: [
    "h1#recipe-main-content" // allrecipes.com
  ],
  yield: [
    ".adjustServings .subtext" // allrecipes.com
  ],
  ingredients: [
    "[itemprop='recipeIngredient']" // allrecipes.com
  ],
  time: [
    "[itemprop='totalTime']" // allrecipes.com
  ],
  directions: [
    ".recipe-directions__list--item" // allrecipes.com
  ]
};

const formatRecipeImage = recipeImage => {
  let image = "";
  if (Array.isArray(recipeImage)) {
    if (typeof recipeImage[0] === "object") {
      image = recipeImage[0].url;
    } else {
      image = recipeImage[0];
    }
  } else if (typeof recipeImage === "object") {
    image = recipeImage.url;
  } else {
    image = recipeImage;
  }
  return image;
};

const formatDirections = recipeInstructions => {
  let directions = "";
  if (Array.isArray(recipeInstructions)) {
    recipeInstructions.forEach((obj, i, arr) => {
      if (obj.text) {
        if (i !== arr.length) {
          directions += obj.text + "\n\n";
        } else {
          directions += obj.text;
        }
      }
    });
  } else {
    directions =
      recipeInstructions && recipeInstructions.split(/\s\s+/g).join("\n\n");
  }
  return directions;
};

const searchData = dataObj => {
  if (dataObj["@type"] === "Recipe") {
    return dataObj;
  }
  // Search array for a nested '@type' of Recipe
  if (dataObj["@graph"] && dataObj["@graph"].length) {
    for (const subObj of dataObj["@graph"]) {
      if (subObj["@type"] === "Recipe") {
        return subObj;
      }
    }
  }
  return false;
};

const findRecipe = data => {
  if (Array.isArray(data)) {
    for (const obj of data) {
      if (searchData(obj)) {
        return searchData(obj);
      }
    }
  } else if (searchData(data)) {
    return searchData(data);
  }
  return false;
};

const formatData = data => {
  let recipe = {};
  recipe.image_url = formatRecipeImage(data.image);
  recipe.title = data.name;
  let servings =
    data.recipeYield && data.recipeYield.match(/\d{1,2}(?=( *serving))/i);
  recipe.servings = servings ? servings[0] : "";
  recipe.ingredients = data.recipeIngredient
    .map(ing => ing.replace(/\s\s+/g, " "))
    .join("\n");
  let hours = data.totalTime.match(/\d{1,2}(?=H)/i);
  let minutes = data.totalTime.match(/\d{1,2}(?=M)/i);
  recipe.time = {
    hours: hours ? hours[0] : "",
    minutes: minutes ? minutes[0] : ""
  };
  recipe.directions = formatDirections(data.recipeInstructions);

  recipe.categores = data.recipeCategory;

  // need to join categores array into keywords
  if (typeof data.keywords === "string") {
    recipe.keywords = data.keywords.split(",").map(keywords => keywords.trim());
  } else {
    recipe.keywords = data.keywords;
  }

  return recipe;
};

const formatHTMLData = html => {
  const $ = cheerio.load(html);
  let recipe = {};
  recipe.image_url = $(querySelector.image_url[0]).attr("src");
  recipe.title = $(querySelector.title[0])
    .text()
    .trim();
  let servings = $(querySelector.yield[0])
    .text()
    .match(/\d{1,2}(?=( *serving))/i);
  recipe.servings = servings ? servings[0] : "";
  recipe.ingredients = "";
  $(querySelector.ingredients[0]).each((index, element) => {
    recipe.ingredients +=
      $(element)
        .text()
        .replace(/\s\s+/g, " ")
        .trim() + "\n";
  });
  let totalTime = $(querySelector.time[0]).text();
  let hours = totalTime.match(/\d{1,2}(?=( *h))/i);
  let minutes = totalTime.match(/\d{1,2}(?=( *m))/i);
  recipe.time = {
    hours: hours ? hours[0] : "",
    minutes: minutes ? minutes[0] : ""
  };
  recipe.directions = "";

  $(querySelector.directions[0]).each((i, e) => {
    recipe.directions +=
      $(e)
        .text()
        .trim() + " \n\n";
  });

  return recipe;
};

module.exports = { searchData, findRecipe, formatData, formatHTMLData };
