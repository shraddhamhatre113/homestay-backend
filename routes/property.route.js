/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import { createProperty, deleteProperty, getAllProperty, getPropertyDetail, getPropertyPreview, searchProperties, getPropertyByBookingHistory, updateProperty } from '../controllers/property.controller.js';
import { propertyValidation } from '../validations/property.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../validations/validate.js';

const propertyRoutes = express.Router(); // eslint-disable-line new-cap
propertyRoutes.post('/', createProperty)
      .get('/search', searchProperties)     
      .get('/', getAllProperty)    
      .get('/:id', getPropertyDetail)
      .delete('/:id', deleteProperty)
      .get('/:propertyId/preview', getPropertyPreview)
      .get('/:id/booking-history',protect(), validate(propertyValidation), getPropertyByBookingHistory)
      .put('/:id',protect(), validate(propertyValidation), updateProperty);


      

export default propertyRoutes;
