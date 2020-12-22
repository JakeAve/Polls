const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const Option = mongoose.model('option', OptionSchema);

module.exports = { OptionSchema, Option };
