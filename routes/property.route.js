import express from 'express';

import  propertyController from '../controllers/property.controller.js';

const router = express.Router(); // eslint-disable-line new-cap
router.post('/', propertyController.createProperty);
export default router;