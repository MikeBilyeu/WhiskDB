const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dbConnection = require("./database");


const API_PORT = 3001;
const app = express();
const router = express.Router();



// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


router.post('/sign-up', (req, res) => {
  console.log(req.body);
});

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Recipe.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Recipe.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Recipe.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let newRecipe = new Recipe();

  const { recipe } = req.body;
  console.log('This is the servings: ', recipe.servings);


  recipe.title = recipe.title;


  // data.id = id;
  newRecipe.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
