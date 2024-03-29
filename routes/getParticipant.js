const express = require('express');
const router = express.Router();
const User = require('../models/Shristi');

router.post('/getParticipants', async (req, res, next) => {
    const { dept, eventName } = req.body;
    try {
        let user = await User.findOne({ dept: dept });

        // Check if the department exists
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "Department not found"
            });
        }

        // Check if the event exists within the department
        let event = user.event.find(e => e.name === eventName);

        if (!event) {
            return res.status(404).json({
                success: false,
                msg: "Event not found"
            });
        }

        // Return the array list of participants for the event
        const participants = event.participants;

        return res.json({
            
            success: true,
            msg: "Participants retrieved successfully",
            participants: participants
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
