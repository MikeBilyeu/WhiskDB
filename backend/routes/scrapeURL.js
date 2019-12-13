const axios = require("axios");
const cheerio = require("cheerio");
const Router = require("express-promise-router");
const router = new Router();
const passport = require("passport");
module.exports = router;

const image_urlSelectors = [
  ".image-overlay img", // allrecipes.com new
  ".hero-photo__wrap img", // allrecipes.com
  ".fr_r_header_vid_wrapperx img", // chowhound.com
  ".m-MediaBlock__a-Image.a-Image", // foodnetwork.com
  ".recipe-hero__item img" // food.com
];
const titleSelectors = [
  ".recipe-container h1.heading-content", // allrecipes.com new
  "h1#recipe-main-content", // allrecipes.com
  ".fr_r_info h1", // chowhound.com
  "h1.o-AssetTitle__a-Headline", // foodnetwork.com
  ".recipe-title h1" // food.com
];

const servingsSelectors = [
  ".recipe-adjust-servings__size-quantity", // allrecipes.com new
  ".adjustServings .subtext", // allrecipes.com
  ".frr_serves.fr_sep", // chowhound.com
  ".o-RecipeInfo__m-Yield .o-RecipeInfo__a-Description", // foodnetwork.com
  ".recipe-facts__servings a" // food.com
];

const ingredientSelectors = [
  ".ingredients-item-name", // allrecipes.com new
  "[itemprop='recipeIngredient']", // allrecipes.com
  ".freyja_box.freyja_box81 ul li", // chowhound.com
  ".o-Ingredients__a-Ingredient", // foodnetwork.com
  ".recipe-ingredients__ingredient" // food.com
];

const timeSelectors = [
  ".recipe-meta-container > div div:nth-child(3) div:last-child", // allrecipes.com new
  "[itemprop='totalTime']", // allrecipes.com
  ".frr_totaltime time", // chowhound.com
  ".o-RecipeInfo__a-Description.m-RecipeInfo__a-Description--Total", // foodnetwork.com
  ".recipe-facts__time span:not(.recipe-facts__title)" // food.com
];

const directionsSelector = [
  ".instructions-section-item p", // allrecipes.com new
  ".recipe-directions__list--item", // allrecipes.com
  "ol li", // chowhound.com this might match for other sites add parent class to prevent false match
  "ol .o-Method__m-Step", // foodnetwork.com
  ".recipe-directions__step" // food.com
];

const footnoteSelector = [];

const keywordSelector = [
  "o-Capsule__m-TagList.m-TagList a" // foodnetwork.com
];

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user;
    const { URL } = request.query;
    const { data: html } = await axios.get(URL);
    const $ = await cheerio.load(html);
    // get json

    // yummly
    // food.com
    // chowhound.com wacky format
    // some string values have unicode

    // possibly get iframe src and make axios request and check for "@context":"https://schema.org" json

    // some "@type":"Recipe" are nested within "@context":"https://schema.org" "@graph":[]
    //

    $("script[type='application/ld+json']").each((i, e) => {
      console.log(i);
      console.log("json", $(e).get()[0].children[0].data);
      //console.log("---JSON:", $(e).get().children[0].data);
    });

    //  console.log(html);
    // {
    //   normalizeWhitespace: false;
    // }

    // we need to check if the recipe can even be parsed
    // iterate over array of 'recipe selectors' or check url
    // if recipe can be parsed run the scrapefunction
    //
    // const image_url = $(".icon-image-zoom").attr("data-image"); // allrecipes.com new
    // const image_url = $(".hero-photo__wrap img").attr("src"); // allrecipes.com
    // const image_url = $(".fr_r_header_vid_wrapperx img").attr("data-src"); // chowhound.com
    // const image_url = $(".m-MediaBlock__a-Image.a-Image").attr("src"); foodnetwork.com missing "https:"
    // const image_url = $(".recipe-hero__item img").attr("src"); images loaded dynamically

    const title = $("h1.recipe-title")
      .text()
      .trim();

    // const servings = $(".servings input").attr("value"); // yummly.com needs .attr('value')
    const servings = $(".servings input")
      .text()
      .trim();

    let ingredients = [];

    $(".IngredientLine").each((index, element) => {
      ingredients.push(
        $(element)
          .text()
          .replace(/\s\s+/g, " ")
          .trim()
      );
    });

    const time = $(".summary-item-wrapper div:nth-child(2)").text();
    //console.log(time);
    // //split the time into hours and minutes
    //
    let directions = "";

    $(".prep-step").each((i, e) => {
      directions +=
        $(e)
          .text()
          .replace(/\d+/g, "")
          .trim() + " \n\n";
      // .replace(/\s\s+/g, "\n\n");
    });

    let footnote = "";

    const keywords = [];

    $(".o-Capsule__m-TagList.m-TagList a").each((index, element) => {
      keywords.push(
        $(element)
          .text()
          .replace(/\s\s+/g, " ")
          .trim()
      );
    });

    const recipe = {
      //image_url,
      title,
      servings,
      ingredients,
      time,
      directions,
      footnote,
      keywords
    };
    response.status(200).json(recipe);
  }
);
