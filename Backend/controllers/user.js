import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import { Strategy } from "passport-google-oauth20";
import passport from "passport";

// export const connectPassport = () => {
//   passport.use(
//     new Strategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:8000/api/user/googleLogin/callback",
//       },
//       async function (accessToken, refreshToken, profile, done) {
//         // database logic
//         const user = await User.findOne({
//           googleId: profile.id,
//         });
//         if (user) {
//           done(null, newUser);
//         } else {
//           const newUser = await User.create({
//             googleId: profile.id,
//             username: profile.displayName,
//             email: profile.emails[0].value,
//             profilePic: profile.photos[0].value,
//           });
//           done(null, newUser);
//         }
//       }
//     )
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
//   passport.deserializeUser(async (id, done) => {
//     // const user = await User.findById(id);
//     done(null, user);
//   });
// };

export const registerUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: false,
      sameSite: "none",
      secure: true,
    });
    res.status(200).send({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
