const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Assuming your model file is named 'Event.js'

router.get('/getevents', async (req, res, next) => {
    try {
        // Fetch all events from the database
        const events = await Event.find();

        return res.json({
            success: true,
            msg: "Events retrieved successfully",
            events: events // Sending events instead of event
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});

module.exports = router;
