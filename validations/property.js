import {body} from 'express-validator';
import Property from '../models/property.model.js';

/* ----------------------- custom validation method ---------------------- */
const duplicateProperty = async (name) => {
    const property = await Property.findOne({name});
    if (property) {
        return Promise.reject('This property already exists');
    }
};

export const propertyValidation = [
    body('name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Name is required')
        .custom(duplicateProperty),

    body('address')
        .trim()
        .escape(),

    body('price')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Price is required')
        .isNumeric()
        .withMessage('Price must be a number'),

    body('area')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Area must be a number'),

    body('rooms')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Rooms must be a number'),

    body('beds')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Beds must be a number'),

    body('suitablePeopleCount')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Suitable people count must be a number'),

    body('photos')
        .trim()
        .escape(),

    body('facilities')
        .trim()
        .escape(),

    body('bathrooms')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Bathrooms must be a number'),

    body('nearbyPlaces')
        .trim()
        .escape(),

    body('listing_url')
        .trim()
        .escape(),

    body('summary')
        .trim()
        .escape(),

    body('interaction')
        .trim()
        .escape(),

    body('house_rules')
        .trim()
        .escape(),

    body('property_type')
        .trim()
        .escape(),

    body('room_type')
        .trim()
        .escape(),

    body('minimum_nights')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Minimum nights must be a number'),

    body('maximum_nights')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Maximum nights must be a number'),

    body('cancellation_policy')
        .trim()
        .escape(),

    body('accommodates')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Accommodates must be a number'),

    body('bedrooms')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Bedrooms must be a number'),

    body('number_of_reviews')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Number of reviews must be a number'),

    body('amenities')
        .trim()
        .escape(),

    body('security_deposit')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Security deposit must be a number'),

    body('cleaning_fee')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Cleaning fee must be a number'),

    body('extra_people')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Extra people must be a number'),

    body('guests_included')
        .trim()
        .escape()
        .isNumeric()
        .withMessage('Guests included must be a number'),

    body('images')
        .trim()
        .escape(),

    body('host')
        .trim()
        .escape(),

    body('address')
        .trim()
        .escape(),

    body('booked_dates')
        .trim()
        .escape(),

    body('review_scores')
        .trim()
        .escape(),

    body('reviews')
        .trim()
        .escape(),
];

