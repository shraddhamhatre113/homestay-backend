import Booking from "../models/booking.model.js";
import Property from "../models/property.model.js";

import User from "../models/user.model.js";

/* -------------------------------------------------------------------------- */
/*                               Create booking                               */
/* -------------------------------------------------------------------------- */

export const createBooking = async (req, res, next) => {
  try {
    const { propertyId, start_date, end_date, guestId, adults, childs } = req.body;

    
     // find the guest and save booking id in guest_booking
     const guest = await User.findById(guestId);
     if (!guest) {
       return res.status(404).json({ error: "guest not found." });
     }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }


    // Save booking in booking collection
    const booking = new Booking({
      property: property._id,
      start_date,
      end_date,
      customer: guest._id,
      host: property.host,
      room_rate: {
        amount: property.price,
        additional_charges: property.cleaning_fee,
        deposit: property.security_deposit,
      },
      traveler:{
        occupancy: {
          adults: adults,
          children: childs
        },
        first_name: guest.first_name,
        last_name: guest.last_name
      },
      status: "PENDING",
    });

    const savedBooking = await booking.save();
   
   if(!guest.guest_booking){
    guest.guest_booking=[];
   }
    guest.guest_booking.push(savedBooking._id);
    await guest.save();
  
    //find host and save booking id in property_booking
    const host = await User.findById(property.host);
    if (!host) {
      return res.status(404).json({ error: "guest not found." });
    }
    if(!host.property_bookings){
      host.property_bookings=[];
     }
    host.property_bookings.push(booking._id);

    await host.save();
    return res
      .status(201)
      .json({ message: "Booking created successfully", booking, guest});
  } catch (error) {
    console.error(error)
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*               Controller function to accept a booking request              */
/* -------------------------------------------------------------------------- */
export const updateBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const {status} = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Update the booking status to 'accepted'
    booking.status = status;
    await booking.save();

    return res
      .status(200)
      .json({ message: "Booking accepted successfully", booking });
  } catch (error) {
    next(error);
  }
};


/* -------------------------------------------------------------------------- */
/*                            Get booking for users                           */
/* -------------------------------------------------------------------------- */

export const getGuestBookings = async (req, res, next) => {
  const { userID } = req.params;

  try {
    const guest = await User.findById( userID ).populate(
      "guest_booking"
    );
   const bookings=await Promise.all(guest.guest_booking.map(booking=>
      booking.populate('property')));
    const bookingsWithProperty = await Promise.all(bookings.map(booking=>booking.property.populate('images')));
    await Promise.all(bookings.map(booking=>booking.populate('host')));
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error)
    next(error);
  }
};

export const getPropertyBookings = async (req, res, next) => {
  const { userID } = req.params;

  try {
    const host = await User.findById( userID ).populate(
      "property_bookings"
    );
    const bookings=await Promise.all(host.property_bookings.map(booking=>
      booking.populate('property')));
   
    const bookingsWithProperty = await Promise.all(bookings.map(booking=>booking.property.populate('images')));
    await Promise.all(bookings.map(booking=>booking.populate('guest')));

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error)
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                              Get booking by ID                             */
/* -------------------------------------------------------------------------- */

export const getBookingById = async (req, res, next) => {
  const { bookingId } = req.params;

  try {
    const bookingById = await Booking.findById(bookingId)
      .populate("customer")
      .populate("property");
    if (!bookingById) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    res.status(200).json(bookingById);
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                           Update booking payment                           */
/* -------------------------------------------------------------------------- */

export const updateBookingPayment = async (req, res, next) => {
  const { bookingId } = req.params;
  const { paymentMethod, transactionId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    booking.payment = {
      paymentMethod,
      transactionId,
      status: "Paid",
    };

    await booking.save();
  } catch (error) {
    next(error);
  }
};

// /* -------------------------------------------------------------------------- */
// /*                              Get Host Bookings                              */
// /* -------------------------------------------------------------------------- */

// export const getHostBookings = async(req, res, next) => {
//   try {
//     const {profileId} = req.params;
//     const bookings = await Booking.find({customer:profileId});

//     res.status(200).json(bookings)
//   } catch (error) {
//     next(error)
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                         Create A New Guest Booking                         */
// /* -------------------------------------------------------------------------- */

// export const createGuestBooking = async(req, res, next) => {
//   try {
//     const { userID } = req.params;
//     const { bookingId} = req.body;

//     const user = await User.get(userID);

//     user.guest_booking.current_bookings.push(bookingId);
//     const savedUser = await user.save();
//     res.json({message: 'Guest booking created successfully!', user: savedUser})
//   } catch (error) {
//     next(error)
//   }
// };

// Cancel

// /* -------------------------------------------------------------------------- */
// /*                             Get Guest Bookings                             */
// /* -------------------------------------------------------------------------- */

// export const getGuestBookings = async(req, res, next) => {
//   try {
//     const {profileId} = req.params;
//     const bookings = await Booking.find({guest:profileId});

//     res.status(200).json(bookings)
//   } catch (error) {
//     next(error)
//   }
// }
