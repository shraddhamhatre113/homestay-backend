import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  medium_url: {
    type: String
  },
  picture_url: {
    type: String
  }

});

export default mongoose.model('Image', imageSchema);
