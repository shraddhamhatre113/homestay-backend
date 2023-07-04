import Promise from "bluebird";
import mongoose from "mongoose";
import httpStatus from "http-status";
import APIError from "../helpers/APIError.js";
import bcrypt from "bcrypt";
import bookingModel from "./booking.model.js";

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  hobbies: {
    type: String,
  },
  interest: {
    type: String,
  },
  about: {
    type: String,
  },
  response_time: {
    type: String,
  },
  host:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },
  role:{
    type: String,
    enum: ["guest", "host"],
    default: "guest"
  },
  is_host:{
    type: Boolean,
    default: false
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  neighbourhood: {
    type: String,
  },
  response_rate: {
    type: Number,
  },
  is_superhost: {
    type: Boolean,
  },
  has_profile_pic: {
    type: Boolean,
  },
  identity_verified: {
    type: Boolean,
  },
  verifications: {
    type: [String],
  },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
  property_bookings: {
    past_booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    current_bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    rejected_bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  guest_booking: {
    past_booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    current_bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    cancelled_bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
  async authenticate(plainTextPass) {
    return await bcrypt.compare(plainTextPass, this.password);
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Statics
 */
UserSchema.statics = {
  /*
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    const nid = new mongoose.Types.ObjectId(id);
    return this.findOne(nid)
      .populate("address")
      .populate("image")
      .populate("properties")
      .populate("properties.images")
      .populate("property_bookings.past_booking")
      .populate("property_bookings.current_bookings")
      .populate("property_bookings.rejected_bookings")
      .populate("guest_booking.past_booking")
      .populate("guest_booking.current_bookings")
      .populate("guest_booking.cancelled_bookings")
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError("No such user exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(+skip).limit(+limit).exec();
  },
  update(data, id) {
    const nid = id ? new mongoose.Types.ObjectId(id) : null;

    return this.findOneAndUpdate(nid, data, { upsert: true }).then((user) => {
      if (user) {
        return user;
      }
      const err = new APIError("No such user exists!", httpStatus.NOT_FOUND);
      return Promise.reject(err);
    });
  },
};

/**
 * @typedef User
 */
export default mongoose.model("User", UserSchema);
