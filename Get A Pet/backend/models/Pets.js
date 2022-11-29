const mongoose = require('../db/conn');
const { Schema } = mongoose;

const User = mongoose.model(
  'Pets',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
      available: {
        type: Boolean,
      },
      user: Object,
      adopter: Object,
    },
    { timestamps: true }
  )
);

module.exports = Pet;
