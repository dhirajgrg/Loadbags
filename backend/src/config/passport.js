import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user-model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 1. Search for user by googleId OR email
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email: email }],
        });

        if (user) {
          // 2. If user exists but doesn't have a googleId, link it
          // This happens if they registered with email/password previously
          if (!user.googleId) {
            user.googleId = profile.id;
            // Optionally update their avatar if they don't have one
            user.avatar = user.avatar || profile.photos[0].value;
            await user.save();
          }
          return done(null, user);
        }

        // 3. If no user exists at all, create a brand new one
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: email,
          avatar: profile.photos[0].value,
        });

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    },
  ),
);

export default passport;
