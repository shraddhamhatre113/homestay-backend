import express from 'express';

import profileController from '../controllers/profile.controller.js';

const router = express.Router(); // eslint-disable-line new-cap

  /** GET /api/users - Get list of users */
router.route('/:userid')
  .get(profileController.getProfile)
  .put(profileController.updateProfile);

router.route('/:userid/upload')
.post(profileController.uploadProfileImage)

export default router;
