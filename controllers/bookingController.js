const Booking = require('../models/Booking');

// Create booking
exports.createBooking = async (req, resp) => {
    let email = req.query.femail;
    let city = req.query.city;
    let phone = req.query.fphone;
    let desti = req.query.fdesti;
    let last = req.query.flast;
    let fname = req.query.ffname;

    try {
        const booking = new Booking({
            fname: fname,
            last: last,
            email: email,
            city: city,
            phone: phone,
            desti: desti
        });

        await booking.save();
        resp.send("congratulations!! Your request has been send and will be updated very soon");
    } catch (err) {
        console.error('Error saving booking to MongoDB', err);
        resp.status(500).send("An error occurred while processing your booking: " + err.message);
    }
};

// Show booking page
exports.showBooking = (req, resp) => {
    resp.render("booking", {
        title: "booking",
        username: req.session.username,
        profilePic: req.session.profilePic
    });
};
