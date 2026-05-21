const Feedback = require('../models/Feedback');

// Create feedback
exports.createFeedback = async (req, resp) => {
    let email = req.query.txtemail;
    let uname = req.query.uname;
    let feedback = req.query.feedback;

    try {
        const newFeedback = new Feedback({
            uname: uname,
            email: email,
            feedback: feedback
        });

        await newFeedback.save();
        resp.send("thnku sir");
    } catch (err) {
        console.error('Error saving feedback to MongoDB', err);
        resp.status(500).send("An error occurred while saving your feedback: " + err.message);
    }
};

// Show feedback page
exports.showFeedback = (req, resp) => {
    resp.render("feedback", {
        title: "feedback",
        username: req.session.username,
        profilePic: req.session.profilePic
    });
};
