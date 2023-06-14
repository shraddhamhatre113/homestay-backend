import mongoose from "mongoose";
import { User } from "./user.model";

const bookingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', 
        required: true
    },
    checkIn:{
        type: Date,
        required: true
    },
    checkOut:{
        type: Date,
        
    },
    totalAmount:{
        type: Number,
        required: true
    },
    guests:{
        type: Number,
        required: true
    },
    payment:{
        paymentMethod:{
            type: String,
            required: true
        }
    },
    transactionId:{
        type: String,

    },
    status:{
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    }
})

const Booking = mongoose.model('Booking', bookingSchema)
export default Booking