const mongoose = require('mongoose');

const schema = mongoose.Schema({
    foodName: { type: String, required: true },
    comment: { type: String, required: true }
});

module.exports = mongoose.model('Post', schema);