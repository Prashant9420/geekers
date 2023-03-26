import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(200).json({ savedUser });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
