import Booking from "../models/Booking.js";

/* ================= CREATE BOOKING ================= */
export const createBooking = async (
  req,
  res
) => {
  try {
    const booking =
      await Booking.create(req.body);

    res.status(201).json({
      message:
        "Booking submitted successfully",
      booking,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* ================= GET BOOKINGS ================= */
export const getBookings = async (
  req,
  res
) => {
  try {
    const bookings =
      await Booking.find().sort({
        createdAt: -1,
      });

    res.status(200).json(bookings);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* ================= UPDATE STATUS ================= */
export const updateBookingStatus =
  async (req, res) => {
    try {
      const booking =
        await Booking.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        message:
          "Booking updated successfully",
        booking,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

/* ================= DELETE BOOKING ================= */
export const deleteBooking = async (
  req,
  res
) => {
  try {
    await Booking.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Booking deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};