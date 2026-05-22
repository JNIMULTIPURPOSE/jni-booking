import mongoose from "mongoose";

const chatSchema =
  new mongoose.Schema(
    {
      sender: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      userEmail: {
        type: String,
        default: "",
      },

      read: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Chat",
  chatSchema
);