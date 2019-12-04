const pool = require("../utils/connectPool");
const jwt = require("jsonwebtoken");

const deleteUser = (request, response) => {
  const { user_id } = request.user; // get user_id from auth
  pool.connect().then(client => {
    return client
      .query(`DELETE FROM users WHERE user_id = $1`, [user_id])
      .then(res => {
        return response.status(200).json("User removed");
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  deleteUser
};
