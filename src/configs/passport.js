const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      try {
        // Check if the user already exists
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          // Create a new user if it doesn't exist
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            fullName: profile.displayName,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
            // role: profile.role | "candidate",
          });
        }
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
