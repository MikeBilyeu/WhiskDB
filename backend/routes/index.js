const express = require("express");
const router = express.Router();

router.use("/api/users", require("./users"));
router.use("/api/recipes", require("./recipes"));

module.exports = router;
