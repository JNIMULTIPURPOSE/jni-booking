import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import listingRoutes from "./routes/listingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use(
  "/api/listings",
  listingRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("API Running...");
});

/* DATABASE */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));