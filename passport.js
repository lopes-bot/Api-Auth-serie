const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("./config/index");
const User = require("./models/User");

//json Web token Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (playload, done) => {
      try {
        const user = await User.findById(playload.sub);
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
// Google oAuth Strategy
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "54235386138-lkdiqa84ait3pqf7m7ectrjrc80n0o5a.apps.googleusercontent.com",
      clientSecret: "xdMQtgjUIWQ0pXCk6GPHnvFG",
    },
    async (acessToken, refreshToken, profile, done) => {
      try {
        console.log("acessToken", acessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);

        const existUser = await User.findOne({ "google.id": profile.id });
        if (existUser) {
          console.log("usuario ja existe no DB", "");
          return done(null, existUser);
        }
        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
//Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        console.log("email", email);
        const user = await User.findOne({ "local.email": email });
        if (!user) {
          return done(null, false);
        }
        //checando o password
        const isMatch = await user.isValidPassword(password);
        console.log("isMatch", isMatch);
        if (!isMatch) {
          done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
