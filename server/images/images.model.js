const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  medium_url: {
    type: String
  },
  picture_url: {
    type: String
  }

});

module.exports = mongoose.model('Image', imageSchema);
