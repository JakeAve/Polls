const mongoose = require('mongoose');

const { OptionSchema } = require('./Option');

const PollSchema = new mongoose.Schema({
  question: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  options: [OptionSchema],
});

const Poll = mongoose.model('poll', PollSchema);

module.exports = { PollSchema, Poll };
