const axios = require("axios");
const cheerio = require("cheerio");
const Router = require("express-promise-router");
const router = new Router();
const passport = require("passport");
module.exports = router;

const image_urlSelectors = [
  ".image-overlay img", // allrecipes.com new
  ".hero-photo__wrap img", // allrecipes.com
  ".fr_r_header_vid_wrapperx img" // chowhound.com
];
const titleSelectors = [
  ".recipe-container h1.heading-content", // allrecipes.com new
  "h1#recipe-main-content", // allrecipes.com
  ".fr_r_info h1" // chowhound.com
];

const servingsSelectors = [
  ".recipe-adjust-servings__size-quantity", // allrecipes.com new
  ".adjustServings .subtext", // allrecipes.com
  ".frr_serves.fr_sep" // chowhound.com
];

const ingredientSelectors = [
  ".ingredients-item-name", // allrecipes.com new
  "[itemprop='recipeIngredient']", // allrecipes.com
  ".freyja_box.freyja_box81 ul li" // chowhound.com
];

const timeSelectors = [
  ".recipe-meta-container > div div:nth-child(3) div:last-child", // allrecipes.com new
  "[itemprop='totalTime']", // allrecipes.com
  ".frr_totaltime time" // chowhound.com
];

const directionsSelector = [
  ".instructions-section-item p", // allrecipes.com new
  ".recipe-directions__list--item", // allrecipes.com
  "ol li" // chowhound.com this might match for other sites add parent class to prevent false match
];

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user;
    const { URL } = request.query;

    const { data: html } = await axios.get(URL);
    const $ = await cheerio.load(html);
    // {
    //   normalizeWhitespace: false;
    // }

    //we need to check if the recipe can even be parsed
    // iterate over array of 'recipe selectors' or check url
    // if recipe can be parsed run the scrapefunction

    // const image_url = $(".icon-image-zoom").attr("data-image"); // allrecipes.com new
    // const image_url = $(".hero-photo__wrap img").attr("src"); // allrecipes.com
    // const image_url = $(".fr_r_header_vid_wrapperx img").attr("data-src"); // chowhound.com

    const title = $(".fr_r_info h1").text();

    const servings = $(".frr_serves.fr_sep").text();

    let ingredients = [];

    $(".freyja_box.freyja_box81 ul li").each((index, element) => {
      ingredients.push(
        $(element)
          .text()
          .replace(/\s\s+/g, " ")
          .trim()
      );
    });

    const time = $(".frr_totaltime time").text();
    //console.log(time);
    //split the time into hours and minutes

    let directions = "";

    $("ol li").each((i, e) => {
      directions +=
        $(e)
          .text()
          .replace(/\d+/g, "")
          .trim() + " \n\n";
      // .replace(/\s\s+/g, "\n\n");
    });
    const recipe = {
      image_url,
      title,
      servings,
      ingredients,
      time,
      directions
    };
    response.status(200).json(recipe);
  }
);
