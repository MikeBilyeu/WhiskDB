const Pool = require("pg").Pool;
const keys = require("../config/keys");
// Connect to pool
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const editRecipe = (request, response) => {
  const { user_id } = request.user;
  const {
    recipe_id,
    created_by,
    time,
    servings,
    ingredients,
    directions,
    footnote,
    categories,
    keywords
  } = request.body;
  const title = request.body.title.trim();

  const timeHours = time.hours > 0 ? time.hours : 0;
  const timeMinutes = time.minutes > 0 ? parseInt(time.minutes) : 0;
  const total_time_mins = timeHours * 60 + timeMinutes;

  if (user_id !== created_by) {
    return response.status(401).send("You can't edit this recipe");
  }
  pool.connect().then(client => {
    return client
      .query(
        `UPDATE recipes
         SET title = $1, servings = $2, ingredients = $3, directions = $4,
          footnote = $5, categories = $6, keywords = $7, total_time_mins = $8
         WHERE recipe_id = $9`,
        [
          title,
          servings,
          ingredients,
          directions,
          footnote,
          categories,
          keywords,
          total_time_mins,
          recipe_id
        ]
      )
      .then(() => {
        return response.status(200).send("Changes saved!");
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  editRecipe
};
