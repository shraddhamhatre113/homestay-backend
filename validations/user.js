import {body} from 'express-validator';
import User from '../models/user.model.js';


/* ----------------------- custom validation method ---------------------- */
const isEmailInUse = async (email) => {
    const user = await User.findOne({email});
    if (user) {
        return Promise.reject('This email is already in use');
    }
};

export const userValidation = [
    body('firstName')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('First name is required')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Please enter a valid first name'),
    body('lastName')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Last name is required')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Please enter a valid last name'),
    body('email')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail()
        .custom(isEmailInUse),
    body('password')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Password is required')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+-?]).{8,}$/)
        .withMessage('Your password should contain at least one Capital letter, one small letter, one number, and one special character. It should be at least 8 characters long.'),
    body('confirmPassword')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Confirm password is required')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }
        ),
    body('dob')
        .trim()
        .escape()
        .notEmpty()
        .isDate(),
        body('gender')
        .trim()
        .escape()
        .notEmpty()
        .matches(/^(male|female|other)$/),
    body('hobbies')
        .trim()
        .escape()
        .notEmpty()
        .matches(/^(music|sports|reading|travelling|cooking|other)$/),
    body('interest')
        .trim()
        .escape()
        .notEmpty()
        .matches(/^(music|sports|reading|travelling|cooking|other)$/),
    body('about')
        .trim()
        .escape()
        .notEmpty(),
    body('responseTime')
        .trim()
        .escape()
        .notEmpty()
        .matches(/^(within an hour|within a few hours|within a day|within a few days|within a week|within a few weeks|within a month|within a few months|within a year|within a few years|other)$/),
    body('neighbourhood')
        .trim()
        .escape()
        .notEmpty(),
    body('responseRate')
        .trim()
        .escape()
        .notEmpty()
        .isNumeric(),
    body('image')
        .trim()
        .escape()
        .notEmpty(),
];
    
    export const signInValidation = [
        body('email')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Please enter a valid email')
            .normalizeEmail(),
        body('password')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('Password is required')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+-?]).{8,}$/)
            .withMessage('Your password should contain at least one Capital letter, one small letter, one number, and one special character. It should be at least 8 characters long.'),


];


