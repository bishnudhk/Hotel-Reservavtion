import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more character require").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    // console.log(req.cookies);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    //   destructing email and password
    const { email, password } = req.body;
    // console.log(email);
    try {
      const user = await User.findOne({ email });
      //   console.log(user);
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // check a password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "password is invalid" });
      }
      const secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1d",
      });
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400000, //milli second
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "something went wrong " });
    }
  }
);

router.post("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {});

export default router;
