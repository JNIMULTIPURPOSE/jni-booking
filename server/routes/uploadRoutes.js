import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const file =
        req.file.buffer.toString("base64");

      const result =
        await cloudinary.uploader.upload(
          `data:${
            req.file.mimetype
          };base64,${file}`,
          {
            folder: "jni-bookings",
          }
        );

      res.json({
        imageUrl: result.secure_url,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Upload failed",
      });
    }
  }
);

export default router;