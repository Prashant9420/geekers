import User from "../models/User.js";
import GoogleUser from "../models/GoogleUser.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";
import Blog from "../models/Blog.js";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import nodeMailer from "nodemailer";

export const googleLogin = async (req, res, next) => {
  try {
    const googleUser = await GoogleUser.findOne({
      googleId: req.body.googleId,
    });
    if (!googleUser) {
      const newGoogleUser = new GoogleUser({
        googleId: req.body.googleId,
        name: req.body.name,
        avatar: req.body.avatar,
        email: req.body.email,
      });
      await newGoogleUser.save();
      registerUserMail(req.body.email, req.body.name);
      return res.status(200).send(newGoogleUser);
    } else {
      return res.status(200).send(googleUser);
    }
  } catch (err) {
    next(err);
  }
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
    registerUserMail(req.body.email, req.body.username);
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
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
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

const registerUserMail = (email, name) => {
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
    subject: "Welcome to Our Community",
    text: `Hi ${name},
    
  We are thrilled to inform you that your registration for our club has been successfully completed!
  As a registered user, you now have access to all of the features and benefits that our web app has to offer.

  We hope you enjoy your time with us!`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const saveCode = async (req, res, next) => {
  const { fileName, code, language, email, googleUser } = req.body;
  try {
    if (googleUser) {
      const user = await GoogleUser.findOne({ email: email });
      if (!user) return next(createError(404, "User not found!"));
      user.savedCodes.push({ fileName, code, language, email });
      await user.save();
      return res.status(200).send("Code saved successfully!");
    }
    const user = await User.findOne({ email: email });
    if (!user) return next(createError(404, "User not found!"));
    user.savedCodes.push({ fileName, code, language, email });
    await user.save();
    res.status(200).send("Code saved successfully!");
  } catch (err) {
    next(err);
  }
};

export const deleteSavedCode = async (req, res, next) => {
  const {email,fileId,googleUser } = req.body;
  try {
    if (googleUser) {
      const user = await GoogleUser.findOne({ email: email });
      if (!user) return next(createError(404, "User not found!"));
      const objWithIdIndex = user.savedCodes.findIndex((obj) => obj.id === fileId);
      if (objWithIdIndex > -1) {
        user.savedCodes=user.savedCodes.splice(objWithIdIndex, 1);
      }
      await user.save();
      return res.status(200).send("Code deleted successfully!");
    }
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) return next(createError(404, "User not found!"));
      const objWithIdIndex = user.savedCodes.findIndex((obj) => obj.id === fileId);
      if (objWithIdIndex > -1) {
        user.savedCodes.splice(objWithIdIndex,1);
      }
      await user.save();
      return res.status(200).send("Code deleted successfully!");
  } catch (err) {
    next(err);
  }
};

export const getSavedCodes = async (req, res, next) => {
  const { email, googleUser } = req.body;
  try {
    if (googleUser) {
      const user = await GoogleUser.findOne({ email: email });
      if (!user) return next(createError(404, "User not found!"));
      return res.status(200).send(user.savedCodes);
    }
    const user = await User.findOne({ email: email });
    if (!user) return next(createError(404, "User not found!"));
    res.status(200).send(user.savedCodes);
  } catch (err) {
    next(err);
  }
};

export const getUserBlogs = async (req, res, next) => {
  const { email, googleUser } = req.body;
  try {
    if (googleUser) {
      const user = await GoogleUser.findOne({ email: email });
      if (!user) return next(createError(404, "User not found!"));
      return res.status(200).send(user.savedBlogs);
    }
    const user = await User.findOne({ email: email });
    if (!user) return next(createError(404, "User not found!"));
    res.status(200).send(user.savedBlogs);
  } catch (err) {
    next(err);
  }
};

export const saveMyBlog = async (req, res, next) => {
  const {title,content,imgUrl,categories,username,email,googleUser}=req.body;
  try {
    if (googleUser) {
      const user = await GoogleUser.findOne({ email: email });
      if (!user) return next(createError(404, "User not found!"));
      user.savedBlogs.push({title,content,imgUrl,categories,username});
      await user.save();
      return res.status(200).send(user.savedBlogs);
    }
    const user = await User.findOne({ email: email });
    if (!user) return next(createError(404, "User not found!"));
    user.savedBlogs.push({title,content,imgUrl,categories,username});
    await user.save();
    res.status(200).send(user.savedBlogs);
  } catch (err) {
    next(err);
  }
};
