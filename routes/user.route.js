import express from 'express';
import { signin, signup } from '../controllers/user.controller.js';

import { createProperty } from '../controllers/property.controller.js';

import { protect } from '../middleware/auth.js';

const userRoutes = express.Router(); // eslint-disable-line new-cap

userRoutes.route('/signup').post(signup);

userRoutes.route('/signin').post(signin);

userRoutes.post('/properties/:userId', createProperty)



export default userRoutes;
