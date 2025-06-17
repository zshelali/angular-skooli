const mongoose = require('mongoose');

const ueSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    date_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ue', ueSchema);