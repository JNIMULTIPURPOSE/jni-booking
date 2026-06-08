import express from "express";

import {
  createBooking,
  getBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

/* CREATE BOOKING */
router.post("/", createBooking);

/* GET BOOKINGS */
router.get("/", getBookings);

/* USER BOOKINGS */
router.get(
  "/user/:email",
  getUserBookings
);

/* UPDATE STATUS */
router.put("/:id", updateBookingStatus);

/* DELETE */
router.delete("/:id", deleteBooking);

export default router;