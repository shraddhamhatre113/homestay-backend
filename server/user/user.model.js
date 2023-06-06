const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  id: {
    type: String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  DOB: {
    type: Date
  },
  gender: {
    type: String
  },
  hobbies: {
    type: String
  },
  interest: {
    type: String
  },
  about: {
    type: String
  },
  response_time: {
    type: String
  },
  picture_id: {
    type: String
  },
  neighbourhood: {
    type: String
  },
  response_rate: {
    type: Number
  },
  is_superhost: {
    type: Boolean
  },
  has_profile_pic: {
    type: Boolean
  },
  identity_verified: {
    type: Boolean
  },
  verifications: {
    type: [
      String
    ]
  },
  properties: {
    type: [
      String
    ]
  },
  property_bookings: {
    past_booking: {
      type: [
        String
      ]
    },
    current_bookings: {
      type: [
        String
      ]
    },
    rejected_bookings: {
      type: [
        String
      ]
    }
  },
  guest_booking: {
    past_booking: {
      type: [
        String
      ]
    },
    current_bookings: {
      type: [
        String
      ]
    },
    cancelled_bookings: {
      type: [
        String
      ]
    }
  },
  address_id: {
    type: String
  },
  transactions: {
    type: [
      String
    ]
  }
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
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
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
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
