const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { GOOGLE, ...keys } = require("./keys");

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

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE.clientID,
        clientSecret: GOOGLE.clientSecret,
        callbackURL: "http://localhost:3000/auth/google/redirect"
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken, profile);
        // add user to db
        return done(accessToken, refreshToken, profile);
      }
    )
  );
};
