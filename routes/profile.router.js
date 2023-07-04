import express from 'express';

import profileController, { getGuestBookings, getHostBookings } from '../controllers/profile.controller.js';

const router = express.Router(); // eslint-disable-line new-cap

  /** GET /api/users - Get list of users */
router.get('/:profileId/host-bookings', getHostBookings)
        .get('/:profileId/guest-bookings', getGuestBookings)
router.route('/:userid')
  .get(profileController.getProfile)
  .put(profileController.updateProfile);

router.post('/:userid/upload', profileController.uploadProfileImage)



export default router;
