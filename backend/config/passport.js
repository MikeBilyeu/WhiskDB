const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const Pool = require("pg").Pool;

const { GOOGLE, ...keys } = require("./keys");

// Connect to pool
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

module.exports = passport => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: keys.secretOrKey
      },
      (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires) {
          return done("jwt expired");
        }

        return done(null, jwtPayload);
      }
    )
  );

  console.log("GOOGLE:", GOOGLE);

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE.clientID,
        clientSecret: GOOGLE.clientSecret,
        callbackURL: "http://localhost:3000/auth/google/redirect"
      },
      (accessToken, refreshToken, profile, cb) => {
        // User.findOrCreate({ googleId: profile.id }, (err, user) => {
        //   return cb(err, user);
        // });
        console.log("profile:", profile);
      }
    )
  );
};
