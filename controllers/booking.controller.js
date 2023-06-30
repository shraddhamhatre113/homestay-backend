import Booking from  '../models/booking.model.js';
import Property from '../models/property.model.js';



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

    const propertyBook = await Property.findById(propertyId);
    if (!propertyBook) {
      return res.status(404).json({ error: 'Property not found' });
    }
    const booking = new Booking({
      propertyBook:property,
      start_date,
      end_date,
      customer,
      traveler,
      room_rate,
      status: 'pending',
      payment
    });

    await booking.save();

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