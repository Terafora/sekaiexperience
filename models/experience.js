const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
    title: String,
    location: String,
    description: String
});

module.exports = mongoose.model('Experience', ExperienceSchema);