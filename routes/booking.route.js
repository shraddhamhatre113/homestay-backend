/* eslint-disable new-cap */
import express from 'express';
import { createBooking, getBookingById, getGuestBookings, getPropertyBookings, updateBooking } from '../controllers/booking.controller.js';

const bookRouter = express.Router();

bookRouter.post('/', createBooking);
bookRouter.put('/:bookingId', updateBooking);
bookRouter.get('/:bookingId', getBookingById);
bookRouter.get('/:userID/guest-bookings', getGuestBookings);
bookRouter.get('/:userID/property-bookings', getPropertyBookings);


export default bookRouter;
