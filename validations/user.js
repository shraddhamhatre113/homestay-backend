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


