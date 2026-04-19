const mongoose = require('mongoose');

// Schema
const useSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
     }
}, { collection: 'Users-collection' });

const User = mongoose.model('User', useSchema);

module.exports = User;
