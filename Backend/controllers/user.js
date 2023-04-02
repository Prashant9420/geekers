import User from "../models/User.js";
import GoogleUser from "../models/GoogleUser.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import nodeMailer from "nodemailer";
import { Strategy } from "passport-google-oauth20";
import passport from "passport";

export const connectPassport = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: "http://localhost:8000/api/user/googleLogin/callback",
        callbackURL:
          "https://adventurous-volleyball-production.up.railway.app/api/user/googleLogin/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        // database logic
        try {
          const googleuser = await GoogleUser.findOne({
            googleId: profile.id,
          });
          if (googleuser) {
            done(null, googleuser);
          } else {
            const newGoogleUser = await GoogleUser.create({
              googleId: profile.id,
              name: profile.displayName,
              avatar: profile.photos[0].value,
            });
            newGoogleUser.save();
            done(null, newGoogleUser);
          }
        } catch (err) {
          createError(500, "Internal Server Error");
          done(err);
        }
      }
    )
  );
  passport.serializeUser((googleuser, done) => {
    done(null, googleuser._id);
  });
  passport.deserializeUser(async (_id, done) => {
    try {
      const googleuser = await GoogleUser.findById(_id);
      done(null, googleuser);
    } catch (err) {
      createError(500, "Internal Server Error");
      done(err);
    }
  });
};

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

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "Email does not exist!"));
    const otp = Math.floor(100000 + Math.random() * 900000);
    const newOtp = new Otp({
      email: req.body.email,
      otp,
      expiresIn: Date.now() + 300000,
    });
    await newOtp.save();
    mailer(req.body.email, otp);
    // send email
    res.status(200).send("OTP has been sent to your email!");
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  let data = await Otp.findOne({ email: req.body.email, otp: req.body.otp });
  if (!data) return next(createError(404, "OTP is incorrect!"));
  if (data.expiresIn < Date.now())
    return next(createError(404, "OTP has expired!"));
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(createError(404, "User not found!"));
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  user.password = hash;
  await user.save();
  res.status(200).send("Password has been reset!");
};

const mailer = (email, otp) => {
  var transporter = nodeMailer.createTransport({
    service: "gmail",
    port: 465,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP for password reset",
    text: `Your OTP is ${otp}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
