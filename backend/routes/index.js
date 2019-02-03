const express = require('express');
const router = express.Router();

router.post("/sign-up", (req, res) => {

  console.log(req.body);



});

module.exports = router;
