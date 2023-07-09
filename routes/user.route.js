import express from 'express';
import { signin, signup } from '../controllers/user.controller.js';
import {validate} from '../validations/validate.js'

import { signInValidation, userValidation } from '../validations/user.js';

const userRoutes = express.Router(); // eslint-disable-line new-cap

userRoutes.route('/signup')
  .post(validate(userValidation), signup)

userRoutes.route('/signin').post(signin);

userRoutes.route('/signin')
  .post(validate(signInValidation),  signin)



export default userRoutes;
