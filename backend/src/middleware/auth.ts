import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// extend express request type
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

// npm i cookie-parser
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  // console.log(req.cookies);
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    // console.log("decoded", decoded);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyToken;
