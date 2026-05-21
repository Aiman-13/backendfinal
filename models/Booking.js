const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    city: String,
    phone: String,
    desti: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
