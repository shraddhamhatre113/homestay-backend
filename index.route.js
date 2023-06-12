const express = require('express');
const userRoutes = require('./server/user/user.route');
const profileRoutes = require('./server/profile/profile.router');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);


module.exports = router;
