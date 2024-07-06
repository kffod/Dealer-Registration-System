const mongoose = require('mongoose');

// Define the Company schema
const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    gstNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

// Create the Company model
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
