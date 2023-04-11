import dotenv from "dotenv";
import User from "../models/userModel.js";
import bycrpt from "bcryptjs";
import { genrateToken } from "../config/helperFunctions.js";

dotenv.config();

export const signUpHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ msg: "Please Enter all the fields" });
      return;
    }

    const userExist = await User.findAll({ where: { email } });
    if (userExist.length > 0) {
      res.status(400).json({ mgs: "User already exist" });
      return;
    }

    const salt = bycrpt.genSaltSync(parseInt(process.env.bycrptSalt));
    const newPassword = await bycrpt.hash(password, salt);

    let user = await User.create({
      name,
      email,
      password: newPassword,
    });

    if (user) {
      res.status(200).json({ msg: "User created successfully" });
    } else {
      res.status(400).json({ msg: "Failed to create new user" });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: "Error occured" });
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findAll({ where: { email } });
    console.log(JSON.parse(JSON.stringify(user)));

    if (user[0] && bycrpt.compareSync(password, user[0].password)) {
      res.status(200).json({
        token: genrateToken(user[0].id),
      });
    } else {
      res.status(400).json({ status: "Enter corrent cridentials" });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: "Error occured" });
  }
};
