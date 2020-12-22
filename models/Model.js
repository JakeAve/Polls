const mongoose = require('mongoose');

const Schema = new mongoose.Schema({});

const thing = mongoose.model('thing', Schema);

module.exports = { Schema, thing };
