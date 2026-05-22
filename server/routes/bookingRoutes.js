import express from "express";

import {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

/* CREATE BOOKING */
router.post("/", createBooking);

/* GET BOOKINGS */
router.get("/", getBookings);

/* UPDATE STATUS */
router.put("/:id", updateBookingStatus);

/* DELETE */
router.delete("/:id", deleteBooking);

export default router;