import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Listing from "../models/Listing.js";
import Booking from "../models/Booking.js";
import Chat from "../models/Chat.js";


// ===============================
// 🔐 ADMIN LOGIN
// ===============================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate admin credentials (from .env)
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      admin: {
        email,
        role: "admin",
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ===============================
// 📊 DASHBOARD STATS
// ===============================
export const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();

    const listings = await Listing.countDocuments();

    const bookings = await Booking.countDocuments();

    const pending = await Booking.countDocuments({
      status: "Pending",
    });

    const unreadChats = await Chat.countDocuments({
      sender: { $ne: "admin" },
      read: false,
    });

    res.status(200).json({
      users,
      listings,
      bookings,
      pending,
      unreadChats,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};