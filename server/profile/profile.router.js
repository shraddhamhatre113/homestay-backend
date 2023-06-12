const express = require('express');

const profileController = require('../profile/profile.controller');

const router = express.Router(); // eslint-disable-line new-cap

  /** GET /api/users - Get list of users */
router.route('/:userid')
  .get(profileController.getProfile)
  .put(profileController.updateProfile);

router.route('/:userid/upload')
.post(profileController.uploadProfileImage)
module.exports = router;
