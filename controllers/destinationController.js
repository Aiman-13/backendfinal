const destinationData = require('../utils/destinations');

// Show destinations list
exports.showDestinations = (req, resp) => {
    resp.render("destination", {
        title: "destination",
        username: req.session.username,
        profilePic: req.session.profilePic
    });
};

// Show specific destination info
exports.showDestinationInfo = (req, resp) => {
    const place = Object.keys(req.body)[0];
    const destination = destinationData[place];
    
    if (destination) {
        resp.render("destination_info", {
            title: destination.name,
            destination: destination,
            username: req.session.username,
            profilePic: req.session.profilePic
        });
    } else {
        resp.send("Destination information not found.");
    }
};

// Show packages
exports.showPackages = (req, resp) => {
    resp.render("packages", {
        title: "Tour Packages",
        username: req.session.username,
        profilePic: req.session.profilePic
    });
};

// Show gallery
exports.showGallery = (req, resp) => {
    resp.render("gallery", {
        title: "gallery",
        username: req.session.username,
        profilePic: req.session.profilePic
    });
};
