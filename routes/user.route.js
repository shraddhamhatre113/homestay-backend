import express from 'express';
import {signin, signup} from'../controllers/user.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/signup')
  .post(signup)


router.route('/signin')
  .post(signin)



export default  router;
