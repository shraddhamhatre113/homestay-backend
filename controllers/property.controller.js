import Property from "../models/property.model.js";

/* -------------------------------------------------------------------------- */
/*                               Create Property                              */
/* -------------------------------------------------------------------------- */
export const createProperty = async (req, res, next) => {
  const propertyData = req.body;
  try {
    // Create a new property object using the Property model
    const property = new Property(propertyData);

    // Save the property to the database
    await property.save();

    res
      .status(201)
      .json({ message: "Property created successfully", property });
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                             Get Property by ID                             */
/* -------------------------------------------------------------------------- */
export const getPropertyDetail = async (req, res, next) => {
  const propertyId = req.params.id;
  try {
    const property = await Property.findById(propertyId);
   

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                               Delete Property                              */
/* -------------------------------------------------------------------------- */
export const deleteProperty = async (req, res, next) => {
  const propertyId = req.params.id;
  try {
    const deletedProp = await Property.findByIdAndDelete(propertyId);

    if (!deletedProp) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted.", deletedProp });
  } catch (error) {
    next(error);
  }
};
/* -------------------------------------------------------------------------- */
/*                             Get All Properties                             */
/* -------------------------------------------------------------------------- */
export const getAllProperty = async (req, res, next) => {
  try {
    const properties = await Property.find();
    if (!properties) {
      return res.status(404).json({ message: "No properties found." });
    }

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                              Search Properties                             */
/* -------------------------------------------------------------------------- */

export const searchProperties = async(req, res, next) => {
  const { 
    minPrice, 
    maxPrice, 
    minBedrooms, 
    maxBedrooms,
    minBathrooms,
    maxBathrooms, 
    minBeds, 
    maxBeds, 
    propertyType, 
    amenities
  } = req.query;

  const filters = {}

  //Price filter
  if(minPrice && maxPrice){
    filters.price = {$gte:(minPrice), $lte:maxPrice};
  }else if(minPrice){
    filters.price = {$gte: minPrice};
  }else if(maxPrice){
    filters.price = {$lte: maxPrice}
  }

  //Bedrooms filter
  if(minBedrooms && maxBedrooms){
    filters.bedrooms = {$gte: minBedrooms, $lte: maxBedrooms};
  }else if(minBedrooms){
    filters.bedrooms = {$gte: minBedrooms};
  }else if(maxBedrooms){
    filters.bedrooms = {$lte: maxBedrooms}
  }
 //Bathrooms filter
  if(minBathrooms && maxBathrooms){
    filters.bathrooms = {$gte: minBathrooms, $lte: maxBathrooms};
  }else if(minBathrooms){
    filters.bathrooms = {$gte: minBathrooms};
  }else if(maxBathrooms){
    filters.bathrooms = {$lte: maxBathrooms}
  }
//Beds filter
  if(minBeds && maxBeds){
    filters.beds = {$gte: minBeds, $lte: maxBeds};
  }else if(minBeds){
    filters.beds = {$gte: minBeds};
  }else if(maxBeds){
    filters.beds = {$lte: maxBeds}
  }
  //Property type filter
  if(propertyType){
    filters.property_type = propertyType;
  }
  //Amenities filter
  if(amenities){
    filters.amenities = {$all: amenities.split(',')};   
  }



  try {
    const filteredProps = await Property.find(filters);
    res.status(200).json({ filteredProps })
  } catch (error) {
    next(error)
  }
}
