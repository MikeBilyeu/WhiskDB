var GoogleStrategy = require("passport-google-oauth2").Strategy;
const db = require("../db");

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/users/google/callback",
        passReqToCallback: true
      },
      async (request, accessToken, refreshToken, profile, done) => {
        //Find user or Create user here
        const { email, displayName, picture } = profile;

        try {
          const { rowCount, rows } = await db.query(
            `SELECT user_id
            FROM "USERS"
            WHERE LOWER(email) = LOWER($1)`,
            [email]
          );

          //User email found in DB
          if (rowCount) {
            done(null, rows[0].user_id);
          } else {
            //User email NOT found in DB create new user with Google profile
            let randomNum = Math.floor(Math.random() * 50000);

            const { rows } = await db.query(
              `INSERT INTO "USERS" (email, username, image_url, created_at)
              VALUES (LOWER($1), $2, $3, NOW()) RETURNING user_id`,
              [email, displayName.concat(randomNum), picture]
            );

            done(null, rows[0].user_id);
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
