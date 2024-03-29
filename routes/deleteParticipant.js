const express = require('express');
const router = express.Router();
const User = require('../models/Shristi');

router.put('/delete', async (req, res, next) => {
    const { dept, eventName, phone } = req.body;
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

        // Find the index of the participant in the event's participants array
        const participantIndex = event.participants.findIndex(p => p.phone === phone);

        if (participantIndex === -1) {
            return res.status(404).json({
                success: false,
                msg: "Participant not found for this event"
            });
        }

        // Remove the participant from the event's participants array
        event.participants.splice(participantIndex, 1);

        // Save the updated user document
        await user.save();

        return res.json({ 
            success: true,
            msg: "Participant removed from the event successfully"
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
