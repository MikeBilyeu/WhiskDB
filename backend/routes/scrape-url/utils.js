const cheerio = require("cheerio");

const searchData = dataObj => {
  if (dataObj["@type"] === "Recipe") {
    return dataObj;
  }
  // Search array for a nested '@type' of Recipe
  if (dataObj["@graph"].length) {
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
  recipe.servings = data.recipeYield;

  recipe.ingredients = data.recipeIngredient
    .map(ing => ing.replace(/\s\s+/g, " "))
    .join("\n");

  let hours = data.totalTime.match(/\d{1,2}(?=H)/);
  let minutes = data.totalTime.match(/\d{1,2}(?=M)/);
  recipe.time = {
    hours: hours ? hours[0] : "",
    minutes: minutes ? minutes[0] : ""
  };

  recipe.directions = formatDirections(data.recipeInstructions);

  // need to join categores array into keywords
  if (typeof data.keywords === "string") {
    recipe.keywords = data.keywords.split(",").map(keywords => keywords.trim());
  } else {
    recipe.keywords = data.keywords;
  }

  return recipe;
};

const formatHTMLData = async html => {
  const $ = await cheerio.load(html);
  let recipe = {};

  return recipe;
};

module.exports = { searchData, findRecipe, formatData, formatHTMLData };

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
    directions = recipeInstructions.split(/\s\s+/g).join("\n\n");
  }
  return directions;
};

const querySelector = {
  image_url: [
    ".image-overlay img", // allrecipes.com new
    ".hero-photo__wrap img" // allrecipes.com
  ],
  title: [
    ".recipe-container h1.heading-content", // allrecipes.com new
    "h1#recipe-main-content" // allrecipes.com
  ],
  yield: [
    ".recipe-adjust-servings__size-quantity", // allrecipes.com new
    ".adjustServings .subtext" // allrecipes.com
  ],
  ingredients: [
    ".ingredients-item-name", // allrecipes.com new
    "[itemprop='recipeIngredient']" // allrecipes.com
  ],
  time: [
    ".recipe-meta-container > div div:nth-child(3) div:last-child", // allrecipes.com new
    "[itemprop='totalTime']" // allrecipes.com
  ],
  directions: [
    ".instructions-section-item p", // allrecipes.com new
    ".recipe-directions__list--item" // allrecipes.com
  ]
};

// const image_url = $(".icon-image-zoom").attr("data-image"); // allrecipes.com new
// const image_url = $(".hero-photo__wrap img").attr("src"); // allrecipes.com

// const title = $("h1.recipe-title")
//   .text()
//   .trim();
//
// // const servings = $(".servings input").attr("value"); // yummly.com needs .attr('value')
// const servings = $(".servings input")
//   .text()
//   .trim();
//
// let ingredients = [];
//
// $(".IngredientLine").each((index, element) => {
//   ingredients.push(
//     $(element)
//       .text()
//       .replace(/\s\s+/g, " ")
//       .trim()
//   );
// });
//
// const time = $(".summary-item-wrapper div:nth-child(2)").text();
// //console.log(time);
// // //split the time into hours and minutes
// //
// let directions = "";
//
// $(".prep-step").each((i, e) => {
//   directions +=
//     $(e)
//       .text()
//       .replace(/\d+/g, "")
//       .trim() + " \n\n";
//   // .replace(/\s\s+/g, "\n\n");
// });
//
// let footnote = "";
//
// const keywords = [];
//
// $(".o-Capsule__m-TagList.m-TagList a").each((index, element) => {
//   keywords.push(
//     $(element)
//       .text()
//       .replace(/\s\s+/g, " ")
//       .trim()
//   );
// });

//const recipe = {
//image_url,
// title,
// servings,
// ingredients,
// time,
// directions,
// footnote,
// keywords
//};
//response.status(200).json(recipe);
