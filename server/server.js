import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

/* ================= ROUTES ================= */
import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

/* ================= CONFIG ================= */
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* ================= MIDDLEWARE ================= */
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* ================= API ROUTES ================= */
app.use("/api/auth", authRoutes);

app.use(
  "/api/listings",
  listingRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use("/api/upload", uploadRoutes);

app.use("/api/chat", chatRoutes);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use("/api/admin", adminRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "JNI Backend API Running ✅",
  });
});

/* ================= START SERVER ================= */
const startServer = async () => {
  try {
    /* CONNECT DATABASE */
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB Connected ✅"
    );

    /* START EXPRESS */
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });

  } catch (error) {
    console.log(
      "MongoDB Connection Error ❌"
    );

    console.log(error);

    process.exit(1);
  }
};

startServer();