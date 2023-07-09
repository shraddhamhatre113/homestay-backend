import express from 'express';
import { signin, signup } from '../controllers/user.controller.js';

import { signInValidation, userValidation } from '../validations/user.js';
import { validate } from '../validations/validate.js';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/signup')
  .post(validate(userValidation), signup)

  router.route('/signin').post(signin);

router.route('/signin')
  .post(validate(signInValidation),  signin)



export default router;
