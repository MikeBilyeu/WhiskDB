const Pool = require("pg").Pool;
const keys = require("./config/keys");
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

module.exports = {
  createUser
};
