/* eslint-disable new-cap */
import express from 'express';
import { createBooking, acceptBooking, getBookingById, getUserBookings } from '../controllers/booking.controller.js';

const bookRouter = express.Router();

bookRouter.post('/', createBooking);
bookRouter.patch('/:bookingId/accept', acceptBooking);
bookRouter.get('/:bookingId', getBookingById);
bookRouter.get('/:userID/bookings', getUserBookings);


export default bookRouter;
