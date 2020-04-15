const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../db");

const { ...keys } = require("./keys");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done("jwt expired");
      }
      db.query(`SELECT 1 FROM users WHERE user_id = $1;`, [jwtPayload.user_id])
        .then(() => done(null, jwtPayload))
        .catch(err => done(err, false));
    })
  );
};
