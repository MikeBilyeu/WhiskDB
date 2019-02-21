const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// const mongoose = require("mongoose");
const Pool = require("pg").Pool;
// const User = mongoose.model("users");

const keys = require("../config/keys");
// Connect to pool
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

// Swap out mongodb for postgresql

require("dotenv").config();

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Swap out mongodb for postgresql
      pool.connect().then(client => {
        return client
          .query("SELECT * FROM users WHERE id = $1", [jwt_payload.id])
          .then(res => {
            client.release();
            if (res.rowCount > 0) {
              return done(null, res.rows[0]);
            }
            return done(null, false);
          })
          .catch(e => {
            client.release();
            console.log(e);
          });
      });

      // FOR mongodb
      // User.findById(jwt_payload.id)
      //   .then(user => {
      //     if (user) {
      //       return done(null, user);
      //     }
      //     return done(null, false);
      //   })
      //   .catch(err => console.log(err));
    })
  );
};
