const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
  },
  street_number: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
  country: {
    type: String,
  },
  country_code: {
    type: String,
  },
  location: {
    type: {
      type: String,
    },
    coordinates: {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },
    is_location_exact: {
      type: Boolean,
    },
  },
});

AddressSchema.method({});

/**
 * Statics
 */
AddressSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of address.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    const nid = new mongoose.Types.ObjectId(id);
    return this.findOne(nid).then((address) => {
      if (address) {
        return address;
      }
      const err = new APIError("No such address exists!", httpStatus.NOT_FOUND);
      return Promise.reject(err);
    });
  },
  update(data, id) {
      const nid = id? new mongoose.Types.ObjectId(id):null;
      return this.findOneAndUpdate(nid, data, {upsert: true}).then((address) => {
        if (address) {
          return address;
        }
        const err = new APIError(
          "No such address exists!",
          httpStatus.NOT_FOUND
        );
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
};

module.exports = mongoose.model("Address", AddressSchema);
