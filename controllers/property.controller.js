import Property from '../models/property.model.js';
 async function createProperty(req, res, next) {
    try {
      const propertyData = req.body;
  
      // Create a new property object using the Property model
      const property = new Property(propertyData);
  
      // Save the property to the database
      await property.save();
  
      res.status(201).json({ message: 'Property created successfully' });
    } catch (error) {
      next(error);
    }
  }
  
  export default {createProperty}