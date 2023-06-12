const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    listing_url: {
        type: String
      },
      name: {
        type: String
      },
      summary: {
        type: String
      },
      interaction: {
        type: String
      },
      house_rules: {
        type: String
      },
      property_type: {
        type: String
      },
      room_type: {
        type: String
      },
      minimum_nights: {
        type: Number
      },
      maximum_nights: {
        type: Number
      },
      cancellation_policy: {
        type: String
      },
      accommodates: {
        type: Number
      },
      bedrooms: {
        type: Number
      },
      beds: {
        type: [
          Mixed
        ]
      },
      number_of_reviews: {
        type: Number
      },
      bathrooms: {
        type: Number
      },
      amenities: {
        type: [
          String
        ]
      },
      price: {
        type: Number
      },
      security_deposit: {
        type: Number
      },
      cleaning_fee: {
        type: Number
      },
      extra_people: {
        type: Number
      },
      guests_included: {
        type: Number
      },
      images: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Image'
              }
        ]
      },
      host:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      address:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
      },
      boooked_dates: {
        type: [
          Mixed
        ]
      },
      review_scores: {
        review_scores_accuracy: {
          type: Number
        },
        review_scores_cleanliness: {
          type: Number
        },
        review_scores_checkin: {
          type: Number
        },
        review_scores_communication: {
          type: Number
        },
        review_scores_location: {
          type: Number
        },
        review_scores_value: {
          type: Number
        },
        review_scores_rating: {
          type: Number
        }
      },
      reviews: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
              }
        ]
      }
    }
  
);

module.exports = mongoose.model('Property', propertySchema);
