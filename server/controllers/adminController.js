import User from "../models/User.js";
import Listing from "../models/Listing.js";
import Booking from "../models/Booking.js";
import Chat from "../models/Chat.js";

export const getDashboardStats = async (
  req,
  res
) => {
  try {
    const users = await User.countDocuments();

    const listings =
      await Listing.countDocuments();

    const bookings =
      await Booking.countDocuments();

    const pending =
      await Booking.countDocuments({
        status: "Pending",
      });

    const unreadChats =
      await Chat.countDocuments({
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