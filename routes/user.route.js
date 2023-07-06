import express from 'express';
import { signin, signup } from '../controllers/user.controller.js';

import { createProperty } from '../controllers/property.controller.js';

import { protect } from '../middleware/auth.js';

import { signInValidation, userValidation } from '../validations/user.js';

const userRoutes = express.Router(); // eslint-disable-line new-cap

router.route('/signup')
  .post(validator(userValidation), signup)

userRoutes.route('/signin').post(signin);

router.route('/signin')
  .post(validator(signInValidation),  signin)



export default userRoutes;
