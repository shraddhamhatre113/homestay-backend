import Booking from  '../models/booking.model.js';

/* ----------------------------- Create Booking ----------------------------- */

export const createBooking = async(req, res, next) => {
    const {user, property, checkIn, checkOut, guests, totalAmount, payment} = req.body;

    try {
        const booking = await Booking.create({
            user,
            property,
            checkIn,
            checkOut,
            guests,
            totalAmount,
            payment
        })

        res.status(201).json({booking})
    } catch (error) {
        next(error)
    }

}

/* -------------------------------------------------------------------------- */
/*                            Get booking for users                           */
/* -------------------------------------------------------------------------- */

export const getUserBookings = async (req, res, next)=>{
    const {userId} = req.params

    try {
      const bookings = await Booking.find({user: userId}).populate('property');
      
      res.status(200).json({bookings})
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
        const bookingById = await Booking.findById(bookingId).populate('user').populate('property');
        if(!bookingById){
            return res.status(404).json({message: 'Booking not found!'})
        }

        res.status(200).json({bookingById})
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