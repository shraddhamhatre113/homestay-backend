import Property from "../models/property.model.js";
import Booking from "../models/booking.model.js";
import createError from "http-errors";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

export async function createProperty(req, res, next) {
  try {
    const propertyData = req.body;

    // Create a new property object using the Property model
    const property = new Property(propertyData);

    // Save the property to the database
    await property.save();

    const user = await User.findById(userId);
    if (user.properties.length > 0) {
      user.is_host = true;
      createPro;
      user.role === "host";
      await user.save();
    }

    res
      .status(201)
      .json({ message: "Property created successfully", property });
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                             Get Property by ID                             */
/* -------------------------------------------------------------------------- */
export const getPropertyDetail = async (req, res, next) => {
  const propertyId = req.params.id;
  try {
    const property = await Property.findById(propertyId)
      .populate("reviews")
      .populate("address")
      .populate("images");

    if (property.reviews) {
      const reviewPromises = property.reviews.map(async (review) => {
        const user = await User.findById(review.reviewer)
          .populate("address")
          .populate("image");
        review.reviewer = user;
        return review;
      });
      const all = await Promise.all(reviewPromises);
      property.reviews = all;
    }
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                               Delete Property                              */
/* -------------------------------------------------------------------------- */
export const deleteProperty = async (req, res, next) => {
  const propertyId = req.params.id;
  try {
    const deletedProp = await Property.findByIdAndDelete(propertyId);

    if (!deletedProp) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted.", deletedProp });
  } catch (error) {
    next(error);
  }
};
/* -------------------------------------------------------------------------- */
/*                             Get All Properties                             */
/* -------------------------------------------------------------------------- */
export const getAllProperty = async (req, res, next) => {
  try {
    const properties = await Property.find();
    if (!properties) {
      return res.status(404).json({ message: "No properties found." });
    }

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                              Search Properties                             */
/* -------------------------------------------------------------------------- */

export const searchProperties = async (req, res, next) => {
  const {
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms, //
    beds,
    propertyType,
    rating,
    city,
  } = req.query;

  const filters = {
  };

  //Price filter
  if (minPrice && maxPrice) {
    filters.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
  }

  //Bedrooms filter
  if (bedrooms) {
    filters.bedrooms = { $gte: parseInt(bedrooms) };
  }
  //Bathrooms filter
  if (bathrooms) {
    filters.bathrooms = { $gte: parseInt(bathrooms) };
  }
  //Beds filter
  // if (beds) {
  //   filters.beds = { $gte: parseInt(beds) };
  // }


  // //Amenities filter
  // if (rating) {
  //   filters.review_scores={}
    
  //   filters.review_scores.review_scores_rating = { $gte: parseInt(rating) };
  // }
  if (propertyType && propertyType.length) {
    filters.property_type = { $in: propertyType.split(',') };
  }
  console.log(filters)
  try {
    const filteredProps = await Property.find(filters)
      .populate("images")
      .populate({
        path: "address",
        match: {
          city: city,
        },
      })
      .limit(5000)
      .then((props) => {
        const result = props.filter((prop) => prop.address != null);
        const allPrices = result.map((res) => res.price);
        const maxPrice = Math.max.apply(Math, allPrices);
        const minPrice = Math.min.apply(Math, allPrices);

        return {
          properties: result.slice(0, 30),
          total: result.length,
          minPrice: minPrice,
          maxPrice: maxPrice,
        };
      });

    res.status(200).json(filteredProps);
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                              Property Preview                              */
/* -------------------------------------------------------------------------- */

export const getPropertyPreview = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findById(propertyId)
      .select("name address price photos summary amenities")
      .populate("host", "email")
      .exec();

    if (!property) {
      throw new APIError("Property not found.", httpStatus.NOT_FOUND);
    }
    const { name, address, price, photos, summary, amenities, host } = property;

    const previewData = {
      name,
      address,
      price,
      photos,
      summary,
      amenities,
      host: host.email,
    };
    res.json(previewData);
  } catch (error) {
    next(error);
  }
};

/* -------------------------- PUT  /properties/:pid ------------------------- */

export async function updateProperty(req, res, next) {
  try {
    const { pid } = req.params;
    const propertyData = req.body;

    // Find the property by id and update it with the received data (propertyData)
    const property = await Property.findById(pid);
    if (!property) {
      return createError(404, "Property does not exist.");
    }

    const updateResult = await Property.findByIdAndUpdate(pid, propertyData, {
      new: true,
    });

    res.status(200).json({
      message: "Property updated successfully!",

      property: updateResult,
    });
  } catch (error) {
    next(error);
  }
}

/* -------------------------- GET /properties/:pid -------------------------- */

export async function getPropertyByBookingHistory(req, res, next) {
  try {
    const { pid } = req.params;

    // Filter the booking by property by id
    const propertyBookings = Booking.filter(
      (booking) => booking.propertyId === pid
    );

    if (!propertyBookings) {
      return createError(404, "Property bookings not found.");
    }

    // map booking to summary format
    const propertyBookingsSummary = propertyBookings.map((booking) => ({
      guestName: booking.guest_name,
      dates: `${booking.start_date} to ${booking.end_date}`,
      price: booking.room_rate.amount,
      status: booking.status,
    }));

    res.status(200).json({
      propertyBookingsSummary,
      message: "Property bookings retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
}
