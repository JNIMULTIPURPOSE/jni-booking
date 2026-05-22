import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

/* SEND MESSAGE */
router.post("/", async (req, res) => {
  try {
    const chat =
      await Chat.create(req.body);

    res.status(201).json(chat);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* GET ALL MESSAGES */
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find()
      .sort({ createdAt: 1 });

    res.json(chats);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* DELETE MESSAGE */
router.delete(
  "/:id",
  async (req, res) => {
    try {
      await Chat.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Message deleted",
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;