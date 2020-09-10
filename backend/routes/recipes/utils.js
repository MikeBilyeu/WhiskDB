const cheerio = require("cheerio");

const querySelector = {
  imageUrl: {
    allrecipes: ".rec-photo",
    nytimes: ".media-container [itemprop='image']"
  },
  title: {
    allrecipes: "h1.recipe-summary__h1",
    nytimes: "h1"
  },
  yield: {
    allrecipes: ".adjustServings .subtext",
    nytimes: "[itemprop='recipeYield']"
  },
  ingredients: {
    allrecipes: "[itemprop='recipeIngredient']",
    nytimes: "[itemprop='recipeIngredient']"
  },
  time: {
    allrecipes: "[itemprop='totalTime']",
    nytimes: ".recipe-time-yield li:nth-child(2)"
  },
  directions: {
    allrecipes: ".recipe-directions__list--item",
    nytimes: "[itemprop='recipeInstructions'] li"
  },
  footnotes: {
    nytimes: ".recipe-notes"
  },
  keywords: {
    nytimes: "a.tag"
  }
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
      if (obj["@type"] === "HowToSection") {
        directions += obj.name + "\n";
        obj.itemListElement.forEach((obj, i, arr) => {
          if (obj.text) {
            if (i !== arr.length) {
              directions += obj.text + "\n\n";
            } else {
              directions += obj.text;
            }
          }
        });
      } else if (obj.text) {
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

const getTotalTime = duration => {
  if (!duration) {
    return { hours: "", minutes: "" };
  }

  let hours = duration.match(/[1-9]?([1-9]|(?<=\d)0)(?=H)/i);
  let minutes = duration.match(/(?<=H)[1-5]?([1-9]|(?<=\d)0)(?=M)/i);

  return {
    hours: hours ? hours[0] : "",
    minutes: minutes ? minutes[0] : ""
  };
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

  recipe.time = getTotalTime(data.totalTime);

  recipe.directions = formatDirections(data.recipeInstructions);

  recipe.categories = data.recipeCategory;

  // need to join categories array into keywords
  if (typeof data.keywords === "string") {
    recipe.keywords = data.keywords.split(",").map(keywords => keywords.trim());
  } else {
    recipe.keywords = data.keywords;
  }

  return recipe;
};

const selectorKey = url => {
  const allrecipesRegEx = /^https:\/\/www\.allrecipes\.com\/recipe.+/i;
  const nytimesRegEx = /^https:\/\/cooking\.nytimes\.com\/recipes.+/i;
  if (allrecipesRegEx.test(url)) {
    return "allrecipes";
  }
  if (nytimesRegEx.test(url)) {
    return "nytimes";
  }
  return;
};

const formatHTMLData = (html, url) => {
  const $ = cheerio.load(html);
  let recipe = {};

  let key = selectorKey(url);

  recipe.image_url = $(querySelector.imageUrl[key]).attr("src");

  recipe.title = $(querySelector.title[key])
    .text()
    .trim();

  let servings = $(querySelector.yield[key])
    .text()
    .match(/\d{1,2}(?=( *serving))/i);

  recipe.servings = servings ? servings[0] : "";

  recipe.ingredients = "";

  $(querySelector.ingredients[key]).each((index, element) => {
    recipe.ingredients +=
      $(element)
        .text()
        .replace(/\s\s+/g, " ")
        .trim() + "\n";
  });

  recipe.ingredients = recipe.ingredients.trim();

  let totalTime = $(querySelector.time[key]).text();
  let hours = totalTime.match(/\d{1,2}(?=( *h))/i);
  let minutes = totalTime.match(/\d{1,2}(?=( *m))/i);
  recipe.time = {
    hours: hours ? hours[0] : "",
    minutes: minutes ? minutes[0] : ""
  };

  recipe.directions = "";

  $(querySelector.directions[key]).each((i, e) => {
    recipe.directions +=
      $(e)
        .text()
        .trim() + " \n\n";
  });

  recipe.keywords = [];
  $(querySelector.keywords[key]).each((i, e) => {
    recipe.keywords.push($(e).text());
  });
  recipe.keywords = recipe.keywords.length ? recipe.keywords.toString() : "";

  return recipe;
};

module.exports = {
  searchData,
  findRecipe,
  formatData,
  formatHTMLData,
  getTotalTime
};
