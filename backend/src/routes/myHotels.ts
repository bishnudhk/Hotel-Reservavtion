import express, { Request, Response, Router } from "express";
// multer is for to store a image
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

// npm i multer

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});
// api/myHotels

router.post(
  "/",
  // only the login user can access it
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    // console.log(req);
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // 1) upload images to cloudinary

      const uplaodPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        //   look image is jpg or png
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        // console.log(res);
        return res.url;
      });
      // console.log(uplaodPromises);

      // 2) if upload was successful , add the urls to the new hotel
      const imageUrls = await Promise.all(uplaodPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // console.log(newHotel);
      // 3 save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // 4) return a 201 req
      res.status(201).send(hotel);
    } catch (err) {
      console.log("error creating hoter", err);
      res.status(500).json({ message: "something went wrong " });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Errror fetching hotel" });
  }
});
export default router;
