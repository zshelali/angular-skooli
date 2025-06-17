const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: String,
    url: String,
    type: String
});

const ModuleSchema = new mongoose.Schema({
    title: String,
    description: String,
    files: [FileSchema],
    isOpen: Boolean
});

module.exports = mongoose.model('Module', ModuleSchema);