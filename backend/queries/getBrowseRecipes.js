const Pool = require("pg").Pool;

const keys = require("../config/keys");

const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const getBrowseRecipes = (request, response) => {
  let { meal, diet, sort } = JSON.parse(request.query.browseData.toLowerCase());
  const { user_id } = request.query;

  diet = diet === "none" ? null : diet;
  // meal = meal === "all meals" ? "lunch" : meal;

  const numOfCats = diet ? (meal == "all meals" ? 1 : 2) : 1;

  //connect pool
  pool.connect().then(client => {
    // query the recipe table
    return client
      .query(
        `SELECT r.recipe_id, r.created_by, r.title, r.total_time_mins, r.image_url,
        r.created_at, COALESCE(AVG(rw.rating), 0) AS rating,
        CAST(count(rw.*) AS INTEGER) AS num_reviews, u.username AS username,
        sr.saved_by = $5 saved FROM recipes r
        LEFT JOIN users u ON r.created_by = u.user_id
        LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
        LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
        WHERE r.recipe_id in
        (SELECT recipe FROM recipes_join_categories
          WHERE
            CASE
            WHEN $2 != '' AND $1 != 'all meals' THEN
            category IN (SELECT category_id
            FROM categories WHERE category_name IN ($2, $1)
            )

            WHEN $2 != '' AND $1 = 'all meals' THEN
            category IN (SELECT category_id
            FROM categories WHERE category_name IN ($2))

            WHEN $1 != 'all meals' THEN
            category IN (SELECT category_id
            FROM categories WHERE category_name IN ($1))

            ELSE
            category IN (SELECT category_id FROM categories)

          END

          GROUP BY recipe HAVING COUNT(*) >= $3
        )
        GROUP BY r.recipe_id, u.user_id, rw.recipe_id, sr.saved_by
        ORDER BY
          CASE WHEN $4 = 'a-z' THEN LOWER(r.title) END ASC,
          CASE WHEN $4 = 'time' THEN r.total_time_mins END ASC,
          CASE WHEN $4 = 'newest' THEN r.created_at END DESC,
         rating DESC, num_reviews DESC, created_at DESC ;
`,
        [meal, diet, numOfCats, sort, user_id]
      )
      .then(res => {
        client.release();
        response.status(200).json(res.rows);
      })

      .catch(err => {
        client.release();
        console.log(err.stack);
      });
  });
};

module.exports = {
  getBrowseRecipes
};
