const mongoose = require('mongoose');

const Song = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  youtubeLink: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('song', Song);
