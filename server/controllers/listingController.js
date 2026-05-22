import Listing from "../models/Listing.js";

/* ================= CREATE LISTING ================= */
export const createListing = async (
  req,
  res
) => {
  try {
    const listing =
      await Listing.create(req.body);

    res.status(201).json({
      message:
        "Listing created successfully",
      listing,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* ================= GET ALL LISTINGS ================= */
export const getListings = async (
  req,
  res
) => {
  try {
    const listings =
      await Listing.find().sort({
        createdAt: -1,
      });

    res.status(200).json(listings);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* ================= DELETE LISTING ================= */
export const deleteListing = async (
  req,
  res
) => {
  try {
    await Listing.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Listing deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};