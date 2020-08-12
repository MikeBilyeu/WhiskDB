const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

module.exports = async (req, res) => {
  const payload = {
    user_id: req.user
  };

  // Sign token
  jwt.sign(
    payload,
    keys.secretOrKey,
    {
      expiresIn: 31556926 // 1 year in seconds
    },
    (err, token) => {
      if (err) throw err;
      res.redirect("http://www.zipiwhisk.com/auth/login?token=Bearer " + token);
      //res.redirect("http://localhost:3000/auth/login?token=Bearer " + token);
    }
  );
};
