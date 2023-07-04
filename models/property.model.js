import mongoose from 'mongoose';


const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number },
  rooms: { type: Number },
  beds: { type: Number },
  suitablePeopleCount: { type: Number },
  photos: [{ type: String }],
  facilities: {
    swimmingPool: { type: Boolean },
    garden: { type: Boolean },
    airCondition: { type: Boolean },
    washingMachine: { type: Boolean },
    kitchenEquipment: { type: Boolean },
  },
  bathrooms: { type: Number },
  nearbyPlaces: { type: String },
  listing_url: { type: String },
  summary: { type: String },
  interaction: { type: String },
  house_rules: { type: String },
  property_type: { type: String },
  room_type: { type: String },
  minimum_nights: { type: Number },
  maximum_nights: { type: Number },
  cancellation_policy: { type: String },
  accommodates: { type: Number },
  bedrooms: { type: Number },
  number_of_reviews: { type: Number },
  amenities: [{ type: String }],
  security_deposit: { type: Number },
  cleaning_fee: { type: Number },
  extra_people: { type: Number },
  guests_included: { type: Number },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],

  host: { 
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: { type: String }
  },

  address_prop: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  booked_dates: [{ type: Date }],
  review_scores: {
    review_scores_accuracy: { type: Number },
    review_scores_cleanliness: { type: Number },
    review_scores_checkin: { type: Number },
    review_scores_communication: { type: Number },
    review_scores_location: { type: Number },
    review_scores_value: { type: Number },
    review_scores_rating: { type: Number },
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const Property = mongoose.model('Property', propertySchema);
export default Property;
