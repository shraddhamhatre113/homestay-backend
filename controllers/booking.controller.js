import Booking from  '../models/booking.model.js';
import Property from '../models/property.model.js';

import User from '../models/user.model.js'




/* -------------------------------------------------------------------------- */
/*                               Create booking                               */
/* -------------------------------------------------------------------------- */

export const createBooking = async( req, res, next ) => {
  try {   
    const {
      property,
      start_date,
      end_date,
      customer,
      traveler,
      room_rate,
      payment
    } = req.body;


    const propertyB = await Property.findById(property);
    if (!propertyB) {
      return res.status(404).json({ error: 'Property not found' });
    }
    const booking = new Booking({
      propertyB:property,
      start_date,
      end_date,
      customer,
      traveler,
      room_rate,
      status: 'pending',
      payment
    });

    await booking.save();

    const user = await User.findById(customer);
    if(!user){
      return res.status(404).json({error: 'User not found.'})

    }

    if(user.is_host){
      
      user.property_bookings.current_bookings.push(booking._id);      
    }else{
      user.guest_booking.current_bookings.push(booking._id)
    }

    await user.save()
    return res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
   
    next(error)
  }
};


/* -------------------------------------------------------------------------- */
/*               Controller function to accept a booking request              */
/* -------------------------------------------------------------------------- */
export const acceptBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    // Update the booking status to 'accepted'
    booking.status = 'accepted';
    await booking.save();

  
    return res.status(200).json({ message: 'Booking accepted successfully', booking });
  } catch (error) {
    next(error)
  }
};

/* -------------------------------------------------------------------------- */
/*                            Get booking for users                           */
/* -------------------------------------------------------------------------- */

export const getUserBookings = async (req, res, next)=>{
    const {userID} = req.params

    try {
      const bookings = await Booking.find({customer: userID}).populate('property');
      
      res.status(200).json(bookings)
    } catch (error) {
        next(error)
    }
}

/* -------------------------------------------------------------------------- */
/*                              Get booking by ID                             */
/* -------------------------------------------------------------------------- */

export const getBookingById = async(req, res, next) => {
    const {bookingId} = req.params;

    try {
        const bookingById = await Booking.findById(bookingId).populate('customer').populate('property');
        if(!bookingById){
            return res.status(404).json({message: 'Booking not found!'})
        }

        res.status(200).json(bookingById)
    } catch (error) {
        next(error)
    }
}

/* -------------------------------------------------------------------------- */
/*                           Update booking payment                           */
/* -------------------------------------------------------------------------- */

export const updateBookingPayment = async(req, res, next) => {
    const { bookingId} = req.params;
    const {paymentMethod, transactionId} = req.body;

    try {
     const booking = await Booking.findById(bookingId);
     
     if(!booking){
        return res.status(404).json({message: 'Booking not found.'})
     }

     booking.payment = {
        paymentMethod,
        transactionId,
        status: 'Paid'
     }

     await booking.save()
    } catch (error) {
        next(error)
    }


}

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