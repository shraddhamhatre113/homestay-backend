import express from 'express';
import userRoutes from './user.route.js';
import profileRoutes from './profile.router.js';

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/', userRoutes);
router.use('/profiles', profileRoutes);


export default  router;
