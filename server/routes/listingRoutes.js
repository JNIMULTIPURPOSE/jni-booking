import express from "express";
import Listing from "../models/Listing.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET ALL */
router.get("/", async (req, res) => {
  try {
    const listings =
      await Listing.find().sort({
        createdAt: -1,
      });

    res.json(listings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* CREATE */
router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const listing =
        await Listing.create(req.body);

      res.status(201).json(
        listing
      );

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* DELETE */
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      await Listing.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Listing deleted",
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;