import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
// import * as userControllers from "../controllers/userControllers";
import User from "../models/users";
import jwt from "jsonwebtoken";
import { error } from "console";

const router = express.Router();

// /api/users/register
// npm i express-validator

router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isString(),
    check("password", "Password with 6 or more character require").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      // Wait for the findOne operation to complete before moving on
      let user = await User.findOne({
        email: req.body.email,
      });
      // console.log(user);
      // Check if user is found before processing further
      if (user) {
        return res.status(400).json({ message: "user already exists" });
      }

      // if (!user) {
      //   // Handle the case where the user is not found
      //   console.log("User not found");
      // }

      // If user is not found, proceed with creating a new user
      user = new User(req.body);
      await user.save();
      const secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "365d",
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // maxAge: 86400000, //milli second
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).send({ message: "USer registerd OK" });
    } catch (error) {
      console.error("Error in user registration:", error);
      res.status(500).send({ message: "something went wrong " });
    }
  }
);

export default router;
